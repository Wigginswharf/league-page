<script>
  import { goto } from "$app/navigation";
  import {
    getDatesActive,
    getRosterIDFromManagerID,
    getTeamNameFromTeamManagers,
  } from "$lib/utils/helperFunctions/universalFunctions";
  import { dynasty } from "$lib/utils/leagueInfo";
  import TeamDirectionBadge from "./TeamDirectionBadge.svelte";
  import { buildManagerLegacy } from "$lib/utils/leagueHistory";

  export let manager,
    leagueTeamManagers,
    key,
    liveDirection = null,
    awards = [];

  let retired = false;

  // manager.roster is deprecated, pages should be using managerID now
  let rosterID = manager.roster;
  let year = null;

  if (manager.managerID) {
    const dates = getDatesActive(leagueTeamManagers, manager.managerID);
    if (dates.end) retired = true;

    ({ rosterID, year } = getRosterIDFromManagerID(
      leagueTeamManagers,
      manager.managerID
    ) || { rosterID, year });
  }

  const commissioner = manager.managerID
    ? leagueTeamManagers.users[manager.managerID].is_owner
    : false;
  $: teamDirection =
    liveDirection ||
    (manager.direction
      ? { category: manager.direction, summary: "Approved fallback rating" }
      : null);
  $: legacy = buildManagerLegacy({ manager, awards, leagueTeamManagers });
</script>

<div
  class="manager"
  style={retired
    ? "background-image: url(/retired.png); background-color: var(--ddd)"
    : ""}
  on:click={() => goto(`/manager?manager=${key}`)}
>
  <div class="avatarHolder">
    <img class="photo" src={manager.photo} alt={manager.name} />
    {#if commissioner}
      <div class="commissionerBadge">
        <span>C</span>
      </div>
    {/if}
  </div>
  <div class="name">{manager.name}</div>
  <div class="team">
    {getTeamNameFromTeamManagers(leagueTeamManagers, rosterID, year)}
  </div>
  <div class="spacer" />
  <div class="info">
    <div
      class:emptySlot={!legacy.titles}
      class="infoSlot titleSlot"
      title={legacy.titles
        ? `${legacy.titles} league championship${legacy.titles === 1 ? '' : 's'}: ${legacy.championshipYears.join(', ')}`
        : undefined}
    >
      {#if legacy.titles}
        <div
          class="infoIcon titleIcon"
          aria-label="{legacy.titles} league championship{legacy.titles === 1
            ? ''
            : 's'}"
        >
          ★
        </div>
        <div class="infoAnswer">
          {legacy.titles} Title{legacy.titles === 1 ? "" : "s"}
        </div>
      {:else}
        <div class="infoIcon" aria-hidden="true"></div>
        <div class="infoAnswer" aria-hidden="true">&nbsp;</div>
      {/if}
    </div>
    <!-- Favorite team (optional) -->
    <div class:emptySlot={!manager.favoriteTeam} class="infoSlot infoTeam">
      {#if manager.favoriteTeam}
        <div class="infoIcon">
          <img
            class="infoImg"
            src="https://sleepercdn.com/images/team_logos/nfl/{manager.favoriteTeam}.png"
            alt="favorite team"
          />
        </div>
        <div class="infoAnswer iconLabel">NFL Team</div>
      {:else}
        <div class="infoIcon" aria-hidden="true"></div>
        <div class="infoAnswer" aria-hidden="true">&nbsp;</div>
      {/if}
    </div>
    <!-- Preferred contact -->
    {#if manager.preferredContact}
      <div class="infoSlot contactSlot">
        <div class="infoIcon">
          <img
            class="infoImg"
            src="/{manager.preferredContact}.png"
            alt={manager.preferredContact}
          />
        </div>
        <div class="infoAnswer">
          {manager.preferredContact}
        </div>
      </div>
    {/if}
    <!-- Live team direction (falls back to the approved static rating) -->
    <div class:emptySlot={!(dynasty && teamDirection)} class="infoSlot infoRebuild">
      {#if dynasty && teamDirection}
        <div class="infoIcon directionIcon">
          <TeamDirectionBadge
            category={teamDirection.category}
            summary={teamDirection.summary}
            playerAssets={teamDirection.playerAssets}
            draftAssets={teamDirection.draftAssets}
            overview={teamDirection.overview}
          />
        </div>
        <div class="infoAnswer">
          {teamDirection.category}
        </div>
      {:else}
        <div class="infoIcon" aria-hidden="true"></div>
        <div class="infoAnswer" aria-hidden="true">&nbsp;</div>
      {/if}
    </div>
    <!-- Featured rival -->
    <div class:emptySlot={!manager.rival} class="infoSlot rivalSlot">
      {#if manager.rival}
        <button
          class="rivalButton"
          type="button"
          aria-label="View {manager.rival.name}, featured rival"
          aria-describedby="rival-summary-{key}"
          on:click|stopPropagation={() =>
            goto(`/manager?manager=${manager.rival.link}`)}
        >
          <img
            class="rivalPhoto"
            src={manager.rival.image}
            alt={manager.rival.name}
          />
        </button>
        <div class="infoAnswer">Rival</div>
        <div class="rivalTooltip" id="rival-summary-{key}" role="tooltip">
          <strong>{manager.rival.name} — {manager.rival.record}</strong>
          {manager.rival.note}
        </div>
      {:else}
        <div class="infoIcon" aria-hidden="true"></div>
        <div class="infoAnswer" aria-hidden="true">&nbsp;</div>
      {/if}
    </div>
  </div>
</div>

<style>
  .manager {
    display: flex;
    justify-content: left;
    align-items: center;
    padding: 1em 0;
    background-color: var(--fff);
    background-repeat: no-repeat;
    background-position: 15% 50%;
    margin: 0.5em 0;
    border-radius: 2em;
    border: 1px solid var(--ccc);
    box-shadow: 0 0 6px 0 var(--bbb);
    cursor: pointer;
  }

  .manager:hover {
    box-shadow: 0 0 10px 0 bar(--g999);
    background-color: bar(--eee);
  }

  .photo {
    height: 40px;
    width: 40px;
    border-radius: 100%;
    vertical-align: middle;
    margin-left: 1em;
    box-shadow: 0 0 2px 1px var(--bbb);
  }

  .name {
    text-align: center;
    display: inline-block;
    color: var(--g555);
    line-height: 1.2em;
    margin-left: 1em;
    font-weight: 700;
  }

  .team {
    text-align: center;
    display: inline-block;
    font-style: italic;
    line-height: 1.2em;
    color: var(--g555);
    font-weight: 300;
    margin-left: 1em;
  }

  .spacer {
    flex-grow: 1;
  }

  .info {
    display: flex;
  }

  .infoSlot {
    text-align: center;
    margin: 0 0.5em;
    width: 63px;
  }

  .emptySlot {
    visibility: hidden;
  }

  .infoIcon {
    display: inline-flex;
    height: 40px;
    width: 40px;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    border: 1px solid #ccc;
    overflow: hidden;
    background-color: var(--fff);
  }

  .infoImg {
    height: 30px;
  }

  .directionIcon {
    border: 0;
    overflow: visible;
    background: transparent;
  }

  .infoAnswer {
    font-size: 0.8em;
    color: var(--g555);
    width: 63px;
    text-align: center;
    line-height: 1.2em;
  }

  .avatarHolder {
    display: inline-flex;
    position: relative;
  }

  .commissionerBadge {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: -10px;
    right: -10px;
    height: 25px;
    width: 25px;
    font-weight: 600;
    border-radius: 15px;
    background-color: var(--blueTwo);
    border: 1px solid var(--blueOne);
    color: #fff;
  }

  @media (max-width: 665px) {
    .name {
      font-size: 0.9em;
      margin-left: 0.5em;
    }

    .team {
      font-size: 0.8em;
      margin-left: 0.5em;
    }
  }

  @media (max-width: 595px) {
    .manager {
      padding: 0.5em 0;
      margin: 0.3em 0;
      border-radius: 1.5em;
    }

    .photo {
      height: 30px;
      width: 30px;
      margin-left: 0.5em;
    }

    .infoSlot {
      text-align: center;
      margin: 0 0.4em;
      width: 56px;
    }

    .infoIcon {
      height: 30px;
      width: 30px;
    }

    .infoImg {
      height: 25px;
    }

    .infoAnswer {
      font-size: 0.7em;
      width: 56px;
    }
  }

  @media (max-width: 475px) {
    .name {
      font-size: 0.8em;
      margin-left: 0.4em;
    }

    .team {
      font-size: 0.7em;
      margin-left: 0.4em;
    }

    .photo {
      height: 25px;
      width: 25px;
    }

    .infoSlot {
      text-align: center;
      margin: 0 0.4em;
      width: 49px;
    }

    .infoIcon {
      height: 25px;
      width: 25px;
    }

    .infoImg {
      height: 22px;
    }

    .infoAnswer {
      font-size: 0.6em;
      width: 49px;
    }
  }

  @media (max-width: 370px) {
    .infoTeam {
      display: none;
    }
  }

  .rivalSlot {
    position: relative;
  }

  .titleSlot {
    min-width: 49px;
  }

  .titleIcon {
    border-color: #d6ad36;
    background: #fff8dc;
    color: #9a7415;
    font-size: 1.25rem;
    font-weight: 900;
  }

  .rivalButton {
    display: inline-flex;
    height: 40px;
    width: 40px;
    padding: 0;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    border: 1px solid var(--ccc);
    overflow: visible;
    background-color: var(--fff);
    cursor: pointer;
  }

  .rivalPhoto {
    height: 100%;
    width: 100%;
    border-radius: 100%;
    object-fit: cover;
  }

  .rivalTooltip {
    position: absolute;
    z-index: 10;
    right: 0;
    bottom: calc(100% + 10px);
    width: 230px;
    padding: 0.8em 1em;
    border: 1px solid var(--ccc);
    border-radius: 0.75em;
    box-shadow: 0 4px 12px var(--bbb);
    background: var(--fff);
    color: var(--g555);
    font-size: 0.8em;
    line-height: 1.4em;
    text-align: left;
    opacity: 0;
    visibility: hidden;
    transform: translateY(4px);
    transition: opacity 0.15s ease, transform 0.15s ease, visibility 0.15s;
    pointer-events: none;
  }

  .rivalTooltip strong {
    display: block;
    margin-bottom: 0.25em;
    color: var(--blueOne);
  }

  .rivalSlot:hover .rivalTooltip,
  .rivalSlot:focus-within .rivalTooltip {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  @media (max-width: 595px) {
    .rivalButton {
      height: 30px;
      width: 30px;
    }
  }

  @media (max-width: 475px) {
    .rivalButton {
      height: 25px;
      width: 25px;
    }

    .rivalTooltip {
      position: fixed;
      right: 1em;
      bottom: 1em;
      left: 1em;
      width: auto;
    }
  }

  /* League card treatment */
  .manager {
    background-color: var(--surface-raised);
    border: 1px solid var(--line);
    border-radius: var(--radius-lg);
    box-shadow: var(--league-shadow-soft);
    margin: 0.75rem 0;
    padding: 1rem 0.8rem;
    position: relative;
    transition: border-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease;
  }

  .manager::before {
    background: var(--league-blue);
    border-radius: var(--radius-lg) 0 0 var(--radius-lg);
    content: "";
    inset: 0 auto 0 0;
    position: absolute;
    width: 4px;
  }

  .manager:hover {
    background-color: var(--surface-raised);
    border-color: rgba(8, 120, 209, 0.4);
    box-shadow: var(--league-shadow);
    transform: translateY(-2px);
  }

  .photo {
    border: 3px solid var(--surface-raised);
    box-shadow: 0 0 0 2px rgba(8, 120, 209, 0.22);
    height: 48px;
    object-fit: cover;
    width: 48px;
  }

  .name {
    color: var(--text-primary);
    font-size: 1rem;
  }

  .team,
  .infoAnswer {
    color: var(--text-muted);
  }

  .infoIcon,
  .rivalButton {
    background-color: var(--surface-muted);
    border-color: var(--line);
  }

  .commissionerBadge {
    background: var(--league-gold);
    border: 2px solid var(--surface-raised);
    color: #071a33;
  }

  .rivalTooltip {
    background: var(--surface-raised);
    border-color: var(--line);
    box-shadow: var(--league-shadow);
    color: var(--text-muted);
  }

  @media (max-width: 595px) {
    .manager {
      align-items: center;
      border-radius: 14px;
      display: grid;
      gap: 0.15rem 0.7rem;
      grid-template-areas:
        "avatar name"
        "avatar team"
        "info info";
      grid-template-columns: 44px minmax(0, 1fr);
      padding: 0.85rem;
    }

    .manager::before {
      border-radius: 14px 0 0 14px;
    }

    .avatarHolder {
      grid-area: avatar;
      justify-self: center;
    }

    .photo {
      height: 38px;
      margin-left: 0;
      width: 38px;
    }

    .name {
      font-size: 0.95rem;
      grid-area: name;
      line-height: 1.15;
      margin-left: 0;
      min-width: 0;
      overflow-wrap: anywhere;
      text-align: left;
    }

    .team {
      font-size: 0.78rem;
      grid-area: team;
      line-height: 1.15;
      margin-left: 0;
      min-width: 0;
      text-align: left;
    }

    .spacer {
      display: none;
    }

    .info {
      align-items: start;
      border-top: 1px solid var(--line);
      display: grid;
      gap: 0.25rem;
      grid-area: info;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      margin-top: 0.7rem;
      padding-top: 0.7rem;
      width: 100%;
    }

    .infoSlot {
      align-items: start;
      display: grid;
      grid-template-rows: 44px minmax(1.55rem, auto);
      justify-items: center;
      margin: 0;
      min-width: 0;
      width: auto;
    }

    .infoIcon,
    .rivalButton {
      align-self: center;
    }

    .infoAnswer {
      grid-row: 2;
    }

    .titleSlot {
      grid-column: 1;
    }

    .infoTeam {
      display: grid;
      grid-column: 2;
    }

    .infoRebuild {
      grid-column: 3;
    }

    .rivalSlot {
      grid-column: 4;
    }

    .contactSlot {
      display: none;
    }

    .infoIcon,
    .rivalButton {
      height: 36px;
      width: 36px;
    }

    .infoImg {
      height: 28px;
      max-width: 30px;
      object-fit: contain;
    }

    .directionIcon {
      height: 44px;
      width: 40px;
    }

    .infoAnswer {
      font-size: 0.68rem;
      line-height: 1.15;
      min-height: 1.55rem;
      overflow-wrap: anywhere;
      width: 100%;
    }

    .commissionerBadge {
      bottom: -7px;
      height: 20px;
      right: -7px;
      width: 20px;
    }
  }
</style>
