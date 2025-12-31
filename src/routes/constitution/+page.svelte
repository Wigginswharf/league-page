<script>
  import { dues } from '$lib/utils/helper';

  // Declare every bind:this variable used in this file
  let one, oneOne, oneTwo, oneThree, oneFour;
  let two, twoOne, twoOneOne, twoTwo, twoTwoOne, twoTwoTwo, twoTwoThree, twoTwoFour, twoTwoFive, twoThree;
  let three, threeOne, threeTwo, threeThree;
  let four, fourOne;
  let five, fiveOne, fiveTwo;
  let six, sixOne;
  let seven, sevenOne, sevenTwo, sevenThree;
  let eight, eightOne, eightTwo, eightThree;

  const goToSection = (section) => {
    if (!section) return;
    const top = section.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ left: 0, top, behavior: 'smooth' });
  };
</script>

h1 {
  font-size: clamp(1.4rem, 2.5vw + 0.75rem, 2.1rem);
  line-height: 1.15;
  text-align: center;
  margin: 1.25em 0 0.75em;
}

h2 {
  font-size: clamp(1.1rem, 1.5vw + 0.6rem, 1.6rem);
  line-height: 1.2;
}

h3 {
  font-size: clamp(1.0rem, 1.0vw + 0.65rem, 1.3rem);
  line-height: 1.2;
}

<div class="constitution">
  <h1 class="noUnderscore">A CHAMPION AND 11 LOSERS DYNASTY LEAGUE CONSTITUTION</h1>
  <h2 class="noUnderscore">TABLE OF CONTENTS</h2>

  <!-- Section 1 -->
  <h3 class="noUnderscore clickable" on:click={() => goToSection(one)}>Section 1: League Leadership</h3>
  <h4 class="noUnderscore clickable" on:click={() => goToSection(oneOne)}>1.1 Leadership Roles</h4>
  <h4 class="noUnderscore clickable" on:click={() => goToSection(oneTwo)}>1.2 Authority and Decision Making</h4>
  <h4 class="noUnderscore clickable" on:click={() => goToSection(oneThree)}>1.3 Removal of a League Leader</h4>
  <h4 class="noUnderscore clickable" on:click={() => goToSection(oneFour)}>1.4 Conflict of Interest</h4>

  <!-- Section 2 -->
  <h3 class="noUnderscore clickable" on:click={() => goToSection(two)}>Section 2: Roster</h3>
  <h4 class="noUnderscore clickable" on:click={() => goToSection(twoOne)}>2.1 Positional Breakdown</h4>
  <h5 class="noUnderscore clickable" on:click={() => goToSection(twoOneOne)}>2.1.1 Position Maximums</h5>
  <h4 class="noUnderscore clickable" on:click={() => goToSection(twoTwo)}>2.2 Trading</h4>
  <h5 class="noUnderscore clickable" on:click={() => goToSection(twoTwoOne)}>2.2.1 Trade Collusion</h5>
  <h5 class="noUnderscore clickable" on:click={() => goToSection(twoTwoTwo)}>2.2.2 Lending Players Prohibition</h5>
  <h5 class="noUnderscore clickable" on:click={() => goToSection(twoTwoThree)}>2.2.3 Trade Deadline</h5>
  <h5 class="noUnderscore clickable" on:click={() => goToSection(twoTwoFour)}>2.2.4 Trade Restrictions</h5>
  <h5 class="noUnderscore clickable" on:click={() => goToSection(twoTwoFive)}>2.2.5 Trade Review</h5>
  <h4 class="noUnderscore clickable" on:click={() => goToSection(twoThree)}>2.3 Waiver Wire</h4>

  <!-- Section 3 -->
  <h3 class="noUnderscore clickable" on:click={() => goToSection(three)}>Section 3: Drafting</h3>
  <h4 class="noUnderscore clickable" on:click={() => goToSection(threeOne)}>3.1 Draft Order</h4>
  <h4 class="noUnderscore clickable" on:click={() => goToSection(threeTwo)}>3.2 Rookie Drafts</h4>
  <h4 class="noUnderscore clickable" on:click={() => goToSection(threeThree)}>3.3 Draft Day Trades</h4>

  <!-- Section 4 -->
  <h3 class="noUnderscore clickable" on:click={() => goToSection(four)}>Section 4: Scoring System</h3>
  <h4 class="noUnderscore clickable" on:click={() => goToSection(fourOne)}>4.1 Scoring System</h4>

  <!-- Section 5 -->
  <h3 class="noUnderscore clickable" on:click={() => goToSection(five)}>Section 5: Postseason</h3>
  <h4 class="noUnderscore clickable" on:click={() => goToSection(fiveOne)}>5.1 Playoffs</h4>
  <h4 class="noUnderscore clickable" on:click={() => goToSection(fiveTwo)}>5.2 Seeding Tiebreakers</h4>

  <!-- Section 6 -->
  <h3 class="noUnderscore clickable" on:click={() => goToSection(six)}>Section 6: Tanking Policy</h3>
  <h4 class="noUnderscore clickable" on:click={() => goToSection(sixOne)}>6.1 League Tanking Policy</h4>

  <!-- Section 7 -->
  <h3 class="noUnderscore clickable" on:click={() => goToSection(seven)}>Section 7: Replacing Managers</h3>
  <h4 class="noUnderscore clickable" on:click={() => goToSection(sevenOne)}>7.1 Removing Managers</h4>
  <h4 class="noUnderscore clickable" on:click={() => goToSection(sevenTwo)}>7.2 Replacing Managers</h4>
  <h4 class="noUnderscore clickable" on:click={() => goToSection(sevenThree)}>7.3 Replacement Incentive</h4>

  <!-- Section 8 -->
  <h3 class="noUnderscore clickable" on:click={() => goToSection(eight)}>Section 8: League Finances</h3>
  <h4 class="noUnderscore clickable" on:click={() => goToSection(eightOne)}>8.1 League Dues</h4>
  <h4 class="noUnderscore clickable" on:click={() => goToSection(eightTwo)}>8.2 Payout</h4>
  <h4 class="noUnderscore clickable" on:click={() => goToSection(eightThree)}>8.3 Raising Dues</h4>

  <hr />

  <!-- Section 1 Body -->
  <h2 class="sectionHeading" bind:this={one}>Section 1 League Leadership</h2>
  <h3 class="subSectionHeading" bind:this={oneOne}>1.1 Leadership Roles</h3>
  <p>The league is overseen by a League Leadership group responsible for maintaining league integrity, enforcing the constitution, resolving disputes, and acting in the best interest of the league as a whole.</p>
  <p>League Leadership consists of the following roles:</p>
  <ul>
    <li><strong>Commissioner:</strong> Casey Harvey</li>
    <li><strong>Vice Commissioner:</strong> Frank Bartley</li>
    <li><strong>President of League Engagement:</strong> Brandon Miller</li>
    <li><strong>League Representative:</strong> Wesley Anderson</li>
            <li>Alternate: Kevin Wilson</li>


  </ul>
  <p>Leadership roles persist year to year unless changed by resignation, removal, or league vote as outlined below.</p>

  <h3 class="subSectionHeading" bind:this={oneTwo}>1.2 Authority and Decision Making</h3>
  <p>The Commissioner holds unilateral authority to make time‑sensitive or emergency decisions when immediate action is required to protect league integrity. If the Commissioner is unavailable, authority transfers to the Vice Commissioner; if both are unavailable, authority transfers to the President of League Engagement. This authority includes—but is not limited to—resolving platform issues and addressing situations not explicitly covered by this constitution. Use of unilateral authority is expected to be rare and exercised in good faith. Whenever practical, decisions may be reviewed or explained to the league after the fact for transparency.</p>

  <h3 class="subSectionHeading" bind:this={oneThree}>1.3 Removal of a League Leader</h3>
  <p>A League Leader may be removed by agreement of the other two League Leaders. Alternatively, the league may call for a vote to remove a League Leader; such a vote requires approval by a three‑quarters majority of league managers. Any removed leader relinquishes all authority immediately upon removal.</p>

  <h3 class="subSectionHeading" bind:this={oneFour}>1.4 Conflict of Interest</h3>
  <p>If a League Leader is directly involved in a matter requiring review or enforcement, that individual must recuse themselves from the decision‑making process. In such cases, remaining leadership will assume responsibility according to the established authority order. If the remaining league leaders can not come to an agreement or are unavailable, the league representative will be brought in to resolve the matter.</p>

  <!-- Section 2 Body -->
  <h2 class="sectionHeading" bind:this={two}>Section 2 Roster Breakdown</h2>
  <h3 class="subSectionHeading" bind:this={twoOne}>2.1 Positional Breakdown</h3>
  <p>Each team will maintain up to a 30‑player active roster during the fantasy season.</p>
  <p class="underscore">Starters</p>
  <ul>
    <li>QB</li>
    <li>RB</li>
    <li>RB</li>
    <li>WR</li>
    <li>WR</li>
    <li>TE</li>
    <li>FLEX (RB/WR/TE)</li>
    <li>FLEX (RB/WR/TE)</li>
    <li>D/ST</li>
    <li>K</li>
  </ul>
  <p>Teams will have 20 bench spots. A league majority of two thirds (8) or more is required to expand the bench by one additional spot. After the champion is crowned, free agency will be locked and all IR spots will convert to bench spots, expanding the active roster to 34 players. These additional bench spots will revert back to IR spots on the Monday prior to the start of the NFL regular season.</p>
  <p>Each team will have four IR spots during the fantasy season. Players listed as questionable or holding out are not eligible for IR placement.</p>

  <h4 bind:this={twoOneOne}>2.1.1 Position Maximums</h4>
  <div class="subBlock">
    <p>As of the 2023 season, no position maximums are in place. If position maximums are proposed, implementation will require a league vote with at least seven managers in favor. League Leadership retains the authority to make final determinations on roster structure while reserving the right to submit any changes to a league‑wide vote.</p>
  </div>

  <h3 class="subSectionHeading" bind:this={twoTwo}>2.2 Trading</h3>
  <p>Trading of players, draft picks up to three future drafts, and FAAB dollars is permitted. During the offseason, trades will process after two days. During the fantasy season, trades will process after one day.</p>
  <p>During the processing period, managers may vote on the sleeper platform to request a trade review for potential collusion and/or overt value disparity. Five votes are required to trigger a leadership review. League Leadership reserves the right to review any trade at their discretion, regardless of whether a vote is triggered.</p>
  <p>If a member of League Leadership is involved in a trade under review, that individual will recuse themselves. In such cases, the League Representative or their designated alternate will assume review responsibilities for that trade.</p>
  <p>If a trade must be processed urgently due to timing constraints related to kickoff or draft progression, League Leadership or the League Representative may expedite review and rule to approve or veto the trade.</p>

  <h4 bind:this={twoTwoOne}>2.2.1 Trade Collusion</h4>
  <div class="subBlock">
    <p>Any form of collusion is strictly prohibited. Collusion includes, but is not limited to, accepting or offering bribes, trading non‑approved assets, or coordinating veto activity against otherwise valid trades.</p>
    <p>Violations will be penalized as follows:</p>
    <ul>
      <li><strong>First Offense:</strong> Immediate reduction of FAAB budget by 50 percent for eighteen fantasy season weeks, plus a 50 percent FAAB penalty during the end‑of‑season free agent period. If FAAB is exhausted, the penalty will apply at the start of the following season.</li>
      <li><strong>Second Offense:</strong> Immediate freeze on all transactions and a league vote to determine expulsion. If retained, the manager will lose their next available first‑round draft pick and remain frozen for four fantasy season weeks.</li>
      <li><strong>Third Offense:</strong> Immediate expulsion from the league.</li>
      <li>Penalties do not carry over to replacement managers.</li>
    </ul>
    <p>Trades determined to involve collusion will be reversed. If previous matchups were impacted, results may be retroactively adjusted.</p>
    <p>League Leadership will generally defer to manager autonomy. Intervention will occur only when collusion or extreme imbalance is evident.</p>
  </div>

  <h4 bind:this={twoTwoTwo}>2.2.2 Lending Players Prohibition</h4>
  <div class="subBlock">
    <p>Any player traded during the fantasy season may not be reacquired by the original team within four weeks of the trade. Exceptions may apply if roster health has materially changed and compensation differs. Final determination of exceptions rests with League Leadership. Violations are subject to collusion penalties.</p>
  </div>

  <h4 bind:this={twoTwoThree}>2.2.3 Trade Deadline</h4>
  <div class="subBlock">
    <p>Week 11 marks the final week for trades during the fantasy season. Trades will reopen after the final waiver run once the league transitions into the new year.</p>
  </div>

  <h4 bind:this={twoTwoFour}>2.2.4 Trade Restrictions</h4>
  <div class="subBlock">
    <p>Draft picks may only be traded up to three drafts in advance. FAAB dollars may only be traded from the current season.</p>
  </div>

  <h4 bind:this={twoTwoFive}>2.2.5 Trade Review</h4>
  <div class="subBlock">
    <p>Five votes are required to initiate a trade review. Review votes should only be cast in cases of suspected collusion or extreme imbalance. Disapproval based on competitive inconvenience does not justify a review.</p>
  </div>

  <h3 bind:this={twoThree}>2.3 Waiver Wire</h3>
  <p>The league uses a FAAB waiver system. Each team begins the fantasy season with one hundred FAAB dollars. Zero‑dollar bids are permitted. Waivers process daily at 3:00 AM EST, except on Tuesdays and Fridays.</p>
  <p>FAAB budgets reset when the league transitions into the new year for the End of Season Free Agent Extravaganza. This is a one and only free agent waiver run prior to our league draft. Following this period, FAAB budgets reset again to one hundred dollars for the upcoming fantasy season, and free agency does not open again until after the league's rookie draft.</p>

  <!-- Section 3 Body -->
  <h2 class="sectionHeading" bind:this={three}>Section 3 Drafting</h2>
  <h3 bind:this={threeOne}>3.1 Draft Order</h3>
  <p>The draft order for the first six selections each year will be determined by a linear draft in reverse order of the previous season’s regular‑season standings. This structure is intended to promote competitive balance while still rewarding performance.</p>
  <p>Picks seven through ten are determined by playoff results. Fifth place will receive the seventh pick, and sixth place will receive the eighth pick. Beginning with the 2024 season, third place is awarded prize money and no longer receives the ninth pick. As a result, the ninth pick is now awarded to the fourth‑place finisher.</p>
  <p>Since first‑ and second‑place finishers receive prize payouts, second place will be awarded the eleventh pick, and the league champion will receive the twelfth pick.</p>
  <p>The bottom six teams will compete in the Toilet Bowl consolation bracket. The winner of the Toilet Bowl will be awarded the untradeable thirteenth pick at the end of the first round.</p>

  <h3 bind:this={threeTwo}>3.2 Rookie Drafts</h3>
  <p>Rookie drafts will consist of three rounds. Each selection will be allotted a four‑hour time limit. The draft will remain active from 9:00 AM to 10:00 PM EST until completion unless paused by league leadership due to technical issues or league‑wide scheduling conflicts.</p>
  <p>Failure to make a selection within the allotted time may result in an automatic pick.</p>

  <h3 bind:this={threeThree}>3.3 Draft Day Trades</h3>
  <p>As of the 2023 season, the league voted to expand the rookie draft into a long‑format draft in order to encourage increased draft‑day trading and strategic flexibility.</p>
  <p>Any trades that occur during the draft will be subject to expedited review by league leadership. Leadership reserves the right to approve or veto draft‑day trades immediately to ensure the draft proceeds without unnecessary delay.</p>

  <!-- Section 4 Body -->
  <h2 class="sectionHeading" bind:this={four}>Section 4 Scoring System</h2>
  <h3 bind:this={fourOne}>4.1 Scoring System</h3>
  <p>The league scoring system is maintained and displayed within the Sleeper fantasy app. Minor adjustments may be made by league leadership as needed to preserve competitive balance and overall league health.</p>
  <p>Any request for major changes to the scoring system requires approval by a three‑quarters majority league vote. If approved, the Commissioner and Vice Commissioner will implement the changes they feel best reflect the suggested adjustments and will then submit the changes to the President of League Engagement for final review.</p>
  <p>The President of League Engagement may approve the changes as submitted or request revisions before implementation to ensure alignment with league philosophy and long‑term stability.</p>

  <!-- Section 5 Body -->
  <h2 class="sectionHeading" bind:this={five}>Section 5 Postseason</h2>
  <h3 bind:this={fiveOne}>5.1 Playoffs</h3>
  <p>The league postseason will begin in Week 15 of the NFL regular season.</p>
  <p>Each season, the teams that win their respective divisions will automatically qualify for the playoffs. In addition to the division winners, the three remaining teams with the best regular‑season records will earn wild‑card berths.</p>
  <p>The two division winners with the strongest regular‑season records will receive a first‑round bye. All remaining playoff matchups will be single‑week eliminations, with the winner advancing to the next round.</p>
  <p>Outside of rare and unforeseen circumstances, Week 18 of the NFL season will not be used for fantasy playoff matchups in order to preserve competitive integrity.</p>

  <h3 bind:this={fiveTwo}>5.2 Seeding Tiebreakers</h3>
  <p>If two or more teams finish the regular season with identical records, playoff seeding will be determined using the following tiebreakers, applied in order:</p>
  <ol>
    <li>Total Points For</li>
    <li>Head‑to‑Head Record</li>
    <li>Division Record</li>
    <li>Total Points Against</li>
    <li>Coin Flip</li>
    <li>Duel to the death</li>
  </ol>

  <!-- Section 6 Body -->
  <h2 class="sectionHeading" bind:this={six}>Section 6 Tanking Policy</h2>
  <h3 bind:this={sixOne}>6.1 League Tanking Policy</h3>
  <p>In order to maintain the integrity of the league and to keep a fun competitive atmosphere, all managers must field a starting lineup that displays a willingness to win and does not put their opponent at an intentional competitive advantage. Any manager who does not make a reasonable effort to win their game, including but not limited to intentionally starting a player who is not on an active NFL roster or leaving a starting lineup spot empty in order to improve their draft position, may be subject to punishment, including but not limited to the forfeiture of draft selections.</p>

  <!-- Section 7 Body -->
  <h2 class="sectionHeading" bind:this={seven}>Section 7 Replacing Managers</h2>
  <h3 bind:this={sevenOne}>7.1 Removing Managers</h3>
  <p>Short of continuously failing to set a valid lineup or confirmed collusion, no manager can be removed against their will without a league vote. Participation through trade offers and the waiver wire is strongly encouraged, but lack of participation is generally not grounds for removal unless you have become a clear detriment to your team, thereby affecting the integrity of the league. If a member of leadership has attempted and failed to make contact with a manager multiple times, this would be considered league abandonment and a replacement manager would be found to take their place. The removed manager would receive no refund of any dues paid.</p>
  <h3 bind:this={sevenTwo}>7.2 Replacing Managers</h3>
  <p>When it is determined that a manager needs to be replaced, the League Leaders will try to find a suitable candidate with some connection to at least a portion of the existing managers. Priority will be placed on managers who are eager to take on a dynasty commitment and will be very active within the league.</p>
  <h3 bind:this={sevenThree}>7.3 Replacement Incentive</h3>
  <p>In the event that a manager chooses to quit the league or is removed by the league leaders, they will be charged a $25 exit fee so the incoming manager is offered a 50% reduction on their first‑year buy‑in.</p>

  <!-- Section 8 Body -->
  <h2 class="sectionHeading" bind:this={eight}>Section 8 League Finances</h2>
  <h3 bind:this={eightOne}>8.1 League Dues</h3>
  <p>League dues are set at $50. Dues are collected by the league commissioner via means best suited to the managers. League dues should be paid no later than Week 1 of the fantasy season or as the commissioner sees fit.</p>
  <p>If the league coffers do not have enough money to cover the winnings, it is the league commissioner’s sole responsibility to make up the difference.</p>
  <h3 bind:this={eightTwo}>8.2 Payout</h3>
  <p>League payout is structured as follows:</p>
  <ul>
    <li>1st place: $300</li>
    <li>2nd place: $200</li>
    <li>3rd place: $100</li>
  </ul>
  <p>In the event that a new manager is added and given 50% off on their entry fee, the departing manager will be asked to pay a 50% exit fee to cover the discount. If the former manager refuses, League Leaders will make up the difference. If the new manager finishes first or second and the exiting manager refused to pay the exit fee, the new manager’s winnings will be reduced by 50% of the league dues to cover the accrued cost. If the new manager does not win any money their first year, League Leaders will forfeit the right to collect the accrued 50% dues for that season.</p>
  <h3 bind:this={eightThree}>8.3 Raising Dues</h3>
  <p>A three‑quarters majority of managers (9) is required to approve an increase in league dues. If a manager is no longer financially comfortable with the buy‑in, finding a co‑manager to split the cost is recommended.</p>
</div>

