<div class="portfolio">
  <slot />
</div>

<style lang="scss">
  .portfolio {
    display: grid;
    grid-template-columns: var(--grid-template-portfolio);
    gap: calc(var(--space) * 2);

    :global(.content p:first-of-type) { margin-top: 3rem; }
  }
</style>
