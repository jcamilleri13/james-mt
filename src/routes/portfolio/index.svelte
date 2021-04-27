<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'

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

<h1>portfolio</h1>
<ul>
  {#each posts as { title, slug, tags = [] }}
    <li>
      <a href="portfolio/{slug}">
          <div>{title}</div>
          <div>
            {#each tags as tag}
              <span>#{tag}</span>
            {/each}
          </div>
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

    span {
      padding: 0.2rem 0.3rem;
      font-size: 0.6rem;
      color: var(--background);
      background: var(--black);
      border-radius: 1px;

      &:not(:last-child) { margin-right: 0.3rem; }
    }
  }
</style>
