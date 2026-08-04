<script>
  let one, oneOne, oneTwo, oneThree, oneFour, oneFive;
  let two,
    twoOne,
    twoOneOne,
    twoTwo,
    twoTwoOne,
    twoTwoTwo,
    twoTwoThree,
    twoTwoFour,
    twoTwoFive,
    twoThree;
  let three, threeOne, threeTwo, threeThree;
  let four, fourOne;
  let five, fiveOne, fiveTwo;
  let six, sixOne;
  let seven, sevenOne, sevenTwo, sevenThree;
  let eight, eightOne, eightTwo, eightThree;

  const goToSection = (section, detailsId) => {
    if (!section) return;
    const details = document.getElementById(detailsId);
    if (details) details.open = true;
    requestAnimationFrame(() => {
      const top = section.getBoundingClientRect().top + window.pageYOffset - 24;
      window.scrollTo({ left: 0, top, behavior: "smooth" });
    });
  };
</script>

<div class="constitution">
  <header class="hero" id="constitution-top">
    <p class="eyebrow">League Governance</p>
    <h1 class="noUnderscore">
      A CHAMPION AND 11 LOSERS DYNASTY LEAGUE CONSTITUTION
    </h1>
    <p class="edition">Current Edition · Last amended August 2026</p>
  </header>

  <section class="quick-reference" aria-label="Constitution quick reference">
    <div class="quick-fact">
      <span>Dues</span><strong>$50 · Due by Week 3</strong>
    </div>
    <div class="quick-fact">
      <span>Playoffs</span><strong>Six teams · Week 15</strong>
    </div>
    <div class="quick-fact">
      <span>Trade Deadline</span><strong>Before Week 11 kickoff</strong>
    </div>
    <div class="quick-fact">
      <span>Rookie Pick Clock</span><strong>Four hours</strong>
    </div>
    <div class="quick-fact">
      <span>Waivers</span><strong>3:00 AM ET · Not Tue/Fri</strong>
    </div>
  </section>

  <h2 class="contents-title noUnderscore">Constitution Sections</h2>
  <nav class="section-nav" aria-label="Constitution sections">
    <button
      class="nav-card"
      type="button"
      on:click={() => goToSection(one, "section-1")}
    >
      <span class="nav-number">1</span><span class="nav-label"
        >League Leadership</span
      >
    </button>
    <button
      class="nav-card"
      type="button"
      on:click={() => goToSection(two, "section-2")}
    >
      <span class="nav-number">2</span><span class="nav-label"
        >Roster & Trading</span
      >
    </button>
    <button
      class="nav-card"
      type="button"
      on:click={() => goToSection(three, "section-3")}
    >
      <span class="nav-number">3</span><span class="nav-label">Drafting</span>
    </button>
    <button
      class="nav-card"
      type="button"
      on:click={() => goToSection(four, "section-4")}
    >
      <span class="nav-number">4</span><span class="nav-label"
        >Scoring System</span
      >
    </button>
    <button
      class="nav-card"
      type="button"
      on:click={() => goToSection(five, "section-5")}
    >
      <span class="nav-number">5</span><span class="nav-label">Postseason</span>
    </button>
    <button
      class="nav-card"
      type="button"
      on:click={() => goToSection(six, "section-6")}
    >
      <span class="nav-number">6</span><span class="nav-label"
        >Tanking Policy</span
      >
    </button>
    <button
      class="nav-card"
      type="button"
      on:click={() => goToSection(seven, "section-7")}
    >
      <span class="nav-number">7</span><span class="nav-label"
        >Replacing Managers</span
      >
    </button>
    <button
      class="nav-card"
      type="button"
      on:click={() => goToSection(eight, "section-8")}
    >
      <span class="nav-number">8</span><span class="nav-label"
        >League Finances</span
      >
    </button>
  </nav>

  <!-- Section 1 Body -->
  <details class="constitution-section" id="section-1" open>
    <summary
      ><span class="section-number">Section 1</span><span class="section-title"
        >League Leadership</span
      ></summary
    >
    <div class="section-content">
      <h2 class="sectionHeading" bind:this={one}>
        Section 1 League Leadership
      </h2>
      <h3 class="subSectionHeading" bind:this={oneOne}>1.1 Leadership Roles</h3>
      <p>
        The league is overseen by a League Leadership group responsible for
        maintaining league integrity, enforcing the constitution, resolving
        disputes, and acting in the best interest of the league as a whole.
      </p>
      <p>League Leadership consists of the following roles:</p>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Role</th><th>Manager</th></tr></thead>
          <tbody>
            <tr><td><strong>Commissioner</strong></td><td>Casey Harvey</td></tr>
            <tr
              ><td><strong>Vice Commissioner</strong></td><td>Frank Bartley</td
              ></tr
            >
            <tr
              ><td><strong>President of League Engagement</strong></td><td
                >Brandon Miller</td
              ></tr
            >
            <tr
              ><td><strong>League Representative</strong></td><td
                >Wesley Anderson</td
              ></tr
            >
            <tr><td><strong>Alternate</strong></td><td>Kevin Wilson</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        For purposes of this constitution, “League Leaders” and “League
        Leadership” refer only to the Commissioner, Vice Commissioner, and
        President of League Engagement. The League Representative, Alternate,
        and any other supporting positions are appointed by the Commissioner and
        serve at the Commissioner’s discretion.
      </p>
      <p>
        Leadership roles persist year to year unless changed by resignation,
        removal, or league vote as outlined below.
      </p>

      <h3 class="subSectionHeading" bind:this={oneTwo}>
        1.2 Authority and Decision Making
      </h3>
      <p>
        The Commissioner holds unilateral authority to make time‑sensitive or
        emergency decisions when immediate action is required to protect league
        integrity. If the Commissioner is unavailable, authority transfers to
        the Vice Commissioner; if both are unavailable, authority transfers to
        the President of League Engagement. This authority includes—but is not
        limited to—resolving platform issues and addressing situations not
        explicitly covered by this constitution. Use of unilateral authority is
        expected to be rare and exercised in good faith. Whenever practical,
        decisions may be reviewed or explained to the league after the fact for
        transparency.
      </p>

      <h3 class="subSectionHeading" bind:this={oneThree}>
        1.3 Removal of a League Leader
      </h3>
      <p>
        A League Leader may be removed by agreement of the other two League
        Leaders. Alternatively, the league may call for a vote to remove a
        League Leader; such a vote requires approval by a three‑quarters
        majority of league managers. Any removed leader relinquishes all
        authority immediately upon removal.
      </p>

      <h3 class="subSectionHeading" bind:this={oneFour}>
        1.4 Conflict of Interest
      </h3>
      <p>
        If a League Leader is directly involved in a matter requiring review or
        enforcement, that individual must recuse themselves from the
        decision‑making process. In such cases, remaining leadership will assume
        responsibility according to the established authority order. If the
        remaining League Leaders cannot come to an agreement or are unavailable,
        the League Representative will be brought in to resolve the matter.
      </p>

      <h3 class="subSectionHeading" bind:this={oneFive}>
        1.5 League-Wide Voting Standard
      </h3>
      <div class="rule-callout">
        <span class="rule-label">66% Approval Required</span>
        <p>
          Unless a specific section of this constitution expressly requires a
          higher threshold, a league-wide proposal is approved when at least
          66&nbsp;percent of all active managers vote in favor, rounded up to
          the next whole vote. In a 12-team league, eight affirmative votes are
          required. Abstentions and non-votes do not reduce the number of
          affirmative votes required for approval.
        </p>
      </div>
    </div>
  </details>

  <!-- Section 2 Body -->
  <details class="constitution-section" id="section-2">
    <summary
      ><span class="section-number">Section 2</span><span class="section-title"
        >Roster & Trading</span
      ></summary
    >
    <div class="section-content">
      <h2 class="sectionHeading" bind:this={two}>Section 2 Roster Breakdown</h2>
      <h3 class="subSectionHeading" bind:this={twoOne}>
        2.1 Positional Breakdown
      </h3>
      <p>
        Each team will maintain up to a 30‑player active roster during the
        fantasy season.
      </p>
      <p class="underscore">Starters</p>
      <div class="info-grid" aria-label="Starting lineup positions">
        <div class="info-cell"><strong>QB</strong>1</div>
        <div class="info-cell"><strong>RB</strong>2</div>
        <div class="info-cell"><strong>WR</strong>2</div>
        <div class="info-cell"><strong>TE</strong>1</div>
        <div class="info-cell"><strong>FLEX</strong>2 · RB/WR/TE</div>
        <div class="info-cell"><strong>D/ST</strong>1</div>
        <div class="info-cell"><strong>K</strong>1</div>
      </div>
      <p>
        Teams will have 20 bench spots. A league majority of two-thirds (8) or
        more is required to expand the bench by one additional spot. After the
        champion is crowned, free agency will be locked and all IR spots will
        convert to bench spots, expanding the active roster to 34 players. These
        additional bench spots will revert back to IR spots on the Monday prior
        to the start of the NFL regular season.
      </p>
      <p>
        Each team will have four IR spots during the fantasy season. Players
        listed as questionable or holding out are not eligible for IR placement.
      </p>

      <h4 bind:this={twoOneOne}>2.1.1 Position Maximums</h4>
      <div class="subBlock">
        <p>
          As of the 2023 season, no position maximums are in place. A proposal
          supported by at least seven managers may be submitted to League
          Leadership for implementation. League Leadership retains final
          approval authority over roster structure and may approve, modify, or
          reject a proposed change. League Leadership may also implement a
          roster-structure change without a league vote when it determines that
          the change is necessary and in the best interest of the league.
        </p>
      </div>

      <h3 class="subSectionHeading" bind:this={twoTwo}>2.2 Trading</h3>
      <p>
        Trading of players, draft picks up to three future drafts, and FAAB
        dollars is permitted. During the offseason, trades will process after
        two days. During the fantasy season, trades will process after one day.
      </p>
      <p>
        During the processing period, managers may vote on the Sleeper platform
        to request a trade review for potential collusion and/or overt value
        disparity. Five votes are required to trigger a leadership review.
        League Leadership reserves the right to review any trade at its
        discretion, regardless of whether a vote is triggered.
      </p>
      <p>
        If a member of League Leadership is involved in a trade under review,
        that individual will recuse themselves. In such cases, the League
        Representative or their designated alternate will assume review
        responsibilities for that trade.
      </p>
      <p>
        If a trade must be processed urgently due to timing constraints related
        to kickoff or draft progression, League Leadership or the League
        Representative may expedite review and rule to approve or veto the
        trade.
      </p>

      <h4 bind:this={twoTwoOne}>2.2.1 Trade Collusion</h4>
      <div class="subBlock">
        <span class="rule-label">Prohibited</span>
        <p>
          Any form of collusion is strictly prohibited. Collusion includes, but
          is not limited to, accepting or offering bribes; exchanging outside
          money, favors, side agreements, future repayment, or any other asset
          not included in the official Sleeper transaction; or coordinating veto
          activity against otherwise valid trades.
        </p>
        <p>Violations will be penalized as follows:</p>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Offense</th><th>Penalty</th></tr></thead>
            <tbody>
              <tr
                ><td><strong>First Offense</strong></td><td
                  >Immediate reduction of FAAB budget by 50 percent for eighteen
                  fantasy season weeks, plus a 50 percent FAAB penalty during
                  the end‑of‑season free agent period. If FAAB is exhausted, the
                  penalty will apply at the start of the following season.</td
                ></tr
              >
              <tr
                ><td><strong>Second Offense</strong></td><td
                  >Immediate freeze on all transactions and a league vote to
                  determine expulsion. If retained, the manager will lose their
                  next available first‑round draft pick and remain frozen for
                  four fantasy season weeks.</td
                ></tr
              >
              <tr
                ><td><strong>Third Offense</strong></td><td
                  >Immediate expulsion from the league.</td
                ></tr
              >
            </tbody>
          </table>
        </div>
        <p>
          <strong>Penalties do not carry over to replacement managers.</strong>
        </p>
        <p>
          Trades determined to involve collusion will be reversed. If previous
          matchups were impacted, results may be retroactively adjusted.
        </p>
        <p>
          League Leadership will generally defer to manager autonomy.
          Intervention will occur only when collusion or extreme imbalance is
          evident.
        </p>
      </div>

      <h4 bind:this={twoTwoTwo}>2.2.2 Lending Players Prohibition</h4>
      <div class="subBlock">
        <p>
          Any player traded during the fantasy season may not be reacquired by
          the original team within four weeks of the trade. An exception
          requires prior approval from League Leadership and may be granted if
          either roster health has materially changed or the compensation in the
          new transaction differs from the original trade. Final determination
          of all exceptions rests with League Leadership. Violations are subject
          to collusion penalties.
        </p>
      </div>

      <h4 bind:this={twoTwoThree}>2.2.3 Trade Deadline</h4>
      <div class="rule-callout">
        <span class="rule-label">Deadline</span>
        <p>
          Trades must be accepted in Sleeper before kickoff of the first NFL
          game of Week 11. A trade accepted before the deadline may complete its
          normal processing period afterward. Trades will reopen after the final
          waiver run once the league transitions into the new year.
        </p>
      </div>

      <h4 bind:this={twoTwoFour}>2.2.4 Trade Restrictions</h4>
      <div class="subBlock">
        <p>
          Draft picks may only be traded up to three drafts in advance. FAAB
          dollars may only be traded from the current season.
        </p>
      </div>

      <h4 bind:this={twoTwoFive}>2.2.5 Trade Review</h4>
      <div class="subBlock">
        <p>
          Five votes are required to initiate a trade review. Review votes
          should only be cast in cases of suspected collusion or extreme
          imbalance. Disapproval based on competitive inconvenience does not
          justify a review.
        </p>
      </div>

      <h3 bind:this={twoThree}>2.3 Waiver Wire</h3>
      <p>
        The league uses a FAAB waiver system. Each team begins the fantasy
        season with one hundred FAAB dollars. Zero‑dollar bids are permitted.
        Waivers process daily at 3:00 AM Eastern Time (ET), except on Tuesdays
        and Fridays.
      </p>
      <p>
        FAAB budgets reset when the league transitions into the new year for the
        End of Season Free Agent Extravaganza. This is the one and only free
        agent waiver run prior to our league draft. Following this period, FAAB
        budgets reset again to one hundred dollars for the upcoming fantasy
        season, and free agency does not open again until after the league's
        rookie draft.
      </p>
    </div>
  </details>

  <!-- Section 3 Body -->
  <details class="constitution-section" id="section-3">
    <summary
      ><span class="section-number">Section 3</span><span class="section-title"
        >Drafting</span
      ></summary
    >
    <div class="section-content">
      <h2 class="sectionHeading" bind:this={three}>Section 3 Drafting</h2>
      <h3 bind:this={threeOne}>3.1 Draft Order</h3>
      <p>
        The draft order for the first six selections each year will be
        determined by a linear draft in reverse order of the previous season’s
        regular‑season standings. This structure is intended to promote
        competitive balance while still rewarding performance.
      </p>
      <p>
        Picks seven through ten are determined by playoff results. Fifth place
        will receive the seventh pick, sixth place will receive the eighth pick,
        fourth place will receive the ninth pick, and third place will receive
        the tenth pick.
      </p>
      <p>
        Since first‑ and second‑place finishers receive prize payouts, second
        place will be awarded the eleventh pick, and the league champion will
        receive the twelfth pick.
      </p>
      <p>
        The bottom six teams will compete in the Toilet Bowl consolation
        bracket. The winner of the Toilet Bowl will be awarded the untradeable
        thirteenth pick at the end of the first round.
      </p>

      <h3 bind:this={threeTwo}>3.2 Rookie Drafts</h3>
      <div class="rule-callout">
        <span class="rule-label">Draft Clock</span>
        <p>
          Rookie drafts will consist of three rounds. Each selection will be
          allotted a four‑hour time limit. The draft will remain active from
          9:00 AM to 10:00 PM Eastern Time (ET) until completion unless paused
          by League Leadership due to technical issues or league‑wide scheduling
          conflicts.
        </p>
      </div>
      <p>
        Failure to make a selection within the allotted time may result in an
        automatic selection of the highest-ranked available rookie according to
        Sleeper ADP at the time the pick is made.
      </p>

      <h3 bind:this={threeThree}>3.3 Draft Day Trades</h3>
      <p>
        As of the 2023 season, the league voted to expand the rookie draft into
        a long‑format draft in order to encourage increased draft‑day trading
        and strategic flexibility.
      </p>
      <p>
        Any trades that occur during the draft will be subject to expedited
        review by league leadership. Leadership reserves the right to approve or
        veto draft‑day trades immediately to ensure the draft proceeds without
        unnecessary delay.
      </p>
    </div>
  </details>

  <!-- Section 4 Body -->
  <details class="constitution-section" id="section-4">
    <summary
      ><span class="section-number">Section 4</span><span class="section-title"
        >Scoring System</span
      ></summary
    >
    <div class="section-content">
      <h2 class="sectionHeading" bind:this={four}>Section 4 Scoring System</h2>
      <h3 bind:this={fourOne}>4.1 Scoring System</h3>
      <p>
        The league scoring system is maintained and displayed within the Sleeper
        fantasy app. League Leadership may make minor clerical or platform
        corrections when needed. Any change to point values, scoring categories,
        or lineup strategy is considered a major change.
      </p>
      <div class="rule-callout">
        <span class="rule-label">9 Votes Required</span>
        <p>
          Any request for major changes to the scoring system requires approval
          by a three‑quarters majority league vote. If approved, the
          Commissioner and Vice Commissioner will implement the changes they
          feel best reflect the suggested adjustments and will then submit the
          changes to the President of League Engagement for final review.
        </p>
      </div>
      <p>
        The President of League Engagement may approve the changes as submitted
        or request revisions before implementation to ensure alignment with
        league philosophy and long‑term stability.
      </p>
    </div>
  </details>

  <!-- Section 5 Body -->
  <details class="constitution-section" id="section-5">
    <summary
      ><span class="section-number">Section 5</span><span class="section-title"
        >Postseason</span
      ></summary
    >
    <div class="section-content">
      <h2 class="sectionHeading" bind:this={five}>Section 5 Postseason</h2>
      <h3 bind:this={fiveOne}>5.1 Playoffs</h3>
      <p>
        The league postseason will begin in Week 15 of the NFL regular season.
      </p>
      <p>
        Six teams qualify for the playoffs each season. The three division
        winners automatically qualify, and the three remaining teams with the
        best regular‑season records earn wild‑card berths.
      </p>
      <p>
        The two division winners with the strongest regular‑season records will
        receive a first‑round bye. All remaining playoff matchups will be
        single‑week eliminations, with the winner advancing to the next round.
      </p>
      <p>
        Outside of rare and unforeseen circumstances, Week 18 of the NFL season
        will not be used for fantasy playoff matchups in order to preserve
        competitive integrity.
      </p>

      <h3 bind:this={fiveTwo}>5.2 Seeding Tiebreakers</h3>
      <p>
        If two or more teams finish the regular season with identical records,
        playoff seeding will be determined using the following tiebreakers,
        applied in order:
      </p>
      <ol>
        <li>Total Points For</li>
        <li>Head‑to‑Head Record</li>
        <li>Division Record</li>
        <li>Total Points Against</li>
        <li>Coin Flip</li>
        <li>Duel to the death</li>
      </ol>
    </div>
  </details>

  <!-- Section 6 Body -->
  <details class="constitution-section" id="section-6">
    <summary
      ><span class="section-number">Section 6</span><span class="section-title"
        >Tanking Policy</span
      ></summary
    >
    <div class="section-content">
      <h2 class="sectionHeading" bind:this={six}>Section 6 Tanking Policy</h2>
      <h3 bind:this={sixOne}>6.1 League Tanking Policy</h3>
      <p>
        In order to maintain the integrity of the league and to keep a fun,
        competitive atmosphere, all managers must submit a complete, good-faith
        starting lineup that displays a willingness to win and does not give
        their opponent an intentional competitive advantage. Managers are not
        required to start the highest-projected players and may make reasonable
        lineup decisions. A manager who does not make a reasonable effort to
        win, including, but not limited to, intentionally starting a player who
        is not on an active NFL roster or leaving a starting lineup spot empty
        in order to improve draft position, may be subject to punishment,
        including, but not limited to, the forfeiture of draft selections.
      </p>
    </div>
  </details>

  <!-- Section 7 Body -->
  <details class="constitution-section" id="section-7">
    <summary
      ><span class="section-number">Section 7</span><span class="section-title"
        >Replacing Managers</span
      ></summary
    >
    <div class="section-content">
      <h2 class="sectionHeading" bind:this={seven}>
        Section 7 Replacing Managers
      </h2>
      <h3 bind:this={sevenOne}>7.1 Removing Managers</h3>
      <p>
        Short of continuously failing to set a valid lineup, confirmed
        collusion, or league abandonment, no manager may be removed against
        their will without approval from at least nine league managers.
        Participation through trade offers and the waiver wire is strongly
        encouraged, but lack of participation is generally not grounds for
        removal unless the manager has become a clear detriment to their team,
        thereby affecting the integrity of the league. League abandonment occurs
        when League Leadership makes at least three documented contact attempts
        over fourteen consecutive days without receiving a response. The removed
        manager will receive no refund of any dues paid.
      </p>
      <h3 bind:this={sevenTwo}>7.2 Replacing Managers</h3>
      <p>
        When it is determined that a manager needs to be replaced, the League
        Leaders will try to find a suitable candidate with some connection to at
        least a portion of the existing managers. Priority will be placed on
        managers who are eager to take on a dynasty commitment and will be very
        active within the league.
      </p>
      <h3 bind:this={sevenThree}>7.3 Replacement Incentive</h3>
      <p>
        If a manager quits the league or is removed by the League Leaders, the
        departing manager will be charged a $25 exit fee. The incoming manager
        will receive a $25 reduction on their first-year buy-in regardless of
        whether the departing manager pays the fee. If the departing manager
        refuses to pay, League Leadership will cover the difference under the
        repayment terms in <button
          class="cross-link"
          type="button"
          on:click={() => goToSection(eightTwo, "section-8")}
          >Section 8.2</button
        >.
      </p>
    </div>
  </details>

  <!-- Section 8 Body -->
  <details class="constitution-section" id="section-8">
    <summary
      ><span class="section-number">Section 8</span><span class="section-title"
        >League Finances</span
      ></summary
    >
    <div class="section-content">
      <h2 class="sectionHeading" bind:this={eight}>
        Section 8 League Finances
      </h2>
      <h3 bind:this={eightOne}>8.1 League Dues</h3>
      <div class="rule-callout">
        <span class="rule-label">Deadline</span>
        <p>
          League dues are set at $50. Dues are collected by the Commissioner via
          means best suited to the managers. All league dues must be paid no
          later than the start of Week 3 of the fantasy season.
        </p>
      </div>
      <p>
        If the league coffers do not have enough money to cover the winnings, it
        is the league commissioner’s sole responsibility to make up the
        difference.
      </p>
      <h3 bind:this={eightTwo}>8.2 Payout</h3>
      <p>League payouts are structured as follows:</p>
      <div class="info-grid" aria-label="League payouts">
        <div class="info-cell"><strong>1st Place</strong>$300</div>
        <div class="info-cell"><strong>2nd Place</strong>$200</div>
        <div class="info-cell"><strong>3rd Place</strong>$100</div>
      </div>
      <p>
        If a departing manager refuses to pay the $25 exit fee described in
        Section 7.3, League Leadership will cover the incoming manager’s
        first-year discount. If the incoming manager wins prize money in their
        first season, $25 of that prize money will first be used to repay the
        League Leaders who covered the discount, and the remainder will be paid
        to the incoming manager. If the incoming manager does not win prize
        money in their first season, League Leadership will absorb the cost and
        forfeit the right to collect it later.
      </p>
      <h3 bind:this={eightThree}>8.3 Raising Dues</h3>
      <div class="rule-callout">
        <span class="rule-label">9 Votes Required</span>
        <p>
          A three‑quarters majority of managers (9) is required to approve an
          increase in league dues. If a manager is no longer financially
          comfortable with the buy‑in, finding a co‑manager to split the cost is
          recommended.
        </p>
      </div>
    </div>
  </details>

  <button
    class="back-to-top"
    type="button"
    on:click={() => goToSection(document.getElementById("constitution-top"))}
    >Back to top ↑</button
  >
</div>

<style>
  .constitution {
    max-width: 980px;
    margin: 0 auto;
    padding: 1.25rem;
    color: var(--constitution-text, #1e2633);
  }

  .hero {
    text-align: center;
    padding: clamp(1.5rem, 5vw, 3.25rem) clamp(1rem, 4vw, 2.5rem);
    border-radius: 1.25rem;
    background: linear-gradient(145deg, #152947, #244d75);
    color: #fff;
    box-shadow: 0 18px 45px rgba(12, 31, 55, 0.22);
  }

  .eyebrow {
    margin: 0 0 0.5rem;
    color: #efc66a;
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  h1 {
    max-width: 760px;
    margin: 0 auto;
    font-size: clamp(1.65rem, 4vw, 2.75rem);
    line-height: 1.08;
  }

  .edition {
    margin: 0.9rem 0 0;
    color: rgba(255, 255, 255, 0.78);
    font-size: 0.92rem;
  }

  .quick-reference {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 0.75rem;
    margin: 1rem 0 2rem;
  }

  .quick-fact {
    min-height: 84px;
    padding: 0.9rem;
    border: 1px solid rgba(36, 77, 117, 0.18);
    border-radius: 0.85rem;
    background: #fff;
    box-shadow: 0 7px 20px rgba(12, 31, 55, 0.08);
  }

  .quick-fact span {
    display: block;
    margin-bottom: 0.3rem;
    color: #667085;
    font-size: 0.7rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .quick-fact strong {
    color: #193b61;
    font-size: 0.98rem;
    line-height: 1.25;
  }

  .contents-title {
    margin: 0 0 0.85rem;
    font-size: 1.2rem;
  }

  .section-nav {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 0.75rem;
    margin-bottom: 2rem;
  }

  .nav-card {
    display: flex;
    min-height: 84px;
    align-items: center;
    gap: 0.75rem;
    padding: 0.9rem;
    border: 1px solid rgba(36, 77, 117, 0.2);
    border-radius: 0.85rem;
    background: rgba(255, 255, 255, 0.88);
    color: #193b61;
    font: inherit;
    text-align: left;
    cursor: pointer;
    transition:
      transform 140ms ease,
      box-shadow 140ms ease,
      border-color 140ms ease;
  }

  .nav-card:hover,
  .nav-card:focus-visible {
    border-color: #b7862e;
    box-shadow: 0 8px 22px rgba(12, 31, 55, 0.12);
    transform: translateY(-2px);
  }

  .nav-number {
    display: grid;
    width: 2rem;
    height: 2rem;
    flex: 0 0 2rem;
    place-items: center;
    border-radius: 50%;
    background: #193b61;
    color: #efc66a;
    font-weight: 900;
  }

  .nav-label {
    font-weight: 800;
    line-height: 1.15;
  }

  .constitution-section {
    margin: 0 0 1rem;
    border: 1px solid rgba(36, 77, 117, 0.2);
    border-radius: 1rem;
    background: rgba(255, 255, 255, 0.94);
    box-shadow: 0 7px 24px rgba(12, 31, 55, 0.08);
    overflow: hidden;
  }

  .constitution-section > summary {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    padding: 1rem 1.2rem;
    background: linear-gradient(90deg, rgba(25, 59, 97, 0.08), transparent);
    color: #193b61;
    cursor: pointer;
    list-style: none;
  }

  .constitution-section > summary::-webkit-details-marker {
    display: none;
  }

  .constitution-section > summary::after {
    content: "+";
    margin-left: auto;
    color: #b7862e;
    font-size: 1.65rem;
    font-weight: 400;
    line-height: 1;
  }

  .constitution-section[open] > summary::after {
    content: "–";
  }

  .section-number {
    color: #b7862e;
    font-size: 0.74rem;
    font-weight: 900;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .section-title {
    font-size: clamp(1.05rem, 2.5vw, 1.35rem);
    font-weight: 900;
  }

  .section-content {
    padding: 0.35rem clamp(1rem, 4vw, 2rem) 1.5rem;
  }

  .sectionHeading {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  h3 {
    margin: 1.65rem 0 0.6rem;
    color: #193b61;
    font-size: clamp(1.02rem, 2.5vw, 1.25rem);
  }

  h4 {
    margin: 1.35rem 0 0.5rem;
    color: #294d70;
    font-size: 1.02rem;
  }

  p,
  li {
    line-height: 1.65;
  }

  .subBlock {
    padding: 0.15rem 1rem;
    border-left: 3px solid #d4ae5e;
    border-radius: 0 0.6rem 0.6rem 0;
    background: rgba(239, 198, 106, 0.09);
  }

  .rule-callout {
    margin: 1rem 0;
    padding: 0.9rem 1rem;
    border: 1px solid rgba(183, 134, 46, 0.28);
    border-radius: 0.75rem;
    background: rgba(239, 198, 106, 0.12);
  }

  .rule-label {
    display: inline-block;
    margin-bottom: 0.35rem;
    padding: 0.18rem 0.48rem;
    border-radius: 999px;
    background: #193b61;
    color: #fff;
    font-size: 0.68rem;
    font-weight: 900;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .rule-callout p {
    margin: 0;
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 0.6rem;
    margin: 0.75rem 0 1rem;
  }

  .info-cell {
    padding: 0.7rem;
    border: 1px solid rgba(36, 77, 117, 0.18);
    border-radius: 0.65rem;
    background: #f7f9fc;
    text-align: center;
  }

  .info-cell strong {
    display: block;
    color: #193b61;
  }

  .table-wrap {
    margin: 0.75rem 0 1rem;
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 0.72rem;
    border-bottom: 1px solid rgba(36, 77, 117, 0.16);
    text-align: left;
    vertical-align: top;
  }

  th {
    color: #193b61;
    font-size: 0.76rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .cross-link {
    padding: 0;
    border: 0;
    background: transparent;
    color: #195f9b;
    font: inherit;
    font-weight: 800;
    text-decoration: underline;
    text-underline-offset: 0.15em;
    cursor: pointer;
  }

  .back-to-top {
    position: fixed;
    right: 1rem;
    bottom: 1rem;
    z-index: 5;
    padding: 0.65rem 0.85rem;
    border: 0;
    border-radius: 999px;
    background: #193b61;
    color: #fff;
    font: inherit;
    font-size: 0.82rem;
    font-weight: 800;
    box-shadow: 0 8px 24px rgba(12, 31, 55, 0.25);
    cursor: pointer;
  }

  @media (max-width: 760px) {
    .quick-reference {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .section-nav {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .info-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 480px) {
    .constitution {
      padding: 0.75rem;
    }

    .quick-reference,
    .section-nav {
      grid-template-columns: 1fr;
    }

    .quick-fact {
      min-height: 0;
    }

    .section-content {
      padding-inline: 0.9rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .nav-card {
      transition: none;
    }
  }
</style>
