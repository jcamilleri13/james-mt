<div class="portfolio">
  <slot />
</div>

<style lang="scss">
  .portfolio {
    display: grid;
    grid-template-columns: var(--grid-template-portfolio);
    gap: var(--space);
  }
</style>
