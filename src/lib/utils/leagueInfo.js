/*   STEP 1   */
export const leagueID = "1195403406977851392"; // your league ID
export const leagueName = "Tommy and 11 Losers Dynasty League"; // your league name
export const dues = "50" ; // (optional) used in template constitution page
export const dynasty = true; // true for dynasty leagues, false for redraft and keeper
export const enableBlog = false; // requires VITE_CONTENTFUL_ACCESS_TOKEN and VITE_CONTENTFUL_SPACE environment variables

/*   STEP 2   */
export const homepageText = `
<p>This league has grown into something special, and that did not happen by accident. Every one of you has committed not just to managing a team, but to investing in the league itself. Year after year, the competition has gotten sharper, the storylines richer, and the experience more fun. That is because of the people in it.</p>
<p>From the beginning, the goal of the League Leaders has been simple. Make this league stand apart. Not just from our redraft league, but from every other league you might be part of. This site exists because of that mindset. It is here to reinforce what we already know. The Tommy and 11 Losers Dynasty League is not just another league. It is the main one.</p>
<p>This page updates alongside the league itself, tracking transactions, matchups, and key moments as they happen. You will find tools to help you manage your team, follow the action, and stay plugged into what is going on across the league. New additions will continue to roll out as the league evolves.</p>
<p>This space is built for you. Take a look around, dig into the data, relive the moments, and enjoy the league we have built together.</p>
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
       "location" : "Kyle, TX", // (optional)
       "photo" : "/managers/Casey.jpg", // square ratio recommended (no larger than 500x500)
       "favoriteTeam" : "hou", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
       "championships" : "2024"
     },
     {
       "roster": "4",  // ID of the roster that the manager manages (look at the order of the power rankings graph)
       "managerID" : "589583197881278464",
       "name" : "Frank AKA: TankYeltrab84",
       "location" : "Columbus, OH", // (optional)
       "photo" : "/managers/Frank.jpg", // square ratio recommended (no larger than 500x500)
       "championships": "2020", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
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
       "photo" : "/managers/Brandon.jpg", // square ratio recommended (no larger than 500x500)
       "favoriteTeam" : "sf", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
       "championships": "2021, 2022", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
     },
     {
       "roster": "7",  // ID of the roster that the manager manages (look at the order of the power rankings graph)
       "managerID" : "944682001481756672",
       "name" : "Dustin AKA: AustinsFinest",
       "tookOver" : "2023", // (optional) used if a manager took over a team, delete this line or change to null otherwise
       "location" : "Austin, TX", // (optional)
       "photo" : "/managers/Dustin.png", // square ratio recommended (no larger than 500x500)
       "favoriteTeam" : "lar", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
     },
     {
       "roster": "3",  // ID of the roster that the manager manages (look at the order of the power rankings graph)
       "managerID" : "589601150253174784",
       "name" : "Wesley AKA: yelsewnosredna",
       "location" : "Corpus Christi, TX", // (optional)
       "photo" : "/managers/Wesley.jpg", // square ratio recommended (no larger than 500x500)
       "favoriteTeam" : "pit", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
     },
     {
       "roster": "12",  // ID of the roster that the manager manages (look at the order of the power rankings graph)
       "managerID" : "600715849812205568",
       "name" : "Kevin AKA: kmwilson1979",
       "tookOver" : "2023", // (optional) used if a manager took over a team, delete this line or change to null otherwise
       "location" : "Round Rock, TX", // (optional)
       "photo" : "/managers/Kevin.jpg", // square ratio recommended (no larger than 500x500)
       "favoriteTeam" : "det", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
     },
     {
       "roster": "11",  // ID of the roster that the manager manages (look at the order of the power rankings graph)
       "managerID" : "600756890296721408",
       "name" : "John AKA: texfsu",
       "location" : "Kyle, TX", // (optional)
       "photo" : "/managers/John.jpg", // square ratio recommended (no larger than 500x500)
       "favoriteTeam" : "dal", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
       "championshp": "2023", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
     },
     {
       "roster": "10",  // ID of the roster that the manager manages (look at the order of the power rankings graph)
       "managerID" : "602288488179638272",
       "name" : "Josh AKA: Lamarjackedson",
       "location" : "Austin, TX", // (optional)
       "photo" : "/managers/Josh.jpg", // square ratio recommended (no larger than 500x500)
       "favoriteTeam": "bal", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
     },
     {
       "roster": "6",  // ID of the roster that the manager manages (look at the order of the power rankings graph)
       "managerID" : "714591495570685952",
       "name" : "Jason AKA: kucerajd",
       "tookOver" : "2021", // (optional) used if a manager took over a team, delete this line or change to null otherwise
       "location" : "Houston, TX", // (optional)
       "photo" : "/managers/Jason.jpg", // square ratio recommended (no larger than 500x500)
       "favoriteTeam": "hou", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
     },
     {
       "roster": "2",  // ID of the roster that the manager manages (look at the order of the power rankings graph)
       "managerID" : "733433398265257984",
       "name" : "Keller AKA: KillerRook",
       "location" : "Robstown, TX", // (optional)
       "photo" : "/managers/Keller.jpg", // square ratio recommended (no larger than 500x500)
       "favoriteTeam": "phi", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
     },
     {
       "roster": "5",  // ID of the roster that the manager manages (look at the order of the power rankings graph)
       "managerID" : "737157452918829056",
       "name" : "Brittany AKA: Badkins19",
       "tookOver" : "2023", // (optional) used if a manager took over a team, delete this line or change to null otherwise
       "location" : "Martinsville, VA", // (optional)
       "photo" : "/managers/Brittany.jpg", // square ratio recommended (no larger than 500x500)
       "favoriteTeam" : "ind", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
     },
     {
       "roster": "9",  // ID of the roster that the manager manages (look at the order of the power rankings graph)
       "managerID" : "463200138039390208",
       "name" : "Tommy AKA: BeardedDingus13",
       "tookOver" : "2023", // (optional) used if a manager took over a team, delete this line or change to null otherwise
       "location" : "St. Louis, MO", // (optional)
       "photo" : null, // square ratio recommended (no larger than 500x500)
       "favoriteTeam" : "chi", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
       "championships": "2025", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
     },
     {
       "managerID" : "603362066274783232",
       "name" : "Sheldon AKA: sheldoneden",
       "location" : "Georgewest, TX", // (optional)
       "photo" : "/managers/Sheldon.jpg", // square ratio recommended (no larger than 500x500)
       "favoriteTeam": "dal", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
     }, 
     {
       "managerID" : "601781454250250240",
       "name" : "Will AKA: willebrill",
       "location" : "Austin, TX", // (optional)
       "photo" : "/managers/Will.jpg", // square ratio recommended (no larger than 500x500)
       "favoriteTeam": "jax", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
     },
]
