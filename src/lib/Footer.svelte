<script>
  import { managers } from "$lib/utils/helper";
  import { leagueID } from "$lib/utils/leagueInfo";
  import { onMount } from "svelte";

  let outOfDate = false;

  let el, footerHeight;

  let innerWidth;

  const resize = (e, delay) => {
    const bottom = el?.getBoundingClientRect().bottom;
    const top = el?.getBoundingClientRect().top;
    if (delay) {
      setTimeout(() => {
        resize(e, false);
      }, 100);
    } else {
      footerHeight = bottom - top;
    }
  };

  onMount(async () => {
    const res = await fetch("/api/checkVersion", { compress: true });
    const needUpdate = await res.json();
    outOfDate = needUpdate;
    resize(el?.getBoundingClientRect(), true);
  });

  let managersOutOfDate = false;
  if (managers) {
    for (const manager of managers) {
      if (manager.roster && !manager.managerID) {
        managersOutOfDate = true;
        resize(el?.getBoundingClientRect(), true);
        break;
      }
    }
  }

  const year = new Date().getFullYear();
  const footerLinks = [
    { label: "Constitution", dest: "/constitution" },
    { label: "Resources", dest: "/resources" },
    {
      label: "Open Sleeper",
      dest: `https://sleeper.app/leagues/${leagueID}`,
      external: true,
    },
    {
      label: "GitHub",
      dest: "https://github.com/Wigginswharf/league-page",
      external: true,
    },
  ];

  $: resize(el?.getBoundingClientRect(), false, innerWidth);
</script>

<svelte:window bind:innerWidth />

<div class="footerSpacer" style="height: {footerHeight}px;" />

<!-- footer with update notice -->
<footer bind:this={el}>
  {#if outOfDate}
    <p class="updateNotice">
      There is an update available for your League Page. <a
        href="https://github.com/nmelhado/league-page/blob/master/TRAINING_WHEELS.md#iv-updates"
        >Follow the Update Instructions</a
      > to get all of the newest features!
    </p>
  {/if}
  {#if managersOutOfDate}
    <p class="updateNotice">
      Your managers page needs an update, <a
        href="https://github.com/nmelhado/league-page/blob/master/TRAINING_WHEELS.md#2-add-managers"
        >please follow the instructions</a
      > to get the most up-to-date experience.
    </p>
  {/if}
  <div id="navigation">
    <ul>
      {#each footerLinks as link}
        <li>
          <a
            class="navLink"
            href={link.dest}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            >{link.label}{link.external ? " ↗" : ""}</a
          >
        </li>
      {/each}
    </ul>
  </div>
  <!-- PLEASE DO NOT REMOVE THE COPYRIGHT -->
  <span class="copyright"
    >&copy; 2021 - {year}
    <a href="https://github.com/nmelhado/league-page">League Page</a></span
  >
  <br />
  Found and customized by Casey,
  <!-- PLEASE DO NOT REMOVE THE BUILT BY -->
  <span class="creator"
    >Built and maintained by <a href="http://www.nmelhado.com/"
      >Nicholas Melhado</a
    ><br /></span
  >
  <!-- You can remove the donation link (although any donations to help
	 maintain and enhance League Page would be greatly appreciated!) -->
  Love League Page? Please consider
  <a href="https://www.buymeacoffee.com/nmelhado">donating</a> to support enhancements
  or just to say thank you!
</footer>

<style>
  footer {
    background:
      linear-gradient(135deg, rgba(24, 167, 255, 0.1), transparent 42%),
      #071a33;
    width: 100%;
    display: block;
    position: absolute;
    bottom: 0;
    z-index: 1;
    border-top: 3px solid var(--league-gold);
    padding: 38px 1rem 52px;
    text-align: center;
    color: rgba(255, 255, 255, 0.62);
    font-size: 0.88rem;
  }

  #navigation {
    margin: 0 0 2em;
  }

  #navigation ul {
    margin: 0;
    padding: 0;
  }

  #navigation ul li {
    list-style-type: none;
    display: inline-block;
  }

  .navLink {
    display: inline-block;
    padding: 6px 10px;
    color: rgba(255, 255, 255, 0.85);
    font-weight: 700;
    text-decoration: none;
  }

  .navLink:hover {
    color: #fff;
  }

  .updateNotice {
    color: rgba(255, 255, 255, 0.58);
    font-style: italic;
    font-size: 0.8em;
    margin-top: 0;
  }
</style>
