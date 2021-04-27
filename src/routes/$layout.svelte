<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit'

  export const load: Load = async ({ page }) => {
    const isPortfolioPage = page.path === '/portfolio'

    return {
      props: {
        isPortfolioPage
      }
    }
  }
</script>

<script lang="ts">
  import '../app.css'

  export let isPortfolioPage
</script>

<header>
  {#if !isPortfolioPage}<a href="/">(back)</a>{/if}
</header>
<main>
  <slot />
</main>
<footer>
  Built with SvelteKit (beta). Source on <a href="https://github.com/jcamilleri13/james-mt">GitHub</a>
</footer>

<style lang="scss">
  main { flex: 1; }
  header, main, footer { padding: var(--space); }
</style>
