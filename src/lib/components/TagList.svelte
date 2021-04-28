<script lang='ts'>
  export let tags: string[]
</script>

<style lang='scss'>
  span {
    padding: 0.2rem 0.3rem;
    font-size: 0.6rem;
    color: var(--background);
    background: var(--black);
    border-radius: 1px;
    text-decoration: none;

    &:not(:last-child) { margin-right: 0.3rem; }
  }
</style>

<div>
  {#each tags as tag}
    <!-- Replace hyphens with non-breaking hypens. -->
    <span>#{tag.replace('-', '‑')}</span>
  {/each}
</div>
