<script>
  import { goto } from "$app/navigation";
  import { buildLeagueLegacies } from "$lib/utils/leagueHistory";

  export let managers = [];
  export let awards = [];
  export let records;
  export let leagueTeamManagers;

  $: legacies = buildLeagueLegacies({
    managers,
    awards,
    records,
    leagueTeamManagers,
  });
  let sortKey = "titles";
  let sortDirection = "desc";

  const sortValues = {
    manager: (legacy) => legacy.name,
    titles: (legacy) => legacy.titles,
    finals: (legacy) => legacy.finals,
    playoffRecord: (legacy) => legacy.playoffWins,
    regularSeason: (legacy) => legacy.regularWins,
    winPct: (legacy) => legacy.regularWinPct,
    points: (legacy) => legacy.regularPoints,
  };

  const setSort = (key) => {
    if (sortKey === key) {
      sortDirection = sortDirection === "asc" ? "desc" : "asc";
      return;
    }

    sortKey = key;
    sortDirection = key === "manager" ? "asc" : "desc";
  };

  const compareLegacies = (a, b) => {
    const aValue = sortValues[sortKey](a);
    const bValue = sortValues[sortKey](b);
    let comparison;

    if (typeof aValue === "string") {
      comparison = aValue.localeCompare(bValue, undefined, {
        sensitivity: "base",
      });
    } else {
      comparison = aValue - bValue;
    }

    if (comparison !== 0) {
      return sortDirection === "asc" ? comparison : -comparison;
    }

    if (sortKey === "titles") {
      for (const tieBreaker of ["finals", "playoffWins", "regularWins"]) {
        const tieComparison = a[tieBreaker] - b[tieBreaker];
        if (tieComparison !== 0) {
          return sortDirection === "asc" ? tieComparison : -tieComparison;
        }
      }
    }

    return a.name.localeCompare(b.name, undefined, {
      sensitivity: "base",
    });
  };

  $: sortedLegacies = [...legacies].sort(compareLegacies);

  const ariaSort = (key) =>
    sortKey === key
      ? sortDirection === "asc"
        ? "ascending"
        : "descending"
      : "none";

  const sortIndicator = (key) =>
    sortKey === key ? (sortDirection === "asc" ? "▲" : "▼") : "↕";

  const pct = (value) => `${(value * 100).toFixed(1)}%`;
</script>

<div class="tableWrap">
  <table>
    <thead>
      <tr>
        <th aria-sort={ariaSort("manager")}>
          <button type="button" onclick={() => setSort("manager")}>
            Manager <span aria-hidden="true">{sortIndicator("manager")}</span>
          </button>
        </th>
        <th aria-sort={ariaSort("titles")}>
          <button type="button" onclick={() => setSort("titles")}>
            Titles <span aria-hidden="true">{sortIndicator("titles")}</span>
          </button>
        </th>
        <th aria-sort={ariaSort("finals")}>
          <button type="button" onclick={() => setSort("finals")}>
            Finals <span aria-hidden="true">{sortIndicator("finals")}</span>
          </button>
        </th>
        <th aria-sort={ariaSort("playoffRecord")}>
          <button type="button" onclick={() => setSort("playoffRecord")}>
            Playoff Record
            <span aria-hidden="true">{sortIndicator("playoffRecord")}</span>
          </button>
        </th>
        <th aria-sort={ariaSort("regularSeason")}>
          <button type="button" onclick={() => setSort("regularSeason")}>
            Regular Season
            <span aria-hidden="true">{sortIndicator("regularSeason")}</span>
          </button>
        </th>
        <th aria-sort={ariaSort("winPct")}>
          <button type="button" onclick={() => setSort("winPct")}>
            Win % <span aria-hidden="true">{sortIndicator("winPct")}</span>
          </button>
        </th>
        <th aria-sort={ariaSort("points")}>
          <button type="button" onclick={() => setSort("points")}>
            Points <span aria-hidden="true">{sortIndicator("points")}</span>
          </button>
        </th>
      </tr>
    </thead>
    <tbody>
      {#each sortedLegacies as legacy}
        <tr>
          <td>
            <div
              class="manager"
              role="link"
              tabindex="0"
              onclick={() => goto(`/manager?manager=${legacy.managerIndex}`)}
              onkeydown={(event) =>
                event.key === "Enter" &&
                goto(`/manager?manager=${legacy.managerIndex}`)}
            >
              <img src={legacy.manager.photo} alt={legacy.name} />
              <span>{legacy.name}</span>
            </div>
          </td>
          <td class="titles">
            {legacy.titles}
            {#if legacy.championshipYears.length}<span class="years"
                >{legacy.championshipYears.join(", ")}</span
              >{/if}
          </td>
          <td>{legacy.finals}</td>
          <td
            >{legacy.playoffWins}–{legacy.playoffLosses}{legacy.playoffTies
              ? `–${legacy.playoffTies}`
              : ""}</td
          >
          <td
            >{legacy.regularWins}–{legacy.regularLosses}{legacy.regularTies
              ? `–${legacy.regularTies}`
              : ""}</td
          >
          <td>{pct(legacy.regularWinPct)}</td>
          <td>{Math.round(legacy.regularPoints).toLocaleString()}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .tableWrap {
    overflow-x: auto;
    margin: 1.25rem 0 3rem;
    border: 1px solid var(--ccc);
    border-radius: 1rem;
    background: var(--fff);
    box-shadow: 0 4px 12px var(--boxShadowOne);
  }

  table {
    width: 100%;
    min-width: 720px;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 0.85rem 0.75rem;
    border-bottom: 1px solid var(--ddd);
    color: var(--g555);
    text-align: center;
  }

  th {
    color: var(--blueOne);
    font-size: 0.72rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  th button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    width: 100%;
    padding: 0;
    border: 0;
    background: transparent;
    color: inherit;
    font: inherit;
    letter-spacing: inherit;
    text-transform: inherit;
    cursor: pointer;
  }

  th button:hover {
    color: var(--blueTwo);
  }

  th button:focus-visible {
    border-radius: 0.25rem;
    outline: 2px solid var(--blueOne);
    outline-offset: 4px;
  }

  th button span {
    min-width: 0.8rem;
    color: var(--g999);
    font-size: 0.75em;
  }

  th[aria-sort="ascending"] button span,
  th[aria-sort="descending"] button span {
    color: var(--blueOne);
  }

  td:first-child,
  th:first-child {
    position: sticky;
    left: 0;
    z-index: 1;
    background: var(--fff);
    text-align: left;
  }

  th:first-child button {
    justify-content: flex-start;
  }

  tr:last-child td {
    border-bottom: 0;
  }

  .manager {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    min-width: 165px;
    font-weight: 800;
    cursor: pointer;
  }

  .manager img {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    object-fit: cover;
  }

  .titles {
    color: #9a7415;
    font-weight: 900;
  }

  .years {
    display: block;
    color: var(--g999);
    font-size: 0.65rem;
    font-weight: 400;
  }
</style>
