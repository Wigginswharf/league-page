<script>
    export let article;

    const timeAgo = (timestamp) => {
        const minutes = Math.max(1, Math.round((Date.now() - timestamp) / 60000));
        if(minutes < 60) return `${minutes}m ago`;
        const hours = Math.round(minutes / 60);
        if(hours < 24) return `${hours}h ago`;
        const days = Math.round(hours / 24);
        return `${days}d ago`;
    };
</script>

<article class="story-card">
    <div class="story-meta">
        <span class:injury={article.category === 'Injuries'} class:moves={article.category === 'Moves'} class:dynasty={article.category === 'Dynasty'} class="category">
            {article.category}
        </span>
        <span class="source">{article.source || article.author}</span>
        <span class="dot" aria-hidden="true">•</span>
        <time datetime={new Date(article.ts).toISOString()}>{timeAgo(article.ts)}</time>
    </div>

    <h2>
        <a href={article.link} target="_blank" rel="noopener noreferrer">{article.title}</a>
    </h2>

    {#if article.summary || article.article}
        <p>{article.summary || article.article.replace(/<[^>]+>/g, ' ')}</p>
    {/if}

    <a class="read-more" href={article.link} target="_blank" rel="noopener noreferrer">
        Read from {article.source || article.author}
        <span class="material-icons" aria-hidden="true">open_in_new</span>
    </a>
</article>

<style>
    .story-card {
        background: var(--surface-raised);
        border: 1px solid var(--line);
        border-left: 4px solid var(--league-blue);
        border-radius: 12px;
        box-shadow: 0 5px 16px rgba(7, 26, 51, 0.08);
        padding: 1.1rem 1.2rem;
    }

    .story-meta {
        align-items: center;
        color: var(--text-muted);
        display: flex;
        flex-wrap: wrap;
        font-size: 0.76rem;
        gap: 0.42rem;
    }

    .category {
        background: rgba(8, 120, 209, 0.12);
        border-radius: 999px;
        color: var(--league-blue);
        font-weight: 800;
        letter-spacing: 0.04em;
        padding: 0.24rem 0.55rem;
        text-transform: uppercase;
    }

    .category.injury {
        background: rgba(190, 38, 38, 0.12);
        color: #b42318;
    }

    .category.moves {
        background: rgba(132, 74, 0, 0.13);
        color: #925300;
    }

    .category.dynasty {
        background: rgba(87, 55, 145, 0.13);
        color: #6741a5;
    }

    .source {
        color: var(--text-primary);
        font-weight: 700;
    }

    h2 {
        font-size: clamp(1rem, 2.3vw, 1.22rem);
        line-height: 1.3;
        margin: 0.72rem 0 0.45rem;
    }

    h2 a {
        color: var(--text-primary);
        text-decoration: none;
    }

    h2 a:hover,
    h2 a:focus-visible {
        color: var(--league-blue);
        text-decoration: underline;
        text-underline-offset: 3px;
    }

    p {
        color: var(--text-muted);
        line-height: 1.55;
        margin: 0;
    }

    .read-more {
        align-items: center;
        color: var(--league-blue);
        display: inline-flex;
        font-size: 0.82rem;
        font-weight: 750;
        gap: 0.25rem;
        margin-top: 0.85rem;
        text-decoration: none;
    }

    .read-more:hover,
    .read-more:focus-visible {
        text-decoration: underline;
    }

    .read-more .material-icons {
        font-size: 0.95rem;
    }

    @media (max-width: 560px) {
        .story-card {
            padding: 0.95rem;
        }
    }
</style>
