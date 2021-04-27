<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit'
  import Header from '$lib/components/Header.svelte'

  export const load: Load = async (props) => {
    const { page } = props

    const isPortfolioLandingPage = page.path === '/portfolio'
    const breadcrumbs = page.path.split('/')

    // A bit ham-fisted, until I figure out how to get the page metadata here.
    const pageName = breadcrumbs.pop().split('-')
      .map(word => {
        // Handle contractions.
        if (['t', 'd', 'll', 's', 've'].includes(word)) {
          return `’${word}`
        }

        return ` ${word}`
      }).join('')

    breadcrumbs.push(pageName)

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
  <div>
    <div>Built with SvelteKit (beta). Source on <a href="https://github.com/jcamilleri13/james-mt">GitHub</a></div>
    <div>This website will not function correctly on Internet Explorer, please use the latest version of Firefox, Chrome, Safari or Edge.</div>
  </div>
  <span class="signature">james camilleri</span>
</footer>

<style lang="scss">
  main { flex: 1; }
  main, footer { padding: var(--space); }

  footer {
    display: flex;
    font-size: 0.7rem;
    justify-content: space-between;
    align-items: flex-end;

    div > div:first-child {
      margin-bottom: 0.4rem;
    }

    .signature {
      color: var(--orange);
      font-weight: bold;
    }
  }
</style>
