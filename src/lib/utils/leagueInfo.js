/*   STEP 1   */
export const leagueID = "1195403406977851392"; // your league ID
export const leagueName = "Tommy and 11 Losers Dynasty League"; // your league name
export const dues = "50" ; // (optional) used in template constitution page
export const dynasty = true; // true for dynasty leagues, false for redraft and keeper
export const enableBlog = false; // requires VITE_CONTENTFUL_ACCESS_TOKEN and VITE_CONTENTFUL_SPACE environment variables

/*   STEP 2   */
export const homepageText = `

<p>The league leadership has always strived to make this league more than just another fantasy league. From the start, the goal was to build something that felt different, something worth investing in year after year. We wanted to make it special, and we believe we have accomplished that.</p>
<p>Over the last several years, this league has grown in every way that matters. Competition has become tougher, managers more engaged, and the seasons more memorable. Trades spark debate, championships carry real weight, and every decision feels like it matters. It has become the league people prepare for and talk about year round.</p>
<p>Along the way, the league has built its own identity. The banter is constant, the rivalries go beyond the screen, and friendships have been made along the way. That is what separates a good league from a lasting one.</p>
<p>This site exists to reflect that growth. It pulls everything into one place, keeps the league history organized, and preserves the moments that define each season. Matchups update live, transactions are recorded as they happen, and the story of the league keeps building year after year.</p>
<p>This is your league. Take some time to explore the site, revisit the past, and enjoy being part of something that has lasted and continues to grow.</p>
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
       "mode": 'Dynasty', // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
       "rival": null, 
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
       "mode": 'Rebuild', // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
       "rival": null, 
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
       "mode": 'Rebuild', // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
       "rival": null, 
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
       "mode": 'Win Now', // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
       "rival": null, 
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
       "mode": 'Rebuild', // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
       "rival": null, 
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
       "mode": 'Rebuild', // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
       "rival": null, 
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
       "mode": 'Dynasty', // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
       "rival": null, 
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
       "mode": 'Win Now', // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
       "rival": null, 
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
       "mode": 'Win Now', // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
       "rival": null, 
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
       "mode": 'Rebuild', // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
       "rival": null, 
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
       "mode": 'Rebuild', // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
       "rival": null, 
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
       "photo" : null, // square ratio recommended (no larger than 500x500)
       "fantasyStart": null, // (optional) when did the manager start playing fantasy football
       "favoriteTeam" : "chi", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
       "mode": 'Dynasty', // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
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
