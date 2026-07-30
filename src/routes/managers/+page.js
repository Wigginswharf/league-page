import {
  getLeagueTeamManagers,
  getAwards,
  waitForAll,
  managers,
} from "$lib/utils/helper";

export async function load() {
  if (!managers.length) return { managers };
  const managersInfo = waitForAll(getLeagueTeamManagers(), getAwards());

  const props = {
    managers,
    managersInfo,
  };

  return props;
}
