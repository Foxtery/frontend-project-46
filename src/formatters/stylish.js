const isObject = value => (
  typeof value === 'object'
  && value !== null
  && !Array.isArray(value)
)

const getFormatValue = (value, depth) => {
  if (!isObject(value)) {
    return String(value)
  }

  const spacesCount = 4
  const currentIndent = ' '.repeat(depth * spacesCount)
  const closingIndent = ' '.repeat((depth - 1) * spacesCount)

  const lines = Object.entries(value).map(([key, nestedValue]) => (
    `${currentIndent}${key}: ${getFormatValue(nestedValue, depth + 1)}`
  ))

  return `{\n${lines.join('\n')}\n${closingIndent}}`
}

const getStylishOutput = (diffTree, depth = 1) => {
  const spacesCount = 4
  const currentIndent = ' '.repeat(depth * spacesCount)
  const signIndent = ' '.repeat(depth * spacesCount - 2)
  const closingIndent = ' '.repeat((depth - 1) * spacesCount)
  const lines = diffTree.map((node) => {
    if (node.type === 'added') {
      return `${signIndent}+ ${node.key}: ${getFormatValue(node.value, depth + 1)}`
    }

    if (node.type === 'removed') {
      return `${signIndent}- ${node.key}: ${getFormatValue(node.value, depth + 1)}`
    }

    if (node.type === 'unchanged') {
      return `${currentIndent}${node.key}: ${getFormatValue(node.value, depth + 1)}`
    }

    if (node.type === 'updated') {
      return `${signIndent}- ${node.key}: ${getFormatValue(node.oldValue, depth + 1)}\n${signIndent}+ ${node.key}: ${getFormatValue(node.newValue, depth + 1)}`
    }

    if (node.type === 'nested') {
      return `${currentIndent}${node.key}: ${getStylishOutput(node.children, depth + 1)}`
    }
    throw new Error(`Unknown node type: ${node.type}`)
  })
  const result = lines.join('\n')
  return `{\n${result}\n${closingIndent}}`
}

export default getStylishOutput
