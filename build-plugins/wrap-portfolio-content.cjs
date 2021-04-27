function wrapPortfolioContent () {
  return function transformer (tree, file) {
    const rawNodes = tree.children
      .filter(node => node.type === 'raw' && !['', '\n'].includes(node.value))

    const moduleScript = rawNodes
      .filter(node => node.value.includes('<script context="module"'))[0]
    const script = rawNodes
      .filter(node => node.value.includes('<script>'))[0]
    const gallery = rawNodes
      .filter(node => node.value.includes('<Gallery'))[0]
    const head = rawNodes
      .filter(node => node.value.includes('<svelte:head'))[0]

    // TODO: Get rid of all this hard-coded filtering nonsense.
    const content = tree.children
      .filter(node => node.type !== 'raw' || node.value.includes('<TagList'))

    const wrappedContent = {
      type: 'element',
      tagName: 'div',
      properties: { class: 'content' },
      children: content
    }

    tree.children = []
    if (moduleScript) tree.children.push(moduleScript)
    if (script) tree.children.push(script)
    if (head) tree.children.push(head)
    if (wrappedContent) tree.children.push(wrappedContent)
    if (gallery) tree.children.push(gallery)
  }
}

module.exports = wrapPortfolioContent
