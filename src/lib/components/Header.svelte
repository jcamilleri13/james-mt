<script lang="ts">
  export let back: string
  export let breadcrumbs: string[] = []
</script>

<header>
  {#if back}<a class="back" href={back}>←</a>{/if}
  <div class="breadcrumbs">
    {#each breadcrumbs as breadcrumb}
      <span>{breadcrumb}</span>
    {/each}
  </div>
</header>

<style lang="scss">
  header {
    display: flex;
    padding: var(--space);

    font-size: 2rem;
    // TODO: Remove hard-coding.
    @media screen and (max-width: 1000px) {
      font-size: 1rem;
    }
  }

  .back {
    display: block;
    margin-right: var(--space);

    color: var(--black);
    font-weight: bold;
    text-decoration: none;
    transition: color var(--transition-fast), transform var(--transition-fast);

    &:hover {
      color: var(--orange);
      background: none;
      transform: scale(1.05);
    }
  }

  .breadcrumbs {
    display: flex;

    > :not(:last-child) {
      margin-right: 0.5rem;

      &::after {
        content: '/';

        margin-left: 0.5rem;
        color: var(--orange);
      }
    }
  }
</style>
