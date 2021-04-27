<div class="portfolio">
  <slot />
</div>

<style lang="scss">
  .portfolio {
    display: grid;
    grid-template-columns: calc(var(--column-width) * 2) 1fr;
    gap: var(--space);

    @media screen and (max-width: 70rem) {
      grid-template-columns: 100%;
    }
  }
</style>
