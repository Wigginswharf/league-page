<script>
  import { tabs } from "$lib/utils/tabs";
  import NavSmall from "./NavSmall.svelte";
  import NavLarge from "./NavLarge.svelte";
  import { page } from "$app/stores";
  import IconButton from "@smui/icon-button";
  import { Icon } from "@smui/common";

  $: active = $page.url.pathname;

  // toggle dark mode
  let lightTheme =
    typeof window === "undefined" ||
    window.matchMedia("(prefers-color-scheme: light)").matches;

  function switchTheme() {
    lightTheme = !lightTheme;
    let themeLink = document.head.querySelector("#theme");
    if (!themeLink) {
      themeLink = document.createElement("link");
      themeLink.rel = "stylesheet";
      themeLink.id = "theme";
    }
    themeLink.href = `/smui${lightTheme ? "" : "-dark"}.css`;
    document.head
      .querySelector('link[href="/smui-dark.css"]')
      .insertAdjacentElement("afterend", themeLink);
  }
</script>

<svelte:head>
  <title
    >{!$page.url.pathname[1]
      ? "Home"
      : $page.url.pathname[1].toUpperCase() + $page.url.pathname.slice(2)} | League
    Page</title
  >
</svelte:head>

<nav>
  <a href="/"><img id="logo" alt="league logo" src="./badge.png" /></a>

  <div class="container">
    <IconButton
      toggle
      pressed={lightTheme}
      onclick={switchTheme}
      class="lightDark"
    >
      <Icon class="material-icons" on>dark_mode</Icon>
      <Icon class="material-icons">light_mode</Icon>
    </IconButton>
  </div>

  <div class="large">
    <NavLarge {tabs} bind:active />
  </div>

  <div class="small">
    <NavSmall {tabs} {active} />
  </div>
</nav>

<style>
  a {
    display: block;
  }
  nav {
    align-items: center;
    background:
      linear-gradient(110deg, rgba(24, 167, 255, 0.13), transparent 35%),
      #071a33;
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: 0 8px 28px rgba(7, 26, 51, 0.22);
    display: grid;
    grid-template-columns: 110px 1fr 58px;
    min-height: 78px;
    padding: 0 clamp(1rem, 4vw, 3.5rem);
    position: sticky;
    top: 0;
    z-index: 20;
  }

  #logo {
    filter: drop-shadow(0 5px 8px rgba(0, 0, 0, 0.26));
    width: 76px;
    display: block;
    padding: 5px 0;
    transition: transform 0.2s ease;
  }

  #logo:hover {
    transform: translateY(-2px);
  }

  .large {
    display: block;
  }

  .small {
    display: none;
  }

  .container {
    grid-column: 3;
    grid-row: 1;
    justify-self: end;
  }

  :global(.lightDark) {
    color: rgba(255, 255, 255, 0.86);
  }

  @media (max-width: 950px) {
    nav {
      display: block;
      min-height: 68px;
      padding: 0;
      position: sticky;
    }

    nav > a {
      margin: 0 auto;
      width: max-content;
    }

    #logo {
      height: 58px;
      object-fit: contain;
      padding: 5px;
      width: auto;
    }

    .container {
      position: absolute;
      right: 8px;
      top: 10px;
    }

    /* width of the large navBar */
    .large {
      display: none;
    }

    .small {
      display: block;
    }
  }
</style>
