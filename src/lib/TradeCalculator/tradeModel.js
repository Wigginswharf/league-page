const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const round = (value) => Math.round(value);

const teamByID = (teams, rosterID) =>
  teams.find((team) => Number(team.rosterID) === Number(rosterID));
const isPick = (asset) => asset.type === "pick";
const isYoung = (asset) =>
  asset.type === "player" && asset.age && asset.age <= 25.5;
const isVeteran = (asset) =>
  asset.type === "player" && asset.age && asset.age >= 28;
const withArticle = (phrase) =>
  `${/^[aeiou]/i.test(phrase) ? "an" : "a"} ${phrase}`;
const listNames = (assets, fallback = "the offered assets") => {
  const names = assets.slice(0, 3).map((asset) => asset.name);
  if (!names.length) return fallback;
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names[0]}, ${names[1]}, and ${names[2]}`;
};

const PLAYER_SITUATIONS = {
  "Isaiah Likely": {
    text: "The Giants view Isaiah Likely as a potential top pass-catching tight end, and John Harbaugh already knows him from Baltimore",
    sourceLabel: "Giants.com role outlook",
    sourceUrl:
      "https://www.giants.com/news/20-questions-in-20-days-veteran-newcomers-to-know",
  },
};

const needScore = (team, position) =>
  team.needs?.find((need) => need.position === position)?.score || 0;

const protectsRosterStar = (asset, team) =>
  asset.type === "player" &&
  asset.position === "RB" &&
  asset.nflTeam &&
  asset.nflTeam !== "FA" &&
  team.assets.some(
    (teammate) =>
      teammate.id !== asset.id &&
      teammate.type === "player" &&
      teammate.position === "RB" &&
      teammate.nflTeam === asset.nflTeam &&
      teammate.consensusValue > asset.consensusValue * 1.3,
  );

const rosterSynergies = (team, sent, received) => {
  const sentIDs = new Set(sent.map((asset) => asset.id));
  const returningRoster = team.assets.filter(
    (asset) => asset.type === "player" && !sentIDs.has(asset.id),
  );
  const handcuffs = received
    .filter((asset) => asset.type === "player" && asset.position === "RB")
    .map((asset) => {
      const lead = returningRoster
        .filter(
          (rostered) =>
            rostered.position === "RB" &&
            rostered.nflTeam &&
            rostered.nflTeam !== "FA" &&
            rostered.nflTeam === asset.nflTeam &&
            rostered.consensusValue > asset.consensusValue * 1.3,
        )
        .sort((a, b) => b.consensusValue - a.consensusValue)[0];
      return lead ? { handcuff: asset, lead } : null;
    })
    .filter(Boolean);
  return {
    handcuffs,
    bonus: handcuffs.reduce(
      (sum, pairing) =>
        sum + Math.min(pairing.handcuff.consensusValue * 0.18, 40),
      0,
    ),
  };
};

const pickUpgrade = (sent, received) => {
  const sentPicks = sent.filter(isPick);
  for (const incoming of received.filter(isPick)) {
    const outgoing = sentPicks.find(
      (pick) =>
        pick.season === incoming.season &&
        pick.round === incoming.round &&
        pick.slot > incoming.slot,
    );
    if (outgoing) return { incoming, outgoing };
  }
  return null;
};

const managerAdjustedValue = (asset, team, receiving) => {
  let multiplier = 1;
  if (isPick(asset)) {
    multiplier += (team.pickBias - 0.5) * (receiving ? 0.32 : 0.24);
    if (team.direction === "Rebuilding") multiplier += receiving ? 0.1 : 0.07;
    if (team.direction === "Elite Contender")
      multiplier -= receiving ? 0.05 : 0;
  } else {
    multiplier += needScore(team, asset.position) * (receiving ? 0.16 : 0.08);
    if (["Elite Contender", "Contender"].includes(team.direction)) {
      const winNowLift = clamp(
        (asset.redraftValue - asset.consensusValue * 0.65) / 1000,
        -0.08,
        0.12,
      );
      multiplier += receiving ? winNowLift : winNowLift * 0.5;
      if (isVeteran(asset)) multiplier += receiving ? 0.03 : 0.02;
    }
    if (team.direction === "Rebuilding") {
      if (isYoung(asset)) multiplier += receiving ? 0.1 : 0.06;
      if (isVeteran(asset)) multiplier -= receiving ? 0.08 : 0.04;
    }
  }
  return asset.consensusValue * clamp(multiplier, 0.72, 1.3);
};

const consolidationPenalty = (sent, received) => {
  if (sent.length !== 1 || received.length < 2) return 0;
  const star = sent[0]?.consensusValue || 0;
  const bestReturn = Math.max(
    ...received.map((asset) => asset.consensusValue),
    0,
  );
  return star >= 650 && bestReturn < star * 0.72 ? 12 : 0;
};

const confidenceFor = (assets, team) => {
  const coverage = assets.length
    ? assets.reduce((sum, asset) => sum + (asset.sourceCoverage || 1), 0) /
      assets.length
    : 1;
  const sample = team.tradeProfile?.sampleSize || 0;
  if (coverage >= 2.7 && sample >= 5) return "High";
  if (coverage >= 2 && sample >= 2) return "Medium";
  return "Low";
};

const acceptanceLabel = (likelihood) => {
  if (likelihood >= 78) return "Strong chance";
  if (likelihood >= 60) return "Good chance";
  if (likelihood >= 43) return "Worth sending";
  if (likelihood >= 25) return "Tough sell";
  return "Very unlikely";
};

const bestNeedFromAssets = (team, assets) =>
  [...assets]
    .filter((asset) => asset.type === "player")
    .sort(
      (a, b) => needScore(team, b.position) - needScore(team, a.position),
    )[0];

const rejectionReason = ({ team, sent, received, ratio, penalty }) => {
  if (!sent.length)
    return `${team.shortName} is not giving anything up, so this side is incomplete.`;
  if (!received.length)
    return `${team.shortName} receives nothing in the current construction.`;
  if (penalty)
    return `${team.shortName} is being asked to turn a premium asset into several smaller pieces without receiving another cornerstone.`;
  if (ratio < 0.82)
    return `${team.shortName} is giving up too much of the consensus market value for the current return.`;
  if (team.pickBias >= 0.65 && sent.some(isPick) && !received.some(isPick))
    return `${team.shortName}'s completed-trade history suggests future picks need to be replaced with a meaningful premium.`;
  if (
    team.direction === "Rebuilding" &&
    sent.some(isYoung) &&
    received.some(isVeteran)
  )
    return `${team.shortName}'s rebuilding timeline makes an older return difficult to justify.`;
  if (
    ["Elite Contender", "Contender"].includes(team.direction) &&
    sent.some((asset) => asset.type === "player") &&
    received.every(isPick)
  )
    return `${team.shortName} is positioned to compete and may not want to exchange current production entirely for future value.`;
  return `${team.shortName} may still ask for a small sweetener because managers rarely accept a deal that only looks neutral from their side.`;
};

const valueReason = (team, ratio) => {
  if (ratio < 0.82)
    return `${team.shortName} is giving up more value than is needed for this return. The idea may help the roster, but this version should be trimmed or expanded on the other side.`;
  if (ratio < 0.94)
    return `${team.shortName} is paying a noticeable premium. That can be reasonable for the right lineup upgrade, but there is room to ask for another useful piece.`;
  if (ratio <= 1.12)
    return `${team.shortName} is giving up an appropriate amount for the return, with no obvious overpay built into this side.`;
  return `${team.shortName} is receiving the stronger value package, so the main risk is whether the other manager has enough incentive to accept.`;
};

const impactText = (team, sent, received, synergy) => {
  const acquiredNeed = bestNeedFromAssets(team, received);
  const picksNet = received.filter(isPick).length - sent.filter(isPick).length;
  const upgrade = pickUpgrade(sent, received);
  if (synergy.handcuffs.length) {
    const { handcuff, lead } = synergy.handcuffs[0];
    const pickSentence = upgrade
      ? ` The deal also moves ${team.shortName} from ${upgrade.outgoing.name} to ${upgrade.incoming.name}.`
      : "";
    return `${handcuff.name} gives ${team.shortName} direct backfield insurance behind ${lead.name} in ${handcuff.nflTeam}.${pickSentence}`;
  }
  if (upgrade)
    return `${team.shortName} moves from ${upgrade.outgoing.name} to ${upgrade.incoming.name}, improving the quality of the pick without changing the roster's overall direction.`;
  if (acquiredNeed && needScore(team, acquiredNeed.position) >= 0.25) {
    return `${acquiredNeed.name} directly addresses ${team.shortName}'s ${acquiredNeed.position} need and better matches ${withArticle(team.direction.toLowerCase())} roster.`;
  }
  if (picksNet > 0)
    return `The extra draft capital gives ${team.shortName} more flexibility without forcing an immediate change in team direction.`;
  if (picksNet < 0 && ["Elite Contender", "Contender"].includes(team.direction))
    return `${team.shortName} spends future flexibility to improve the current competitive window.`;
  return `The move changes the asset mix but probably leaves ${team.shortName} in the ${team.direction.toLowerCase()} lane.`;
};

const suggestAdjustment = (team, selectedTeams, transfers, shortfall) => {
  if (shortfall <= 30)
    return "The value is close; a direct conversation may matter more than adding another asset.";
  const alreadyUsed = new Set(transfers.map((transfer) => transfer.asset.id));
  const candidates = selectedTeams
    .filter((candidate) => candidate.rosterID !== team.rosterID)
    .flatMap((candidate) =>
      candidate.assets.map((asset) => ({ asset, owner: candidate })),
    )
    .filter(({ asset }) => !alreadyUsed.has(asset.id))
    .filter(({ asset }) => {
      if (team.pickBias >= 0.62) return isPick(asset) || isYoung(asset);
      const primaryNeed = team.needs?.[0]?.position;
      return asset.position === primaryNeed || isPick(asset);
    })
    .sort(
      (a, b) =>
        Math.abs(a.asset.consensusValue - shortfall) -
        Math.abs(b.asset.consensusValue - shortfall),
    );
  const suggestion = candidates[0];
  if (!suggestion)
    return `Add roughly ${round(shortfall)} consensus-value points in a form that fits ${team.shortName}'s roster direction.`;
  return `The cleanest improvement is adding ${suggestion.asset.name} from ${suggestion.owner.shortName}'s pool or a similarly valued asset.`;
};

const rosterContingency = (team, sent) => {
  const sentIDs = new Set(sent.map((asset) => asset.id));
  const options = sent
    .filter((asset) => asset.type === "player")
    .flatMap((outgoing) =>
      team.assets
        .filter(
          (candidate) =>
            candidate.type === "player" &&
            !sentIDs.has(candidate.id) &&
            candidate.position === outgoing.position,
        )
        .map((replacement) => ({
          outgoing,
          replacement,
          situation: PLAYER_SITUATIONS[replacement.name],
          score:
            replacement.consensusValue / Math.max(outgoing.consensusValue, 1) +
            (PLAYER_SITUATIONS[replacement.name] ? 2 : 0),
        })),
    )
    .sort((a, b) => b.score - a.score);
  const best = options[0];
  if (!best) return null;
  const base = best.situation
    ? `${best.situation.text}. That gives ${team.shortName} a credible ${best.outgoing.position} fallback if ${best.outgoing.name} is moved.`
    : `${best.replacement.name} remains on the roster as ${team.shortName}'s clearest ${best.outgoing.position} fallback if ${best.outgoing.name} is moved.`;
  return {
    outgoing: best.outgoing,
    replacement: best.replacement,
    text: base,
    sourceLabel: best.situation?.sourceLabel || null,
    sourceUrl: best.situation?.sourceUrl || null,
  };
};

const perspectiveVerdict = (team, evaluations, selectedTeams, transfers) => {
  if (!team) return null;
  const evaluation = evaluations.find(
    (candidate) => candidate.rosterID === team.rosterID,
  );
  if (!evaluation) return null;
  const ratio = evaluation.sentValue
    ? evaluation.receivedValue / evaluation.sentValue
    : 1;
  const difference = evaluation.sentValue - evaluation.receivedValue;
  const alreadyUsed = new Set(transfers.map((transfer) => transfer.asset.id));
  const sentPositions = new Set(
    evaluation.sent
      .filter((asset) => asset.type === "player")
      .map((asset) => asset.position),
  );
  const partners = selectedTeams.filter(
    (candidate) => candidate.rosterID !== team.rosterID,
  );
  const availableAdditions = partners
    .flatMap((partner) => partner.assets.map((asset) => ({ asset, partner })))
    .filter(({ asset }) => !alreadyUsed.has(asset.id))
    .filter(({ asset }) => asset.consensusValue >= 35);
  const positionAdditions = availableAdditions.filter(({ asset }) =>
    sentPositions.has(asset.position),
  );
  const additions = (
    positionAdditions.length ? positionAdditions : availableAdditions
  )
    .map((candidate) => ({
      ...candidate,
      score:
        Math.abs(candidate.asset.consensusValue - Math.max(difference, 45)) -
        (sentPositions.has(candidate.asset.position) ? 55 : 0) -
        (candidate.asset.type === "player" && candidate.asset.age <= 26.5
          ? 18
          : 0) -
        Math.max(candidate.asset.trend30Day || 0, 0) * 0.05 +
        Math.max(-(candidate.asset.trend30Day || 0), 0) * 0.08 +
        (isVeteran(candidate.asset) ? 45 : 0),
    }))
    .sort((a, b) => a.score - b.score);
  const addition = additions[0];
  const contingency = rosterContingency(team, evaluation.sent);

  if (ratio < 0.82) {
    return {
      tone: "overpay",
      headline: "You are giving up more value than is needed",
      summary: `${partners.map((partner) => partner.shortName).join(" and ")} may like this construction, but ${team.shortName} is carrying too much of the deal. The trade can solve a roster need without paying this full premium.`,
      counter: addition
        ? `Ask ${addition.partner.shortName} to add ${addition.asset.name}, or remove one of your secondary pieces before sending it.`
        : "Remove one of your secondary pieces or ask for another useful asset before sending it.",
      contingency,
    };
  }
  if (ratio < 0.94) {
    return {
      tone: "premium",
      headline: "You are paying a premium, but the idea is defensible",
      summary: `The return helps ${team.shortName}, but the current version still leans toward ${partners.map((partner) => partner.shortName).join(" and ")}.`,
      counter: addition
        ? `Try asking for ${addition.asset.name} as the final piece, or send the offer expecting a counter.`
        : "Try trimming a smaller outgoing piece before sending it.",
      contingency,
    };
  }
  if (ratio <= 1.12) {
    return {
      tone: "balanced",
      headline: "This works for your roster at a reasonable price",
      summary: `${team.shortName} is giving up an appropriate amount for the return and the move fits the current roster direction.`,
      counter:
        "This is close enough to send without manufacturing another piece.",
      contingency,
    };
  }
  return {
    tone: "advantage",
    headline: "The value favors you",
    summary: `${team.shortName} improves its side of the deal, but the other manager may need a better reason to accept it.`,
    counter: addition
      ? `${addition.asset.name} is the type of piece the other side may request in a counter.`
      : "Expect the other manager to ask for a sweetener.",
    contingency,
  };
};

export const evaluateTrade = (teams, transfers, perspectiveRosterID = null) => {
  const involvedIDs = [
    ...new Set(
      transfers.flatMap((transfer) => [
        Number(transfer.fromRosterID),
        Number(transfer.toRosterID),
      ]),
    ),
  ];
  const selectedTeams = involvedIDs
    .map((id) => teamByID(teams, id))
    .filter(Boolean);
  const evaluations = selectedTeams.map((team) => {
    const sent = transfers
      .filter((transfer) => Number(transfer.fromRosterID) === team.rosterID)
      .map((transfer) => transfer.asset);
    const received = transfers
      .filter((transfer) => Number(transfer.toRosterID) === team.rosterID)
      .map((transfer) => transfer.asset);
    const synergy = rosterSynergies(team, sent, received);
    const sentValue = sent.reduce(
      (sum, asset) => sum + managerAdjustedValue(asset, team, false),
      0,
    );
    const receivedValue =
      received.reduce(
        (sum, asset) => sum + managerAdjustedValue(asset, team, true),
        0,
      ) + synergy.bonus;
    const ratio = sentValue
      ? receivedValue / sentValue
      : receivedValue
        ? 1.4
        : 0;
    const penalty = consolidationPenalty(sent, received);
    const activityLift =
      team.tradeProfile?.trades >= 5
        ? 4
        : team.tradeProfile?.trades === 0
          ? -3
          : 0;
    const likelihood = round(
      clamp(
        50 + Math.log(Math.max(ratio, 0.08)) * 55 - penalty + activityLift,
        4,
        94,
      ),
    );
    const topReturn = listNames(
      [...received].sort((a, b) => b.consensusValue - a.consensusValue),
    );
    const needAsset = bestNeedFromAssets(team, received);
    const positionReplacement = received.find(
      (incoming) =>
        incoming.type === "player" &&
        sent.some(
          (outgoing) =>
            outgoing.type === "player" &&
            outgoing.position === incoming.position,
        ),
    );
    const fitSentence = synergy.handcuffs.length
      ? `${synergy.handcuffs[0].handcuff.name} gives this roster direct insurance behind ${synergy.handcuffs[0].lead.name}.`
      : positionReplacement
        ? `${positionReplacement.name} replaces the ${positionReplacement.position} depth leaving in the deal without forcing a roster reset.`
        : needAsset && needScore(team, needAsset.position) >= 0.45
          ? `${needAsset.name} helps at ${needAsset.position}, one of this roster's clearest needs.`
          : `The return is judged against ${team.shortName}'s ${team.direction.toLowerCase()} timeline.`;
    const shortfall = Math.max(0, sentValue - receivedValue);
    return {
      rosterID: team.rosterID,
      managerName: team.managerName,
      shortName: team.shortName,
      teamName: team.teamName,
      direction: team.direction,
      profile: team.tradeProfile?.label,
      likelihood,
      label: acceptanceLabel(likelihood),
      confidence: confidenceFor([...sent, ...received], team),
      sent,
      received,
      sentValue: round(sentValue),
      receivedValue: round(receivedValue),
      explanation: `${team.shortName} receives ${topReturn}. ${fitSentence} This is an AI opinion informed by the league's completed trades, current roster, draft-pick holdings, and the multi-source market.`,
      rejectionReason: rejectionReason({
        team,
        sent,
        received,
        ratio,
        penalty,
      }),
      valueReason: valueReason(team, ratio),
      adjustment: suggestAdjustment(team, selectedTeams, transfers, shortfall),
      impact: impactText(team, sent, received, synergy),
      isPerspective:
        Number(team.rosterID) === Number(perspectiveRosterID ?? -1),
    };
  });
  const overall = evaluations.length
    ? Math.min(...evaluations.map((evaluation) => evaluation.likelihood))
    : 0;
  return {
    overall,
    label: acceptanceLabel(overall),
    evaluations,
    perspective: perspectiveVerdict(
      teamByID(teams, perspectiveRosterID),
      evaluations,
      selectedTeams,
      transfers,
    ),
    complete:
      evaluations.length >= 2 &&
      evaluations.every(
        (evaluation) => evaluation.sent.length && evaluation.received.length,
      ),
  };
};

const bestPackage = (
  assets,
  targetValue,
  recipient,
  target,
  sender,
  maxAssets = 3,
) => {
  const candidates = assets
    .filter((asset) => asset.consensusValue >= 35)
    .sort((a, b) => b.consensusValue - a.consensusValue);
  const packages = [];
  for (let first = 0; first < candidates.length; first++) {
    packages.push([candidates[first]]);
    for (let second = first + 1; second < candidates.length; second++) {
      packages.push([candidates[first], candidates[second]]);
      if (maxAssets >= 3) {
        for (
          let third = second + 1;
          third < Math.min(candidates.length, second + 6);
          third++
        ) {
          packages.push([
            candidates[first],
            candidates[second],
            candidates[third],
          ]);
        }
      }
    }
  }
  return (
    packages
      .map((assetsInPackage) => ({
        assets: assetsInPackage,
        value: assetsInPackage.reduce(
          (sum, asset) => sum + managerAdjustedValue(asset, recipient, true),
          0,
        ),
        fitPenalty:
          (assetsInPackage.length - 1) * targetValue * 0.16 +
          (recipient.direction === "Rebuilding"
            ? assetsInPackage.filter(isVeteran).length * targetValue * 0.1
            : 0) -
          (target?.type === "player" &&
          assetsInPackage.some(
            (asset) =>
              asset.type === "player" && asset.position === target.position,
          )
            ? targetValue * 0.06
            : 0) +
          assetsInPackage
            .filter((asset) => protectsRosterStar(asset, sender))
            .reduce(
              (penalty, asset) =>
                penalty + Math.min(asset.consensusValue * 0.28, 45),
              0,
            ),
      }))
      .filter(
        (candidate) =>
          candidate.value >= targetValue * 0.78 &&
          candidate.value <= targetValue * 1.38,
      )
      .sort(
        (a, b) =>
          Math.abs(a.value - targetValue * 1.03) +
          a.fitPenalty -
          (Math.abs(b.value - targetValue * 1.03) + b.fitPenalty),
      )[0]?.assets || []
  );
};

const buildTargetProposal = (myTeam, partner, target, teams) => {
  const offered = bestPackage(
    myTeam.assets,
    managerAdjustedValue(target, partner, false),
    partner,
    target,
    myTeam,
  );
  if (!offered.length) return null;
  const transfers = [
    ...offered.map((asset) => ({
      asset,
      fromRosterID: myTeam.rosterID,
      toRosterID: partner.rosterID,
    })),
    {
      asset: target,
      fromRosterID: partner.rosterID,
      toRosterID: myTeam.rosterID,
    },
  ];
  return {
    target,
    partner,
    offered,
    transfers,
    result: evaluateTrade(teams, transfers, myTeam.rosterID),
  };
};

export const generateTradeForPlayer = (myRosterID, teams, playerID) => {
  const myTeam = teamByID(teams, myRosterID);
  if (!myTeam) return null;
  const partner = teams.find(
    (team) =>
      team.rosterID !== myTeam.rosterID &&
      team.assets.some(
        (asset) => asset.type === "player" && asset.id === playerID,
      ),
  );
  const target = partner?.assets.find(
    (asset) => asset.type === "player" && asset.id === playerID,
  );
  return partner && target
    ? buildTargetProposal(myTeam, partner, target, teams)
    : null;
};

export const generateTargets = (myRosterID, teams, position) => {
  const myTeam = teamByID(teams, myRosterID);
  if (!myTeam) return [];
  return teams
    .filter((team) => team.rosterID !== myTeam.rosterID)
    .flatMap((team) =>
      team.assets
        .filter(
          (asset) => asset.type === "player" && asset.position === position,
        )
        .slice(0, 5)
        .map((target) => ({ team, target })),
    )
    .map(({ team, target }) => buildTargetProposal(myTeam, team, target, teams))
    .filter(Boolean)
    .sort(
      (a, b) =>
        b.result.overall - a.result.overall ||
        b.target.consensusValue - a.target.consensusValue,
    )
    .slice(0, 8);
};

export const generateThreeTeamTrades = (myRosterID, teams, position) => {
  const myTeam = teamByID(teams, myRosterID);
  if (!myTeam) return [];
  const proposals = [];
  for (const targetTeam of teams.filter(
    (team) => team.rosterID !== myTeam.rosterID,
  )) {
    const targets = targetTeam.assets
      .filter((asset) => asset.type === "player" && asset.position === position)
      .slice(0, 3);
    for (const thirdTeam of teams.filter(
      (team) =>
        team.rosterID !== myTeam.rosterID &&
        team.rosterID !== targetTeam.rosterID,
    )) {
      const thirdNeed = thirdTeam.needs?.[0]?.position;
      const targetNeed = targetTeam.needs?.[0]?.position;
      const myAsset =
        myTeam.assets
          .filter(
            (asset) => asset.type === "player" && asset.position === thirdNeed,
          )
          .sort((a, b) => b.consensusValue - a.consensusValue)[0] ||
        myTeam.assets.find(isPick);
      const thirdAsset =
        thirdTeam.assets
          .filter(
            (asset) => asset.type === "player" && asset.position === targetNeed,
          )
          .sort((a, b) => b.consensusValue - a.consensusValue)[0] ||
        thirdTeam.assets.find(isPick);
      for (const target of targets) {
        if (!myAsset || !thirdAsset) continue;
        const values = [
          myAsset.consensusValue,
          thirdAsset.consensusValue,
          target.consensusValue,
        ];
        if (Math.max(...values) > Math.min(...values) * 1.75) continue;
        const transfers = [
          {
            asset: myAsset,
            fromRosterID: myTeam.rosterID,
            toRosterID: thirdTeam.rosterID,
          },
          {
            asset: thirdAsset,
            fromRosterID: thirdTeam.rosterID,
            toRosterID: targetTeam.rosterID,
          },
          {
            asset: target,
            fromRosterID: targetTeam.rosterID,
            toRosterID: myTeam.rosterID,
          },
        ];
        proposals.push({
          target,
          targetTeam,
          thirdTeam,
          transfers,
          result: evaluateTrade(teams, transfers, myTeam.rosterID),
        });
      }
    }
  }
  return proposals
    .sort((a, b) => b.result.overall - a.result.overall)
    .slice(0, 5);
};
