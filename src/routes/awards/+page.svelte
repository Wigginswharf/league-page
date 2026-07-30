<script>
  import { Awards } from "$lib/components";
  import { waitForAll } from "$lib/utils/helper";
  import LinearProgress from "@smui/linear-progress";
  import HistoryNav from "$lib/History/HistoryNav.svelte";
  import HallOfChampions from "$lib/History/HallOfChampions.svelte";
  import { managers } from "$lib/utils/leagueInfo";

  export let data;
  const { awardsData, teamManagersData } = data;
</script>

<div class="awards">
  <header class="historyHeader">
    <div class="eyebrow">Tommy and 11 Losers</div>
    <h1>League History</h1>
    <p class="intro">
      Every championship, podium finish, division crown, and season
      honor—connected to the managers who earned them.
    </p>
    <HistoryNav active="Champions & Awards" />
  </header>
  {#await waitForAll(awardsData, teamManagersData)}
    <div class="loading">
      <p>Retrieving awards data...</p>
      <LinearProgress indeterminate />
    </div>
  {:then [podiums, leagueTeamManagers]}
    <section id="champions">
      <h2>Hall of Champions</h2>
      <p class="sectionIntro">
        The complete title history, newest champion first.
      </p>
      <HallOfChampions {podiums} {managers} {leagueTeamManagers} />
    </section>
    <section id="season-awards">
      <h2>Season Awards</h2>
      <p class="sectionIntro">
        Full podiums, division winners, and Toilet Bowl honors for every
        completed season.
      </p>
      {#each podiums as podium}
        <Awards {podium} {leagueTeamManagers} />
      {:else}
        <p class="nothingYet">
          No seasons have been completed yet, so no awards have been earned...
        </p>
      {/each}
    </section>
  {:catch error}
    <!-- promise was rejected -->
    <p>Something went wrong: {error.message}</p>
  {/await}
</div>

<style>
  .awards {
    display: block;
    margin: 30px auto;
    width: 95%;
    max-width: 1000px;
    position: relative;
    z-index: 1;
    overflow-y: hidden;
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
    max-width: 650px;
    margin: 0 auto;
    color: var(--g777);
    line-height: 1.6;
  }

  h2 {
    margin: 3rem 0 0.25rem;
    color: var(--g555);
    font-size: 1.6rem;
  }

  .sectionIntro {
    margin: 0 0 1.5rem;
    color: var(--g777);
  }

  .loading {
    display: block;
    width: 85%;
    max-width: 500px;
    margin: 80px auto;
  }

  .nothingYet {
    display: block;
    width: 85%;
    max-width: 500px;
    margin: 80px auto;
    text-align: center;
  }
</style>
