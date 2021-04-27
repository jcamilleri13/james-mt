<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit'
  import Header from '$lib/components/Header.svelte'

  export const load: Load = async (props) => {
    const { page } = props

    const isPortfolioLandingPage = page.path === '/portfolio'
    const breadcrumbs = page.path.split('/').slice(0, -1)

    return {
      props: {
        breadcrumbs,
        isPortfolioLandingPage
      }
    }
  }
</script>

<script lang="ts">
  import '../app.scss'

  export let breadcrumbs
  export let isPortfolioLandingPage
</script>

<Header back={isPortfolioLandingPage ? null : '/'} {breadcrumbs} />
<main>
  <slot />
</main>
<footer>
  <span>Built with SvelteKit (beta). Source on <a href="https://github.com/jcamilleri13/james-mt">GitHub</a></span>
  <span class="signature">james camilleri</span>
</footer>

<style lang="scss">
  main { flex: 1; }
  main, footer { padding: var(--space); }

  footer {
    display: flex;
    font-size: 0.7rem;
    justify-content: space-between;

    .signature {
      color: var(--orange);
      font-weight: bold;
    }
  }
</style>
