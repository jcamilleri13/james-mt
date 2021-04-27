const { mdsvex } = require('mdsvex')
const adapter = require('@sveltejs/adapter-netlify')
const mdsvexConfig = require("./mdsvex.config.cjs")
const preprocess = require('svelte-preprocess')

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
  extensions: [".svelte", ...mdsvexConfig.extensions],
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    mdsvex(mdsvexConfig),
    preprocess()
  ],

  kit: {
    adapter: adapter(),
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte'
  }
};
