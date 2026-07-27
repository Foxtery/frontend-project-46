import getStylishOutput from './stylish.js'
import getPlainOutput from './plain.js'
import getJsonOutput from './json.js'

const diffFormat = (diffResult, format) => {
  switch (format) {
    case 'stylish':
      return getStylishOutput(diffResult)
    case 'plain':
      return getPlainOutput(diffResult)
    case 'json':
      return getJsonOutput(diffResult)
    default:
      throw new Error(`Unknown format: ${format}`)
  }
}

export default diffFormat
