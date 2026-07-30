<script>
    export let category = 'Retooling';
    export let summary = '';
    export let playerAssets = '';
    export let draftAssets = '';
    export let overview = '';
    export let large = false;

    const badgeInfo = {
        'Elite Contender': { symbol: '♛', className: 'elite' },
        'Contender': { symbol: '★', className: 'contender' },
        'Retooling': { symbol: '⚙', className: 'retooling' },
        'Rebuilding': { symbol: '▦', className: 'rebuilding' },
    };

    $: info = badgeInfo[category] || badgeInfo.Retooling;
</script>

<span class:large class="directionControl">
    <button
        type="button"
        class="directionBadge {info.className}"
        aria-label={`${category}. ${overview || summary}`}
        on:click|stopPropagation
    >
        <span aria-hidden="true">{info.symbol}</span>
    </button>
    <span class="directionTooltip" role="tooltip">
        <strong>{category}</strong>
        {#if playerAssets || draftAssets}
            <span class="assetRow">
                <span>Player Assets</span>
                <b>{playerAssets || 'Not ranked'}</b>
            </span>
            <span class="assetRow">
                <span>Draft Assets</span>
                <b>{draftAssets || 'Not ranked'}</b>
            </span>
        {/if}
        <span class="overviewLabel">AI Team Overview</span>
        <span class="overviewText">{overview || summary || 'Team analysis is not currently available.'}</span>
    </span>
</span>

<style>
    .directionControl {
        display: inline-flex;
        position: relative;
    }

    .directionBadge {
        display: inline-flex;
        width: 40px;
        height: 44px;
        padding: 0;
        justify-content: center;
        align-items: center;
        border: 0;
        clip-path: polygon(50% 0, 94% 16%, 86% 72%, 50% 100%, 14% 72%, 6% 16%);
        color: white;
        font-size: 22px;
        line-height: 1;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.45);
        filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.3));
        cursor: help;
    }

    .large .directionBadge {
        width: 70px;
        height: 76px;
        font-size: 38px;
    }

    .directionTooltip {
        position: absolute;
        z-index: 30;
        right: -12px;
        bottom: calc(100% + 12px);
        width: min(310px, calc(100vw - 2rem));
        padding: 0.9rem 1rem;
        border: 1px solid var(--line, #d5d9df);
        border-radius: 0.75rem;
        box-shadow: 0 8px 24px rgba(7, 26, 51, 0.2);
        background: var(--surface-raised, #fff);
        color: var(--text-primary, #25364a);
        font-size: 0.78rem;
        line-height: 1.4;
        text-align: left;
        opacity: 0;
        visibility: hidden;
        transform: translateY(4px);
        transition: opacity 0.15s ease, transform 0.15s ease, visibility 0.15s;
        pointer-events: none;
    }

    .directionTooltip strong,
    .overviewLabel,
    .overviewText,
    .assetRow {
        display: block;
    }

    .directionTooltip strong {
        margin-bottom: 0.65rem;
        color: var(--blueOne, #0878d1);
        font-size: 0.95rem;
    }

    .assetRow {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        padding: 0.25rem 0;
        border-bottom: 1px solid var(--line, #e2e6ea);
    }

    .assetRow b {
        white-space: nowrap;
    }

    .overviewLabel {
        margin-top: 0.75rem;
        color: var(--blueOne, #0878d1);
        font-weight: 700;
    }

    .overviewText {
        margin-top: 0.25rem;
        color: var(--text-muted, #526273);
    }

    .directionControl:hover .directionTooltip,
    .directionControl:focus-within .directionTooltip {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }

    .elite {
        background: linear-gradient(145deg, #ffe58a 0%, #d69a00 55%, #8f5f00 100%);
    }

    .contender {
        background: linear-gradient(145deg, #6ee7b7 0%, #138a69 55%, #075745 100%);
    }

    .retooling {
        background: linear-gradient(145deg, #8dc5ff 0%, #3478bd 55%, #194878 100%);
    }

    .rebuilding {
        background: linear-gradient(145deg, #ffae79 0%, #d65c32 55%, #83311d 100%);
    }

    @media (max-width: 475px) {
        .directionTooltip {
            position: fixed;
            right: 1rem;
            bottom: 1rem;
            left: 1rem;
            width: auto;
        }
    }
</style>
