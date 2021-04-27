<script lang='ts'>
  import type { Media } from './types'

  export let media: Media
</script>

<style lang='scss'>
  .gallery {
    display: grid;
    gap: var(--space);

    .row {
      display: flex;

      > * {
        &:not(:last-child) { margin-right: var(--space); }

        flex: 1;
        width: 0;
        max-width: calc(var(--column-width) * 3);
        object-fit: contain;
      }
    }
  }
</style>

<div class='gallery'>
  {#each media as row}
    <div class="row">
      {#each row as item}
        <img src={item.src} alt={item.alt} />
      {/each}
    </div>
  {/each}
</div>
