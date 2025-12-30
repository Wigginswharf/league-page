<script>
    import { dues } from '$lib/utils/helper';
    let one, oneOne, oneTwo, oneThree;
    let two, twoOne, twoOneOne, twoTwo, twoTwoOne, twoTwoTwo, twoTwoThree, twoTwoFour, twoTwoFive, twoThree;
    let three, threeOne, threeTwo, threeThree;
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
    <h3 class="noUnderscore clickable" on:click={() => goToSection(one)}>Section 1: League Leadership</h3>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(oneOne)}>1.1 Leadership Roles</h4>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(oneTwo)}>1.2 Authority and Decision Making</h4>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(oneThree)}>1.3 Removal of a League Leader</h4>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(oneFour)}>1.4 Conflict of Interest</h4>

    <h3 class="noUnderscore clickable" on:click={() => goToSection(one)}>Section 2: Roster</h3>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(oneOne)}>2.1 Positional Breakdown</h4>
            <h5 class="noUnderscore clickable" on:click={() => goToSection(oneOneOne)}>2.1.1 Position Maximums</h5>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(oneTwo)}>2.2 Trading</h4>
            <h5 class="noUnderscore clickable" on:click={() => goToSection(oneTwoOne)}>2.2.1 Trade Collusion</h5>
            <h5 class="noUnderscore clickable" on:click={() => goToSection(oneTwoTwo)}>2.2.2 Lending Players Prohibition</h5>
            <h5 class="noUnderscore clickable" on:click={() => goToSection(oneTwoThree)}>2.2.3 Trade Deadline</h5>
            <h5 class="noUnderscore clickable" on:click={() => goToSection(oneTwoFour)}>2.2.4 Trade Restrictions</h5>
            <h5 class="noUnderscore clickable" on:click={() => goToSection(oneTwoFive)}>2.2.5 Veto/Trade Process</h5>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(oneThree)}>2.3 Waiver Wire</h4>
    
    <h3 class="noUnderscore clickable" on:click={() => goToSection(two)}>Section 3: Drafting</h3>
    
        <h4 class="noUnderscore clickable" on:click={() => goToSection(twoOne)}>3.1 Draft Order</h4>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(twoTwo)}>3.2 Rookie Drafts</h4>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(twoThree)}>3.3 Draft Day Trades</h4>
    
    <h3 class="noUnderscore clickable" on:click={() => goToSection(three)}>Section 4: Scoring System</h3>
    
        <h4 class="noUnderscore clickable" on:click={() => goToSection(threeOne)}>4.1 Voting on Scoring System</h4>
    
    <h3 class="noUnderscore clickable" on:click={() => goToSection(four)}>Section 5: Postseason</h3>
    
        <h4 class="noUnderscore clickable" on:click={() => goToSection(fourOne)}>5.1 Playoffs</h4>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(fourTwo)}>5.2 Playoff Tiebreakers</h4>

    <h3 class="noUnderscore clickable" on:click={() => goToSection(five)}>Section 6: Tanking Policy</h3>
    
        <h4 class="noUnderscore clickable" on:click={() => goToSection(fiveOne)}>6.1 League Tanking Policy</h4>

    <h3 class="noUnderscore clickable" on:click={() => goToSection(six)}>Section 7: Replacing Managers</h3>
    
        <h4 class="noUnderscore clickable" on:click={() => goToSection(sixOne)}>7.1 Removing Managers</h4>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(sixTwo)}>7.2 Replacing Managers</h4>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(sixThree)}>7.3 Replacement Incentive</h4>

    <h3 class="noUnderscore clickable" on:click={() => goToSection(seven)}>Section 8: League Finances</h3>
    
        <h4 class="noUnderscore clickable" on:click={() => goToSection(sevenOne)}>8.1 League Dues</h4>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(sixTwo)}>8.2 Payout</h4>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(sixThree)}>8.3 Raising Dues</h4>
    
    
    <hr />
    <h2 class="sectionHeading" bind:this={one}>Section 1 League Leadership</h2>

<h3 class="subSectionHeading" bind:this={oneOne}>1.1 Leadership Roles</h3>

<p>The league is overseen by a League Leadership group responsible for maintaining league integrity, enforcing the constitution, resolving disputes, and acting in the best interest of the league as a whole.</p>

<p>League Leadership consists of the following roles:</p>

<ul>
    <li><strong>Commissioner:</strong> Casey Harvey</li>
    <li><strong>Vice Commissioner:</strong> Frank Bartley</li>
    <li><strong>President of League Engagement:</strong> Brandon Miller</li>
</ul>

<p>Leadership roles persist year to year unless changed by resignation, removal, or league vote as outlined below.</p>

<h3 class="subSectionHeading" bind:this={oneTwo}>1.2 Authority and Decision Making</h3>

<p>The Commissioner holds unilateral authority to make time sensitive or emergency decisions when immediate action is required to protect league integrity.</p>
<p>If the Commissioner is unavailable, authority transfers to the Vice Commissioner. If both the Commissioner and Vice Commissioner are unavailable, authority transfers to the President of League Engagement.</p>
<p>This authority includes, but is not limited to, resolving platform issues and addressing situations not explicitly covered by this constitution.</p>
<p>Use of unilateral authority is expected to be rare and exercised in good faith. Whenever practical, decisions may be reviewed or explained to the league after the fact for transparency.</p>

<h3 class="subSectionHeading" bind:this={oneThree}>1.3 Removal of a League Leader</h3>

<p>A League Leader may be removed by agreement of the other two League Leaders.</p>
<p>Alternatively, the league may call for a vote to remove a League Leader. Such a vote requires approval by a three quarters majority of league managers.</p>
<p>Any removed leader relinquishes all authority immediately upon removal.</p>

<h3 class="subSectionHeading" bind:this={oneFour}>1.4 Conflict of Interest</h3>

<p>If a League Leader is directly involved in a matter requiring review or enforcement, that individual must recuse themselves from the decision making process.</p>
<p>In such cases, remaining leadership will assume responsibility according to the established authority order.</p>

    <h2 class="sectionHeading" bind:this={two}>Section 2 Roster Breakdown</h2>

        <h3 class="subSectionHeading" bind:this={twoOne}>2.1 Positional Breakdown</h3>

<p>Each team will maintain up to 30 player active roster during the fantasy season.</p>

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

<p>Teams will have 20 bench spots. A league vote of seven managers or more is required to expand the bench by one additional spot. At the conclusion of the fantasy season, all IR spots will convert to bench spots, expanding the active roster to 34 players. These additional bench spots will revert back to IR spots on the Monday prior to the start of the NFL regular season.</p>
<p>Each team will have four IR spots during the fantasy season. Players listed as questionable or holding out are not eligible for IR placement.</p>

            <h4 bind:this={twoOneOne}>2.1.1 Position Maximums</h4>

<div class="subBlock">
    <p>As of the 2023 season, no position maximums are in place. If position maximums are proposed, implementation will require a league vote with at least seven managers in favor. League Leadership retains the authority to make final determinations on roster structure while reserving the right to submit any changes to a league wide vote.</p>
</div>

    <h3 class="subSectionHeading" bind:this={twoTwo}>2.2 Trading</h3>

<p>Trading of players, draft picks up to three future drafts, and FAAB dollars is permitted. During the offseason, trades will process after two days. During the fantasy season, trades will process after one day.</p>
<p>During the processing period, managers may vote to request a trade review for potential collusion. Five votes are required to trigger a leadership review. League Leadership reserves the right to review any trade at their discretion, regardless of whether a vote is triggered.</p>
<p>If a member of League Leadership is involved in a trade under review, that individual will recuse themselves. In such cases, the League Representative or their designated alternate will assume review responsibilities for that trade.</p>
<p>If a trade must be processed urgently due to timing constraints related to kickoff or draft progression, League Leadership or the League Representative may expedite review and rule to approve or veto the trade.</p>

        <h4 bind:this={twoTwoOne}>2.2.1 Trade Collusion</h4>

<div class="subBlock">
    <p>Any form of collusion is strictly prohibited. Collusion includes but is not limited to accepting or offering bribes, trading non approved assets, or coordinating veto activity against otherwise valid trades.</p>
<p>Violations will be penalized as follows:</p>
<ul>
    <li>
        First Offense: Immediate reduction of FAAB budget by 50 percent for eighteen fantasy season weeks, plus a 50 percent FAAB penalty during the end of season free agent period.
        If FAAB is exhausted, the penalty will apply at the start of the following season.
    </li>
    <li>
        Second Offense: Immediate freeze on all transactions and a league vote to determine expulsion.
        If retained, the manager will lose their next available first round draft pick and remain frozen for four fantasy season weeks.
    </li>
    <li>
        Third Offense: Immediate expulsion from the league.
    </li>
    <li>
        Penalties do not carry over to replacement managers.
    </li>
</ul>

<p>Trades determined to involve collusion will be reversed. If previous matchups were impacted, results may be retroactively adjusted.</p>
<p>League Leadership will generally defer to manager autonomy. Intervention will occur only when collusion or extreme imbalance is evident.</p>

</div>

<h4 bind:this={twoTwoTwo}>2.2.2 Lending Players Prohibition</h4>

<div class="subBlock">
    <p>Any player traded during the fantasy season may not be reacquired by the original team within four weeks of the trade. Exceptions may apply if roster health has materially changed and compensation differs. Violations are subject to collusion penalties.</p>
</div>

            <h4 bind:this={twoTwoThree}>2.2.3 Trade Deadline</h4>

<div class="subBlock">
    <p> Week 11 marks the final week for trades during the fantasy season. Trades will reopen after the final waiver run once the league transitions into the new year.</p>
</div>

<h4 bind:this={twoTwoFour}>2.2.4 Trade Restrictions</h4>

<div class="subBlock">
    <p>
    Draft picks may only be traded up to three drafts in advance.
    FAAB dollars may only be traded from the current season.
    </p>
</div>

<h4 bind:this={twoTwoFive}>2.2.5 Trade Review</h4>

<div class="subBlock">
    <p>
    Five votes are required to initiate a trade review.
    Review votes should only be cast in cases of suspected collusion or extreme imbalance.
    Disapproval based on competitive inconvenience does not justify a review.
    </p>
</div>

<h3 bind:this={twoThree}>2.3 Waiver Wire</h3>

<p>
The league uses a FAAB waiver system.
Each team begins the fantasy season with one hundred FAAB dollars.
Zero dollar bids are permitted.
Waivers process daily at 3:00 AM EST, except on Tuesdays and Fridays.
</p>

<p>
FAAB budgets reset when the league transitions into the new year for the End of Season Free Agent Extravaganza.
Following this period, FAAB budgets reset again to one hundred dollars for the upcoming fantasy season.
</p>

    
    <h2 class="sectionHeading" bind:this={two}>Section 2 Drafting</h2>
    
    <h3 bind:this={twoOne}>2.1 Draft Order</h3>
    <p>The draft order of the first six picks each year will be a linear draft in reverse order of the previous year’s regular season standings. Picks 7-10 will be based on playoff performance. 5th place will be granted the 7th pick, and 6th place granted the 8th pick. As of the 2024 season 3rd place was awarded $100 as winnings and it was voted that they should not be granted the 9th pick any longer, the 9th pick now goes to 4th place. As 2nd and 1st earn prize money, 2nd place is granted the 11th pick, and 1st is granted the 12th.</p>
    <p>The bottom 6 teams will compete in the Toilet Bowl bracket. The winner of the consolation bracket will be granted the untradeable asset of the 13th pick of the 1st round.</p> 

    <h3 bind:this={twoTwo}>2.2 Rookie Drafts</h3>
    <p>Rookie drafts will consist of 3 round of drafting, 4 hours per pick.</p>
    
    <h3 bind:this={twoThree}>2.3 Draft Day Trades</h3>
    <p>As of 2023, draft was voted to be expanded to a "long draft" to increase draft day trading.</p>
    <p>Any trade occuring during the draft is put through to league leadership for expedited veto or approval. </p>

    <h2 class="sectionHeading" bind:this={three}>Section 3 Scoring System</h2>

    <h3 bind:this={threeOne}>3.1 Scoring System</h3>
    <p>The league scoring system breakdown is listed on the Sleeper fantasy app. Minor tweaks can be done as needed by leadership to maintain league health. Major scoring system changes will only change after a majority league vote at which point the Commissioner and Vice Commissioner will adjust the scoring system and submit the changes to the President of League Engagment and Communication where they will either approve or reject the changes and ask for continued revision.</p>
    
    <h2 class="sectionHeading" bind:this={four}>Section 4 Postseason</h2>
    
    <h3 bind:this={fourOne}>4.1 Playoffs</h3>
    <p>The first round of playoffs will commence in week 15. Each team that wins their division and the 3 wild card teams that finish with the best records, will receive a playoff berth. The 2 division winners with the best record, will receive a bye week. Each playoff matchup will only last one week and the winner will advance. Outside of extenuating circumstances, week 18 will not be used.</p>
    
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
    <p>Short of continuously failing to set a valid lineup, or confirmed collusion, no manager can be removed against their will without league vote. Participation through trade offers and the waiver wire is strongly encouraged but lack of participation is generally not grounds for removal unless you have become a clear detriment to your team, therefore effecting the integrity of the league.</p>
    
    <h3 bind:this={sixTwo}>6.2 Replacing Managers</h3>
    <p>When it is determinded that a manager needs to be replaced, the League Leaders will try to find a suitable candidate with some connection to at least a portion of the existing managers. Priority will be placed on managers who are eager to take on a dynasty commitment and will be very active within the league.</p>
    
    <h3 bind:this={sixThree}>6.3 Replacement Incentive</h3>
    <p>In the event that a manager chooses to quit the league or is removed by the league leaders, they will be charged a $25 exit fee so the incoming manager is offered a 50% reductioon on their first year buy-in.</p>

    <h2 class="sectionHeading" bind:this={seven}>Section 7 League Finances</h2>
    
    <h3 bind:this={sevenOne}>7.1 League Dues</h3>
    <p>League dues are set at $50. Dues are collected by league commisioner via means best to the managers. League dues should be paid no later than week 1 of the fantasy season and/or as the commissioner sees fit.</p>
    <p>If the league coffers do not have enough money to cover the winnings, it is the league commissioners sole resposibility to make up the difference.<p>
    
    <h3 bind:this={sevenTwo}>7.2 Payout</h3>
    <p>League payout is structured as follows:</p>
    <ul>
        <li>1st place: $300</li>
        <li>2nd place: $200</li>
        <li>3rd place: $100</li>
    </ul>
    <p>In the event that a new manager is added and given 50% off on their entry fee, the departing manager will be asked to pay a 50% exit fee to cover the discount. If the former manager refuses, then League Leaders will make up the difference. In the case of the new manager winning first or second, and the exiting manager refused to pay the exit fee, the new manager's winning will be be reduced by 50% of the league due to cover the accrued cost of the league leaders. In the case of the new manager does not win any money their first year, league leaders will forfiet right to collect the 50% due accrued for that season.</p>
    
    <h3 bind:this={sevenThree}>7.3 Raising Dues</h3>
    <p>A 3/4th majority of managers (9) is needed to approve a raise league dues. In the event that a manager is no longer financially comfortable with the buy-in, finding a co-manager to split the cost is reccomended.</p>
 
</div>
