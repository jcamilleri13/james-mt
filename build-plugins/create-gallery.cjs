const camelCase = require('camel-case').camelCase
const stringify = require('javascript-stringify').stringify
const visit = require('unist-util-visit')

function isGalleryNode (node) {
  return node.type === 'list' &&
    node.children.length === 1 &&
    node.children[0].children[0].children[0].value.toLowerCase() === 'gallery'
}

function extractImages (list) {
  return list
    .children // list items
    .map(({ children }) => children[0]) // paragraphs
    .map(({ children }) => children) // images + dividers
    .map(row => row.filter(({ type }) => type === 'image'))
}

function unquoteSrc (string) {
  return string.replace(/src:'(?!http)(.*?)'/g, (_, match) => `src:${match}`)
}

function generateGalleryComponent (galleryItems) {
  const galleryProps = galleryItems.map(
    row => row.map(item => {
      if (item.alt.toLowerCase() === ':iframe:') {
        return { type: 'iframe', src: item.url }
      }

      return { type: 'img', src: item.url, alt: item.alt }
    })
  )

  const stringifiedProps = unquoteSrc(stringify(galleryProps))
  return `<Gallery media={${stringifiedProps}} />`
}

function importLocalImages (images, tree) {
  const imports = []

  images.forEach(row => {
    row.forEach(image => {
      const { url } = image
      if (!url.includes('./')) return

      const name = camelCase(url)

      image.url = name
      imports.push(`import ${name} from '${url}'`)
    })
  })

  // TODO: Handle existing <script> tags, extract Gallery import.
  const scriptTag = '<script>\n'
    + imports.join('\n')
    + '\nimport Gallery from "$lib/components/Gallery.svelte"'
    + '\nimport TagList from "$lib/components/TagList.svelte"\n'
    + '</script>'

  tree.children.unshift({
    type: 'html',
    value: scriptTag
  })
}

function createGallery () {
  return function transformer (tree, file) {
    visit(tree, 'list', gallery)

    function gallery (node) {
      if (!isGalleryNode(node)) return

      const images = extractImages(node.children[0].children[1])
      importLocalImages(images, tree)

      const gallery = generateGalleryComponent(images)

      node.type = 'html'
      node.value = gallery

      delete node.ordered
      delete node.start
      delete node.spread
      delete node.position
      delete node.children
    }
  };
}

module.exports = createGallery
