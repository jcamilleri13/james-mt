<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'

  import TagList from '$lib/components/TagList.svelte'

  const posts = import.meta.glob('./**/*.md')
  const body = []

  for (const path in posts) {
    body.push(posts[path]().then(({ metadata }) => ({
      ...metadata,
      slug: path.split('/')[1]
    })))
  }

  export const load: Load = async ({ page }) => {
    const posts = await Promise.all(body)

    return {
      props: {
        posts
      }
    }
  }
</script>

<script>
  export let posts
</script>

<svelte:head><title>portfolio</title></svelte:head>

<ul>
  {#each posts as { description = '', title, slug, tags = [] }}
    <li>
      <a href="portfolio/{slug}">&nbsp;{title}&nbsp;</a>
      <p>{description}</p>
      <TagList tags={tags} />
    </li>
  {/each}
</ul>

<style lang="scss">
  ul {
    margin: 0;
    padding: 0;
  }
  li {
    padding: 0;
    margin: 0 0 1.5rem 0;
    list-style: none;
  }

  a {
    display: inline-block;
    margin-bottom: 0.2rem;
  }

  p {
    margin: 0 0 0.2rem 0;
    font-size: 0.7rem;
  }
</style>
