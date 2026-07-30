<script>
    import { goto } from "$app/navigation";
    import TeamDirectionBadge from './TeamDirectionBadge.svelte';


    export let viewManager, players, teamDirection = null;

    $: displayedDirection = teamDirection || (
        viewManager.direction
            ? { category: viewManager.direction, summary: 'Approved fallback rating' }
            : null
    );

    const gotoRival = (rival) => {
        if(!rival) {
            goto(`/managers`);
            return;
        }
        goto(`/manager?manager=${rival}`);
    }
</script>

<style>
    .fantasyInfos {
        display: flex;
        justify-content: space-around;
        align-items: flex-start;
        flex-wrap: wrap;
        padding: 0 0 2em;
        margin: 3em 0 4em;
        border-bottom: 1px solid var(--aaa);
        border-top: 1px solid var(--aaa);
        box-shadow: 0 0 8px 4px var(--ccc);
    }

    .infoSlot {
        text-align: center;
        margin: 2em 1em 0;
    }

    .infoIcon {
        display: inline-flex;
        height: 70px;
        width: 70px;
        justify-content: center;
        align-items: center;
        border-radius: 100%;
        border: 1px solid var(--ccc);
        overflow: hidden;
        background-color: var(--fff);
		transition: box-shadow 0.4s;
    }

    .playerIcon {
        align-items:flex-end;
    }

    .infoLabel {
        font-size: 0.7em;
        color: var(--blueOne);
        font-weight: 700;
        margin-bottom: 1em;
        height: 30px;
        width: 90px;
        text-align: center;
        line-height: 1.2em;
    }

    .infoAnswer {
        font-size: 0.8em;
        color: var(--g555);
        margin-top: 1em;
        width: 90px;
        text-align: center;
        line-height: 1.2em;
    }

    .tradingScale {
        line-height: 70px;
        font-size: 55px;
        color: var(--blueOne);
    }

    .rookiesOrVets {
        height: 65px;
        vertical-align: middle;
    }

    .infoRival {
        cursor: pointer;
        max-width: 260px;
    }

    .infoRival:hover .infoIcon {
        box-shadow: 0 0 6px 4px var(--aaa);
        border: 1px solid var(--aaa);
    }

    .rival {
        height: 100%;
    }

    .rivalRecord {
        width: 240px;
        margin-top: 0.75em;
        font-size: 0.85em;
        font-weight: 700;
        color: var(--g555);
        line-height: 1.3em;
    }

    .rivalNote {
        width: 240px;
        margin-top: 0.5em;
        font-size: 0.72em;
        color: var(--g555);
        line-height: 1.4em;
    }

    .directionIcon {
        border: 0;
        overflow: visible;
        background: transparent;
    }

    .directionSummary {
        width: 150px;
        margin: 0.65em -30px 0;
        color: var(--g555);
        font-size: 0.7em;
        line-height: 1.35;
    }

    .valuePosition {
        line-height: 70px;
        font-size: 25px;
        color: var(--fff);
    }

    .QB {
        background-color: var(--QB);
    }

    .WR {
        background-color: var(--WR);
    }

    .RB {
        background-color: var(--RB);
    }

    .TE {
        background-color: var(--TE);
    }

    .Picks {
        background: #73b647;
    }
    .K {
        background-color: var(--K);
    }

    .DEF {
        background-color: var(--DEF);
    }

    .CB {
        background-color: #ffcc7a;
    }

    .SS {
        background-color: #b7a1db;
    }

    .FS {
        background-color: #ebe7b3;
    }

    .DE {
        background-color: #b1d0e9;
    }

    .DL {
        background-color: #c392d3;
    }

    .LB {
        background-color: #98c097;
    }

    .favoritePlayer {
        height: 65px;
        vertical-align: bottom;
    }

    /* media queries */

    @media (max-width: 731px) {
        .infoSlot {
            margin: 2em 3em 0;
        }
    }

    @media (max-width: 558px) {
        .infoSlot {
            margin: 2em 2em 0;
        }
    }

    @media (max-width: 461px) {
        .infoSlot {
            margin: 2em 1em 0;
        }
    }
</style>

<div class="fantasyInfos">
    <!-- Rookies or Vets (optional) -->
    {#if viewManager.rookieOrVets}
        <div class="infoSlot">
            <div class="infoLabel">
                Rookie or Vet Preference
            </div>
            <div class="infoIcon">
                <img class="rookiesOrVets" src="/{viewManager.rookieOrVets}.png" alt="rookie or vet preference"/>
            </div>
            <div class="infoAnswer">
                {viewManager.rookieOrVets}
            </div>
        </div>
    {/if}
    <!-- Favorite fantasy position (optional) -->
    {#if viewManager.valuePosition}
        <div class="infoSlot">
            <div class="infoLabel">
                Favorite Fantasy Asset
            </div>
            <div class="infoIcon {viewManager.valuePosition}">
                <span class="valuePosition">{viewManager.valuePosition}</span>
            </div>
        </div>
    {/if}
    {#if viewManager.tradingScale}
        <!-- Trading Scale -->
        <div class="infoSlot">
            <div class="infoLabel">
                Desire to Trade
            </div>
            <div class="infoIcon">
                <span class="tradingScale">{viewManager.tradingScale}</span>
            </div>
            <div class="infoAnswer">
                {viewManager.tradingScale} out of 10
            </div>
        </div>
    {/if}
    <!-- Favorite player (optioonal) -->
    {#if viewManager.favoritePlayer}
        <div class="infoSlot">
            <div class="infoLabel">
                Favorite Player
            </div>
            <div class="infoIcon playerIcon">
                <img class="favoritePlayer" src="https://sleepercdn.com/content/nfl/players/{viewManager.favoritePlayer}.jpg" alt="favorite player"/>
            </div>
            <div class="infoAnswer">
                {players[viewManager.favoritePlayer].fn} {players[viewManager.favoritePlayer].ln}
            </div>
        </div>
    {/if}
    <!-- Live team direction (falls back to the approved static rating) -->
    {#if displayedDirection}
        <div class="infoSlot">
            <div class="infoLabel">
                Team Direction
            </div>
            <div class="infoIcon directionIcon">
                <TeamDirectionBadge
                    category={displayedDirection.category}
                    summary={displayedDirection.summary}
                    large
                />
            </div>
            <div class="infoAnswer">
                {displayedDirection.category}
            </div>
            {#if displayedDirection.automated}
                <div class="directionSummary">
                    {displayedDirection.summary}
                </div>
            {/if}
        </div>
    {/if}
    <!-- Rival -->
    {#if viewManager.rival}
        <div class="infoSlot infoRival" on:click={() => gotoRival(viewManager.rival.link)}>
            <div class="infoLabel">
                Featured Rival
            </div>
            <div class="infoIcon">
                <img class="rival" src="{viewManager.rival.image}" alt="rival"/>
            </div>
            <div class="infoAnswer">
                {viewManager.rival.name}
            </div>
            <div class="rivalRecord">
                {viewManager.rival.record}
            </div>
            <div class="rivalNote">
                {viewManager.rival.note}
            </div>
        </div>
    {/if}
</div>
