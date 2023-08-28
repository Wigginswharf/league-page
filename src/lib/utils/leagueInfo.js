/*   STEP 1   */
export const leagueID = "917964226944344064"; // your league ID
export const leagueName = "Brandon and 11 Losers Dynasty League"; // your league name
export const dues = 100; // (optional) used in template constitution page
export const dynasty = true; // true for dynasty leagues, false for redraft and keeper
export const enableBlog = false; // requires VITE_CONTENTFUL_ACCESS_TOKEN and VITE_CONTENTFUL_SPACE environment variables

/*   STEP 2   */
export const homepageText = `
  <p>This is something that I have always wanted for us. Everyone of you has agreed to not just a commitment to your team, but also this league. And based on the fact that every year has felt more and more fun, you all have lived up to that commitment.</p>
  <p>We have told you all from the start that it’s the League Leaders position that we want to do things that separate this league not from just our big redraft league, but all the other leagues you all might be in. This site is a product of that belief, and I think it will do nothing but help everyone of you feel the same way that I do, which is that the “Brandon and 11 Losers Dynasty League” is your MAIN league and something special.</p>
  <p>This webpage will update with every transaction and every event as they happen. The matchup page will even keep up with scores as they happen! I’ll try to keep up with a weekly blog, and there are links to useful tools to help you, and a link to the league podcast that Brandon and I do (more episodes coming soon).  There are some additional links that I am looking at putting up, but for right now those are being kept under wraps. </p>
  <p>This page is for you! Now browser around, and have fun!!</p>
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
       "roster": null,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
       "managerID" : "583155865675145216",
       "name" : "Casey AKA: Wigginswharf",
       "tookOver" : null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
       "location" : "Kyle, TX", // (optional)
       "bio": null,
       "photo" : "/managers/Casey.jpg", // square ratio recommended (no larger than 500x500)
       "fantasyStart": null, // (optional) when did the manager start playing fantasy football
       "favoriteTeam" : "hou", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
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
       "managerID" : "589583197881278464",
       "name" : "Frank AKA: TankYeltrab84",
       "tookOver" : null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
       "location" : "Columbus, OH", // (optional)
       "bio": null,
       "photo" : "/managers/Frank.jpg", // square ratio recommended (no larger than 500x500)
       "fantasyStart": null, // (optional) when did the manager start playing fantasy football
       "favoriteTeam": "hou", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
       "mode": null, // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
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
       "roster": null,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
       "managerID" : "728441693690527744",
       "name" : "Brandon AKA: SkipMiller21",
       "tookOver" : "2021", // (optional) used if a manager took over a team, delete this line or change to null otherwise
       "location" : "Martinsville, VA", // (optional)
       "bio": null,
       "photo" : "/managers/Brandon.jpg", // square ratio recommended (no larger than 500x500)
       "fantasyStart": null, // (optional) when did the manager start playing fantasy football
       "favoriteTeam" : "sf", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
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
       "managerID" : "944682001481756672",
       "name" : "Dustin AKA: AustinsFinest",
       "tookOver" : "2023", // (optional) used if a manager took over a team, delete this line or change to null otherwise
       "location" : "Austin, TX", // (optional)
       "bio": null,
       "photo" : "/managers/Dustin.png", // square ratio recommended (no larger than 500x500)
       "fantasyStart": null, // (optional) when did the manager start playing fantasy football
       "favoriteTeam" : "lar", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
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
       "managerID" : "589601150253174784",
       "name" : "Wesley AKA: yelsewnosredna",
       "tookOver" : null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
       "location" : "Corpus Christi, TX", // (optional)
       "bio": null,
       "photo" : "/managers/Wesley.jpg", // square ratio recommended (no larger than 500x500)
       "fantasyStart": null, // (optional) when did the manager start playing fantasy football
       "favoriteTeam" : "pit", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
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
       "managerID" : "600715849812205568",
       "name" : "Kevin AKA: kmwilson1979",
       "tookOver" : "2023", // (optional) used if a manager took over a team, delete this line or change to null otherwise
       "location" : "Round Rock, TX", // (optional)
       "bio": null,
       "photo" : "/managers/Kevin.jpg", // square ratio recommended (no larger than 500x500)
       "fantasyStart": null, // (optional) when did the manager start playing fantasy football
       "favoriteTeam" : "det", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
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
       "managerID" : "600756890296721408",
       "name" : "John AKA: texfsu",
       "tookOver" : null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
       "location" : "Kyle, TX", // (optional)
       "bio": null,
       "photo" : "/managers/John.jpg", // square ratio recommended (no larger than 500x500)
       "fantasyStart": null, // (optional) when did the manager start playing fantasy football
       "favoriteTeam" : "dal", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
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
     {
       "roster": null,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
       "managerID" : "602288488179638272",
       "name" : "Josh AKA: Lamarjackedson",
       "tookOver" : null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
       "location" : "Austin, TX", // (optional)
       "bio": null,
       "photo" : "/managers/Josh.jpg", // square ratio recommended (no larger than 500x500)
       "fantasyStart": null, // (optional) when did the manager start playing fantasy football
       "favoriteTeam": "bal", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
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
       "managerID" : "714591495570685952",
       "name" : "Jason AKA: kucerajd",
       "tookOver" : "2021", // (optional) used if a manager took over a team, delete this line or change to null otherwise
       "location" : "Houston, TX", // (optional)
       "bio": null,
       "photo" : "/managers/Jason.jpg", // square ratio recommended (no larger than 500x500)
       "fantasyStart": null, // (optional) when did the manager start playing fantasy football
       "favoriteTeam": "hou", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
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
       "managerID" : "733433398265257984",
       "name" : "Keller AKA: KillerRook",
       "tookOver" : null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
       "location" : "Robstown, TX", // (optional)
       "bio": null,
       "photo" : "/managers/Keller.jpg", // square ratio recommended (no larger than 500x500)
       "fantasyStart": null, // (optional) when did the manager start playing fantasy football
       "favoriteTeam": "phi", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
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
     {
       "roster": null,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
       "managerID" : "944682001481756672",
       "name" : "Brittany AKA: Badkins19",
       "tookOver" : "2023", // (optional) used if a manager took over a team, delete this line or change to null otherwise
       "location" : "Martinsville, VA", // (optional)
       "bio": null,
       "photo" : null, // square ratio recommended (no larger than 500x500)
       "fantasyStart": null, // (optional) when did the manager start playing fantasy football
       "favoriteTeam" : "ic", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
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
