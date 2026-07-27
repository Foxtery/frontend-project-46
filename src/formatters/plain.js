const isObject = value => (
  typeof value === 'object'
  && value !== null
  && !Array.isArray(value)
)

const formatValue = (value) => {
  if (isObject(value)) {
    return '[complex value]'
  }

  if (typeof value === 'string') {
    return `'${value}'`
  }

  return String(value)
}

const getPlainOutput = (diffTree, parentPath = '') => {
  const lines = diffTree.flatMap((node) => {
    const fullPath = parentPath === '' ? node.key : `${parentPath}.${node.key}`
    if (node.type === 'added') {
      return `Property '${fullPath}' was ${node.type} with value: ${formatValue(node.value)}`
    }

    if (node.type === 'removed') {
      return `Property '${fullPath}' was removed`
    }

    if (node.type === 'updated') {
      return `Property '${fullPath}' was ${node.type}. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`
    }

    if (node.type === 'unchanged') {
      return []
    }

    if (node.type === 'nested') {
      return getPlainOutput(node.children, fullPath)
    }
    throw new Error(`Unknown node type: ${node.type}`)
  })
  return `${lines.join('\n')}`
}

export default getPlainOutput
