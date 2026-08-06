<script>
  import { preloadData } from "$app/navigation";
  import { leagueName } from "$lib/utils/helper";
  import { enableBlog } from "$lib/utils/leagueInfo";

  export let active;
  export let tabs;

  let open = false;

  const visibleChildren = (tab) =>
    tab.children.filter((child) => !child.blog || enableBlog);

  const childIsActive = (child) =>
    child.dest === active ||
    (child.dest === "/trade-lab" && active === "/trade-lab");

  const prefetchInternal = (item) => {
    if (!item.external) preloadData(item.dest);
  };

  const close = () => {
    open = false;
  };

  const handleKeydown = (event) => {
    if (event.key === "Escape") close();
  };
</script>

<svelte:window on:keydown={handleKeydown} />

<button
  class="menu-button"
  type="button"
  aria-label="Open navigation menu"
  aria-expanded={open}
  on:click={() => (open = true)}
>
  <span class="material-icons" aria-hidden="true">menu</span>
</button>

<button
  class:open
  class="backdrop"
  type="button"
  aria-label="Close navigation menu"
  tabindex={open ? 0 : -1}
  on:click={close}
/>

<aside
  class:open
  class="drawer"
  aria-hidden={!open}
  aria-label="Mobile navigation"
>
  <div class="drawer-header">
    <p class="drawer-title">{leagueName}</p>
    <button
      class="close-button"
      type="button"
      aria-label="Close navigation menu"
      on:click={close}
    >
      <span class="material-icons" aria-hidden="true">close</span>
    </button>
  </div>

  {#each tabs as tab}
    {#if tab.nest}
      <p class="group-title">{tab.label}</p>
      {#each visibleChildren(tab) as child}
        <a
          class:active={childIsActive(child)}
          class="mobile-link"
          href={child.dest}
          target={child.external ? "_blank" : undefined}
          rel={child.external ? "noopener noreferrer" : undefined}
          on:mouseenter={() => prefetchInternal(child)}
          on:focus={() => prefetchInternal(child)}
          on:click={close}
        >
          <span class="material-icons" aria-hidden="true">{child.icon}</span>
          <span>{child.label}</span>
          {#if child.external}
            <span class="material-icons external" aria-hidden="true"
              >open_in_new</span
            >
          {/if}
        </a>
      {/each}
    {:else}
      <a
        class:active={tab.dest === active}
        class="mobile-link"
        href={tab.dest}
        on:mouseenter={() => prefetchInternal(tab)}
        on:focus={() => prefetchInternal(tab)}
        on:click={close}
      >
        <span class="material-icons" aria-hidden="true">{tab.icon}</span>
        <span>{tab.label}</span>
      </a>
    {/if}
  {/each}
</aside>

<style>
  .menu-button {
    align-items: center;
    background: transparent;
    border: 0;
    color: rgba(255, 255, 255, 0.9);
    cursor: pointer;
    display: flex;
    height: 48px;
    justify-content: center;
    left: 8px;
    position: absolute;
    top: 10px;
    width: 48px;
    z-index: 13;
  }

  .menu-button:hover,
  .menu-button:focus-visible {
    color: #fff;
    outline: 2px solid var(--league-gold);
    outline-offset: -4px;
  }

  .menu-button .material-icons {
    font-size: 2rem;
  }

  .backdrop {
    background: rgba(2, 10, 20, 0.68);
    backdrop-filter: blur(3px);
    border: 0;
    height: 100vh;
    inset: 0;
    opacity: 0;
    pointer-events: none;
    position: fixed;
    transition: opacity 0.2s ease;
    width: 100vw;
    z-index: 11;
  }

  .backdrop.open {
    opacity: 1;
    pointer-events: auto;
  }

  .drawer {
    background: var(--surface-raised);
    box-shadow: 5px 0 18px rgba(0, 0, 0, 0.24);
    box-sizing: border-box;
    height: 100vh;
    left: 0;
    max-width: 88vw;
    overflow-y: auto;
    padding-bottom: 1.5rem;
    position: fixed;
    top: 0;
    transform: translateX(-105%);
    transition: transform 0.22s ease;
    width: 320px;
    z-index: 12;
  }

  .drawer.open {
    transform: translateX(0);
  }

  .drawer-header {
    align-items: center;
    background: #071a33;
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
    display: flex;
    justify-content: space-between;
    min-height: 64px;
    padding: 0 0.8rem 0 1.1rem;
  }

  .drawer-title {
    color: #fff;
    font-size: 1.05rem;
    font-weight: 700;
    margin: 0;
  }

  .close-button {
    background: transparent;
    border: 0;
    color: rgba(255, 255, 255, 0.82);
    cursor: pointer;
    padding: 0.7rem;
  }

  .group-title {
    color: var(--league-blue);
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.09em;
    margin: 1rem 1.15rem 0.35rem;
    text-transform: uppercase;
  }

  .mobile-link {
    align-items: center;
    border-left: 4px solid transparent;
    color: var(--text-primary);
    display: flex;
    gap: 0.85rem;
    min-height: 48px;
    padding: 0 1.15rem;
    text-decoration: none;
  }

  .mobile-link:hover,
  .mobile-link:focus-visible,
  .mobile-link.active {
    background: rgba(8, 120, 209, 0.09);
    border-left-color: var(--league-gold);
    color: var(--league-blue);
    outline: none;
  }

  .mobile-link .material-icons {
    font-size: 1.35rem;
  }

  .external {
    font-size: 1rem !important;
    margin-left: auto;
  }
</style>
