import fs from 'node:fs'
import path from 'node:path'
import parse from './parser.js'
import getDiffTree from './buildDiff.js'
import diffFormat from './formatters/index.js'

const getAbsolutePath = filepath => (
  path.resolve(process.cwd(), filepath)
)

const getFileFormat = filepath => (
  path.extname(filepath).slice(1)
)

const readFile = filepath => (
  fs.readFileSync(getAbsolutePath(filepath), 'utf-8')
)

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const content1 = readFile(filepath1)
  const content2 = readFile(filepath2)

  const format1 = getFileFormat(filepath1)
  const format2 = getFileFormat(filepath2)

  const data1 = parse(content1, format1)
  const data2 = parse(content2, format2)

  const stylishOutput = diffFormat(getDiffTree(data1, data2), format)
  return stylishOutput
}

export default genDiff
