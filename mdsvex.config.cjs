module.exports = {
	extensions: ['.svx', '.md'],
	smartypants: {
		dashes: 'oldschool',
	},
	remarkPlugins: [
		[require('remark-github'), {
			repository: 'https://github.com/jcamilleri13/james-mt.git',
		}],
		require('remark-abbr'),
		require('./build-plugins/create-gallery.cjs')
	],
	rehypePlugins: [
		require('rehype-slug'),
		require('./build-plugins/wrap-portfolio-content.cjs')
	],
}
