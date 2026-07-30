<script>
    export let category = 'Retooling';
    export let summary = '';
    export let large = false;

    const badgeInfo = {
        'Elite Contender': { symbol: '♛', className: 'elite' },
        'Contender': { symbol: '★', className: 'contender' },
        'Retooling': { symbol: '⚙', className: 'retooling' },
        'Rebuilding': { symbol: '▦', className: 'rebuilding' },
    };

    $: info = badgeInfo[category] || badgeInfo.Retooling;
</script>

<span
    class:large
    class="directionBadge {info.className}"
    title={summary || category}
    aria-label={`${category}${summary ? `: ${summary}` : ''}`}
>
    <span aria-hidden="true">{info.symbol}</span>
</span>

<style>
    .directionBadge {
        display: inline-flex;
        width: 40px;
        height: 44px;
        justify-content: center;
        align-items: center;
        clip-path: polygon(50% 0, 94% 16%, 86% 72%, 50% 100%, 14% 72%, 6% 16%);
        color: white;
        font-size: 22px;
        line-height: 1;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.45);
        filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.3));
    }

    .large {
        width: 70px;
        height: 76px;
        font-size: 38px;
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
</style>
