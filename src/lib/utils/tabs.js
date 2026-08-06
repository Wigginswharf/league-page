import { leagueID } from "$lib/utils/leagueInfo";

export const tabs = [
  {
    icon: "home",
    label: "Home",
    dest: "/",
  },
  {
    icon: "event",
    label: "Season",
    nest: true,
    children: [
      {
        icon: "local_fire_department",
        label: "Matchups",
        dest: "/matchups",
      },
      {
        icon: "leaderboard",
        label: "Standings",
        dest: "/standings",
      },
      {
        icon: "storage",
        label: "Rosters",
        dest: "/rosters",
      },
      {
        icon: "swap_horiz",
        label: "Transactions",
        dest: "/transactions",
      },
      {
        icon: "view_comfy",
        label: "Draft Center",
        dest: "/drafts",
      },
    ],
  },
  {
    icon: "handshake",
    label: "Trade Lab",
    dest: "/trade-lab",
  },
  {
    icon: "groups",
    label: "Managers",
    dest: "/managers",
  },
  {
    icon: "newspaper",
    label: "Dynasty Wire",
    dest: "/news",
  },
  {
    icon: "emoji_events",
    label: "History",
    nest: true,
    children: [
      {
        icon: "emoji_events",
        label: "League History",
        dest: "/awards",
      },
      {
        icon: "military_tech",
        label: "Record Book",
        dest: "/records",
      },
    ],
  },
  {
    icon: "shield",
    label: "League Hub",
    nest: true,
    children: [
      {
        icon: "history_edu",
        label: "Constitution",
        dest: "/constitution",
      },
      {
        icon: "lightbulb",
        label: "Resources",
        dest: "/resources",
      },
      {
        icon: "article",
        label: "League Blog",
        dest: "/blog",
        blog: true,
      },
      {
        icon: "sports_football",
        label: "Open Sleeper",
        dest: `https://sleeper.app/leagues/${leagueID}`,
        external: true,
      },
    ],
  },
];
