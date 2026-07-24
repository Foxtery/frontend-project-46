import fs from 'node:fs'
import path from 'node:path'
import parse from './parser.js'
import { union } from 'es-toolkit/array'
import sortBy from 'lodash/sortBy.js'

const getAbsolutePath = filepath => (
  path.resolve(process.cwd(), filepath)
)

const getFileFormat = filepath => (
  path.extname(filepath).slice(1)
)

const readFile = filepath => (
  fs.readFileSync(getAbsolutePath(filepath), 'utf-8')
)

const getSortedKeys = (data1, data2) => { // data1 and data2 are objects!!!
  const keys1 = Object.keys(data1)
  const keys2 = Object.keys(data2)
  const uniqueKeys = union(keys1, keys2)
  const sortedKeys = sortBy(uniqueKeys)
  return sortedKeys
}

const genDiff = (filepath1, filepath2) => {
  const content1 = readFile(filepath1)
  const content2 = readFile(filepath2)

  const format1 = getFileFormat(filepath1)
  const format2 = getFileFormat(filepath2)

  const data1 = parse(content1, format1)
  const data2 = parse(content2, format2)

  const sortedUniqueKeys = getSortedKeys(data1, data2)
  const diffResult = sortedUniqueKeys.map((key) => {
    if (Object.hasOwn(data1, key) && !Object.hasOwn(data2, key)) {
      return ` - ${key}: ${data1[key]}`
    }
    else if (Object.hasOwn(data2, key) && !Object.hasOwn(data1, key)) {
      return ` + ${key}: ${data2[key]}`
    }
    else {
      if (data1[key] === data2[key]) {
        return `   ${key}: ${data1[key]}`
      }
      else {
        return ` - ${key}: ${data1[key]}\n + ${key}: ${data2[key]}`
      }
    }
  })
  const lines = diffResult.join('\n')

  return `{\n${lines}\n}`
}

export default genDiff
