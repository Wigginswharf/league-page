<script>
  import {
    evaluateTrade,
    generateTargets,
    generateThreeTeamTrades,
  } from "./tradeModel";

  export let calculatorData;

  const { meta, teams } = calculatorData;
  let myRosterID = null;
  let teamCount = 2;
  let selectedTeamIDs = [null, null];
  let transfers = [];
  let analysis = null;
  let workspace = "builder";
  let targetPosition = "WR";
  let targetSuggestions = [];
  let threeTeamSuggestions = [];
  let sourcePanelOpen = false;

  const teamByID = (rosterID) =>
    teams.find((team) => Number(team.rosterID) === Number(rosterID));
  const selectedTeams = () => selectedTeamIDs.map(teamByID).filter(Boolean);
  const destinationOptions = (fromRosterID) =>
    selectedTeams().filter((team) => team.rosterID !== Number(fromRosterID));
  const transferFor = (asset) =>
    transfers.find((transfer) => transfer.asset.id === asset.id);
  const selectedAssetsFor = (rosterID) =>
    transfers.filter(
      (transfer) => Number(transfer.fromRosterID) === Number(rosterID),
    );

  const resetAnalysis = () => {
    analysis = null;
  };

  const initializeTeams = () => {
    selectedTeamIDs = Array(teamCount).fill(null);
    transfers = [];
    resetAnalysis();
  };

  const changeMyTeam = (event) => {
    myRosterID = Number(event.currentTarget.value);
    localStorage.setItem("trade-lab-roster", String(myRosterID));
    refreshTargets();
  };

  const setTeamCount = (count) => {
    teamCount = count;
    initializeTeams();
  };

  const changeSelectedTeam = (index, event) => {
    const nextID = Number(event.currentTarget.value);
    const previousID = selectedTeamIDs[index];
    selectedTeamIDs = selectedTeamIDs.map((id, position) =>
      position === index ? nextID : id,
    );
    transfers = transfers
      .filter(
        (transfer) =>
          !previousID ||
          (Number(transfer.fromRosterID) !== Number(previousID) &&
            Number(transfer.toRosterID) !== Number(previousID)),
      )
      .map((transfer) => {
        if (!selectedTeamIDs.includes(Number(transfer.toRosterID))) {
          return {
            ...transfer,
            toRosterID: destinationOptions(transfer.fromRosterID)[0]?.rosterID,
          };
        }
        return transfer;
      });
    resetAnalysis();
  };

  const toggleAsset = (asset, ownerRosterID) => {
    const existing = transferFor(asset);
    if (existing) {
      transfers = transfers.filter(
        (transfer) => transfer.asset.id !== asset.id,
      );
    } else {
      const destination = destinationOptions(ownerRosterID)[0];
      if (!destination) return;
      transfers = [
        ...transfers,
        {
          asset,
          fromRosterID: Number(ownerRosterID),
          toRosterID: destination.rosterID,
        },
      ];
    }
    resetAnalysis();
  };

  const changeDestination = (assetID, event) => {
    const toRosterID = Number(event.currentTarget.value);
    transfers = transfers.map((transfer) =>
      transfer.asset.id === assetID ? { ...transfer, toRosterID } : transfer,
    );
    resetAnalysis();
  };

  const analyze = () => {
    analysis = evaluateTrade(teams, transfers);
    document
      .querySelector("#trade-results")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const refreshTargets = () => {
    targetSuggestions = generateTargets(myRosterID, teams, targetPosition);
    threeTeamSuggestions = [];
  };

  const changeTargetPosition = (position) => {
    targetPosition = position;
    refreshTargets();
  };

  const buildThreeTeamSuggestions = () => {
    threeTeamSuggestions = generateThreeTeamTrades(
      myRosterID,
      teams,
      targetPosition,
    );
  };

  const loadTrade = (proposal) => {
    const IDs = [
      ...new Set(
        proposal.transfers.flatMap((transfer) => [
          Number(transfer.fromRosterID),
          Number(transfer.toRosterID),
        ]),
      ),
    ];
    teamCount = IDs.length;
    selectedTeamIDs = IDs;
    transfers = proposal.transfers;
    analysis = evaluateTrade(teams, transfers);
    workspace = "builder";
    setTimeout(
      () =>
        document
          .querySelector("#trade-builder")
          ?.scrollIntoView({ behavior: "smooth", block: "start" }),
      0,
    );
  };

  const sourceLabel = (asset) =>
    `${asset.sourceCoverage} source${asset.sourceCoverage === 1 ? "" : "s"}`;
  const teamAssetLabel = (asset) =>
    asset.type === "pick"
      ? asset.projected
        ? `${asset.name} · projected`
        : asset.name
      : `${asset.position} · ${asset.nflTeam} · age ${asset.age || "—"}`;
</script>

<svelte:head>
  <title>Trade Lab | League Page</title>
  <meta
    name="description"
    content="League-specific dynasty trade acceptance calculator and trade target finder."
  />
</svelte:head>

<main class="tradeLab">
  <header class="hero">
    <div class="eyebrow">League Intelligence</div>
    <h1>Trade Lab</h1>
    <p class="lede">
      Build the offer you would actually send. The model estimates whether each
      manager is likely to accept—not whether a generic calculator declares a
      winner.
    </p>
    <div class="heroMeta">
      <span>{meta.format}</span>
      <span>{meta.tradeHistoryCount} completed league trades studied</span>
      <span
        >{meta.sources.filter((source) => source.available).length} live data sources</span
      >
    </div>
    <div class="opinionNotice">
      <span class="material-icons" aria-hidden="true">psychology</span>
      <div>
        <strong>AI opinion, not manager testimony</strong>
        <p>{meta.disclaimer}</p>
      </div>
    </div>
  </header>

  <section class="controlBar" aria-label="Trade Lab controls">
    <div class="workspaceTabs" role="group" aria-label="Trade Lab workspace">
      <button
        class:active={workspace === "builder"}
        type="button"
        on:click={() => (workspace = "builder")}>Build a Trade</button
      >
      <button
        class:active={workspace === "targets"}
        type="button"
        on:click={() => (workspace = "targets")}>Find a Trade</button
      >
    </div>
  </section>

  {#if workspace === "builder"}
    <section class="workspace" id="trade-builder">
      <div class="sectionHeading">
        <div>
          <span class="step">01</span>
          <h2>Choose the negotiating table</h2>
          <p>
            Select two managers for a standard deal or three for controlled
            chaos.
          </p>
        </div>
        <div class="teamCountToggle" role="group" aria-label="Number of teams">
          <button
            class:active={teamCount === 2}
            type="button"
            on:click={() => setTeamCount(2)}>2 Teams</button
          >
          <button
            class:active={teamCount === 3}
            type="button"
            on:click={() => setTeamCount(3)}>3 Teams</button
          >
        </div>
      </div>

      <div class:threeTeams={teamCount === 3} class="teamColumns">
        {#each selectedTeamIDs as rosterID, index}
          {@const team = teamByID(rosterID)}
          {#if team}
            <article class="teamColumn">
              <div class="teamHeader">
                <img src={team.avatar} alt="" />
                <div>
                  <span class="teamNumber">Team {index + 1}</span>
                  <select
                    aria-label={`Select team ${index + 1}`}
                    value={team.rosterID}
                    on:change={(event) => changeSelectedTeam(index, event)}
                  >
                    <option value="" disabled>Select a manager</option>
                    {#each teams.filter((candidate) => !selectedTeamIDs.includes(candidate.rosterID) || candidate.rosterID === team.rosterID) as candidate}
                      <option value={candidate.rosterID}
                        >{candidate.managerName} · {candidate.teamName}</option
                      >
                    {/each}
                  </select>
                </div>
                <span class="direction">{team.direction}</span>
              </div>

              <div class="managerRead">
                <strong>{team.tradeProfile.label}</strong>
                <span>
                  {team.needs?.[0]
                    ? `Primary need: ${team.needs[0].position}`
                    : "No major positional weakness"}
                </span>
              </div>

              <div class="assetSection">
                <div class="assetTitle">
                  <h3>Players</h3>
                  <span
                    >{team.assets.filter((asset) => asset.type === "player")
                      .length}</span
                  >
                </div>
                <div class="assetList">
                  {#each team.assets.filter((asset) => asset.type === "player") as asset}
                    {@const selected = transfers.some(
                      (transfer) => transfer.asset.id === asset.id,
                    )}
                    <button
                      type="button"
                      aria-pressed={selected}
                      class:selected
                      class="assetRow"
                      on:click={() => toggleAsset(asset, team.rosterID)}
                    >
                      <span
                        class="material-icons selectionIcon"
                        aria-hidden="true"
                        >{selected
                          ? "check_box"
                          : "check_box_outline_blank"}</span
                      >
                      <span class="position">{asset.position}</span>
                      <span class="assetIdentity">
                        <strong>{asset.name}</strong>
                        <small>{teamAssetLabel(asset)}</small>
                      </span>
                      <span class="value">{sourceLabel(asset)}</span>
                    </button>
                  {/each}
                </div>
              </div>

              <div class="assetSection pickSection">
                <div class="assetTitle">
                  <h3>Draft picks</h3>
                  <span
                    >{team.assets.filter((asset) => asset.type === "pick")
                      .length}</span
                  >
                </div>
                <div class="assetList picks">
                  {#each team.assets.filter((asset) => asset.type === "pick") as asset}
                    {@const selected = transfers.some(
                      (transfer) => transfer.asset.id === asset.id,
                    )}
                    <button
                      type="button"
                      aria-pressed={selected}
                      class:selected
                      class="assetRow"
                      on:click={() => toggleAsset(asset, team.rosterID)}
                    >
                      <span
                        class="material-icons selectionIcon"
                        aria-hidden="true"
                        >{selected
                          ? "check_box"
                          : "check_box_outline_blank"}</span
                      >
                      <span class="material-icons pickIcon" aria-hidden="true"
                        >event_note</span
                      >
                      <span class="assetIdentity">
                        <strong>{asset.name}</strong>
                        <small
                          >{asset.projected
                            ? "Projected range"
                            : "Known draft slot"}</small
                        >
                      </span>
                      <span class="value">{sourceLabel(asset)}</span>
                    </button>
                  {/each}
                </div>
              </div>
            </article>
          {:else}
            <article class="teamColumn emptyTeam">
              <div class="teamHeader">
                <div>
                  <span class="teamNumber">Team {index + 1}</span>
                  <select
                    aria-label={`Select team ${index + 1}`}
                    value=""
                    on:change={(event) => changeSelectedTeam(index, event)}
                  >
                    <option value="" disabled>Select a manager</option>
                    {#each teams.filter((candidate) => !selectedTeamIDs.includes(candidate.rosterID)) as candidate}
                      <option value={candidate.rosterID}
                        >{candidate.managerName} · {candidate.teamName}</option
                      >
                    {/each}
                  </select>
                </div>
              </div>
              <div class="emptyTeamPrompt">
                <span class="material-icons" aria-hidden="true"
                  >person_search</span
                >
                <strong>Choose a manager</strong>
                <p>The roster's players and draft picks will appear here.</p>
              </div>
            </article>
          {/if}
        {/each}
      </div>

      {#if transfers.length}
        <div class="tradeMap">
          <div class="sectionHeading compact">
            <div>
              <span class="step">02</span>
              <h2>Route the assets</h2>
              <p>
                For a three-team deal, choose exactly where every asset lands.
              </p>
            </div>
          </div>
          <div class="transferList">
            {#each transfers as transfer}
              <div class="transferRow">
                <span class="assetPill">{transfer.asset.name}</span>
                <span class="fromTeam"
                  >from {teamByID(transfer.fromRosterID)?.shortName}</span
                >
                <span class="material-icons arrow" aria-hidden="true"
                  >arrow_forward</span
                >
                <select
                  aria-label={`Destination for ${transfer.asset.name}`}
                  value={transfer.toRosterID}
                  on:change={(event) =>
                    changeDestination(transfer.asset.id, event)}
                >
                  {#each destinationOptions(transfer.fromRosterID) as destination}
                    <option value={destination.rosterID}
                      >{destination.shortName}</option
                    >
                  {/each}
                </select>
              </div>
            {/each}
          </div>
          <button class="analyzeButton" type="button" on:click={analyze}>
            <span class="material-icons" aria-hidden="true">psychology</span>
            Estimate Acceptance
          </button>
        </div>
      {/if}

      {#if analysis}
        <div class="results" id="trade-results">
          <div class="resultHero">
            <span>Deal likelihood</span>
            <strong>{analysis.overall}%</strong>
            <h2>{analysis.label}</h2>
            {#if !analysis.complete}
              <p class="incomplete">
                Every team must send and receive at least one asset.
              </p>
            {/if}
          </div>
          <div class="evaluationGrid">
            {#each analysis.evaluations as evaluation}
              <article class="evaluationCard">
                <div class="evaluationTop">
                  <div>
                    <span>{evaluation.teamName}</span>
                    <h3>{evaluation.shortName}</h3>
                  </div>
                  <div class="likelihood">
                    <strong>{evaluation.likelihood}%</strong>
                    <span>{evaluation.label}</span>
                  </div>
                </div>
                <div class="confidence">
                  <span>{evaluation.confidence} confidence</span>
                  <span>{evaluation.direction}</span>
                </div>
                <p>{evaluation.explanation}</p>
                <dl>
                  <div>
                    <dt>Receives</dt>
                    <dd>
                      {evaluation.received
                        .map((asset) => asset.name)
                        .join(", ") || "Nothing"}
                    </dd>
                  </div>
                  <div>
                    <dt>Sends</dt>
                    <dd>
                      {evaluation.sent.map((asset) => asset.name).join(", ") ||
                        "Nothing"}
                    </dd>
                  </div>
                </dl>
                <div class="insight rejection">
                  <span class="material-icons" aria-hidden="true"
                    >thumb_down_alt</span
                  >
                  <div>
                    <strong>Why they may reject it</strong>
                    <p>{evaluation.rejectionReason}</p>
                  </div>
                </div>
                <div class="insight adjustment">
                  <span class="material-icons" aria-hidden="true">tune</span>
                  <div>
                    <strong>How to improve the offer</strong>
                    <p>{evaluation.adjustment}</p>
                  </div>
                </div>
                <div class="insight impact">
                  <span class="material-icons" aria-hidden="true">moving</span>
                  <div>
                    <strong>Team impact</strong>
                    <p>{evaluation.impact}</p>
                  </div>
                </div>
              </article>
            {/each}
          </div>
        </div>
      {/if}
    </section>
  {:else}
    <section class="workspace targetWorkspace">
      <div class="sectionHeading">
        <div>
          <span class="step">01</span>
          <h2>What does your roster need?</h2>
          <p>
            The model searches every team and proposes offers built from real
            league assets.
          </p>
        </div>
      </div>
      <div class="findTradeTeamPicker">
        <label for="find-trade-team">Which team is yours?</label>
        <select
          id="find-trade-team"
          value={myRosterID || ""}
          on:change={changeMyTeam}
        >
          <option value="" disabled>Select your team</option>
          {#each teams as team}
            <option value={team.rosterID}
              >{team.managerName} · {team.teamName}</option
            >
          {/each}
        </select>
      </div>
      {#if myRosterID}
        <div class="positionPicker" role="group" aria-label="Target position">
          {#each ["QB", "RB", "WR", "TE"] as position}
            <button
              class:active={targetPosition === position}
              type="button"
              on:click={() => changeTargetPosition(position)}>{position}</button
            >
          {/each}
        </div>

        <div class="targetIntro">
          <div>
            <span class="material-icons" aria-hidden="true">travel_explore</span
            >
            <div>
              <strong
                >League-wide {targetPosition} targets for {teamByID(myRosterID)
                  ?.shortName}</strong
              >
              <p>
                Ranked by manager fit and estimated acceptance—not only market
                value.
              </p>
            </div>
          </div>
          <button type="button" on:click={refreshTargets}
            >Refresh targets</button
          >
        </div>

        <div class="suggestionGrid">
          {#each targetSuggestions as suggestion}
            <article class="suggestionCard">
              <div class="targetPlayer">
                <span class="position">{suggestion.target.position}</span>
                <div>
                  <h3>{suggestion.target.name}</h3>
                  <p>
                    {suggestion.partner.shortName} · {suggestion.partner
                      .teamName}
                  </p>
                </div>
                <strong>{suggestion.result.overall}%</strong>
              </div>
              <div class="suggestedOffer">
                <span>Suggested opening offer</span>
                <p>
                  {suggestion.offered.map((asset) => asset.name).join(" + ")}
                </p>
              </div>
              <p class="whyTarget">
                {suggestion.partner.shortName}'s profile: {suggestion.partner
                  .tradeProfile.label}. This offer is shaped around the roster's {suggestion.partner.direction.toLowerCase()}
                direction.
              </p>
              <button type="button" on:click={() => loadTrade(suggestion)}
                >Open in builder</button
              >
            </article>
          {/each}
        </div>

        <div class="threeTeamGenerator">
          <div>
            <span class="step">02</span>
            <h2>Need a third manager to unlock it?</h2>
            <p>
              The model looks for a three-team path where every roster receives
              something aligned with its needs.
            </p>
          </div>
          <button type="button" on:click={buildThreeTeamSuggestions}>
            Generate three-team ideas
          </button>
        </div>

        {#if threeTeamSuggestions.length}
          <div class="threeTeamResults">
            {#each threeTeamSuggestions as suggestion}
              <article>
                <div class="threeTeamTop">
                  <strong>{suggestion.result.overall}% likelihood</strong>
                  <span
                    >{suggestion.target.name} to {teamByID(myRosterID)
                      ?.shortName}</span
                  >
                </div>
                <ul>
                  {#each suggestion.transfers as transfer}
                    <li>
                      {teamByID(transfer.fromRosterID)?.shortName} sends
                      <strong>{transfer.asset.name}</strong> to
                      {teamByID(transfer.toRosterID)?.shortName}
                    </li>
                  {/each}
                </ul>
                <button type="button" on:click={() => loadTrade(suggestion)}
                  >Open in builder</button
                >
              </article>
            {/each}
          </div>
        {/if}
      {:else}
        <div class="findTradeEmpty">
          <span class="material-icons" aria-hidden="true">manage_search</span>
          <h3>Select your team to begin</h3>
          <p>
            Then Trade Lab can search the entire league for realistic targets
            and offers.
          </p>
        </div>
      {/if}
    </section>
  {/if}

  <section class="sources">
    <button
      class="sourceToggle"
      type="button"
      aria-expanded={sourcePanelOpen}
      on:click={() => (sourcePanelOpen = !sourcePanelOpen)}
    >
      <span>
        <span class="material-icons" aria-hidden="true">hub</span>
        How the consensus is built
      </span>
      <span class="material-icons" aria-hidden="true"
        >{sourcePanelOpen ? "expand_less" : "expand_more"}</span
      >
    </button>
    {#if sourcePanelOpen}
      <div class="sourceGrid">
        {#each meta.sources as source}
          <article class:unavailable={!source.available}>
            <div>
              <span class:live={source.available} class="sourceStatus"></span>
              <strong>{source.name}</strong>
            </div>
            <p>{source.role}</p>
            <a href={source.url} target="_blank" rel="noopener noreferrer"
              >Source ↗</a
            >
          </article>
        {/each}
      </div>
      <p class="methodNote">
        Values are normalized before blending. Tradyr carries the
        KTC/FantasyCalc composite, FantasyCalc adds live trade-market movement
        and volatility, DynastyProcess adds open expert consensus, and Sleeper
        supplies this league's behavior and roster context. If a source is
        unavailable, confidence falls instead of silently treating missing data
        as zero.
      </p>
    {/if}
  </section>
</main>

<style>
  .tradeLab {
    box-sizing: border-box;
    margin: 0 auto;
    max-width: 1380px;
    padding: clamp(2rem, 5vw, 4.5rem) clamp(0.8rem, 3vw, 2rem) 6rem;
  }

  .hero {
    background:
      radial-gradient(
        circle at 85% 15%,
        rgba(229, 176, 35, 0.2),
        transparent 28%
      ),
      linear-gradient(135deg, #071a33, #0c315d);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 24px;
    box-shadow: var(--league-shadow);
    color: white;
    overflow: hidden;
    padding: clamp(2rem, 6vw, 4.5rem);
    position: relative;
  }

  .eyebrow,
  .step,
  .teamNumber {
    color: var(--league-gold);
    font-size: 0.72rem;
    font-weight: 900;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  h1 {
    color: white;
    font-size: clamp(3.5rem, 10vw, 7.5rem);
    letter-spacing: -0.065em;
    line-height: 0.86;
    margin: 0.18em 0 0.22em;
  }

  .lede {
    color: rgba(255, 255, 255, 0.8);
    font-size: clamp(1rem, 2vw, 1.25rem);
    line-height: 1.55;
    margin: 0;
    max-width: 760px;
  }

  .heroMeta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
    margin-top: 1.6rem;
  }

  .heroMeta span,
  .confidence span {
    background: rgba(255, 255, 255, 0.09);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 700;
    padding: 0.42rem 0.7rem;
  }

  .opinionNotice {
    align-items: flex-start;
    background: rgba(0, 0, 0, 0.2);
    border-left: 3px solid var(--league-gold);
    display: flex;
    gap: 0.8rem;
    margin: 2rem -4.5rem -4.5rem;
    padding: 1.1rem 4.5rem;
  }

  .opinionNotice p {
    color: rgba(255, 255, 255, 0.68);
    font-size: 0.8rem;
    margin: 0.2rem 0 0;
  }

  .controlBar,
  .sectionHeading,
  .teamHeader,
  .assetTitle,
  .evaluationTop,
  .targetPlayer,
  .targetIntro,
  .targetIntro > div,
  .threeTeamGenerator,
  .threeTeamTop,
  .sourceToggle,
  .sourceToggle > span,
  .sourceGrid article > div {
    align-items: center;
    display: flex;
  }

  .controlBar {
    background: var(--surface-raised);
    border: 1px solid var(--line);
    border-radius: 16px;
    box-shadow: var(--league-shadow-soft);
    gap: 1rem;
    justify-content: center;
    margin: 1rem 0 2rem;
    padding: 0.85rem;
  }

  .controlBar label {
    align-items: center;
    display: flex;
    gap: 0.7rem;
  }

  .controlBar label > span {
    color: var(--text-muted);
    font-size: 0.75rem;
    font-weight: 900;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  select,
  button {
    font: inherit;
  }

  select {
    background: var(--surface-muted);
    border: 1px solid var(--line);
    border-radius: 10px;
    color: var(--text-primary);
    max-width: 100%;
    padding: 0.65rem 0.75rem;
  }

  .workspaceTabs,
  .teamCountToggle,
  .positionPicker {
    background: var(--surface-muted);
    border: 1px solid var(--line);
    border-radius: 12px;
    display: flex;
    gap: 0.25rem;
    padding: 0.25rem;
  }

  .workspaceTabs {
    width: 100%;
  }

  .workspaceTabs button {
    flex: 1;
  }

  .workspaceTabs button,
  .teamCountToggle button,
  .positionPicker button {
    background: transparent;
    border: 0;
    border-radius: 9px;
    color: var(--text-muted);
    cursor: pointer;
    font-size: 0.82rem;
    font-weight: 800;
    padding: 0.65rem 0.9rem;
  }

  .workspaceTabs button.active,
  .teamCountToggle button.active,
  .positionPicker button.active {
    background: var(--league-blue);
    box-shadow: 0 3px 10px rgba(8, 120, 209, 0.24);
    color: white;
  }

  .workspace {
    scroll-margin-top: 100px;
  }

  .sectionHeading {
    align-items: flex-end;
    justify-content: space-between;
    margin: 2rem 0 1rem;
  }

  .sectionHeading h2,
  .threeTeamGenerator h2 {
    color: var(--text-primary);
    font-size: clamp(1.7rem, 4vw, 2.7rem);
    letter-spacing: -0.04em;
    margin: 0.15rem 0;
  }

  .sectionHeading p,
  .threeTeamGenerator p {
    color: var(--text-muted);
    margin: 0;
  }

  .teamColumns {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .teamColumns.threeTeams {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .teamColumn,
  .evaluationCard,
  .suggestionCard,
  .threeTeamResults article,
  .sources {
    background: var(--surface-raised);
    border: 1px solid var(--line);
    border-radius: 16px;
    box-shadow: var(--league-shadow-soft);
  }

  .teamColumn {
    min-width: 0;
    overflow: hidden;
  }

  .emptyTeam {
    min-height: 270px;
  }

  .emptyTeamPrompt,
  .findTradeEmpty {
    align-items: center;
    color: var(--text-muted);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 3rem 1rem;
    text-align: center;
  }

  .emptyTeamPrompt .material-icons,
  .findTradeEmpty .material-icons {
    color: var(--league-blue);
    font-size: 2.2rem;
  }

  .emptyTeamPrompt strong,
  .findTradeEmpty h3 {
    color: var(--text-primary);
    margin: 0.6rem 0 0.25rem;
  }

  .emptyTeamPrompt p,
  .findTradeEmpty p {
    margin: 0;
  }

  .findTradeTeamPicker {
    align-items: center;
    background: var(--surface-raised);
    border: 1px solid var(--line);
    border-radius: 14px;
    box-shadow: var(--league-shadow-soft);
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    padding: 1rem;
  }

  .findTradeTeamPicker label {
    color: var(--text-primary);
    font-size: 0.82rem;
    font-weight: 900;
  }

  .findTradeTeamPicker select {
    flex: 1;
  }

  .findTradeEmpty {
    background: var(--surface-raised);
    border: 1px dashed var(--line);
    border-radius: 16px;
    min-height: 220px;
  }

  .teamHeader {
    border-bottom: 1px solid var(--line);
    gap: 0.75rem;
    padding: 1rem;
  }

  .teamHeader img {
    border: 2px solid var(--surface-raised);
    border-radius: 50%;
    box-shadow: 0 0 0 2px rgba(8, 120, 209, 0.24);
    height: 42px;
    object-fit: cover;
    width: 42px;
  }

  .teamHeader > div {
    display: flex;
    flex: 1;
    flex-direction: column;
    min-width: 0;
  }

  .teamHeader strong,
  .teamHeader small {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .teamHeader small {
    color: var(--text-muted);
  }

  .teamHeader select {
    width: 100%;
  }

  .direction {
    background: rgba(8, 120, 209, 0.1);
    border-radius: 999px;
    color: var(--league-blue);
    font-size: 0.68rem;
    font-weight: 800;
    padding: 0.35rem 0.55rem;
    text-align: center;
  }

  .managerRead {
    background: var(--surface-muted);
    display: flex;
    flex-direction: column;
    gap: 0.18rem;
    padding: 0.75rem 1rem;
  }

  .managerRead strong {
    color: var(--text-primary);
    font-size: 0.73rem;
  }

  .managerRead span {
    color: var(--text-muted);
    font-size: 0.7rem;
  }

  .assetSection {
    padding: 0.8rem;
  }

  .pickSection {
    border-top: 1px solid var(--line);
  }

  .assetTitle {
    justify-content: space-between;
    margin-bottom: 0.55rem;
  }

  .assetTitle h3 {
    font-size: 0.85rem;
    margin: 0;
  }

  .assetTitle span {
    color: var(--text-muted);
    font-size: 0.72rem;
  }

  .assetList {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    max-height: 310px;
    overflow-y: auto;
    padding-right: 0.15rem;
  }

  .assetList.picks {
    max-height: 205px;
  }

  .assetRow {
    align-items: center;
    background: var(--surface-muted);
    border: 1px solid transparent;
    border-radius: 10px;
    cursor: pointer;
    display: grid;
    gap: 0.55rem;
    grid-template-columns: auto 31px minmax(0, 1fr) auto;
    padding: 0.55rem;
    text-align: left;
    width: 100%;
  }

  .assetRow:hover,
  .assetRow.selected {
    border-color: var(--league-blue);
  }

  .assetRow.selected {
    background: rgba(8, 120, 209, 0.09);
  }

  .selectionIcon {
    color: var(--league-blue);
    font-size: 1.2rem;
  }

  .position,
  .pickIcon {
    align-items: center;
    background: #071a33;
    border-radius: 8px;
    color: white;
    display: flex;
    font-size: 0.65rem;
    font-weight: 900;
    height: 30px;
    justify-content: center;
    width: 31px;
  }

  .pickIcon {
    color: var(--league-gold);
    font-size: 1rem;
  }

  .assetIdentity {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .assetIdentity strong {
    color: var(--text-primary);
    font-size: 0.78rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .assetIdentity small {
    color: var(--text-muted);
    font-size: 0.65rem;
  }

  .value {
    color: var(--text-muted);
    font-size: 0.7rem;
    font-variant-numeric: tabular-nums;
    font-weight: 800;
  }

  .tradeMap,
  .results {
    background: var(--surface-raised);
    border: 1px solid var(--line);
    border-radius: 18px;
    margin-top: 1rem;
    padding: clamp(1rem, 3vw, 1.5rem);
  }

  .sectionHeading.compact {
    margin-top: 0;
  }

  .transferList {
    display: grid;
    gap: 0.5rem;
  }

  .transferRow {
    align-items: center;
    background: var(--surface-muted);
    border-radius: 10px;
    display: grid;
    gap: 0.6rem;
    grid-template-columns: minmax(130px, 1fr) auto auto minmax(110px, 0.45fr);
    padding: 0.6rem 0.75rem;
  }

  .assetPill {
    color: var(--text-primary);
    font-size: 0.82rem;
    font-weight: 800;
  }

  .fromTeam,
  .arrow {
    color: var(--text-muted);
    font-size: 0.75rem;
  }

  .analyzeButton,
  .suggestionCard button,
  .threeTeamGenerator > button,
  .threeTeamResults button,
  .targetIntro > button {
    background: var(--league-blue);
    border: 0;
    border-radius: 10px;
    color: white;
    cursor: pointer;
    font-weight: 900;
    padding: 0.75rem 1rem;
  }

  .analyzeButton {
    align-items: center;
    display: flex;
    gap: 0.45rem;
    justify-content: center;
    margin: 1rem 0 0 auto;
  }

  .results {
    scroll-margin-top: 100px;
  }

  .resultHero {
    background: linear-gradient(135deg, #071a33, #0c315d);
    border-radius: 14px;
    color: white;
    padding: 1.5rem;
    text-align: center;
  }

  .resultHero > span {
    color: rgba(255, 255, 255, 0.65);
    font-size: 0.72rem;
    font-weight: 900;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .resultHero > strong {
    color: var(--league-gold);
    display: block;
    font-size: clamp(3rem, 8vw, 5rem);
    line-height: 1;
    margin-top: 0.2rem;
  }

  .resultHero h2 {
    color: white;
    margin: 0.2rem 0 0;
  }

  .incomplete {
    color: #ffd7d7;
    font-size: 0.8rem;
  }

  .evaluationGrid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    margin-top: 1rem;
  }

  .evaluationCard {
    padding: 1rem;
  }

  .evaluationTop {
    justify-content: space-between;
  }

  .evaluationTop span,
  .suggestedOffer > span {
    color: var(--text-muted);
    font-size: 0.68rem;
    font-weight: 800;
    text-transform: uppercase;
  }

  .evaluationTop h3 {
    margin: 0.1rem 0;
  }

  .likelihood {
    text-align: right;
  }

  .likelihood strong {
    color: var(--league-blue);
    display: block;
    font-size: 1.65rem;
  }

  .confidence {
    display: flex;
    gap: 0.35rem;
    margin: 0.65rem 0;
  }

  .confidence span {
    background: var(--surface-muted);
    border-color: var(--line);
    color: var(--text-muted);
  }

  .evaluationCard > p,
  .whyTarget,
  .methodNote {
    color: var(--text-muted);
    font-size: 0.82rem;
    line-height: 1.55;
  }

  dl {
    border-bottom: 1px solid var(--line);
    border-top: 1px solid var(--line);
    margin: 0.8rem 0;
    padding: 0.5rem 0;
  }

  dl div {
    display: grid;
    gap: 0.5rem;
    grid-template-columns: 60px 1fr;
    padding: 0.25rem 0;
  }

  dt {
    color: var(--text-muted);
    font-size: 0.65rem;
    font-weight: 900;
    text-transform: uppercase;
  }

  dd {
    color: var(--text-primary);
    font-size: 0.75rem;
    margin: 0;
  }

  .insight {
    align-items: flex-start;
    border-radius: 10px;
    display: flex;
    gap: 0.65rem;
    margin-top: 0.55rem;
    padding: 0.7rem;
  }

  .insight .material-icons {
    font-size: 1rem;
  }

  .insight strong {
    font-size: 0.72rem;
  }

  .insight p {
    font-size: 0.7rem;
    line-height: 1.4;
    margin: 0.15rem 0 0;
  }

  .rejection {
    background: rgba(210, 68, 68, 0.09);
  }
  .adjustment {
    background: rgba(229, 176, 35, 0.12);
  }
  .impact {
    background: rgba(8, 120, 209, 0.09);
  }

  .positionPicker {
    margin-bottom: 1rem;
    width: fit-content;
  }

  .positionPicker button {
    min-width: 58px;
  }

  .targetIntro {
    background: linear-gradient(
      135deg,
      rgba(8, 120, 209, 0.12),
      rgba(229, 176, 35, 0.08)
    );
    border: 1px solid rgba(8, 120, 209, 0.22);
    border-radius: 14px;
    justify-content: space-between;
    padding: 1rem;
  }

  .targetIntro > div {
    gap: 0.7rem;
  }

  .targetIntro p {
    color: var(--text-muted);
    font-size: 0.78rem;
    margin: 0.2rem 0 0;
  }

  .targetIntro .material-icons {
    color: var(--league-blue);
    font-size: 2rem;
  }

  .suggestionGrid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
    margin-top: 1rem;
  }

  .suggestionCard {
    padding: 1rem;
  }

  .targetPlayer {
    gap: 0.65rem;
  }

  .targetPlayer > div {
    flex: 1;
    min-width: 0;
  }

  .targetPlayer h3 {
    margin: 0;
  }

  .targetPlayer p {
    color: var(--text-muted);
    font-size: 0.72rem;
    margin: 0.15rem 0 0;
  }

  .targetPlayer > strong {
    color: var(--league-blue);
    font-size: 1.25rem;
  }

  .suggestedOffer {
    background: var(--surface-muted);
    border-radius: 10px;
    margin-top: 0.8rem;
    padding: 0.75rem;
  }

  .suggestedOffer p {
    color: var(--text-primary);
    font-size: 0.8rem;
    font-weight: 800;
    margin: 0.2rem 0 0;
  }

  .suggestionCard button,
  .threeTeamResults button {
    width: 100%;
  }

  .threeTeamGenerator {
    background: #071a33;
    border-radius: 16px;
    color: white;
    justify-content: space-between;
    margin-top: 2rem;
    padding: 1.3rem;
  }

  .threeTeamGenerator h2 {
    color: white;
    font-size: 1.5rem;
  }

  .threeTeamGenerator p {
    color: rgba(255, 255, 255, 0.68);
    font-size: 0.8rem;
  }

  .threeTeamGenerator > button {
    background: var(--league-gold);
    color: #071a33;
    margin-left: 1rem;
  }

  .threeTeamResults {
    display: grid;
    gap: 0.8rem;
    grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
    margin-top: 1rem;
  }

  .threeTeamResults article {
    padding: 1rem;
  }

  .threeTeamTop {
    align-items: flex-start;
    flex-direction: column;
  }

  .threeTeamTop strong {
    color: var(--league-blue);
  }
  .threeTeamTop span {
    color: var(--text-muted);
    font-size: 0.75rem;
  }

  .threeTeamResults ul {
    color: var(--text-muted);
    font-size: 0.75rem;
    line-height: 1.5;
    padding-left: 1.1rem;
  }

  .sources {
    margin-top: 2rem;
    overflow: hidden;
  }

  .sourceToggle {
    background: transparent;
    border: 0;
    color: var(--text-primary);
    cursor: pointer;
    justify-content: space-between;
    padding: 1rem;
    width: 100%;
  }

  .sourceToggle > span {
    gap: 0.55rem;
    font-weight: 800;
  }

  .sourceGrid {
    border-top: 1px solid var(--line);
    display: grid;
    gap: 0.7rem;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    padding: 1rem;
  }

  .sourceGrid article {
    background: var(--surface-muted);
    border-radius: 10px;
    padding: 0.75rem;
  }

  .sourceGrid article.unavailable {
    opacity: 0.55;
  }
  .sourceGrid article > div {
    gap: 0.4rem;
  }
  .sourceGrid p {
    color: var(--text-muted);
    font-size: 0.7rem;
    min-height: 2.8em;
  }
  .sourceGrid a {
    color: var(--league-blue);
    font-size: 0.7rem;
    font-weight: 800;
  }

  .sourceStatus {
    background: #c84f4f;
    border-radius: 50%;
    height: 8px;
    width: 8px;
  }

  .sourceStatus.live {
    background: #2eb879;
  }
  .methodNote {
    margin: 0;
    padding: 0 1rem 1rem;
  }

  @media (max-width: 1050px) {
    .teamColumns.threeTeams {
      grid-template-columns: 1fr;
    }
    .sourceGrid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 720px) {
    .tradeLab {
      padding-left: 0.65rem;
      padding-right: 0.65rem;
    }
    .hero {
      border-radius: 18px;
      padding: 2rem 1.2rem;
    }
    .opinionNotice {
      margin: 1.5rem -1.2rem -2rem;
      padding: 1rem 1.2rem;
    }
    .controlBar,
    .sectionHeading,
    .targetIntro,
    .threeTeamGenerator {
      align-items: stretch;
      flex-direction: column;
    }
    .controlBar label {
      align-items: stretch;
      flex-direction: column;
      gap: 0.35rem;
    }
    .controlBar select {
      width: 100%;
    }
    .workspaceTabs {
      width: 100%;
    }
    .workspaceTabs button {
      flex: 1;
    }
    .findTradeTeamPicker {
      align-items: stretch;
      flex-direction: column;
      gap: 0.45rem;
    }
    .teamColumns {
      grid-template-columns: 1fr;
    }
    .teamCountToggle {
      margin-top: 0.7rem;
      width: fit-content;
    }
    .transferRow {
      grid-template-columns: minmax(0, 1fr) auto;
    }
    .transferRow .fromTeam {
      display: none;
    }
    .transferRow .arrow {
      justify-self: end;
    }
    .transferRow select {
      grid-column: 1 / -1;
      width: 100%;
    }
    .analyzeButton {
      width: 100%;
    }
    .threeTeamGenerator > button {
      margin: 1rem 0 0;
    }
    .sourceGrid {
      grid-template-columns: 1fr;
    }
  }
</style>
