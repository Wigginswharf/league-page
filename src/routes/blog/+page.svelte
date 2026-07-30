<script>
    export let data;

    const formatDate = (date) => new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date(date));
</script>

<main class="column-index">
    <header class="masthead">
        <p class="eyebrow">An AI-assisted weekly league column</p>
        <h1>The Losers Ledger</h1>
        <p class="intro">Results, trades, roster chaos, and NFL news—reported with facts, perspective, and the occasional unnecessary shot across the bow.</p>
    </header>

    <div class="edition-label">
        <span>Latest editions</span>
        <span class="rule"></span>
    </div>

    <section class="columns" aria-label="Weekly league columns">
        {#each data.columns as column, index}
            <article class:featured={index === 0} class="column-card">
                <div class="card-meta">
                    <span>{column.issue}</span>
                    <span>•</span>
                    <time datetime={column.publishedAt}>{formatDate(column.publishedAt)}</time>
                    <span>•</span>
                    <span>{column.readTime}</span>
                </div>
                <h2><a href={`/blog/${column.slug}`}>{column.title}</a></h2>
                <p>{column.dek}</p>
                <div class="card-footer">
                    <div class="tags">
                        {#each column.tags as tag}<span>{tag}</span>{/each}
                    </div>
                    <a class="read-column" href={`/blog/${column.slug}`}>
                        Read the column <span class="material-icons" aria-hidden="true">arrow_forward</span>
                    </a>
                </div>
            </article>
        {/each}
    </section>
</main>

<style>
    .column-index {
        margin: 0 auto 80px;
        max-width: 1040px;
        padding: 1.4rem 1rem 0;
        position: relative;
        z-index: 1;
    }

    .masthead {
        background: linear-gradient(135deg, #071a33, #0d3f70);
        border-bottom: 5px solid var(--league-gold);
        border-radius: 18px 18px 6px 6px;
        box-shadow: var(--league-shadow);
        color: #fff;
        padding: clamp(1.6rem, 5vw, 3.4rem);
        text-align: center;
    }

    .eyebrow {
        color: var(--league-gold);
        font-size: 0.75rem;
        font-weight: 850;
        letter-spacing: 0.14em;
        margin: 0;
        text-transform: uppercase;
    }

    h1 {
        font-family: Georgia, 'Times New Roman', serif;
        font-size: clamp(2.5rem, 7vw, 5rem);
        letter-spacing: -0.045em;
        line-height: 0.95;
        margin: 0.55rem 0 0.8rem;
    }

    .intro {
        color: rgba(255, 255, 255, 0.78);
        line-height: 1.55;
        margin: 0 auto;
        max-width: 720px;
    }

    .edition-label {
        align-items: center;
        color: var(--text-muted);
        display: flex;
        font-size: 0.75rem;
        font-weight: 850;
        gap: 0.8rem;
        letter-spacing: 0.12em;
        margin: 1.6rem 0 0.8rem;
        text-transform: uppercase;
    }

    .rule {
        background: var(--line);
        flex: 1;
        height: 1px;
    }

    .columns {
        display: grid;
        gap: 1rem;
    }

    .column-card {
        background: var(--surface-raised);
        border: 1px solid var(--line);
        border-radius: 14px;
        box-shadow: 0 6px 20px rgba(7, 26, 51, 0.08);
        padding: clamp(1.2rem, 4vw, 2rem);
    }

    .column-card.featured {
        border-top: 4px solid var(--league-blue);
    }

    .card-meta {
        color: var(--text-muted);
        display: flex;
        flex-wrap: wrap;
        font-size: 0.75rem;
        gap: 0.4rem;
        text-transform: uppercase;
    }

    h2 {
        font-family: Georgia, 'Times New Roman', serif;
        font-size: clamp(1.65rem, 4vw, 2.5rem);
        line-height: 1.08;
        margin: 0.65rem 0;
    }

    h2 a {
        color: var(--text-primary);
        text-decoration: none;
    }

    h2 a:hover,
    h2 a:focus-visible {
        color: var(--league-blue);
    }

    .column-card > p {
        color: var(--text-muted);
        line-height: 1.6;
        margin: 0;
    }

    .card-footer {
        align-items: center;
        display: flex;
        justify-content: space-between;
        margin-top: 1.2rem;
    }

    .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.35rem;
    }

    .tags span {
        background: rgba(8, 120, 209, 0.09);
        border-radius: 999px;
        color: var(--league-blue);
        font-size: 0.7rem;
        font-weight: 800;
        padding: 0.3rem 0.55rem;
    }

    .read-column {
        align-items: center;
        color: var(--league-blue);
        display: flex;
        font-weight: 850;
        gap: 0.25rem;
        text-decoration: none;
    }

    .read-column .material-icons {
        font-size: 1rem;
    }

    @media (max-width: 620px) {
        .card-footer {
            align-items: flex-start;
            flex-direction: column;
            gap: 0.9rem;
        }
    }
</style>
