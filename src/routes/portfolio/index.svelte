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

<h1>portfolio</h1>
<ul>
  {#each posts as { title, slug, tags = [] }}
    <li>
      <a href="portfolio/{slug}">
          <div>{title}</div>
          <TagList tags={tags} />
      </a>
    </li>
  {/each}
</ul>

<style lang="scss">
  li {
    padding: 0;
    margin: 0 0 1rem 0;
    list-style: none;
  }

  a {
    text-decoration: none;
    color: var(--black);

    :hover { color: var(--orange); }
  }
</style>
