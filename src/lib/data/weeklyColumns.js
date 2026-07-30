export const weeklyColumns = [
    {
        slug: '2026-preseason-the-opening-bell',
        issue: '2026 Preseason Edition',
        publishedAt: '2026-07-30T18:00:00.000Z',
        title: 'The Offseason Has Entered the Chat',
        dek: 'Kelce changed lockers, third-round picks changed hands, and training camp supplied just enough anxiety for everyone to start defending their roster in late July.',
        readTime: '6 min read',
        tags: ['Preseason', 'Trades', 'Training Camp'],
        sections: [
            {
                heading: 'The trade desk: Kelce for Pacheco',
                paragraphs: [
                    'Casey sent Travis Kelce to John and brought back Isiah Pacheco, a wonderfully tidy deal between a manager trying to get younger and a manager who looked at the calendar, ignored it, and decided another veteran run sounded delightful.',
                    'For Casey, Pacheco adds another usable running back without asking the roster to wait on tight-end retirement rumors. For John, Kelce is a bet that one more stretch of vintage production is worth more than long-term comfort. If Kelce delivers three monster Sundays, John will cite them as legal precedent through at least 2031.',
                ],
            },
            {
                heading: 'John visited the waiver aisle with a large cart',
                paragraphs: [
                    'The Kelce move was not John’s only bit of business. Jahan Dotson, Noah Gray, and Olamide Zaccheaus all joined the roster in a rapid waiver run. None of those moves needs to become a league-winner by itself. The idea is to create several small chances for one depth-chart surprise to matter.',
                    'It is the dynasty equivalent of buying three mystery boxes and announcing that at least one definitely contains a boat. Maybe. Probably. Please stop asking follow-up questions.',
                ],
            },
            {
                heading: 'Wesley and Jason opened the third-round pick exchange',
                paragraphs: [
                    'Wesley and Jason have spent the offseason moving Isaiah Bond and rearranging 2026 third-round selections. The immediate fantasy impact is modest, but this is how managers quietly reshape the bottom of a roster before everyone suddenly needs rookie-draft ammunition.',
                    'Thirds are dynasty pocket change right up until someone uses one on a player the league spends the next two years pretending it almost drafted.',
                ],
            },
            {
                heading: 'Training-camp weather report',
                paragraphs: [
                    'Jahmyr Gibbs missing practice was quickly downplayed by Detroit, which is welcome news for Casey and for anyone who prefers July without emergency trade offers. The correct response is to monitor it. The traditional dynasty response is to refresh six feeds, send one insulting offer, and call it due diligence.',
                    'Around the league, first-team reps, cautious injury returns, and contract noise are beginning to create real movement. The new Dynasty Wire will keep those stories tied to the managers who actually roster the players, so every piece of camp news can now locate its most anxious audience.',
                ],
            },
            {
                heading: 'Extremely official preseason awards',
                bullets: [
                    'Most likely to call a veteran acquisition “the final piece” before August: John.',
                    'Most likely to receive a bad offer because of one missed practice: Casey.',
                    'Most committed to proving that third-round picks are a liquid currency: Wesley and Jason.',
                    'Best transaction of the week: everyone who resisted making a trade solely because a camp reporter used the phrase “working with the twos.”',
                ],
            },
            {
                heading: 'Final whistle',
                paragraphs: [
                    'There are no standings to overreact to yet, but the league is already moving. Veterans are changing teams, benches are being churned, and every manager remains undefeated in the version of the season currently playing inside their own head.',
                    'Enjoy it while it lasts. Actual scores are coming, and actual scores have never cared about anyone’s offseason victory lap.',
                ],
            },
        ],
    },
];

export const getWeeklyColumn = (slug) => weeklyColumns.find((column) => column.slug === slug);
