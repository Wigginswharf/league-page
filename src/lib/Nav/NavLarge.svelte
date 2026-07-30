<script>
  import { preloadData } from "$app/navigation";
  import { enableBlog } from "$lib/utils/leagueInfo";

  export let active;
  export let tabs;

  let openMenu = null;

  const visibleChildren = (tab) =>
    tab.children.filter((child) => !child.blog || enableBlog);

  const isActive = (tab) =>
    tab.dest === active ||
    (tab.nest && visibleChildren(tab).some((child) => child.dest === active));

  const prefetchInternal = (item) => {
    if (!item.external) preloadData(item.dest);
  };

  const toggleMenu = (label) => {
    openMenu = openMenu === label ? null : label;
  };

  const closeOnFocusOut = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) openMenu = null;
  };

  const handleKeydown = (event, tab) => {
    if (event.key === "Escape") {
      openMenu = null;
      event.currentTarget.querySelector("button")?.focus();
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      openMenu = tab.label;
      setTimeout(
        () => event.currentTarget.querySelector(".submenu a")?.focus(),
        0
      );
    }
  };
</script>

<div class="desktop-nav" aria-label="Primary navigation">
  {#each tabs as tab}
    <div
      class:active={isActive(tab)}
      class="nav-entry"
      on:mouseenter={() => tab.nest && (openMenu = tab.label)}
      on:mouseleave={() => tab.nest && (openMenu = null)}
      on:focusout={closeOnFocusOut}
      on:keydown={(event) => tab.nest && handleKeydown(event, tab)}
    >
      {#if tab.nest}
        <button
          class="nav-trigger"
          type="button"
          aria-expanded={openMenu === tab.label}
          aria-haspopup="true"
          on:click={() => toggleMenu(tab.label)}
        >
          <span class="material-icons" aria-hidden="true">{tab.icon}</span>
          <span>{tab.label}</span>
          <span
            class:open={openMenu === tab.label}
            class="material-icons chevron"
            aria-hidden="true">expand_more</span
          >
        </button>
        <div
          class:open={openMenu === tab.label}
          class="submenu"
          aria-label={`${tab.label} links`}
        >
          {#each visibleChildren(tab) as child}
            <a
              class:active={child.dest === active}
              href={child.dest}
              target={child.external ? "_blank" : undefined}
              rel={child.external ? "noopener noreferrer" : undefined}
              on:mouseenter={() => prefetchInternal(child)}
              on:focus={() => prefetchInternal(child)}
              on:click={() => (openMenu = null)}
            >
              <span class="material-icons" aria-hidden="true">{child.icon}</span
              >
              <span>{child.label}</span>
              {#if child.external}
                <span class="material-icons external" aria-hidden="true"
                  >open_in_new</span
                >
              {/if}
            </a>
          {/each}
        </div>
      {:else}
        <a
          class="nav-link"
          href={tab.dest}
          on:mouseenter={() => prefetchInternal(tab)}
          on:focus={() => prefetchInternal(tab)}
        >
          <span class="material-icons" aria-hidden="true">{tab.icon}</span>
          <span>{tab.label}</span>
        </a>
      {/if}
    </div>
  {/each}
</div>

<style>
  .desktop-nav {
    align-items: stretch;
    display: flex;
    justify-content: center;
    min-height: 78px;
  }

  .nav-entry {
    position: relative;
  }

  .nav-link,
  .nav-trigger {
    align-items: center;
    background: transparent;
    border: 0;
    border-bottom: 3px solid transparent;
    box-sizing: border-box;
    color: rgba(255, 255, 255, 0.74);
    cursor: pointer;
    display: flex;
    font: inherit;
    gap: 0.42rem;
    height: 100%;
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.025em;
    min-width: 116px;
    justify-content: center;
    padding: 0.7rem 0.85rem 0.55rem;
    text-decoration: none;
  }

  .nav-link:hover,
  .nav-trigger:hover,
  .nav-link:focus-visible,
  .nav-trigger:focus-visible,
  .nav-entry.active > .nav-link,
  .nav-entry.active > .nav-trigger {
    border-bottom-color: var(--league-gold);
    color: #fff;
    outline: none;
  }

  .material-icons {
    font-size: 1.35rem;
  }

  .chevron {
    font-size: 1.1rem;
    transition: transform 0.18s ease;
  }

  .chevron.open {
    transform: rotate(180deg);
  }

  .submenu {
    background: var(--surface-raised);
    border: 1px solid var(--line);
    border-radius: 0 0 14px 14px;
    box-shadow: var(--league-shadow);
    left: 50%;
    min-width: 218px;
    opacity: 0;
    overflow: hidden;
    pointer-events: none;
    position: absolute;
    top: 100%;
    transform: translate(-50%, -6px);
    transition: opacity 0.16s ease, transform 0.16s ease;
    z-index: 10;
  }

  .submenu.open {
    opacity: 1;
    pointer-events: auto;
    transform: translate(-50%, 0);
  }

  .submenu a {
    align-items: center;
    color: var(--text-primary);
    display: flex;
    gap: 0.7rem;
    padding: 0.78rem 1rem;
    text-decoration: none;
  }

  .submenu a + a {
    border-top: 1px solid var(--line);
  }

  .submenu a:hover,
  .submenu a:focus-visible,
  .submenu a.active {
    background: rgba(8, 120, 209, 0.09);
    color: var(--league-blue);
    outline: none;
  }

  .external {
    font-size: 1rem;
    margin-left: auto;
  }
</style>
