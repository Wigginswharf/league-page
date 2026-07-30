import { getNews } from '$lib/utils/helper';

export async function load({ fetch }) {
    return {
        articlesData: getNews(fetch),
    };
}
