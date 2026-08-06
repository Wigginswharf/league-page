<script>
  import LinearProgress from "@smui/linear-progress";
  import TradeCalculator from "$lib/TradeCalculator/TradeCalculator.svelte";

  export let data;
</script>

<div class="tradePage">
  {#await data.calculatorData}
    <div class="loading">
      <p>Building the league trade market...</p>
      <LinearProgress indeterminate />
    </div>
  {:then calculatorData}
    <TradeCalculator
      {calculatorData}
      initialWorkspace={data.initialWorkspace}
    />
  {:catch error}
    <div class="error">
      <span class="material-icons" aria-hidden="true">error_outline</span>
      <h1>Trade Lab is temporarily unavailable</h1>
      <p>{error.message}</p>
    </div>
  {/await}
</div>

<style>
  .tradePage {
    min-height: 70vh;
    position: relative;
    z-index: 1;
  }

  .loading,
  .error {
    margin: 6rem auto;
    max-width: 520px;
    text-align: center;
    width: 85%;
  }

  .loading p,
  .error p {
    color: var(--text-muted);
  }

  .error {
    background: var(--surface-raised);
    border: 1px solid var(--line);
    border-radius: 16px;
    padding: 2rem;
  }

  .error .material-icons {
    color: #c84f4f;
    font-size: 2.5rem;
  }
</style>
