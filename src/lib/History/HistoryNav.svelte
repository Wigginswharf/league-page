<script>
  import { goto } from "$app/navigation";
  export let active = "";

  const links = [
    { label: "Champions & Awards", dest: "/awards" },
    { label: "Manager Legacies", dest: "/records#manager-legacies" },
    { label: "League Records", dest: "/records#record-book" },
    { label: "Managers", dest: "/managers" },
  ];
</script>

<nav class="historyNav" aria-label="League history">
  {#each links as link}
    <button
      class:active={active === link.label}
      type="button"
      on:click={() => goto(link.dest)}
    >
      {link.label}
    </button>
  {/each}
</nav>

<style>
  .historyNav {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.55rem;
    margin: 1.25rem auto 2.5rem;
  }

  button {
    padding: 0.65rem 1rem;
    border: 1px solid var(--ccc);
    border-radius: 999px;
    background: var(--fff);
    color: var(--g555);
    font: inherit;
    font-size: 0.82rem;
    font-weight: 700;
    cursor: pointer;
  }

  button:hover,
  button:focus-visible,
  button.active {
    border-color: var(--blueOne);
    background: var(--blueOne);
    color: #fff;
  }
</style>
