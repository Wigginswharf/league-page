import { error } from '@sveltejs/kit';
import { getWeeklyColumn } from '$lib/data/weeklyColumns';

export function load({ params }) {
    const column = getWeeklyColumn(params.slug);
    if(!column) throw error(404, 'That edition could not be found.');

    return { column };
}
