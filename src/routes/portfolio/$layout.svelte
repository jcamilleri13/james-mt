<div class="portfolio">
  <slot />
</div>

<style lang="scss">
  .portfolio {
    display: grid;
    grid-template-columns: var(--grid-template-portfolio);
    gap: calc(var(--space) * 2);

    :global(p:first-of-type) { margin-top: 3rem; }

    :global(h1) { margin-bottom: 0; }
  }
</style>
