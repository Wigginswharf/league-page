<script>
    import { dues } from '$lib/utils/helper';
    let one, oneOne, oneOneOne, oneTwo, oneTwoOne, oneTwoTwo, oneTwoThree, oneTwoFour, oneTwoFive, oneThree;
    let two, twoOne, twoTwo, twoThree;
    let three, threeOne;
    let four, fourOne, fourTwo;
    let five, fiveOne;
    let six, sixOne, sixTwo, sixThree;
    let seven, sevenOne, sevenTwo, sevenThree;
    let eight, eightOne;

    const goToSection = (section) => {
        const top = section.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({left: 0, top, behavior: 'smooth'});
    }
</script>

<style>
    .constitution {
        position: relative;
        z-index: 1;
        width: 92%;
        max-width: 800px;
        margin: 8em auto 10em;
    }

    h1 {
        font-size: 2em;
        line-height: 1.2em;
        text-align: center;
        margin: 2em 0 1.5em;
    }

    h2 {
        font-size: 1.5em;
        line-height: 1.2em;
    }

    h3 {
        text-decoration: underline;
        font-size: 1.3em;
        line-height: 1.2em;
    }

    h4 {
        text-decoration: underline;
        margin-left: 2em;
        font-size: 1.2em;
        line-height: 1.2em;
    }

    h5 {
        margin-left: 6em;
        font-size: 0.8em;
        line-height: 1.1em;
    }

    .subBlock {
        margin-left: 2.4em;
    }

    .sectionHeading {
        margin: 4em 0 1.5em;
    }

    .subSectionHeading {
        margin: 1.5em 0 1.5em;
    }

    .underscore {
        text-decoration: underline;
    }

    .right {
        text-align: right;
    }

    .positionMaximums td {
        min-width: 3em;
    }

    .noUnderscore {
        text-decoration: none;
    }

    .clickable {
        cursor: pointer;
    }

    .clickable:hover {
        color: #00316b;
    }

    p {
        color: #777;
    }
</style>

<div class="constitution">
    <h1 class="noUnderscore">A CHAMPION AND 11 LOSERS DYNASTY LEAGUE CONSTITUTION</h1>
    
    <h2 class="noUnderscore">TABLE OF CONTENTS</h2>
    
    <h3 class="noUnderscore clickable" on:click={() => goToSection(one)}>Section 1: Roster</h3>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(oneOne)}>1.1 Positional Breakdown</h4>
            <h5 class="noUnderscore clickable" on:click={() => goToSection(oneOneOne)}>1.1.1 Position Maximums</h5>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(oneTwo)}>1.2 Trading</h4>
            <h5 class="noUnderscore clickable" on:click={() => goToSection(oneTwoOne)}>1.2.1 Trade Collusion</h5>
            <h5 class="noUnderscore clickable" on:click={() => goToSection(oneTwoTwo)}>1.2.2 Lending Players Prohibition</h5>
            <h5 class="noUnderscore clickable" on:click={() => goToSection(oneTwoThree)}>1.2.3 Trade Deadline</h5>
            <h5 class="noUnderscore clickable" on:click={() => goToSection(oneTwoFour)}>1.2.4 Trade Restrictions</h5>
            <h5 class="noUnderscore clickable" on:click={() => goToSection(oneTwoFive)}>1.2.5 Veto/Trade Process</h5>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(oneThree)}>1.3 Waiver Wire</h4>
    
    <h3 class="noUnderscore clickable" on:click={() => goToSection(two)}>Section 2: Drafting</h3>
    
        <h4 class="noUnderscore clickable" on:click={() => goToSection(twoOne)}>2.1 Draft Order</h4>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(twoTwo)}>2.2 Rookie Drafts</h4>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(twoThree)}>2.3 Draft Day Trades</h4>
    
    <h3 class="noUnderscore clickable" on:click={() => goToSection(three)}>Section 3: Scoring System</h3>
    
        <h4 class="noUnderscore clickable" on:click={() => goToSection(threeOne)}>3.1 Voting on Scoring System</h4>
    
    <h3 class="noUnderscore clickable" on:click={() => goToSection(four)}>Section 4: Postseason</h3>
    
        <h4 class="noUnderscore clickable" on:click={() => goToSection(fourOne)}>4.1 Playoffs</h4>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(fourTwo)}>4.2 Playoff Tiebreakers</h4>

    <h3 class="noUnderscore clickable" on:click={() => goToSection(five)}>Section 5: Tanking Policy</h3>
    
        <h4 class="noUnderscore clickable" on:click={() => goToSection(fiveOne)}>5.1 League Tanking Policy</h4>

    <h3 class="noUnderscore clickable" on:click={() => goToSection(six)}>Section 6: Replacing Managers</h3>
    
        <h4 class="noUnderscore clickable" on:click={() => goToSection(sixOne)}>6.1 Removing Managers</h4>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(sixTwo)}>6.2 Replacing Managers</h4>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(sixThree)}>6.3 Replacement Incentive</h4>

    <h3 class="noUnderscore clickable" on:click={() => goToSection(seven)}>Section 7: League Finances</h3>
    
        <h4 class="noUnderscore clickable" on:click={() => goToSection(sevenOne)}>7.1 League Dues</h4>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(sixTwo)}>7.2 Payout</h4>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(sixThree)}>7.3 Raising Dues</h4>
    
    <h3 class="noUnderscore clickable" on:click={() => goToSection(eight)}>Section 8: League Communications</h3>
    
        <h4 class="noUnderscore clickable" on:click={() => goToSection(eightOne)}>8.1 League Slack</h4>
    
    
    <hr />
    
    <h2 class="sectionHeading" bind:this={one}>Section 1 Roster Breakdown</h2>
    
    <h3 class="subSectionHeading" bind:this={oneOne}>1.1 Positional Breakdown</h3>
    
    <p>29 Total Players</p>
    
    <p class="underscore">Starters</p>
    <ul>
        <li>QB</li>
        <li>RB</li>
        <li>RB</li>
        <li>WR</li>
        <li>WR</li>
        <li>TE</li>
        <li>FLEX (RB/WR/TE)</li>
        <li>FLEX (RB/WR/TE)</li>
        <li>D/ST</li>
        <li>K</li>
    </ul>
    
    <p>19 Bench (Will Expand to 20 permanent bench spots in the 2023/2024 offseason, and afterward it will take a league vote of 7 managers or more to expand the benches by one spot. IR spots are converted to bench at the end of the season, and will stay that way until the Monday before the NFL regular season, at which point they will convert back to IR spots.)</p>

    <p>4 IR Spots (Players holding out or listed as questionable are not allowed on IR)</p>
    
        <h4 bind:this={oneOneOne}>1.1.1 Position Maximums</h4>
        
        <div class="subBlock">
             <p>As of 2023 we do not have any Position Maximums, if brought up as a possible change, it would take a league vote of 7 managers or more agreeing to add them.  The League Leaders will make the final decision on roster counts but reserve the right to put each up for a league wide vote.</p> 
            
        </div>


    <h3 class="subSectionHeading" bind:this={oneTwo}>1.2 Trading</h3>
    
    <p>Trading of players and draft picks (up to 3 drafts away) is allowed. In the off season, trades will process after two days, and 1 day during the season. During the processing time a league vote will take place to determine if the League Leaders need to review the trade for possible collusion, six or more votes are needed to trigger a leadership review. League Leaders reserve the right to review any and all trades.</p> 
    <p>If one or more of the League Leaders is involved in the trade, and a review is called for by either league vote or the remaining League Leaders, the league representative and/or their alternate (as of 2023 Wesley Anderson is the league representative, and Kevin Wilson the alternate) will take the place of the League Leaders that are involved with the trade.</p>  
    <p>In the event that a trade needs to be pushed through faster than the alloted review time, the League Leaders (or if needed, the League Representatives) will determine the validity of the trade and rule to process or veto the trade.</p>
    <p>Tradable assets include players, draft picks, and FAAB $.</p>
    
    <h4 bind:this={oneTwoOne}>1.2.1 Trade Collusion</h4>
    <div class="subBlock">
        <p>If any owners are suspected of accepting bribes/offering bribes to enhance their/another owners team via trade, trading any assets other than fantasy players, draft picks, FAAB $, or otherwise found guilty of engaging in any form of collusion*, all parties involved in the trade are susceptible to punishment. The punishments will go as followed:</p>
        
        <ul>
            <li>First Offense – Immediate reduction of FAAB budget by 50% for a total of 18 in season weeks, as well as a 50% FAAB budget penality for the end of season FA signing period. In the event the participants are out of FAAB at the time of being found guilty, the penality will take in to effect at the start of the next season.</li>
            <li>Second Offense – Immediate freeze on all transactions and a league vote will be held on if the manager should be expelled from the league. If the vote allows for the manager to stay in league, the manager will face the penality of having transactions frozen for the next 4 in season weeks AND a loss of their next available 1st round draft pick.</li>
            <li>Third Offense – *Immediate expulsion.</li>
            <li>In the event a Manager leaves the league, any penality they are facing WILL NOT carry over to the new manager.</li>
        </ul>

        <p>All trades that are found guilty of collusion, will be reversed/denied. If the trade had affected the outcome of previous games, the results of those games will be revised.  </p>

        <p>*Collusion includes the organizing of veto votes against an acceptable trade.</p>

        <p>The commissioner will err on the side of letting owners manage their teams the way they see fit. Any collusion will need to be clear. The commissioner reserves the right to step in and at the very least assess the thinking of any team involved in a heavily lop-sided trade. </p>
    </div>

    <h4 bind:this={oneTwoTwo}>1.2.2 Lending Players Prohibition</h4>
    <div class="subBlock">
        <p>Any player traded in season from a team may not be re-acquired via trade within 4 weeks of the original trade unless a managers roster health has been altered AND the compensation is different. Any teams involved in this behavior will be subject to the aforementioned collusion punishments.</p>
    </div>
    
    <h4 bind:this={oneTwoThree}>1.2.3 Trade Deadline</h4>
    <div class="subBlock">
        <p>Week 11 is the last week trades can be made during the NFL and Fantasy season. Trades will be unlocked after the final round of waivers run and the league has progressed in to the new year.</p>
    </div>
    
    <h4 bind:this={oneTwoFour}>1.2.4 Trade Restrictions</h4>
    <div class="subBlock">
        <p>You will not be able to trade draft picks that are more than 3 drafts away. For example, during the 2023 season you cannot trade any picks in or after the 2027 draft. You may only trade FAAB $ from the current season.</p>
    </div>
    
    <h4 bind:this={oneTwoFive}>1.2.5 Trade Review</h4>
    <div class="subBlock">
        <p>A total of 6 votes are required for a trade to be reviewed by the League Leaders. Votes for review are only appropriate in instances of collusion or an egregious mismatch of value. Not liking a trade does not warrant a voting for a trade to be reviewed.</p>
    </div>
    
    
    
    <h3 bind:this={oneThree}>1.3 Waiver Wire</h3>
    
    <p>FAAB Waiver wire system. Each team will begin the season with $100. $0 bids are allowed. Bids will process every days with the exception of Tuesday and Fridays at 3AM EST.</p>

    <p>FAAB budgets will reset once the leauge has transfered to the new year.</p>
    
    
    <h2 class="sectionHeading" bind:this={two}>Section 2 Drafting</h2>
    
    <h3 bind:this={twoOne}>2.1 Draft Order</h3>
    <p>The draft order of the first six picks each year will be a linear draft in reverse order of the previous year’s regular season standings. Picks 7-10 will be based on playoff performance. 5th place will be granted the 7th pick, 6th place granted the 8th pick, 3rd placed granted 9th pick, and 4th placed granted the 10th pick. As 2nd and 1st earn prize money, 2nd place is granted the 11th pick, and 1st is granted the 12th.</p>
    <p>The bottom 6 teams will compete in the Toilet Bowl bracket. The winner of the consolation bracket will be granted the untradeable asset of the 13th pick of the 1st round.</p> 

    <h3 bind:this={twoTwo}>2.2 Rookie Drafts</h3>
    <p>Rookie drafts will consist of 3 round of drafting, with 2 minutes alotted for each pick.</p>
    <p>Any spots not filled during the draft, can be filled immediately afterwards from the waiver wire.</p>
    
    <h3 bind:this={twoThree}>2.3 Draft Day Trades</h3>
    <p>If a trade is being made during the draft, one or both parties can alert the commissioner to pause the draft to allow for extra time to negotiate the trade.</p>
    
    <h2 class="sectionHeading" bind:this={three}>Section 3 Scoring System</h2>

    <h3 bind:this={threeOne}>3.1 Scoring System</h3>
    <p>The league scoring system breakdown is listed on the Sleeper fantasy app. The scoring system will only change after a majority league vote at which point the Commissioner and Vice Commissioner will adjust the scoring system and submit the changes to the President of League Engagment and Communication where they will either approve or reject the changes and ask for continued revision.</p>
    
    <h2 class="sectionHeading" bind:this={four}>Section 4 Postseason</h2>
    
    <h3 bind:this={fourOne}>4.1 Playoffs</h3>
    <p>At the end of the season 6 teams will make the playoffs. The first round of playoffs will commence in week 15. Each team that wins their division and the 3 wild card teams that finish with the best records, will receive a playoff berth. The 2 division winners with the best record, will receive a bye week in the first round of the playoffs. Each playoff matchup will only last one week and the winner will advance. Week 18 will not be used.</p>
    
    <h3 bind:this={fourTwo}>4.2 Seeding Tiebreakers</h3>
    <p>If two teams finish with the same record the tiebreakers will go as followed:</p>

    <ol>
        <li>Points For</li>
        <li>Head 2 Head Record</li>
        <li>Division Record</li>
        <li>Total Points Against</li>
        <li>Coin Flip</li>
        <li>Duel to the death</li>
    </ol>

    <h2 class="sectionHeading" bind:this={five}>Section 5 Tanking Policy</h2>
    
    <h3 bind:this={fiveOne}>5.1 League Tanking Policy</h3>
<p>In order to maintain the integrity of the league, and to keep a fun competitive atmosphere, all mangers must field a starting line up that displays a willingness to win and does not put their opponent at an intentional competitive advantage. Any manager who does not make a reasonable effort to win their game including but not limited to intentionally starting a player who is not on an active NFL roster, or leaving a starting line up spot empty, in order to improve their draft position may be subject to punishment, including but not limited to the forfeiture of draft selections.</p>

    <h2 class="sectionHeading" bind:this={six}>Section 6 Replacing Managers</h2>
    
    <h3 bind:this={sixOne}>6.1 Removing Managers</h3>
    <p>Short of continuously failing to set a valid lineup, or confirmed collusion, no manager can be removed against their will. Participation through trade offers and the waiver wire is strongly encouraged but generally not grounds for removal unless you have become a clear detriment to your team, therefore effecting the integrity of the league.</p>
    
    <h3 bind:this={sixTwo}>6.2 Replacing Managers</h3>
    <p>When a manager needs to be replaced, the League Leaders will try to find a suitable candidate with some connection to at least a portion of the existing managers. Priority will be placed on managers who are eager to take on a dynasty commitment and will be very active within the league.</p>
    
    <h3 bind:this={sixThree}>6.3 Replacement Incentive</h3>
    <p>In the event that a manager chooses to quit the league or is removed by the league leaders, the incoming manager is offered a 50% reductioon on their first year buy-in.</p>

    <h2 class="sectionHeading" bind:this={seven}>Section 7 League Finances</h2>
    
    <h3 bind:this={sevenOne}>7.1 League Dues</h3>
    <p>League dues are set at $30. Dues are collected via means best to the managers. League dues should be paid no later than week 1 of the fantasy season</p>
    
    <h3 bind:this={sevenTwo}>7.2 Payout</h3>
    <p>League payout is structured as follows:</p>
    <ul>
        <li>1st place: $300</li>
        <li>2nd place: $60</li>
    </ul>
    <p>In the event that a new manager is added and given 50% off on their entry fee, the departing manager will be asked to pay a 50% exit fee to cover the discount. If the former manager refuses, then League Leaders will make up the difference. In the case of the new manager winning first or second, and the exiting manager refused to pay the exit fee, the new manager's winning will be be reduced by 50% of the league due.</p>
    
    <h3 bind:this={sevenThree}>7.3 Raising Dues</h3>
    <p>A 3/4th majority of managers (8) is needed to approve a raise league dues. In the event that a manager is no longer financially comfortable with the buy-in, finding a co-manager to split the cost is reccomended.</p>

    <h2 class="sectionHeading" bind:this={eight}>Section 8 League Communications</h2>
    <h3 bind:this={eightOne}>8.1 League Slack</h3>
    <p>Starting with the 2023 offseason, all league communications have been moved to Slack. This does not mean that there won't be texting regarding the league, but the league slack will be the main communication hub.</p>
    <p>In order to insure healthy communication amoungst our league and help expidite trade offers, managers are expected to keep push alerts for direct messages active.</p> 
</div>
