function wrapPortfolioContent () {
  return function transformer (tree, file) {
    const rawNodes = tree.children
      .filter(node => node.type === 'raw' && !['', '\n'].includes(node.value))

    const context = rawNodes
      .filter(node => node.value.includes('<script context'))[0]
    const script = rawNodes
      .filter(node => node.value.includes('<script>'))[0]
    const gallery = rawNodes
      .filter(node => node.value.includes('<Gallery'))[0]

    const content = tree.children
      .filter(node => node.type !== 'raw' || !node.value.includes('<Gallery'))

      const wrappedContent = {
      type: 'element',
      tagName: 'div',
      properties: { class: 'content' },
      children: content
    }

    tree.children = []
    if (context) tree.children.push(context)
    if (script) tree.children.push(script)
    if (wrappedContent) tree.children.push(wrappedContent)
    if (gallery) tree.children.push(gallery)
  }
}

module.exports = wrapPortfolioContent
