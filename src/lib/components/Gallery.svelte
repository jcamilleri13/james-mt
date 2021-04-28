<script lang='ts'>
    interface MediaItem {
    alt?: string
    src: string
    type: 'img' | 'iframe'
  }

  export let media: MediaItem[][]
  let rowHeights = Array(media.length).fill(100)
  let itemHeights = Array(media.length).fill(0).map((_, i) => {
    return Array(media[i].length).fill(700)
  })

  $: rowHeights = itemHeights.map(row => {
    let rowheight = Infinity
    row.forEach(height => {
      if (height < rowheight) rowheight = height
    })

    return rowheight
  })
</script>

<div class='gallery'>
  {#each media as row, i}
    <!-- <div class="row" style="max-height: {rowHeights[i]}px;"> -->
    <div class="row">
      {#each row as item, j}
        <!-- <div class="wrapper" bind:clientHeight={itemHeights[i][j]}> -->
        <div class={`wrapper ${['iframe', 'video'].includes(item.type) ? 'iframe' : ''}`}>
          {#if item.type === 'img'}
            <img src={item.src} alt={item.alt} />
          {:else if item.type === 'iframe'}
            <iframe src={item.src} />
            (Interactive element, original at <a href={item.src}>{item.src}</a>)
          {:else if item.type === 'video'}
            <iframe
              src={`https://player.vimeo.com/video/${item.src}`}
              width="640"
              height="480"
              frameborder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowfullscreen />
          {:else if item.type === 'component'}
            <svelte:component this={item.src}/>
          {/if}
        </div>
      {/each}
    </div>
  {/each}
</div>

<style lang='scss'>
  .gallery {
    display: flex;
    flex-direction: column;

    > *:not(:last-child) { margin-bottom: calc(var(--space) / 2); }
    .row {
      display: flex;
      flex-direction: var(--row-direction);
      justify-content: flex-start;

      width: 100%;

      > .wrapper {
        height: 100%;
        flex: 1 1 auto;

        // TODO: Remove hard-coded pixel width from here somehow.
        @media screen and (max-width: 1000px) {
          &:not(:last-child) {
            margin-right: 0 !important;
            margin-bottom: calc(var(--space) / 2);
          }
        }

        &:not(:last-child) { margin-right: calc(var(--space) / 2); }

        &.iframe {
          // border: dotted var(--black);
          padding-bottom: 56.25%;
          position: relative;
          height: 0;

          iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
        }

        > * {
          height: 100%;
          width: 100%;
          object-fit: cover;
        }
      }
    }
  }
</style>
