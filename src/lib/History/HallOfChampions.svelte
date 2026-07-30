<script>
  import { goto } from "$app/navigation";
  import {
    managerDisplayName,
    managerForRoster,
  } from "$lib/utils/leagueHistory";

  export let podiums = [];
  export let managers = [];
  export let leagueTeamManagers;

  const profileLink = (manager) =>
    managers.findIndex(
      (candidate) => candidate.managerID === manager?.managerID
    );
  const championFor = (podium) =>
    managerForRoster(
      managers,
      leagueTeamManagers,
      podium.champion,
      podium.year
    );
  const runnerUpFor = (podium) =>
    managerForRoster(managers, leagueTeamManagers, podium.second, podium.year);
  const openManager = (manager) => {
    const index = profileLink(manager);
    if (index > -1) goto(`/manager?manager=${index}`);
  };
</script>

<div class="timeline">
  {#each podiums as podium}
    <article class="season">
      <div class="year">{podium.year} Season</div>
      <div
        class="champion"
        role="link"
        tabindex="0"
        on:click={() => openManager(championFor(podium))}
        on:keydown={(event) =>
          event.key === "Enter" && openManager(championFor(podium))}
      >
        <img
          src={championFor(podium)?.photo || "/managers/question.jpg"}
          alt={managerDisplayName(championFor(podium))}
        />
        <div>
          <div class="championLabel">League Champion</div>
          <div class="championName">
            {managerDisplayName(championFor(podium))}
          </div>
        </div>
      </div>
      <div
        class="runnerUp"
        role="link"
        tabindex="0"
        on:click={() => openManager(runnerUpFor(podium))}
        on:keydown={(event) =>
          event.key === "Enter" && openManager(runnerUpFor(podium))}
      >
        <img
          src={runnerUpFor(podium)?.photo || "/managers/question.jpg"}
          alt={managerDisplayName(runnerUpFor(podium))}
        />
        <div>
          <div class="runnerLabel">Runner-up</div>
          <div class="runnerName">
            {managerDisplayName(runnerUpFor(podium))}
          </div>
        </div>
      </div>
    </article>
  {/each}
</div>

<style>
  .timeline {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(235px, 1fr));
    gap: 1rem;
    margin: 1.5rem 0 3rem;
  }

  .season {
    position: relative;
    overflow: hidden;
    min-height: 230px;
    padding: 1.25rem;
    border: 1px solid var(--ccc);
    border-radius: 1.25rem;
    background: linear-gradient(145deg, var(--fff), var(--eee));
    box-shadow: 0 5px 14px var(--boxShadowOne);
  }

  .year {
    color: var(--blueOne);
    font-size: 0.8rem;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .champion {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    margin: 1rem 0 1.1rem;
    cursor: pointer;
  }

  .champion img {
    width: 74px;
    height: 74px;
    border: 3px solid #d6ad36;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 0 0 4px rgba(214, 173, 54, 0.18);
  }

  .championLabel {
    color: #9a7415;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .championName {
    margin-top: 0.2rem;
    color: var(--g555);
    font-size: 1.3rem;
    font-weight: 800;
    line-height: 1.1;
  }

  .runnerUp {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    padding-top: 0.85rem;
    border-top: 1px solid var(--ccc);
    color: var(--g555);
    cursor: pointer;
  }

  .runnerUp img {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    object-fit: cover;
  }

  .runnerLabel {
    color: var(--g999);
    font-size: 0.68rem;
    font-weight: 700;
    text-transform: uppercase;
  }

  .runnerName {
    font-size: 0.92rem;
    font-weight: 700;
  }
</style>
