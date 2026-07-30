import { json } from '@sveltejs/kit';
import { leagueID } from '$lib/utils/leagueInfo';

const FANTASYCALC_URL = 'https://api.fantasycalc.com/values/current?isDynasty=true&numQbs=1&numTeams=12&ppr=1';
const FLEX_POSITIONS = new Set(['RB', 'WR', 'TE']);
const PICK_VALUES = { 1: 5000, 2: 2500, 3: 1200, 4: 500 };

const fetchJSON = async (url) => {
    const response = await fetch(url, { compress: true });
    if(!response.ok) throw new Error(`Ratings source returned ${response.status}`);
    return response.json();
};

const ordinal = (rank) => {
    const lastTwo = rank % 100;
    if(lastTwo >= 11 && lastTwo <= 13) return `${rank}th`;
    if(rank % 10 === 1) return `${rank}st`;
    if(rank % 10 === 2) return `${rank}nd`;
    if(rank % 10 === 3) return `${rank}rd`;
    return `${rank}th`;
};

const formatPlayerNames = (names) => {
    if(names.length <= 1) return names[0] || 'its best young players';
    if(names.length === 2) return `${names[0]} and ${names[1]}`;
    return `${names.slice(0, -1).join(', ')}, and ${names.at(-1)}`;
};

const rankTeams = (teams, field) => {
    [...teams]
        .sort((a, b) => b[field] - a[field])
        .forEach((team, index) => {
            team[`${field}Rank`] = index + 1;
        });
};

const eligibleForSlot = (position, slot) => {
    if(slot === 'FLEX' || slot === 'WRRB_FLEX' || slot === 'REC_FLEX') {
        return FLEX_POSITIONS.has(position);
    }
    if(slot === 'SUPER_FLEX') return FLEX_POSITIONS.has(position) || position === 'QB';
    return position === slot;
};

const optimalLineupValue = (playerIDs, values, rosterPositions) => {
    const players = playerIDs
        .map((id) => values.get(String(id)))
        .filter(Boolean);
    const used = new Set();
    let value = 0;

    const slots = rosterPositions
        .filter((slot) => !['BN', 'IR', 'TAXI', 'K', 'DEF', 'DL', 'DB', 'LB', 'IDP_FLEX'].includes(slot))
        .sort((a, b) => Number(a.includes('FLEX')) - Number(b.includes('FLEX')));

    for(const slot of slots) {
        const candidate = players
            .filter((player) => !used.has(player.id) && eligibleForSlot(player.position, slot))
            .sort((a, b) => b.redraftValue - a.redraftValue)[0];
        if(!candidate) continue;
        used.add(candidate.id);
        value += candidate.redraftValue;
    }

    const depthValue = players
        .filter((player) => !used.has(player.id))
        .sort((a, b) => b.redraftValue - a.redraftValue)
        .slice(0, 5)
        .reduce((sum, player) => sum + player.redraftValue, 0) * 0.2;

    return Math.round(value + depthValue);
};

const calculatePickValues = (rosters, tradedPicks, season, rounds = 3) => {
    const currentSeason = Number(season);
    const assets = [];

    for(let year = currentSeason; year <= currentSeason + 2; year++) {
        for(const roster of rosters) {
            for(let round = 1; round <= rounds; round++) {
                assets.push({
                    season: String(year),
                    round,
                    originalOwner: roster.roster_id,
                    owner: roster.roster_id,
                });
            }
        }
    }

    for(const tradedPick of tradedPicks) {
        const asset = assets.find((pick) =>
            pick.season === String(tradedPick.season)
            && pick.round === Number(tradedPick.round)
            && pick.originalOwner === Number(tradedPick.roster_id)
        );
        if(asset) asset.owner = Number(tradedPick.owner_id);
    }

    const totals = Object.fromEntries(rosters.map((roster) => [roster.roster_id, 0]));
    for(const asset of assets) {
        const yearsOut = Number(asset.season) - currentSeason;
        const discount = yearsOut === 0 ? 1 : yearsOut === 1 ? 0.85 : 0.7;
        totals[asset.owner] += (PICK_VALUES[asset.round] || 250) * discount;
    }
    return totals;
};

const getDefendingChampionOwner = async (previousLeagueID) => {
    if(!previousLeagueID) return null;
    try {
        const [bracket, rosters] = await Promise.all([
            fetchJSON(`https://api.sleeper.app/v1/league/${previousLeagueID}/winners_bracket`),
            fetchJSON(`https://api.sleeper.app/v1/league/${previousLeagueID}/rosters`),
        ]);
        const championship = bracket.find((matchup) => matchup.p === 1 && matchup.w);
        return rosters.find((roster) => roster.roster_id === championship?.w)?.owner_id || null;
    } catch(error) {
        console.warn('Unable to identify defending champion', error);
        return null;
    }
};

export async function GET() {
    const [league, rosters, tradedPicks, fantasyCalcValues] = await Promise.all([
        fetchJSON(`https://api.sleeper.app/v1/league/${leagueID}`),
        fetchJSON(`https://api.sleeper.app/v1/league/${leagueID}/rosters`),
        fetchJSON(`https://api.sleeper.app/v1/league/${leagueID}/traded_picks`),
        fetchJSON(FANTASYCALC_URL),
    ]);

    const defendingChampionOwner = await getDefendingChampionOwner(league.previous_league_id);
    const values = new Map(
        fantasyCalcValues
            .filter((entry) => entry.player?.sleeperId)
            .map((entry) => [String(entry.player.sleeperId), {
                id: String(entry.player.sleeperId),
                name: entry.player.name,
                age: Number(entry.player.maybeAge || 0),
                position: entry.player.position,
                dynastyValue: Number(entry.value || 0),
                redraftValue: Number(entry.redraftValue || 0),
            }])
    );
    const pickValues = calculatePickValues(
        rosters,
        tradedPicks,
        league.season,
        Math.min(Number(league.settings?.draft_rounds || 3), 4)
    );

    const teams = rosters.map((roster) => {
        const playerValues = (roster.players || [])
            .map((id) => values.get(String(id)))
            .filter(Boolean);
        const dynastyPlayerValue = playerValues.reduce((sum, player) => sum + player.dynastyValue, 0);
        const draftAssetValue = Math.round(pickValues[roster.roster_id] || 0);
        return {
            rosterID: roster.roster_id,
            ownerID: roster.owner_id,
            defendingChampion: roster.owner_id === defendingChampionOwner,
            currentStrength: optimalLineupValue(roster.players || [], values, league.roster_positions),
            playerAssets: Math.round(dynastyPlayerValue),
            draftAssets: draftAssetValue,
            futureStrength: Math.round(dynastyPlayerValue + draftAssetValue),
            cornerstones: [...playerValues]
                .sort((a, b) => b.dynastyValue - a.dynastyValue)
                .slice(0, 3)
                .map((player) => player.name),
            youngCornerstones: [...playerValues]
                .filter((player) => player.age && player.age <= 25.5)
                .sort((a, b) => b.dynastyValue - a.dynastyValue)
                .slice(0, 2)
                .map((player) => player.name),
            veteranTradeCandidate: [...playerValues]
                .filter((player) => player.age >= 29 && player.position !== 'QB')
                .sort((a, b) => b.dynastyValue - a.dynastyValue)[0]?.name || null,
        };
    });

    rankTeams(teams, 'currentStrength');
    rankTeams(teams, 'playerAssets');
    rankTeams(teams, 'draftAssets');
    rankTeams(teams, 'futureStrength');
    for(const team of teams) {
        team.windowScore = ((13 - team.currentStrengthRank) * 0.65) + ((13 - team.futureStrengthRank) * 0.35);
    }
    rankTeams(teams, 'windowScore');

    const updatedAt = new Date().toISOString();
    const directions = {};
    for(const team of teams) {
        let category;
        if(
            (team.defendingChampion && team.currentStrengthRank <= 8 && team.futureStrengthRank <= 5)
            || (team.currentStrengthRank <= 3 && team.futureStrengthRank <= 4)
        ) {
            category = 'Elite Contender';
        } else if(
            team.currentStrengthRank <= 6
            || (team.futureStrengthRank <= 4 && team.currentStrengthRank <= 10)
        ) {
            category = 'Contender';
        } else if(
            (team.currentStrengthRank >= 11 && team.futureStrengthRank >= 7)
            || (team.currentStrengthRank >= 10 && team.futureStrengthRank >= 10)
        ) {
            category = 'Rebuilding';
        } else {
            category = 'Retooling';
        }

        const cornerstoneNames = formatPlayerNames(team.cornerstones);
        const youngCornerstoneNames = formatPlayerNames(team.youngCornerstones);
        const draftAssetsText = team.draftAssetsRank <= 4
            ? ' There are enough draft picks available to stay patient or make a move when the right player becomes available.'
            : team.draftAssetsRank <= 8
                ? ' The pick supply is workable, but the manager should be selective about spending it.'
                : ' The pick cupboard is light, so another future pick should only be moved for someone who clearly changes this team’s outlook.';
        const championText = team.defendingChampion
            ? ' This group has already shown it can finish the job by winning last season.'
            : '';
        let overview;
        if(category === 'Elite Contender') {
            overview = `${cornerstoneNames} give this roster the star power to chase a championship right now. The manager should protect that foundation and focus on dependable depth instead of making a major shake-up.${draftAssetsText}${championText}`;
        } else if(category === 'Contender') {
            overview = `${cornerstoneNames} give this roster a real path to the playoffs. This team does not need an overhaul, but one more weekly starter or a little extra depth could turn it into a serious title threat.${draftAssetsText}${championText}`;
        } else if(category === 'Rebuilding') {
            const veteranDecision = team.veteranTradeCandidate
                ? ` ${team.veteranTradeCandidate} can still help a contender, so the manager should listen if someone offers a useful pick or a younger player.`
                : '';
            overview = `${youngCornerstoneNames} are the young players this manager should be patient with. The rest of the roster needs time, so chasing short-term wins would only delay the rebuild.${veteranDecision}${draftAssetsText}${championText}`;
        } else {
            const veteranDecision = team.veteranTradeCandidate
                ? ` If the team starts slowly, ${team.veteranTradeCandidate} is the veteran to consider shopping before the trade market cools.`
                : ' The manager should keep the main pieces together and look for one or two starters who can make the team steadier each week.';
            overview = `${cornerstoneNames} are good enough reasons not to tear this roster down.${veteranDecision}${draftAssetsText}${championText}`;
        }

        directions[team.rosterID] = {
            category,
            playerAssets: `${ordinal(team.playerAssetsRank)} of ${teams.length}`,
            draftAssets: `${ordinal(team.draftAssetsRank)} of ${teams.length}`,
            overview,
            summary: overview,
            updatedAt,
            automated: true,
        };
    }

    return json({
        directions,
        updatedAt,
        source: 'Sleeper rosters and picks + FantasyCalc 1QB PPR values',
    }, {
        headers: {
            'cache-control': 'public, max-age=900, s-maxage=3600, stale-while-revalidate=86400',
        },
    });
}
