<script>
  import { goto } from "$app/navigation";
  import { buildManagerLegacy } from "$lib/utils/leagueHistory";

  export let manager;
  export let awards = [];
  export let records;
  export let leagueTeamManagers;

  $: legacy = buildManagerLegacy({
    manager,
    awards,
    records,
    leagueTeamManagers,
  });
</script>

<section class="snapshot">
  <div class="header">
    <h3>Legacy Snapshot</h3>
    <button type="button" on:click={() => goto("/records#manager-legacies")}
      >Full league history →</button
    >
  </div>
  <div class="stats">
    <div class="stat titles">
      <div class="value">{legacy.titles}</div>
      <div class="label">Championships</div>
    </div>
    <div class="stat">
      <div class="value">{legacy.finals}</div>
      <div class="label">Finals</div>
    </div>
    <div class="stat">
      <div class="value">{legacy.playoffWins}–{legacy.playoffLosses}</div>
      <div class="label">Playoff Record</div>
    </div>
    <div class="stat">
      <div class="value">{legacy.regularWins}–{legacy.regularLosses}</div>
      <div class="label">Regular Season</div>
    </div>
  </div>
  {#if legacy.championshipYears.length}
    <div class="years">
      Championship seasons: {legacy.championshipYears.join(", ")}
    </div>
  {/if}
</section>

<style>
  .snapshot {
    width: 94%;
    max-width: 800px;
    margin: 2.5rem auto 3rem;
    padding: 1.25rem;
    border: 1px solid var(--ccc);
    border-radius: 1.2rem;
    background: linear-gradient(145deg, var(--fff), var(--eee));
    box-shadow: 0 4px 12px var(--boxShadowOne);
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  h3 {
    margin: 0;
    color: var(--g555);
    font-size: 1.25rem;
    font-weight: 800;
  }

  button {
    border: 0;
    background: transparent;
    color: var(--blueOne);
    font: inherit;
    font-size: 0.78rem;
    font-weight: 800;
    cursor: pointer;
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.7rem;
  }

  .stat {
    padding: 0.9rem 0.5rem;
    border-radius: 0.8rem;
    background: var(--fff);
    text-align: center;
  }

  .value {
    color: var(--blueOne);
    font-size: 1.35rem;
    font-weight: 900;
  }

  .titles .value {
    color: #9a7415;
  }

  .label {
    margin-top: 0.2rem;
    color: var(--g999);
    font-size: 0.68rem;
    font-weight: 700;
    line-height: 1.2;
    text-transform: uppercase;
  }

  .years {
    margin-top: 0.9rem;
    color: var(--g555);
    font-size: 0.78rem;
    text-align: center;
  }

  @media (max-width: 560px) {
    .stats {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
