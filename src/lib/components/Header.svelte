<script lang="ts">
  export let back: string
  export let breadcrumbs: string[] = []

  import { browser } from '$app/env'
</script>

<header>
  {#if back}<a class="back" href={back}>←</a>{/if}
  <div class="breadcrumbs">
    {#each breadcrumbs as breadcrumb}
      <span>{breadcrumb}</span>
    {/each}

    <!-- TODO: There should be a cleaner way to do this. -->
    {#if browser}<span>{document.title}</span>{/if}
  </div>
</header>

<style lang="scss">
  header {
    display: flex;
    padding: var(--space);

    font-size: 2rem;
  }

  .back {
    margin-right: var(--space);

    color: var(--black);
    font-weight: bold;
    text-decoration: none;
    transition: color var(--transition-fast), scale var(--transition-fast);

    &:hover {
      color: var(--orange);
      transform: scale(1.01);
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
