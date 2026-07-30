<script>
    export let data;
    const column = data.column;

    const published = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date(column.publishedAt));
</script>

<article class="column-article">
    <a class="back" href="/blog"><span class="material-icons" aria-hidden="true">arrow_back</span> All editions</a>

    <header>
        <p class="publication">The Losers Ledger</p>
        <div class="meta">
            <span>{column.issue}</span><span>•</span><time datetime={column.publishedAt}>{published}</time><span>•</span><span>{column.readTime}</span>
        </div>
        <h1>{column.title}</h1>
        <p class="dek">{column.dek}</p>
        <p class="byline">Written by your overly attentive AI league columnist</p>
    </header>

    <div class="article-body">
        {#each column.sections as section}
            <section>
                <h2>{section.heading}</h2>
                {#each section.paragraphs || [] as paragraph}
                    <p>{paragraph}</p>
                {/each}
                {#if section.bullets}
                    <ul>
                        {#each section.bullets as bullet}<li>{bullet}</li>{/each}
                    </ul>
                {/if}
            </section>
        {/each}
    </div>

    <footer>
        <p>This column is generated for league entertainment. The facts come from Sleeper activity and current NFL reporting; the opinions remain gloriously unnecessary.</p>
        <a href="/blog">Return to The Losers Ledger</a>
    </footer>
</article>

<style>
    .column-article {
        margin: 0 auto 80px;
        max-width: 860px;
        padding: 1.4rem 1rem 0;
        position: relative;
        z-index: 1;
    }

    .back {
        align-items: center;
        color: var(--league-blue);
        display: inline-flex;
        font-weight: 800;
        gap: 0.3rem;
        margin-bottom: 1rem;
        text-decoration: none;
    }

    .back .material-icons {
        font-size: 1rem;
    }

    header {
        background: var(--surface-raised);
        border-top: 6px solid var(--league-gold);
        box-shadow: var(--league-shadow);
        padding: clamp(1.5rem, 5vw, 3.4rem);
        text-align: center;
    }

    .publication {
        color: var(--league-blue);
        font-family: Georgia, 'Times New Roman', serif;
        font-size: 1.05rem;
        font-weight: 800;
        letter-spacing: 0.08em;
        margin: 0 0 0.8rem;
        text-transform: uppercase;
    }

    .meta {
        color: var(--text-muted);
        display: flex;
        flex-wrap: wrap;
        font-size: 0.72rem;
        gap: 0.4rem;
        justify-content: center;
        text-transform: uppercase;
    }

    h1 {
        color: var(--text-primary);
        font-family: Georgia, 'Times New Roman', serif;
        font-size: clamp(2.2rem, 7vw, 4.7rem);
        letter-spacing: -0.045em;
        line-height: 0.98;
        margin: 0.8rem auto;
        max-width: 760px;
    }

    .dek {
        color: var(--text-muted);
        font-size: clamp(1rem, 2.5vw, 1.2rem);
        line-height: 1.55;
        margin: 0 auto;
        max-width: 700px;
    }

    .byline {
        color: var(--text-primary);
        font-size: 0.78rem;
        font-style: italic;
        margin: 1.25rem 0 0;
    }

    .article-body {
        background: var(--surface-raised);
        padding: clamp(1.5rem, 5vw, 3.4rem);
    }

    .article-body section + section {
        border-top: 1px solid var(--line);
        margin-top: 2rem;
        padding-top: 1.7rem;
    }

    h2 {
        color: var(--text-primary);
        font-family: Georgia, 'Times New Roman', serif;
        font-size: clamp(1.45rem, 4vw, 2rem);
        line-height: 1.15;
        margin: 0 0 0.8rem;
    }

    .article-body p,
    li {
        color: var(--text-primary);
        font-family: Georgia, 'Times New Roman', serif;
        font-size: 1.05rem;
        line-height: 1.78;
    }

    .article-body p {
        margin: 0 0 1rem;
    }

    li + li {
        margin-top: 0.65rem;
    }

    footer {
        background: #071a33;
        border-top: 4px solid var(--league-gold);
        color: rgba(255, 255, 255, 0.75);
        padding: 1.25rem clamp(1.5rem, 5vw, 3.4rem);
    }

    footer p {
        font-size: 0.78rem;
        line-height: 1.5;
        margin: 0 0 0.6rem;
    }

    footer a {
        color: var(--league-gold);
        font-weight: 800;
    }
</style>
