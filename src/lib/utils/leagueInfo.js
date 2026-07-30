/*   STEP 1   */
export const leagueID = "1328790608113840128"; // your league ID
export const leagueName = "Tommy and 11 Losers Dynasty League"; // your league name
export const dues = "50" ; // (optional) used in template constitution page
export const dynasty = true; // true for dynasty leagues, false for redraft and keeper
export const enableBlog = true; // weekly league columns are stored in src/lib/data/weeklyColumns.js

/*   STEP 2   */
export const homepageText = `

<p><strong>The league leadership has always strived to make this league more than just another fantasy league. From the start, the goal was to build something that felt different, something worth investing in year after year. We wanted to make it special, and we believe we have accomplished that.</strong></p>
<p>As the league has grown, the site has grown with it. What began as a place to keep the basics organized has been rebuilt into a true one-stop shop for the league. Live matchups, standings, rosters, transactions, draft information, records, championships, and league history now live together in one place, making it easier to follow the season, settle an argument, revisit the past, or start the next trade conversation.</p>
<p>The manager experience has also been expanded to give every team more personality. Updated manager profiles highlight rivalries and league history, while the team-direction tool gives each roster a current outlook based on its players and draft picks. The goal is not to make decisions for anyone. It is to give managers another way to understand where their team stands, compare it with the rest of the league, and create a little more conversation along the way.</p>
<p>The new Dynasty Wire brings player news, injuries, roster moves, and dynasty stories into a single live feed. Managers can filter it to their own roster and quickly see which real-world NFL developments may affect their team. The Losers Ledger takes things a step further with a weekly league column covering results, trades, waiver moves, NFL news, and the occasional decision that deserves to be remembered for reasons both good and unfortunate.</p>
<p>Every addition has been made with the same purpose: make the league easier to follow, more fun to talk about, and more engaging throughout the entire year. The site should be useful on game day, during trade season, before the rookie draft, and in the quiet weeks when someone inevitably talks themselves into a breakout that may or may not exist.</p>
<p>This is still your league, and the site will continue to evolve with it. Explore the new tools, revisit the moments that built the league, follow what is happening now, and keep an eye out—there may still be a few more upgrades arriving before the season begins.</p>
`;




/*   STEP 3   */
/*
3 managers as an example. Uncomment (remove the //) before each line to make it live code
If you're having trouble, reference the Training Wheels' Manager Section
https://github.com/nmelhado/league-page/blob/master/TRAINING_WHEELS.md#ii-adding-managers-and-changing-the-homepage-text
*/

// To omit an optional field, set it's value to null

export const managers = [
     {
       "roster": "1",  // ID of the roster that the manager manages (look at the order of the power rankings graph)
       "managerID" : "583155865675145216",
       "name" : "Casey AKA: Wigginswharf",
       "tookOver" : null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
       "location" : "Kyle, TX", // (optional)
       "bio": null,
       "photo" : "/managers/Casey.jpg", // square ratio recommended (no larger than 500x500)
       "fantasyStart": null, // (optional) when did the manager start playing fantasy football
       "favoriteTeam" : "hou", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
       "mode": 'Win Now', // broad roster mode used by the existing site artwork
       "direction": 'Elite Contender',
       "rival": {
         "name": "Wesley",
         "link": 4,
         "image": "/managers/Wesley.jpg",
         "record": "Casey leads 5–4",
         "note": "Three meetings were decided by 10 points or fewer, including a 0.22-point finish."
       },
       "favoritePlayer": null, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
       "valuePosition": null, // (optional) Favorite position (QB, WR, RB, TE, etc.)
       "rookieOrVets": null, // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
       "philosophy": null,
       "tradingScale": null, // 1 - 10
       "preferredContact": null, // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
     },
     {
       "roster": "4",  // ID of the roster that the manager manages (look at the order of the power rankings graph)
       "managerID" : "589583197881278464",
       "name" : "Frank AKA: TankYeltrab84",
       "tookOver" : null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
       "location" : "Columbus, OH", // (optional)
       "bio": null,
       "photo" : "/managers/Frank.jpg", // square ratio recommended (no larger than 500x500)
       "fantasyStart": null, // (optional) when did the manager start playing fantasy football
       "favoriteTeam": "hou", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
       "mode": 'Rebuild', // broad roster mode used by the existing site artwork
       "direction": 'Rebuilding',
       "rival": {
         "name": "Josh",
         "link": 7,
         "image": "/managers/Josh.jpg",
         "record": "Josh leads 5–2",
         "note": "Four of seven meetings were decided by 10 points or fewer, including a 2.65-point 2023 semifinal."
       },
       "favoritePlayer": null, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
       "valuePosition": null, // (optional) Favorite position (QB, WR, RB, TE, etc.)
       "rookieOrVets": null, // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
       "philosophy": null,
       "tradingScale": null, // 1 - 10
       "preferredContact": null, // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
     },
  
  
  /*   !!  !!  IMPORTANT  !!  !! */
  /*
  Below is the most up to-date version of a manager. Please leave this commented out
  and don't delete it. This will be updated if any fields are added, removed or changed
  and will allow updates without causing merge conflicts
  */
  
     {
       "roster": "8",  // ID of the roster that the manager manages (look at the order of the power rankings graph)
       "managerID" : "728441693690527744",
       "name" : "Brandon AKA: SkipMiller21",
       "tookOver" : "2021", // (optional) used if a manager took over a team, delete this line or change to null otherwise
       "location" : "Martinsville, VA", // (optional)
       "bio": null,
       "photo" : "/managers/Brandon.jpg", // square ratio recommended (no larger than 500x500)
       "fantasyStart": null, // (optional) when did the manager start playing fantasy football
       "favoriteTeam" : "sf", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
       "mode": 'Dynasty', // broad roster mode used by the existing site artwork
       "direction": 'Retooling',
       "rival": {
         "name": "John",
         "link": 6,
         "image": "/managers/John.jpg",
         "record": "Brandon leads 5–3",
         "note": "Brandon won the 2021 and 2022 championships; John answered with a 2.95-point playoff win in 2024."
       },
       "favoritePlayer": null, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
       "valuePosition": null, // (optional) Favorite position (QB, WR, RB, TE, etc.)
       "rookieOrVets": null, // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
       "philosophy": null,
       "tradingScale": null, // 1 - 10
       "preferredContact": null, // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
     },
     {
       "roster": "7",  // ID of the roster that the manager manages (look at the order of the power rankings graph)
       "managerID" : "944682001481756672",
       "name" : "Dustin AKA: AustinsFinest",
       "tookOver" : "2023", // (optional) used if a manager took over a team, delete this line or change to null otherwise
       "location" : "Round Rock, TX", // (optional)
       "bio": null,
       "photo" : "/managers/Dustin.png", // square ratio recommended (no larger than 500x500)
       "fantasyStart": null, // (optional) when did the manager start playing fantasy football
       "favoriteTeam" : "lar", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
       "mode": 'Dynasty', // broad roster mode used by the existing site artwork
       "direction": 'Retooling',
       "rival": {
         "name": "Tommy",
         "link": 11,
         "image": "/managers/Tommy.jpg",
         "record": "Dustin leads 3–2",
         "note": "A balanced, entirely recent five-game series with room to grow."
       },
       "favoritePlayer": null, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
       "valuePosition": null, // (optional) Favorite position (QB, WR, RB, TE, etc.)
       "rookieOrVets": null, // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
       "philosophy": null,
       "tradingScale": null, // 1 - 10
       "preferredContact": null, // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
     },
     {
       "roster": "3",  // ID of the roster that the manager manages (look at the order of the power rankings graph)
       "managerID" : "589601150253174784",
       "name" : "Wesley AKA: yelsewnosredna",
       "tookOver" : null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
       "location" : "Corpus Christi, TX", // (optional)
       "bio": null,
       "photo" : "/managers/Wesley.jpg", // square ratio recommended (no larger than 500x500)
       "fantasyStart": null, // (optional) when did the manager start playing fantasy football
       "favoriteTeam" : "pit", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
       "mode": 'Dynasty', // broad roster mode used by the existing site artwork
       "direction": 'Retooling',
       "rival": {
         "name": "Casey",
         "link": 0,
         "image": "/managers/Casey.jpg",
         "record": "Casey leads 5–4",
         "note": "Three meetings were decided by 10 points or fewer, including a 0.22-point finish."
       },
       "favoritePlayer": null, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
       "valuePosition": null, // (optional) Favorite position (QB, WR, RB, TE, etc.)
       "rookieOrVets": null, // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
       "philosophy": null,
       "tradingScale": null, // 1 - 10
       "preferredContact": null, // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
     },
     {
       "roster": "12",  // ID of the roster that the manager manages (look at the order of the power rankings graph)
       "managerID" : "600715849812205568",
       "name" : "Kevin AKA: kmwilson1979",
       "tookOver" : "2023", // (optional) used if a manager took over a team, delete this line or change to null otherwise
       "location" : "Round Rock, TX", // (optional)
       "bio": null,
       "photo" : "/managers/Kevin.jpg", // square ratio recommended (no larger than 500x500)
       "fantasyStart": null, // (optional) when did the manager start playing fantasy football
       "favoriteTeam" : "det", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
       "mode": 'Dynasty', // broad roster mode used by the existing site artwork
       "direction": 'Contender',
       "rival": {
         "name": "Jason",
         "link": 8,
         "image": "/managers/Jason.jpg",
         "record": "Series tied 3–3",
         "note": "Four consecutive regular-season meetings were decided by 21 points or fewer."
       },
       "favoritePlayer": null, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
       "valuePosition": null, // (optional) Favorite position (QB, WR, RB, TE, etc.)
       "rookieOrVets": null, // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
       "philosophy": null,
       "tradingScale": null, // 1 - 10
       "preferredContact": null, // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
     },
     {
       "roster": "11",  // ID of the roster that the manager manages (look at the order of the power rankings graph)
       "managerID" : "600756890296721408",
       "name" : "John AKA: texfsu",
       "tookOver" : null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
       "location" : "Kyle, TX", // (optional)
       "bio": null,
       "photo" : "/managers/John.jpg", // square ratio recommended (no larger than 500x500)
       "fantasyStart": null, // (optional) when did the manager start playing fantasy football
       "favoriteTeam" : "dal", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
       "mode": 'Win Now', // broad roster mode used by the existing site artwork
       "direction": 'Contender',
       "rival": {
         "name": "Brandon",
         "link": 2,
         "image": "/managers/Brandon.jpg",
         "record": "Brandon leads 5–3",
         "note": "Brandon won the 2021 and 2022 championships; John answered with a 2.95-point playoff win in 2024."
       },
       "favoritePlayer": null, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
       "valuePosition": null, // (optional) Favorite position (QB, WR, RB, TE, etc.)
       "rookieOrVets": null, // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
       "philosophy": null,
       "tradingScale": null, // 1 - 10
       "preferredContact": null, // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
     },
     {
       "roster": "10",  // ID of the roster that the manager manages (look at the order of the power rankings graph)
       "managerID" : "602288488179638272",
       "name" : "Josh AKA: Lamarjackedson",
       "tookOver" : null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
       "location" : "Austin, TX", // (optional)
       "bio": null,
       "photo" : "/managers/Josh.jpg", // square ratio recommended (no larger than 500x500)
       "fantasyStart": null, // (optional) when did the manager start playing fantasy football
       "favoriteTeam": "bal", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
       "mode": 'Win Now', // broad roster mode used by the existing site artwork
       "direction": 'Contender',
       "rival": {
         "name": "Frank",
         "link": 1,
         "image": "/managers/Frank.jpg",
         "record": "Josh leads 5–2",
         "note": "Four of seven meetings were decided by 10 points or fewer, including a 2.65-point 2023 semifinal."
       },
       "favoritePlayer": null, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
       "valuePosition": null, // (optional) Favorite position (QB, WR, RB, TE, etc.)
       "rookieOrVets": null, // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
       "philosophy": null,
       "tradingScale": null, // 1 - 10
       "preferredContact": null, // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
     },
     {
       "roster": "6",  // ID of the roster that the manager manages (look at the order of the power rankings graph)
       "managerID" : "714591495570685952",
       "name" : "Jason AKA: kucerajd",
       "tookOver" : "2021", // (optional) used if a manager took over a team, delete this line or change to null otherwise
       "location" : "Houston, TX", // (optional)
       "bio": null,
       "photo" : "/managers/Jason.jpg", // square ratio recommended (no larger than 500x500)
       "fantasyStart": null, // (optional) when did the manager start playing fantasy football
       "favoriteTeam": "hou", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
       "mode": 'Win Now', // broad roster mode used by the existing site artwork
       "direction": 'Contender',
       "rival": {
         "name": "Kevin",
         "link": 5,
         "image": "/managers/Kevin.jpg",
         "record": "Series tied 3–3",
         "note": "Four consecutive regular-season meetings were decided by 21 points or fewer."
       },
       "favoritePlayer": null, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
       "valuePosition": null, // (optional) Favorite position (QB, WR, RB, TE, etc.)
       "rookieOrVets": null, // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
       "philosophy": null,
       "tradingScale": null, // 1 - 10
       "preferredContact": null, // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
     },
     {
       "roster": "2",  // ID of the roster that the manager manages (look at the order of the power rankings graph)
       "managerID" : "733433398265257984",
       "name" : "Keller AKA: KillerRook",
       "tookOver" : null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
       "location" : "Robstown, TX", // (optional)
       "bio": null,
       "photo" : "/managers/Keller.jpg", // square ratio recommended (no larger than 500x500)
       "fantasyStart": null, // (optional) when did the manager start playing fantasy football
       "favoriteTeam": "phi", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
       "mode": 'Rebuild', // broad roster mode used by the existing site artwork
       "direction": 'Rebuilding',
       "rival": {
         "name": "Brittany",
         "link": 10,
         "image": "/managers/Brittany.jpg",
         "record": "Brittany leads 5–2",
         "note": "Three meetings were decided by 10 points or fewer, with both managers earning close wins."
       },
       "favoritePlayer": null, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
       "valuePosition": null, // (optional) Favorite position (QB, WR, RB, TE, etc.)
       "rookieOrVets": null, // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
       "philosophy": null,
       "tradingScale": null, // 1 - 10
       "preferredContact": null, // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
     },
     {
       "roster": "5",  // ID of the roster that the manager manages (look at the order of the power rankings graph)
       "managerID" : "737157452918829056",
       "name" : "Brittany AKA: Badkins19",
       "tookOver" : "2023", // (optional) used if a manager took over a team, delete this line or change to null otherwise
       "location" : "Martinsville, VA", // (optional)
       "bio": null,
       "photo" : "/managers/Brittany.jpg", // square ratio recommended (no larger than 500x500)
       "fantasyStart": null, // (optional) when did the manager start playing fantasy football
       "favoriteTeam" : "ind", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
       "mode": 'Dynasty', // broad roster mode used by the existing site artwork
       "direction": 'Retooling',
       "rival": {
         "name": "Keller",
         "link": 9,
         "image": "/managers/Keller.jpg",
         "record": "Brittany leads 5–2",
         "note": "Three meetings were decided by 10 points or fewer, with both managers earning close wins."
       },
       "favoritePlayer": null, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
       "valuePosition": null, // (optional) Favorite position (QB, WR, RB, TE, etc.)
       "rookieOrVets": null, // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
       "philosophy": null,
       "tradingScale": null, // 1 - 10
       "preferredContact": null, // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
     },
     {
       "roster": "9",  // ID of the roster that the manager manages (look at the order of the power rankings graph)
       "managerID" : "463200138039390208",
       "name" : "Tommy AKA: BeardedDingus13",
       "tookOver" : "2023", // (optional) used if a manager took over a team, delete this line or change to null otherwise
       "location" : "St. Louis, MO", // (optional)
       "bio": null,
       "photo" : "/managers/Tommy.jpg", // square ratio recommended (no larger than 500x500)
       "fantasyStart": null, // (optional) when did the manager start playing fantasy football
       "favoriteTeam" : "chi", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
       "mode": 'Dynasty', // broad roster mode used by the existing site artwork
       "direction": 'Elite Contender',
       "rival": {
         "name": "Dustin",
         "link": 3,
         "image": "/managers/Dustin.png",
         "record": "Dustin leads 3–2",
         "note": "A balanced, entirely recent five-game series with room to grow."
       },
       "favoritePlayer": null, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
       "valuePosition": null, // (optional) Favorite position (QB, WR, RB, TE, etc.)
       "rookieOrVets": null, // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
       "philosophy": null,
       "tradingScale": null, // 1 - 10
       "preferredContact": null, // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
     },
     {
       "roster": null,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
       "managerID" : "603362066274783232",
       "name" : "Sheldon AKA: sheldoneden",
       "tookOver" : null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
       "location" : "Georgewest, TX", // (optional)
       "bio": null,
       "photo" : "/managers/Sheldon.jpg", // square ratio recommended (no larger than 500x500)
       "fantasyStart": null, // (optional) when did the manager start playing fantasy football
       "favoriteTeam": "dal", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
       "mode": null, // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
       "rival": null, 
       "favoritePlayer": null, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
       "valuePosition": null, // (optional) Favorite position (QB, WR, RB, TE, etc.)
       "rookieOrVets": null, // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
       "philosophy": null,
       "tradingScale": null, // 1 - 10
       "preferredContact": null, // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
     }, 
     {
       "roster": null,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
       "managerID" : "601781454250250240",
       "name" : "Will AKA: willebrill",
       "tookOver" : null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
       "location" : "Austin, TX", // (optional)
       "bio": null,
       "photo" : "/managers/Will.jpg", // square ratio recommended (no larger than 500x500)
       "fantasyStart": null, // (optional) when did the manager start playing fantasy football
       "favoriteTeam": "jax", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
       "mode": null, // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
       "rival": null, 
       "favoritePlayer": null, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
       "valuePosition": null, // (optional) Favorite position (QB, WR, RB, TE, etc.)
       "rookieOrVets": null, // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
       "philosophy": null,
       "tradingScale": null, // 1 - 10
       "preferredContact": null, // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
     },
]
