import { XMLParser, XMLValidator } from 'fast-xml-parser';
import { json } from '@sveltejs/kit';

const FEEDS = [
    {
        name: 'RotoWire',
        url: 'https://www.rotowire.com/rss/news.php?sport=NFL',
        focus: 'Fantasy',
    },
    {
        name: 'Dynasty League Football',
        url: 'https://dynastyleaguefootball.com/feed/',
        focus: 'Dynasty',
    },
    {
        name: 'Dynasty Nerds',
        url: 'https://www.dynastynerds.com/feed/',
        focus: 'Dynasty',
    },
    {
        name: 'Fantasy Footballers',
        url: 'https://thefantasyfootballers.libsyn.com/fantasyfootball',
        focus: 'Fantasy',
    },
];

const textValue = (value) => {
    if(typeof value === 'string' || typeof value === 'number') return String(value);
    if(Array.isArray(value)) return textValue(value[0]);
    if(value && typeof value === 'object') return String(value['#text'] || value.href || '');
    return '';
};

const cleanText = (value) => textValue(value)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;|&#160;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;|&#34;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&hellip;|&#8230;/gi, '…')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/\s+/g, ' ')
    .replace(/Visit RotoWire\.com.*$/i, '')
    .trim();

const truncate = (value, length = 260) => {
    if(value.length <= length) return value;
    const shortened = value.slice(0, length + 1).replace(/\s+\S*$/, '');
    return `${shortened}…`;
};

const categorize = (title, summary, focus) => {
    const copy = `${title} ${summary}`.toLowerCase();
    if(/injur|surgery|out for|questionable|doubtful|return from|recover|acl|hamstring|concussion|\b(foot|knee|ankle|shoulder|calf|groin)\b/.test(copy)) {
        return 'Injuries';
    }
    if(/trade|traded|signs|signed|released|waived|claimed|extension|contract|joins|acquire|roster move/.test(copy)) {
        return 'Moves';
    }
    if(focus === 'Dynasty' || /dynasty|rookie|prospect|devy|draft class|breakout|buy low|sell high/.test(copy)) {
        return 'Dynasty';
    }
    return 'Player News';
};

const getLink = (item) => {
    const link = item.link;
    if(Array.isArray(link)) {
        const alternate = link.find((entry) => entry?.rel === 'alternate') || link[0];
        return textValue(alternate);
    }
    return textValue(link || item.guid);
};

const parseFeed = async (feed) => {
    const response = await fetch(feed.url, {
        headers: { 'user-agent': 'TommyAnd11LosersDynastyNews/1.0' },
    });
    if(!response.ok) throw new Error(`${feed.name} returned ${response.status}`);

    const xml = await response.text();
    if(XMLValidator.validate(xml) !== true) throw new Error(`${feed.name} returned invalid XML`);

    const parsed = new XMLParser({ ignoreAttributes: false }).parse(xml);
    const items = parsed.rss?.channel?.item || parsed.feed?.entry || [];
    return (Array.isArray(items) ? items : [items]).slice(0, 18).map((item) => {
        const title = cleanText(item.title);
        const summary = truncate(cleanText(item.description || item.summary || item.content || item['content:encoded']));
        const published = textValue(item.pubDate || item.published || item.updated || item['dc:date']);
        const ts = Date.parse(published) || Date.now();
        return {
            id: `${feed.name}-${textValue(item.guid || item.id || getLink(item) || title)}`,
            title,
            summary,
            link: getLink(item),
            source: feed.name,
            category: categorize(title, summary, feed.focus),
            ts,
        };
    }).filter((article) => article.title && article.link);
};

export async function GET() {
    const results = await Promise.allSettled(FEEDS.map(parseFeed));

    const seen = new Set();
    const articles = results
        .filter((result) => result.status === 'fulfilled')
        .flatMap((result) => result.value)
        .sort((a, b) => b.ts - a.ts)
        .filter((article) => {
            const key = article.title.toLowerCase().replace(/[^a-z0-9]/g, '');
            if(seen.has(key)) return false;
            seen.add(key);
            return true;
        })
        .slice(0, 60);

    return json({
        articles,
        updatedAt: new Date().toISOString(),
        sourcesOnline: results.filter((result) => result.status === 'fulfilled').length,
        sourcesTotal: results.length,
    }, {
        headers: {
            'cache-control': 'public, max-age=300, s-maxage=900, stale-while-revalidate=3600',
        },
    });
}
