<script>
    import { onMount } from 'svelte';
    import { leagueName } from '$lib/utils/helper';
    import { getDatesActive } from '$lib/utils/helperFunctions/universalFunctions';
    import ManagerRow from './ManagerRow.svelte'

    export let managers, leagueTeamManagers;

    let innerWidth;
    let showRetired = false;
    let liveDirections = {};

    onMount(async () => {
        try {
            const response = await fetch('/api/team-directions');
            if(response.ok) {
                const ratings = await response.json();
                liveDirections = ratings.directions || {};
            }
        } catch(error) {
            console.warn('Using approved fallback team directions', error);
        }
    });

    const managerEntries = managers.map((manager, key) => ({manager, key}));
    const activeManagers = managerEntries.filter(({manager}) => {
        if(!manager.managerID) return true;
        return !getDatesActive(leagueTeamManagers, manager.managerID).end;
    });
    const retiredManagers = managerEntries.filter(({manager}) => {
        if(!manager.managerID) return false;
        return Boolean(getDatesActive(leagueTeamManagers, manager.managerID).end);
    });
</script>

<svelte:window bind:innerWidth={innerWidth} />

<style>
    .managerContainer {
        width: 100%;
        margin: 2em 0 5em;
    }

    .managerConstrained {
        width: 97%;
        max-width: 800px;
        margin: 0 auto;
    }

    h2 {
        text-align: center;
        font-size: 2.8em;
        margin: 2em 0 1.5em;
        line-height: 1em;
    }

    .retiredToggle {
        display: flex;
        width: 100%;
        margin: 1.5em 0 0.5em;
        padding: 0.85em 1.25em;
        justify-content: space-between;
        align-items: center;
        border: 1px solid var(--ccc);
        border-radius: 1em;
        background: var(--eee);
        color: var(--g555);
        font: inherit;
        font-weight: 700;
        cursor: pointer;
    }

    .retiredToggle:hover,
    .retiredToggle:focus-visible {
        background: var(--ddd);
    }

    .toggleIcon {
        font-size: 1.2em;
        line-height: 1;
    }

    @media (max-width: 520px) {
        h2 {
            text-align: center;
            font-size: 2em;
            margin: 1.5em 0 1em;
            line-height: 1em;
        }
    }
</style>

<div class="managerContainer">
    <h2>{leagueName} Managers</h2>
    <div class="managerConstrained">
        {#each activeManagers as {manager, key}}
            <ManagerRow
                {manager}
                {leagueTeamManagers}
                {key}
                liveDirection={liveDirections[manager.roster]}
            />
        {/each}

        {#if retiredManagers.length}
            <button
                class="retiredToggle"
                type="button"
                aria-expanded={showRetired}
                on:click={() => showRetired = !showRetired}
            >
                <span>Retired Managers ({retiredManagers.length})</span>
                <span class="toggleIcon" aria-hidden="true">{showRetired ? '−' : '+'}</span>
            </button>

            {#if showRetired}
                <div class="retiredManagers">
                    {#each retiredManagers as {manager, key}}
                        <ManagerRow {manager} {leagueTeamManagers} {key} />
                    {/each}
                </div>
            {/if}
        {/if}
    </div>

</div>
