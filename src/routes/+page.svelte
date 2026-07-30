<script>
	import LinearProgress from '@smui/linear-progress';
	import { getNflState, leagueName, getAwards, getLeagueTeamManagers, homepageText, managers, gotoManager, enableBlog, waitForAll } from '$lib/utils/helper';
	import { Transactions, PowerRankings, HomePost} from '$lib/components';
	import { getAvatarFromTeamManagers, getTeamFromTeamManagers } from '$lib/utils/helperFunctions/universalFunctions';

    const nflState = getNflState();
    const podiumsData = getAwards();
    const leagueTeamManagersData = getLeagueTeamManagers();
</script>

<style>
    #home {
        display: flex;
        flex-wrap: nowrap;
        position: relative;
        overflow-y: hidden;
        z-index: 1;
    }

    #main {
        flex-grow: 1;
        min-width: 320px;
        margin: 0 auto;
        padding: 60px 0;
    }

    .text {
        padding: 0 30px;
        max-width: 620px;
        margin: 0 auto;
    }

    .leagueData {
        position: relative;
        z-index: 1;
        width: 100%;
        min-width: 470px;
        max-width: 470px;
        min-height: 100%;
		background-color: var(--ebebeb);
        border-left: var(--eee);
		box-shadow: inset 8px 0px 6px -6px rgb(0 0 0 / 24%);
    }

    @media (max-width: 950px) {
        .leagueData {
            max-width: 100%;
            min-width: 100%;
            width: 100%;
		    box-shadow: none;
        }
        #home {
            flex-wrap: wrap;
        }
    }

    .transactions {
        display: block;
        width: 95%;
        margin: 10px auto;
    }

    .center {
        text-align: center;
    }

    h6 {
        text-align: center;
    }

    .homeBanner {
        background-color: var(--blueOne);
        color: #fff;
        padding: 0.5em 0;
        font-weight: 500;
        font-size: 1.5em;
    }

    /* champ styling */
    #currentChamp {
        padding: 25px 0;
		background-color: var(--f3f3f3);
        box-shadow: 5px 0 8px var(--champShadow);
        border-left: 1px solid var(--ddd);
    }

    #champ {
        position: relative;
        width: 150px;
        height: 150px;
        margin: 0 auto;
        cursor: pointer;
    }

    .first {
        position: absolute;
        transform: translate(-50%, -50%);
        width: 80px;
        height: 80px;
        border-radius: 100%;
        border: 1px solid #ccc;
        left: 50%;
        top: 43%;
    }

    .laurel {
        position: absolute;
        transform: translate(-50%, -50%);
        width: 135px;
        height: auto;
        left: 50%;
        top: 50%;
    }

    h4 {
        text-align: center;
        font-size: 1.8em;
        margin: 10px;
        font-style: italic;
    }

    .label {
        display: table;
        text-align: center;
        line-height: 1.1em;
        font-size: 1.7em;
        margin: 6px auto 10px;
        cursor: pointer;
    }
    
	:global(.curOwner) {
		font-size: 0.75em;
		color: #bbb;
		font-style: italic;
	}

    /* League visual system */
    #home {
        max-width: 1500px;
        margin: 0 auto;
        overflow: hidden;
    }

    #main {
        padding: clamp(2rem, 5vw, 5.5rem) clamp(1rem, 4vw, 4rem);
    }

    .text {
        max-width: 760px;
        padding: 0;
    }

    .hero {
        background:
            linear-gradient(135deg, rgba(24, 167, 255, 0.16), transparent 42%),
            var(--league-navy-soft);
        border: 1px solid rgba(255, 255, 255, 0.14);
        border-radius: 24px;
        box-shadow: var(--league-shadow);
        color: #fff;
        margin-bottom: 2.5rem;
        overflow: hidden;
        padding: clamp(1.6rem, 4vw, 3.25rem);
        position: relative;
    }

    .hero::after {
        border: 1px solid rgba(255, 255, 255, 0.09);
        border-radius: 50%;
        content: "";
        height: 280px;
        position: absolute;
        right: -110px;
        top: -135px;
        width: 280px;
    }

    .eyebrow {
        color: var(--league-gold);
        font-size: 0.76rem;
        font-weight: 800;
        letter-spacing: 0.14em;
        margin: 0 0 0.8rem;
        text-transform: uppercase;
    }

    .hero :global(h6) {
        color: #fff;
        font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
        font-size: clamp(2.5rem, 6vw, 5rem);
        font-weight: 800;
        letter-spacing: -0.03em;
        line-height: 0.95;
        margin: 0 0 1.15rem;
        max-width: 680px;
        position: relative;
        text-align: left;
        text-transform: uppercase;
        z-index: 1;
    }

    .heroLinks {
        display: flex;
        flex-wrap: wrap;
        gap: 0.65rem;
        margin-top: 1.35rem;
        position: relative;
        z-index: 1;
    }

    .heroLinks a {
        border: 1px solid rgba(255, 255, 255, 0.22);
        border-radius: 999px;
        color: #fff;
        font-size: 0.82rem;
        font-weight: 800;
        padding: 0.68rem 1rem;
        text-decoration: none;
        transition: background 0.18s ease, border-color 0.18s ease, transform 0.18s ease;
    }

    .heroLinks a:first-child,
    .heroLinks a:hover {
        background: var(--league-blue);
        border-color: var(--league-blue);
    }

    .heroLinks a:hover {
        transform: translateY(-2px);
    }

    .welcomeCopy {
        background: var(--surface-raised);
        border: 1px solid var(--line);
        border-radius: var(--radius-lg);
        box-shadow: var(--league-shadow-soft);
        color: var(--text-muted);
        margin-bottom: 2.5rem;
        padding: clamp(1.4rem, 3vw, 2.2rem);
    }

    .welcomeCopy :global(p:first-child) {
        color: var(--text-primary);
        font-size: 1.08rem;
        font-weight: 600;
        margin-top: 0;
    }

    .welcomeCopy :global(p:last-child) {
        margin-bottom: 0;
    }

    .leagueData {
        background-color: rgba(7, 26, 51, 0.035);
        border-left: 1px solid var(--line);
        box-shadow: inset 8px 0 18px -18px rgba(7, 26, 51, 0.35);
        max-width: 430px;
        min-width: 430px;
    }

    .transactions {
        margin: 1rem auto;
        width: calc(100% - 2rem);
    }

    .homeBanner {
        background:
            linear-gradient(100deg, rgba(24, 167, 255, 0.2), transparent),
            #071a33;
        font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
        font-size: 1.35rem;
        font-weight: 800;
        letter-spacing: 0.04em;
        padding: 1rem;
        text-transform: uppercase;
    }

    #currentChamp {
        background:
            radial-gradient(circle at center 45%, rgba(216, 169, 40, 0.13), transparent 11rem),
            var(--surface-raised);
        border-bottom: 1px solid var(--line);
        border-left: 0;
        box-shadow: none;
        padding: 2rem 1rem;
    }

    #currentChamp h4 {
        font-style: normal;
        letter-spacing: 0.04em;
        text-transform: uppercase;
    }

    .first {
        border: 3px solid #fff;
        box-shadow: 0 6px 20px rgba(7, 26, 51, 0.2);
    }

    .label {
        color: var(--league-navy);
        font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
        font-weight: 800;
    }

    @media (max-width: 600px) {
        #main {
            min-width: 0;
            padding: 1rem;
        }

        .hero {
            border-radius: 18px;
            padding: 1.4rem;
        }

        .heroLinks a {
            flex: 1;
            text-align: center;
        }
    }
</style>

<div id="home">
    <div id="main">
        <div class="text">
            <section class="hero">
                <p class="eyebrow">League Command Center</p>
                <h6>{leagueName}</h6>
                <div class="heroLinks">
                    <a href="/matchups">View Matchups</a>
                    <a href="/standings">League Standings</a>
                    <a href="/managers">Meet the Managers</a>
                </div>
            </section>
            <div class="welcomeCopy">
                <!-- homepageText contains the intro text for your league, this gets edited in /src/lib/utils/leagueInfo.js -->
                {@html homepageText }
            </div>
            <!-- Most recent Blog Post (if enabled) -->
            {#if enableBlog}
                <HomePost />
            {/if}
        </div>
        <PowerRankings />
    </div>
    
    <div class="leagueData">
        <div class="homeBanner">
            {#await nflState}
                <div class="center">Retrieving NFL state...</div>
                <LinearProgress indeterminate />
            {:then nflStateData}
                <div class="center">NFL {nflStateData.season} 
                    {#if nflStateData.season_type == 'pre'}
                        Preseason
                    {:else if nflStateData.season_type == 'post'}
                        Postseason
                    {:else}
                        Season - {nflStateData.week > 0 ? `Week ${nflStateData.week}` : "Preseason"}
                    {/if}
                </div>
            {:catch error}
                <div class="center">Something went wrong: {error.message}</div>
            {/await}
        </div>

        <div id="currentChamp">
            {#await waitForAll(podiumsData, leagueTeamManagersData)}
                <p class="center">Retrieving awards...</p>
                <LinearProgress indeterminate />
            {:then [podiums, leagueTeamManagers]}
                {#if podiums[0]}
                    <h4>{podiums[0].year} Fantasy Champ</h4>
                    <div id="champ" on:click={() => {if(managers.length) gotoManager({year: podiums[0].year, leagueTeamManagers, rosterID: parseInt(podiums[0].champion)})}} >
                        <img src="{getAvatarFromTeamManagers(leagueTeamManagers, podiums[0].champion, podiums[0].year)}" class="first" alt="champion" />
                        <img src="./laurel.png" class="laurel" alt="laurel" />
                    </div>
                    <span class="label" on:click={() => gotoManager({year: podiums[0].year, leagueTeamManagers, rosterID: parseInt(podiums[0].champion)})} >{getTeamFromTeamManagers(leagueTeamManagers, podiums[0].champion, podiums[0].year).name}</span>
                {:else}
                    <p class="center">No former champs.</p>
                {/if}
            {:catch error}
                <p class="center">Something went wrong: {error.message}</p>
            {/await}
        </div>

        <div class="transactions" >
            <Transactions />
        </div>
    </div>
</div>
