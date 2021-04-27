const YAML = require('yaml')
const visit = require('unist-util-visit')

function frontmatterToHeading () {
  return function transformer (tree, file) {
    visit(tree, 'yaml', createHeader)

    function createHeader (node) {
      const { value } = node
      const { title, tags } = YAML.parse(value)

      const headerIndex = tree.children
        .map(({ type }) => type)
        .indexOf('yaml') + 1

      tree.children.splice(headerIndex, 0, {
        type: 'heading',
        depth: 1,
        children: [{ type: 'text', value: title }]
      }, {
        type: 'html',
        value: `<TagList tags={['${tags.join("', '")}']} />`
      })
    }
  }
}

module.exports = frontmatterToHeading
