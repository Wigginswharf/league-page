<script>
    import { weeklyColumns } from '$lib/data/weeklyColumns';

    const latest = weeklyColumns[0];
</script>

{#if latest}
    <aside class="latest-column">
        <p class="eyebrow">Latest from The Losers Ledger</p>
        <h2><a href={`/blog/${latest.slug}`}>{latest.title}</a></h2>
        <p>{latest.dek}</p>
        <a class="read" href={`/blog/${latest.slug}`}>
            Read this week’s column <span class="material-icons" aria-hidden="true">arrow_forward</span>
        </a>
    </aside>
{/if}

<style>
    .latest-column {
        background: var(--surface-raised);
        border-left: 5px solid var(--league-gold);
        border-radius: 8px;
        box-shadow: 0 5px 16px rgba(7, 26, 51, 0.09);
        margin-top: 2rem;
        padding: 1.2rem 1.3rem;
    }

    .eyebrow {
        color: var(--league-blue);
        font-size: 0.7rem;
        font-weight: 850;
        letter-spacing: 0.1em;
        margin: 0 0 0.4rem;
        text-transform: uppercase;
    }

    h2 {
        font-family: Georgia, 'Times New Roman', serif;
        font-size: 1.55rem;
        line-height: 1.1;
        margin: 0;
        text-align: left;
    }

    h2 a {
        color: var(--text-primary);
        text-decoration: none;
    }

    .latest-column > p:not(.eyebrow) {
        color: var(--text-muted);
        line-height: 1.5;
        margin: 0.65rem 0;
    }

    .read {
        align-items: center;
        color: var(--league-blue);
        display: inline-flex;
        font-size: 0.82rem;
        font-weight: 850;
        gap: 0.25rem;
        text-decoration: none;
    }

    .read .material-icons {
        font-size: 1rem;
    }
</style>
