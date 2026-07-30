<script>
  import LinearProgress from "@smui/linear-progress";
  import { Records } from "$lib/components";
  import HistoryNav from "$lib/History/HistoryNav.svelte";
  import ManagerLegacies from "$lib/History/ManagerLegacies.svelte";
  import { managers } from "$lib/utils/leagueInfo";

  export let data;
  const recordsInfo = data.recordsInfo;
</script>

<div id="main">
  <header class="historyHeader">
    <div class="eyebrow">The League Archive</div>
    <h1>Legacies & Records</h1>
    <p class="intro">
      Manager careers and the league record book now live together, with every
      number tied back to the people who earned it.
    </p>
    <HistoryNav active="League Records" />
  </header>
  {#await recordsInfo}
    <!-- promise is pending -->
    <div class="loading">
      <p>Loading league records...</p>
      <LinearProgress indeterminate />
    </div>
  {:then [leagueData, { totals, stale }, leagueTeamManagers, awards]}
    <section id="manager-legacies">
      <h2>Manager Legacies</h2>
      <p class="sectionIntro">
        Championships lead the order, followed by finals, playoff wins, and
        regular-season wins.
      </p>
      <ManagerLegacies
        {managers}
        {awards}
        records={leagueData}
        {leagueTeamManagers}
      />
    </section>
    <section id="record-book">
      <h2>League Record Book</h2>
      <p class="sectionIntro">
        Explore all-time and single-season marks across the regular season and
        playoffs.
      </p>
      <Records {leagueData} {totals} {stale} {leagueTeamManagers} />
    </section>
  {:catch error}
    <!-- promise was rejected -->
    <p>Something went wrong: {error.message}</p>
  {/await}
</div>

<style>
  #main {
    position: relative;
    z-index: 1;
    width: 95%;
    max-width: 1200px;
    margin: 0 auto 5rem;
  }
  .loading {
    display: block;
    width: 85%;
    max-width: 500px;
    margin: 80px auto;
  }

  .historyHeader {
    margin: 3rem auto 0;
    text-align: center;
  }

  .eyebrow {
    color: var(--blueOne);
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }

  h1 {
    margin: 0.35rem 0 0.5rem;
    color: var(--g555);
    font-size: clamp(2rem, 6vw, 3.4rem);
    line-height: 1;
  }

  .intro {
    max-width: 680px;
    margin: 0 auto;
    color: var(--g777);
    line-height: 1.6;
  }

  h2 {
    margin: 3.5rem 0 0.25rem;
    color: var(--g555);
    font-size: 1.6rem;
  }

  .sectionIntro {
    margin: 0;
    color: var(--g777);
  }
</style>
