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
  const pct = (value) => `${(value * 100).toFixed(1)}%`;
</script>

<div class="tableWrap">
  <table>
    <thead>
      <tr>
        <th>Manager</th>
        <th>Titles</th>
        <th>Finals</th>
        <th>Playoff Record</th>
        <th>Regular Season</th>
        <th>Win %</th>
        <th>Points</th>
      </tr>
    </thead>
    <tbody>
      {#each legacies as legacy}
        <tr>
          <td>
            <div
              class="manager"
              role="link"
              tabindex="0"
              on:click={() => goto(`/manager?manager=${legacy.managerIndex}`)}
              on:keydown={(event) =>
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

  td:first-child,
  th:first-child {
    position: sticky;
    left: 0;
    z-index: 1;
    background: var(--fff);
    text-align: left;
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
