import { news } from '$lib/stores';

const SERVER_API = '/api/fetch_serverside_news';

export const getNews = async (servFetch, bypass = false) => {
    const smartFetch = servFetch ?? fetch;
    const response = await smartFetch(SERVER_API, {
        headers: bypass ? { 'cache-control': 'no-cache' } : {},
    });
    if(!response.ok) throw new Error(`News feed returned ${response.status}`);

    const payload = await response.json();
    const articles = Array.isArray(payload) ? payload : payload.articles || [];
    news.set(articles);

    return {
        articles,
        teams: payload.teams || [],
        fresh: true,
        updatedAt: payload.updatedAt || new Date().toISOString(),
        sourcesOnline: payload.sourcesOnline,
        sourcesTotal: payload.sourcesTotal,
    };
};

export const stringDate = (date) => new Intl.DateTimeFormat('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
}).format(date);
