const managerEarned = (leagueTeamManagers, managerID, rosterID, year) => {
  if (!managerID || !rosterID || !year) return false;
  return (
    leagueTeamManagers?.teamManagersMap?.[year]?.[rosterID]?.managers?.includes(
      managerID
    ) || false
  );
};

export const managerDisplayName = (manager) =>
  manager?.name?.split(" AKA:")[0] || "Unknown Manager";

export const managerForRoster = (
  managers,
  leagueTeamManagers,
  rosterID,
  year
) => {
  const managerIDs =
    leagueTeamManagers?.teamManagersMap?.[year]?.[rosterID]?.managers || [];
  return (
    managers.find((manager) => managerIDs.includes(manager.managerID)) || null
  );
};

export const buildManagerLegacy = ({
  manager,
  awards = [],
  records,
  leagueTeamManagers,
}) => {
  const managerID = manager?.managerID;
  const championshipYears = [];
  const finalsYears = [];
  const thirdPlaceYears = [];
  const divisionYears = [];

  for (const podium of awards || []) {
    if (
      managerEarned(leagueTeamManagers, managerID, podium.champion, podium.year)
    ) {
      championshipYears.push(podium.year);
      finalsYears.push(podium.year);
    } else if (
      managerEarned(leagueTeamManagers, managerID, podium.second, podium.year)
    ) {
      finalsYears.push(podium.year);
    }

    if (
      managerEarned(leagueTeamManagers, managerID, podium.third, podium.year)
    ) {
      thirdPlaceYears.push(podium.year);
    }

    for (const division of podium.divisions || []) {
      if (
        managerEarned(
          leagueTeamManagers,
          managerID,
          division.rosterID,
          podium.year
        )
      ) {
        divisionYears.push(podium.year);
      }
    }
  }

  const regular =
    records?.regularSeasonData?.leagueManagerRecords?.[managerID] || {};
  const playoffs =
    records?.playoffData?.leagueManagerRecords?.[managerID] || {};
  const regularGames =
    (regular.wins || 0) + (regular.losses || 0) + (regular.ties || 0);
  const playoffGames =
    (playoffs.wins || 0) + (playoffs.losses || 0) + (playoffs.ties || 0);

  return {
    manager,
    managerID,
    name: managerDisplayName(manager),
    titles: championshipYears.length,
    championshipYears,
    finals: finalsYears.length,
    finalsYears,
    thirdPlaces: thirdPlaceYears.length,
    divisionTitles: divisionYears.length,
    regularWins: regular.wins || 0,
    regularLosses: regular.losses || 0,
    regularTies: regular.ties || 0,
    regularGames,
    regularWinPct: regularGames ? (regular.wins || 0) / regularGames : 0,
    regularPoints: regular.fptsFor || 0,
    playoffWins: playoffs.wins || 0,
    playoffLosses: playoffs.losses || 0,
    playoffTies: playoffs.ties || 0,
    playoffGames,
    playoffAppearances: playoffs.playoffAppearances || 0,
  };
};

export const buildLeagueLegacies = ({
  managers = [],
  awards = [],
  records,
  leagueTeamManagers,
}) => {
  return managers
    .filter((manager) => manager.managerID)
    .map((manager, managerIndex) => ({
      ...buildManagerLegacy({ manager, awards, records, leagueTeamManagers }),
      managerIndex,
    }))
    .sort(
      (a, b) =>
        b.titles - a.titles ||
        b.finals - a.finals ||
        b.playoffWins - a.playoffWins ||
        b.regularWins - a.regularWins
    );
};
