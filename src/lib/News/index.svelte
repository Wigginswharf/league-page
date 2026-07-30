<script>
    import SingleNews from './SingleNews.svelte';
    import Pagination from '../Pagination.svelte';
    import { getNews } from '$lib/utils/helper';
    import { onMount, onDestroy } from 'svelte';

    export let news;

    const filters = ['All', 'Player News', 'Moves', 'Injuries', 'Dynasty'];
    const perPage = 12;
    let articles = news.articles || [];
    let teams = news.teams || [];
    let updatedAt = news.updatedAt;
    let sourcesOnline = news.sourcesOnline;
    let sourcesTotal = news.sourcesTotal;
    let activeFilter = 'All';
    let selectedRoster = 'all';
    let page = 0;
    let refreshing = false;
    let refreshTimer;
    let el;

    $: rosterArticles = selectedRoster === 'all'
        ? articles
        : articles.filter((article) => article.teamMatches?.includes(selectedRoster));
    $: filteredArticles = activeFilter === 'All'
        ? rosterArticles
        : rosterArticles.filter((article) => article.category === activeFilter);
    $: displayArticles = filteredArticles.slice(page * perPage, (page + 1) * perPage);
    $: selectedTeam = teams.find((team) => team.rosterID === selectedRoster);
    $: top = el?.getBoundingClientRect() ? el.getBoundingClientRect().top : 0;

    const selectFilter = (filter) => {
        activeFilter = filter;
        page = 0;
    };

    const selectRoster = () => {
        page = 0;
        localStorage.setItem('dynasty-wire-roster', selectedRoster);
    };

    const storyCountForTeam = (rosterID) => articles
        .filter((article) => article.teamMatches?.includes(rosterID)).length;

    const refresh = async () => {
        if(refreshing) return;
        refreshing = true;
        try {
            const latest = await getNews(null, true);
            articles = latest.articles;
            teams = latest.teams || [];
            updatedAt = latest.updatedAt;
            sourcesOnline = latest.sourcesOnline;
            sourcesTotal = latest.sourcesTotal;
            page = 0;
        } finally {
            refreshing = false;
        }
    };

    const updatedLabel = () => {
        if(!updatedAt) return 'just now';
        const minutes = Math.max(0, Math.round((Date.now() - Date.parse(updatedAt)) / 60000));
        if(minutes < 1) return 'just now';
        if(minutes === 1) return '1 minute ago';
        return `${minutes} minutes ago`;
    };

    onMount(() => {
        const savedRoster = localStorage.getItem('dynasty-wire-roster');
        if(savedRoster && (savedRoster === 'all' || teams.some((team) => team.rosterID === savedRoster))) {
            selectedRoster = savedRoster;
        }
        if(!news.fresh) refresh();
        refreshTimer = setInterval(refresh, 10 * 60 * 1000);
    });

    onDestroy(() => clearInterval(refreshTimer));
</script>

<section class="news-shell" bind:this={el}>
    <div class="news-hero">
        <div>
            <div class="eyebrow"><span class="live-dot"></span> Live dynasty feed</div>
            <h1>Dynasty Wire</h1>
            <p>Player news, injuries, roster moves, and dynasty stories—all in one stream.</p>
        </div>
        <button class="refresh" type="button" disabled={refreshing} on:click={refresh}>
            <span class:spinning={refreshing} class="material-icons" aria-hidden="true">refresh</span>
            {refreshing ? 'Refreshing' : 'Refresh'}
        </button>
    </div>

    <div class="team-filter">
        <div class="team-filter-copy">
            <span class="material-icons" aria-hidden="true">person_search</span>
            <div>
                <label for="team-news-filter">My team’s news</label>
                <p>Only show stories that mention players on a selected league roster.</p>
            </div>
        </div>
        <select id="team-news-filter" bind:value={selectedRoster} on:change={selectRoster}>
            <option value="all">All league news</option>
            {#each teams as team}
                <option value={team.rosterID}>
                    {team.managerName}’s team ({storyCountForTeam(team.rosterID)})
                </option>
            {/each}
        </select>
    </div>

    <div class="stream-bar">
        <div class="filters" aria-label="Filter dynasty news">
            {#each filters as filter}
                <button class:active={activeFilter === filter} type="button" on:click={() => selectFilter(filter)}>
                    {filter}
                </button>
            {/each}
        </div>
        <p class="feed-status">
            Updated {updatedLabel()}
            {#if sourcesTotal}
                <span>• {sourcesOnline || 0}/{sourcesTotal} sources online</span>
            {/if}
        </p>
    </div>

    {#if displayArticles.length}
        <div class="articles">
            {#each displayArticles as article (article.id)}
                <SingleNews {article} {selectedRoster} />
            {/each}
        </div>
        <Pagination {perPage} total={filteredArticles.length} bind:page target={top} />
    {:else}
        <div class="empty-state">
            <span class="material-icons" aria-hidden="true">sports_football</span>
            {#if selectedTeam}
                <h2>No current stories mention {selectedTeam.managerName}’s players</h2>
                <p>The selection is saved. New matching stories will appear automatically when the wire refreshes.</p>
            {:else}
                <h2>No stories in this lane yet</h2>
                <p>Try another filter or refresh the wire.</p>
            {/if}
        </div>
    {/if}
</section>

<style>
    .news-shell {
        margin: 0 auto 70px;
        max-width: 1040px;
        padding: 1.25rem 1rem 0;
        position: relative;
        z-index: 1;
    }

    .news-hero {
        align-items: center;
        background: linear-gradient(135deg, #071a33 0%, #0b3763 62%, #0b5687 100%);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 18px;
        box-shadow: var(--league-shadow);
        color: #fff;
        display: flex;
        justify-content: space-between;
        overflow: hidden;
        padding: clamp(1.35rem, 4vw, 2.4rem);
        position: relative;
    }

    .news-hero::after {
        color: rgba(255, 255, 255, 0.06);
        content: 'breaking news';
        font-size: 5.5rem;
        font-weight: 900;
        letter-spacing: -0.05em;
        position: absolute;
        right: -1rem;
        text-transform: uppercase;
        top: -0.9rem;
        white-space: nowrap;
    }

    .news-hero > * {
        position: relative;
        z-index: 1;
    }

    .eyebrow {
        align-items: center;
        color: #dbeafe;
        display: flex;
        font-size: 0.76rem;
        font-weight: 800;
        gap: 0.45rem;
        letter-spacing: 0.12em;
        text-transform: uppercase;
    }

    .live-dot {
        background: #35e06f;
        border-radius: 50%;
        box-shadow: 0 0 0 4px rgba(53, 224, 111, 0.16);
        height: 8px;
        width: 8px;
    }

    h1 {
        font-size: clamp(2rem, 5vw, 3.35rem);
        letter-spacing: -0.045em;
        margin: 0.35rem 0 0.35rem;
    }

    .news-hero p {
        color: rgba(255, 255, 255, 0.78);
        margin: 0;
        max-width: 620px;
    }

    .refresh {
        align-items: center;
        background: var(--league-gold);
        border: 0;
        border-radius: 999px;
        color: #071a33;
        cursor: pointer;
        display: flex;
        font-weight: 850;
        gap: 0.35rem;
        padding: 0.72rem 1rem;
    }

    .refresh:disabled {
        cursor: wait;
        opacity: 0.75;
    }

    .spinning {
        animation: spin 0.8s linear infinite;
    }

    .stream-bar {
        align-items: center;
        display: flex;
        justify-content: space-between;
        margin: 1.15rem 0;
    }

    .team-filter {
        align-items: center;
        background: var(--surface-raised);
        border: 1px solid var(--line);
        border-radius: 14px;
        display: flex;
        gap: 1rem;
        justify-content: space-between;
        margin-top: 1rem;
        padding: 0.85rem 1rem;
    }

    .team-filter-copy {
        align-items: center;
        display: flex;
        gap: 0.75rem;
    }

    .team-filter-copy > .material-icons {
        color: var(--league-blue);
        font-size: 1.8rem;
    }

    .team-filter label {
        color: var(--text-primary);
        display: block;
        font-weight: 850;
    }

    .team-filter p {
        color: var(--text-muted);
        font-size: 0.78rem;
        margin: 0.15rem 0 0;
    }

    .team-filter select {
        background: var(--surface-raised);
        border: 1px solid var(--line);
        border-radius: 9px;
        color: var(--text-primary);
        font: inherit;
        font-weight: 700;
        max-width: 280px;
        padding: 0.62rem 2.2rem 0.62rem 0.75rem;
    }

    .team-filter select:focus-visible {
        border-color: var(--league-blue);
        outline: 2px solid rgba(8, 120, 209, 0.2);
    }

    .filters {
        display: flex;
        flex-wrap: wrap;
        gap: 0.45rem;
    }

    .filters button {
        background: var(--surface-raised);
        border: 1px solid var(--line);
        border-radius: 999px;
        color: var(--text-muted);
        cursor: pointer;
        font-weight: 750;
        padding: 0.48rem 0.78rem;
    }

    .filters button:hover,
    .filters button:focus-visible,
    .filters button.active {
        background: var(--league-blue);
        border-color: var(--league-blue);
        color: #fff;
        outline: none;
    }

    .feed-status {
        color: var(--text-muted);
        font-size: 0.75rem;
        margin: 0 0 0 1rem;
        white-space: nowrap;
    }

    .articles {
        display: grid;
        gap: 0.8rem;
    }

    .empty-state {
        color: var(--text-muted);
        padding: 4rem 1rem;
        text-align: center;
    }

    .empty-state .material-icons {
        color: var(--league-blue);
        font-size: 3rem;
    }

    .empty-state h2 {
        color: var(--text-primary);
        margin-bottom: 0.3rem;
    }

    .empty-state p {
        margin-top: 0;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }

    @media (max-width: 720px) {
        .news-hero {
            align-items: flex-start;
            flex-direction: column;
            gap: 1.2rem;
        }

        .stream-bar {
            align-items: flex-start;
            flex-direction: column;
            gap: 0.75rem;
        }

        .team-filter {
            align-items: stretch;
            flex-direction: column;
        }

        .team-filter select {
            max-width: none;
            width: 100%;
        }

        .feed-status {
            margin-left: 0;
        }
    }
</style>
