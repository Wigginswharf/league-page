<script>
    import LinearProgress from '@smui/linear-progress';
    import { News } from '$lib/components';

    export let data;
</script>

{#await data.articlesData}
    <div class="loading">
        <p>Opening the dynasty wire…</p>
        <LinearProgress indeterminate />
    </div>
{:then news}
    <News {news} />
{:catch error}
    <div class="error-state">
        <span class="material-icons" aria-hidden="true">cloud_off</span>
        <h1>The wire is temporarily quiet</h1>
        <p>{error.message}</p>
    </div>
{/await}

<style>
    .loading,
    .error-state {
        margin: 3rem auto 70px;
        max-width: 820px;
        padding: 1rem;
        position: relative;
        text-align: center;
        z-index: 1;
    }

    .loading p {
        color: var(--text-muted);
    }

    .error-state .material-icons {
        color: var(--league-blue);
        font-size: 3rem;
    }
</style>
