import { json } from "@sveltejs/kit";
import { leagueID, managers } from "$lib/utils/leagueInfo";

const TRADYR_BASE = "https://api.tradyr.app/v1";
const FANTASYCALC_BASE = "https://api.fantasycalc.com/values/current";
const DYNASTY_PROCESS_VALUES =
  "https://raw.githubusercontent.com/DynastyProcess/data/master/files/values.csv";
const DYNASTY_PROCESS_PICKS =
  "https://raw.githubusercontent.com/DynastyProcess/data/master/files/values-picks.csv";
const OFFENSE_POSITIONS = new Set(["QB", "RB", "WR", "TE"]);
const FLEX_POSITIONS = new Set(["RB", "WR", "TE"]);

const fetchResponse = async (url) => {
  const response = await fetch(url, {
    compress: true,
    headers: { "user-agent": "Tommy-and-11-Losers-Trade-Lab/1.0" },
  });
  if (!response.ok)
    throw new Error(`${new URL(url).hostname} returned ${response.status}`);
  return response;
};

const fetchJSON = async (url) => (await fetchResponse(url)).json();
const fetchText = async (url) => (await fetchResponse(url)).text();

const parseCsvLine = (line) => {
  const values = [];
  let value = "";
  let quoted = false;
  for (let index = 0; index < line.length; index++) {
    const character = line[index];
    if (character === '"' && quoted && line[index + 1] === '"') {
      value += '"';
      index++;
    } else if (character === '"') {
      quoted = !quoted;
    } else if (character === "," && !quoted) {
      values.push(value);
      value = "";
    } else {
      value += character;
    }
  }
  values.push(value);
  return values;
};

const parseCsv = (text) => {
  const lines = text.trim().split(/\r?\n/);
  const headers = parseCsvLine(lines.shift());
  return lines.map((line) =>
    Object.fromEntries(
      parseCsvLine(line).map((value, index) => [headers[index], value]),
    ),
  );
};

const normalizeName = (name = "") =>
  name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\b(jr|sr|ii|iii|iv)\b/g, "")
    .replace(/[^a-z0-9]/g, "");

const playerKey = (name, position) => `${normalizeName(name)}:${position}`;
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const round = (value, precision = 0) => {
  const multiplier = 10 ** precision;
  return Math.round(value * multiplier) / multiplier;
};

const sourceResult = (settled, name) =>
  settled.status === "fulfilled"
    ? { name, available: true, data: settled.value }
    : {
        name,
        available: false,
        error: settled.reason?.message || "Unavailable",
      };

const weightedConsensus = (entries) => {
  const available = entries.filter((entry) => Number.isFinite(entry.value));
  if (!available.length) return { value: 0, coverage: 0, spread: 0 };
  const totalWeight = available.reduce((sum, entry) => sum + entry.weight, 0);
  const value =
    available.reduce((sum, entry) => sum + entry.value * entry.weight, 0) /
    totalWeight;
  const spread =
    Math.max(...available.map((entry) => entry.value)) -
    Math.min(...available.map((entry) => entry.value));
  return {
    value: Math.round(value),
    coverage: available.length,
    spread: Math.round(spread),
  };
};

const getLeagueChain = async (startingLeague, seasons = 3) => {
  const chain = [];
  let league = startingLeague;
  while (league && chain.length < seasons) {
    const [rosters, users] = await Promise.all([
      fetchJSON(
        `https://api.sleeper.app/v1/league/${league.league_id}/rosters`,
      ),
      fetchJSON(`https://api.sleeper.app/v1/league/${league.league_id}/users`),
    ]);
    chain.push({ league, rosters, users });
    if (!league.previous_league_id) break;
    league = await fetchJSON(
      `https://api.sleeper.app/v1/league/${league.previous_league_id}`,
    );
  }
  return chain;
};

const getHistoricalTrades = async (leagueChain) => {
  const transactionRequests = leagueChain.flatMap(({ league }) =>
    Array.from({ length: 18 }, (_, index) =>
      fetchJSON(
        `https://api.sleeper.app/v1/league/${league.league_id}/transactions/${index + 1}`,
      )
        .then((transactions) =>
          transactions.map((transaction) => ({
            ...transaction,
            sourceLeagueID: league.league_id,
          })),
        )
        .catch(() => []),
    ),
  );
  return (await Promise.all(transactionRequests))
    .flat()
    .filter(
      (transaction) =>
        transaction.type === "trade" && transaction.status === "complete",
    )
    .filter(
      (transaction, index, trades) =>
        trades.findIndex(
          (candidate) =>
            candidate.transaction_id === transaction.transaction_id,
        ) === index,
    );
};

const buildTradeProfiles = (leagueChain, trades, playerPositions) => {
  const profiles = {};
  const rosterOwners = new Map();
  for (const { league, rosters } of leagueChain) {
    for (const roster of rosters) {
      rosterOwners.set(
        `${league.league_id}:${roster.roster_id}`,
        roster.owner_id,
      );
      profiles[roster.owner_id] ||= {
        trades: 0,
        initiated: 0,
        picksAcquired: 0,
        picksSent: 0,
        playersAcquired: 0,
        positionsAcquired: { QB: 0, RB: 0, WR: 0, TE: 0 },
      };
    }
  }

  for (const trade of trades) {
    const leagueEntry = leagueChain.find(
      ({ league }) => league.league_id === trade.sourceLeagueID,
    );
    if (!leagueEntry) continue;
    for (const rosterID of trade.roster_ids || []) {
      const ownerID = rosterOwners.get(
        `${leagueEntry.league.league_id}:${rosterID}`,
      );
      if (!ownerID || !profiles[ownerID]) continue;
      const profile = profiles[ownerID];
      profile.trades++;
      if (String(trade.creator) === String(ownerID)) profile.initiated++;

      for (const pick of trade.draft_picks || []) {
        if (Number(pick.owner_id) === Number(rosterID)) profile.picksAcquired++;
        if (Number(pick.previous_owner_id) === Number(rosterID))
          profile.picksSent++;
      }
      for (const [playerID, destination] of Object.entries(trade.adds || {})) {
        if (Number(destination) !== Number(rosterID)) continue;
        profile.playersAcquired++;
        const position = playerPositions.get(String(playerID));
        if (profile.positionsAcquired[position] !== undefined)
          profile.positionsAcquired[position]++;
      }
    }
  }
  return profiles;
};

const eligibleForSlot = (position, slot) => {
  if (["FLEX", "WRRB_FLEX", "REC_FLEX"].includes(slot))
    return FLEX_POSITIONS.has(position);
  if (slot === "SUPER_FLEX")
    return FLEX_POSITIONS.has(position) || position === "QB";
  return position === slot;
};

const optimalLineupValue = (
  players,
  rosterPositions,
  field = "redraftValue",
) => {
  const used = new Set();
  let total = 0;
  const slots = rosterPositions
    .filter(
      (slot) =>
        ![
          "BN",
          "IR",
          "TAXI",
          "K",
          "DEF",
          "DL",
          "DB",
          "LB",
          "IDP_FLEX",
        ].includes(slot),
    )
    .sort((a, b) => Number(a.includes("FLEX")) - Number(b.includes("FLEX")));
  for (const slot of slots) {
    const candidate = players
      .filter(
        (player) =>
          !used.has(player.id) && eligibleForSlot(player.position, slot),
      )
      .sort((a, b) => b[field] - a[field])[0];
    if (!candidate) continue;
    used.add(candidate.id);
    total += candidate[field];
  }
  return Math.round(total);
};

const rankTeams = (teams, field, ascending = false) => {
  [...teams]
    .sort((a, b) => (ascending ? a[field] - b[field] : b[field] - a[field]))
    .forEach((team, index) => {
      team[`${field}Rank`] = index + 1;
    });
};

const classifyDirection = (team, teamCount) => {
  if (team.currentStrengthRank <= 3 && team.playerAssetsRank <= 5)
    return "Elite Contender";
  if (team.currentStrengthRank <= Math.ceil(teamCount / 2)) return "Contender";
  if (
    team.playerAssetsRank >= teamCount - 2 &&
    team.pickAssetsRank >= Math.ceil(teamCount / 2)
  )
    return "Rebuilding";
  return "Retooling";
};

const directionFit = (direction) =>
  ({
    "Elite Contender": "veterans and dependable weekly starters",
    Contender: "a lineup upgrade without stripping useful depth",
    Retooling: "younger starters and flexible draft capital",
    Rebuilding: "young players and future picks",
  })[direction] || "long-term roster value";

const buildPickAssets = ({
  league,
  rosters,
  tradedPicks,
  draft,
  teams,
  tradyrPicks,
  fantasyCalc,
  dynastyPicks,
}) => {
  const currentSeason = Number(league.season);
  const rounds = Math.min(Number(league.settings?.draft_rounds || 3), 4);
  const teamCount = rosters.length;
  const draftSlotByRoster = Object.fromEntries(
    Object.entries(draft?.slot_to_roster_id || {}).map(([slot, roster]) => [
      Number(roster),
      Number(slot),
    ]),
  );
  const projectedSlotByRoster = Object.fromEntries(
    [...teams]
      .sort((a, b) => a.playerAssets - b.playerAssets)
      .map((team, index) => [team.rosterID, index + 1]),
  );

  const tradyrMap = new Map(
    (tradyrPicks || []).map((pick) => [pick.name, Number(pick.composite)]),
  );
  const fantasyPickMap = new Map(
    fantasyCalc
      .filter((entry) => entry.player?.position === "PICK")
      .map((entry) => [entry.player.name, Number(entry.value)]),
  );
  const maxFantasyValue = Math.max(
    ...fantasyCalc.map((entry) => Number(entry.value || 0)),
    1,
  );
  const dynastyPickMap = new Map(
    dynastyPicks.map((pick) => [pick.player, Number(pick.ecr_1qb)]),
  );
  const assets = [];

  for (let season = currentSeason; season <= currentSeason + 2; season++) {
    for (const roster of rosters) {
      for (let pickRound = 1; pickRound <= rounds; pickRound++) {
        const actualSlot =
          season === currentSeason ? draftSlotByRoster[roster.roster_id] : null;
        const projectedSlot =
          actualSlot ||
          projectedSlotByRoster[roster.roster_id] ||
          Math.ceil(teamCount / 2);
        const exactName = `${season} Pick ${pickRound}.${String(projectedSlot).padStart(2, "0")}`;
        const tier =
          projectedSlot <= 4 ? "Early" : projectedSlot <= 8 ? "Mid" : "Late";
        const futureName = `${season} ${pickRound === 1 ? "1st" : pickRound === 2 ? "2nd" : pickRound === 3 ? "3rd" : `${pickRound}th`} (${tier})`;
        const tradyrValue = tradyrMap.get(exactName);
        const fantasyRaw =
          fantasyPickMap.get(exactName) ?? fantasyPickMap.get(futureName);
        const fantasyValue = Number.isFinite(fantasyRaw)
          ? Math.round((fantasyRaw / maxFantasyValue) * 1000)
          : undefined;
        const dynastyEcr = dynastyPickMap.get(exactName);
        const dynastyValue = Number.isFinite(dynastyEcr)
          ? Math.round(
              1000 * Math.pow(clamp(1 - (dynastyEcr - 1) / 450, 0.01, 1), 1.35),
            )
          : undefined;
        const consensus = weightedConsensus([
          { value: tradyrValue, weight: 0.45 },
          { value: fantasyValue, weight: 0.35 },
          { value: dynastyValue, weight: 0.2 },
        ]);
        assets.push({
          id: `pick:${season}:${pickRound}:${roster.roster_id}`,
          type: "pick",
          name: actualSlot
            ? exactName
            : `${season} ${tier.toLowerCase()} ${pickRound === 1 ? "1st" : pickRound === 2 ? "2nd" : pickRound === 3 ? "3rd" : `${pickRound}th`}`,
          season,
          round: pickRound,
          slot: projectedSlot,
          projected: !actualSlot,
          originalRosterID: roster.roster_id,
          ownerRosterID: roster.roster_id,
          consensusValue: consensus.value,
          sourceCoverage: consensus.coverage,
          sourceSpread: consensus.spread,
        });
      }
    }
  }

  for (const tradedPick of tradedPicks) {
    const asset = assets.find(
      (pick) =>
        pick.season === Number(tradedPick.season) &&
        pick.round === Number(tradedPick.round) &&
        pick.originalRosterID === Number(tradedPick.roster_id),
    );
    if (asset) asset.ownerRosterID = Number(tradedPick.owner_id);
  }
  return assets;
};

const describeTradeProfile = (profile, pickBias) => {
  if (profile.trades < 2)
    return "Limited history — AI opinion leans more heavily on roster fit";
  if (pickBias >= 0.66)
    return "Pick collector — AI opinion based on completed league trades";
  if (pickBias <= 0.34)
    return "Pick spender — AI opinion based on completed league trades";
  if (profile.initiated / profile.trades >= 0.6)
    return "Active dealmaker — AI opinion based on completed league trades";
  return "Selective negotiator — AI opinion based on completed league trades";
};

export async function GET() {
  const league = await fetchJSON(
    `https://api.sleeper.app/v1/league/${leagueID}`,
  );
  const numQbs =
    league.roster_positions.includes("SUPER_FLEX") ||
    league.roster_positions.filter((slot) => slot === "QB").length > 1
      ? 2
      : 1;
  const ppr = Number(league.scoring_settings?.rec || 0);
  const teamCount = Number(league.total_rosters || 12);
  const rankingFormat = league.scoring_settings?.bonus_rec_te
    ? "dynasty-te-prem"
    : numQbs === 2
      ? "dynasty-superflex"
      : "dynasty-1qb";
  const fantasyCalcURL = `${FANTASYCALC_BASE}?isDynasty=true&numQbs=${numQbs}&numTeams=${teamCount}&ppr=${ppr}`;

  const [rosters, users, tradedPicks, draft, marketResults] = await Promise.all(
    [
      fetchJSON(`https://api.sleeper.app/v1/league/${leagueID}/rosters`),
      fetchJSON(`https://api.sleeper.app/v1/league/${leagueID}/users`),
      fetchJSON(`https://api.sleeper.app/v1/league/${leagueID}/traded_picks`),
      fetchJSON(`https://api.sleeper.app/v1/draft/${league.draft_id}`).catch(
        () => null,
      ),
      Promise.allSettled([
        fetchJSON(`${TRADYR_BASE}/rankings/${rankingFormat}`),
        fetchJSON(
          `${TRADYR_BASE}/picks?numQbs=${numQbs}&numTeams=${teamCount}`,
        ),
        fetchJSON(fantasyCalcURL),
        fetchText(DYNASTY_PROCESS_VALUES),
        fetchText(DYNASTY_PROCESS_PICKS),
      ]),
    ],
  );

  const [
    tradyrRankingsResult,
    tradyrPicksResult,
    fantasyCalcResult,
    dynastyValuesResult,
    dynastyPicksResult,
  ] = marketResults;
  const tradyrSource = sourceResult(tradyrRankingsResult, "Tradyr consensus");
  const fantasySource = sourceResult(fantasyCalcResult, "FantasyCalc market");
  const dynastySource = sourceResult(
    dynastyValuesResult,
    "DynastyProcess values",
  );
  const tradyrRankings = tradyrSource.available
    ? tradyrSource.data.data || []
    : [];
  const tradyrPicks =
    tradyrPicksResult.status === "fulfilled"
      ? tradyrPicksResult.value.data || []
      : [];
  const fantasyCalc = fantasySource.available ? fantasySource.data : [];
  const dynastyValues = dynastySource.available
    ? parseCsv(dynastySource.data)
    : [];
  const dynastyPicks =
    dynastyPicksResult.status === "fulfilled"
      ? parseCsv(dynastyPicksResult.value)
      : [];
  if (!tradyrRankings.length && !fantasyCalc.length && !dynastyValues.length) {
    return json(
      {
        error:
          "All external dynasty value sources are temporarily unavailable.",
      },
      { status: 503 },
    );
  }

  const tradyrMap = new Map(
    tradyrRankings.map((player) => [
      playerKey(player.name, player.position),
      player,
    ]),
  );
  const dynastyMap = new Map(
    dynastyValues.map((player) => [
      playerKey(player.player, player.pos),
      player,
    ]),
  );
  const maxFantasyValue = Math.max(
    ...fantasyCalc.map((entry) => Number(entry.value || 0)),
    1,
  );
  const maxDynastyValue = Math.max(
    ...dynastyValues.map((entry) => Number(entry[`value_${numQbs}qb`] || 0)),
    1,
  );
  const maxRedraftValue = Math.max(
    ...fantasyCalc.map((entry) => Number(entry.redraftValue || 0)),
    1,
  );
  const playerIDs = new Set(
    rosters.flatMap((roster) => roster.players || []).map(String),
  );
  const consensusPlayers = fantasyCalc
    .filter((entry) => playerIDs.has(String(entry.player?.sleeperId)))
    .filter((entry) => OFFENSE_POSITIONS.has(entry.player?.position))
    .map((entry) => {
      const key = playerKey(entry.player.name, entry.player.position);
      const tradyr = tradyrMap.get(key);
      const dynastyProcess = dynastyMap.get(key);
      const fantasyValue = Math.round(
        (Number(entry.value || 0) / maxFantasyValue) * 1000,
      );
      const dynastyRaw = Number(dynastyProcess?.[`value_${numQbs}qb`]);
      const dynastyValue = Number.isFinite(dynastyRaw)
        ? Math.round((dynastyRaw / maxDynastyValue) * 1000)
        : undefined;
      const consensus = weightedConsensus([
        { value: Number(tradyr?.composite), weight: 0.45 },
        { value: fantasyValue, weight: 0.35 },
        { value: dynastyValue, weight: 0.2 },
      ]);
      return {
        id: String(entry.player.sleeperId),
        type: "player",
        name: entry.player.name,
        position: entry.player.position,
        nflTeam: entry.player.maybeTeam || "FA",
        age: Number(entry.player.maybeAge || 0),
        consensusValue: consensus.value,
        redraftValue: Math.round(
          (Number(entry.redraftValue || 0) / maxRedraftValue) * 1000,
        ),
        trend30Day: Number(entry.trend30Day || 0),
        tradeFrequency: Number(entry.maybeTradeFrequency || 0),
        volatility: Number(entry.maybeMovingStandardDeviationAdjusted || 0),
        sourceCoverage: consensus.coverage,
        sourceSpread: consensus.spread,
      };
    });
  const playerMap = new Map(
    consensusPlayers.map((player) => [player.id, player]),
  );
  const playerPositions = new Map(
    consensusPlayers.map((player) => [player.id, player.position]),
  );

  const teams = rosters.map((roster) => {
    const user = users.find(
      (candidate) => String(candidate.user_id) === String(roster.owner_id),
    );
    const staticManager =
      managers.find(
        (manager) => String(manager.managerID) === String(roster.owner_id),
      ) ||
      managers.find(
        (manager) => Number(manager.roster) === Number(roster.roster_id),
      );
    const players = (roster.players || [])
      .map((id) => playerMap.get(String(id)))
      .filter(Boolean);
    return {
      rosterID: Number(roster.roster_id),
      ownerID: roster.owner_id,
      managerName:
        staticManager?.name ||
        user?.display_name ||
        `Roster ${roster.roster_id}`,
      shortName: (
        staticManager?.name ||
        user?.display_name ||
        `Team ${roster.roster_id}`
      ).split(" AKA:")[0],
      teamName: user?.metadata?.team_name || `Roster ${roster.roster_id}`,
      avatar:
        staticManager?.photo ||
        (user?.avatar
          ? `https://sleepercdn.com/avatars/thumbs/${user.avatar}`
          : null),
      players,
      playerAssets: players.reduce(
        (sum, player) => sum + player.consensusValue,
        0,
      ),
      currentStrength: optimalLineupValue(players, league.roster_positions),
      pickAssets: 0,
    };
  });
  rankTeams(teams, "playerAssets");
  rankTeams(teams, "currentStrength");

  const pickAssets = buildPickAssets({
    league,
    rosters,
    tradedPicks,
    draft,
    teams,
    tradyrPicks,
    fantasyCalc,
    dynastyPicks,
  });
  for (const team of teams) {
    team.picks = pickAssets.filter(
      (pick) => pick.ownerRosterID === team.rosterID,
    );
    team.pickAssets = team.picks.reduce(
      (sum, pick) => sum + pick.consensusValue,
      0,
    );
  }
  rankTeams(teams, "pickAssets");

  const positionTotals = Object.fromEntries(
    ["QB", "RB", "WR", "TE"].map((position) => [
      position,
      teams.map((team) =>
        team.players
          .filter((player) => player.position === position)
          .sort((a, b) => b.consensusValue - a.consensusValue)
          .slice(0, position === "QB" || position === "TE" ? 2 : 4)
          .reduce((sum, player) => sum + player.consensusValue, 0),
      ),
    ]),
  );
  const leagueMedians = Object.fromEntries(
    Object.entries(positionTotals).map(([position, totals]) => {
      const sorted = [...totals].sort((a, b) => a - b);
      return [
        position,
        (sorted[Math.floor((sorted.length - 1) / 2)] +
          sorted[Math.ceil((sorted.length - 1) / 2)]) /
          2,
      ];
    }),
  );

  const leagueChain = await getLeagueChain(league, 3);
  const historicalTrades = await getHistoricalTrades(leagueChain);
  const profiles = buildTradeProfiles(
    leagueChain,
    historicalTrades,
    playerPositions,
  );
  for (const team of teams) {
    team.direction = classifyDirection(team, teams.length);
    team.directionFit = directionFit(team.direction);
    const needs = ["QB", "RB", "WR", "TE"]
      .map((position) => {
        const index = teams.findIndex(
          (candidate) => candidate.rosterID === team.rosterID,
        );
        const ratio = leagueMedians[position]
          ? positionTotals[position][index] / leagueMedians[position]
          : 1;
        return { position, score: round(clamp(1.35 - ratio, 0, 1), 2) };
      })
      .sort((a, b) => b.score - a.score);
    team.needs = needs.filter((need) => need.score >= 0.18);
    team.surpluses = [...needs]
      .reverse()
      .filter((need) => need.score <= 0.05)
      .map((need) => need.position);
    const profile = profiles[team.ownerID] || {
      trades: 0,
      initiated: 0,
      picksAcquired: 0,
      picksSent: 0,
      playersAcquired: 0,
      positionsAcquired: {},
    };
    const historicalPickBias =
      (profile.picksAcquired + 1) /
      (profile.picksAcquired + profile.picksSent + 2);
    const holdingsBias = clamp(
      team.pickAssetsRank <= 4 ? 0.7 : team.pickAssetsRank >= 9 ? 0.3 : 0.5,
      0,
      1,
    );
    team.pickBias = round(historicalPickBias * 0.7 + holdingsBias * 0.3, 2);
    team.tradeProfile = {
      ...profile,
      label: describeTradeProfile(profile, team.pickBias),
      sampleSize: profile.trades,
    };
    team.assets = [...team.players, ...team.picks].sort(
      (a, b) => b.consensusValue - a.consensusValue,
    );
    delete team.players;
    delete team.picks;
  }

  const sourceMeta = [
    {
      name: "Tradyr",
      available: tradyrSource.available,
      role: "KTC + FantasyCalc composite and pick market",
      updatedAt: tradyrSource.available
        ? tradyrSource.data.meta?.generatedAt
        : null,
      url: "https://tradyr.app",
    },
    {
      name: "FantasyCalc",
      available: fantasySource.available,
      role: "Values, trends, volatility, and real-trade market signals",
      updatedAt: new Date().toISOString(),
      url: "https://fantasycalc.com",
    },
    {
      name: "DynastyProcess",
      available: dynastySource.available,
      role: "Open-source expert consensus values",
      updatedAt: dynastyValues[0]?.scrape_date || null,
      url: "https://github.com/DynastyProcess/data",
    },
    {
      name: "Sleeper",
      available: true,
      role: `${historicalTrades.length} completed league trades plus live rosters, settings, and pick ownership`,
      updatedAt: new Date().toISOString(),
      url: "https://sleeper.com",
    },
  ];

  return json(
    {
      meta: {
        leagueName: league.name,
        leagueID,
        format: `${teamCount}-team · ${numQbs === 2 ? "Superflex" : "1QB"} · ${ppr === 1 ? "Full PPR" : ppr === 0.5 ? "Half PPR" : "Standard"}`,
        season: league.season,
        generatedAt: new Date().toISOString(),
        tradeHistoryCount: historicalTrades.length,
        sources: sourceMeta,
        disclaimer:
          "Acceptance likelihoods and manager profiles are AI-model opinions, not statements from league managers or guarantees that an offer will be accepted.",
      },
      teams,
    },
    {
      headers: {
        "cache-control":
          "public, max-age=300, s-maxage=1800, stale-while-revalidate=86400",
      },
    },
  );
}
