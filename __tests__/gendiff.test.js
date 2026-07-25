import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { test, expect } from '@jest/globals'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = filename => (
  path.join(__dirname, '__fixtures__', filename)
)

test('compare two flat JSON files', () => {
  const filepath1 = getFixturePath('file1.json')
  const filepath2 = getFixturePath('file2.json')
  const expected = fs.readFileSync(getFixturePath('expected.txt'), 'utf-8')

  const actual = genDiff(filepath1, filepath2)

  expect(actual).toBe(expected)
})

test('compare two flat YAML or YML files', () => {
  const filepath1 = getFixturePath('file1.yaml')
  const filepath2 = getFixturePath('file2.yml')
  const expected = fs.readFileSync(getFixturePath('expected.txt'), 'utf-8')

  const actual = genDiff(filepath1, filepath2)

  expect(actual).toBe(expected)
})

test('compare flat YAML and JSON files', () => {
  const filepath1 = getFixturePath('file1.json')
  const filepath2 = getFixturePath('file2.yml')
  const expected = fs.readFileSync(getFixturePath('expected.txt'), 'utf-8')

  const actual = genDiff(filepath1, filepath2)

  expect(actual).toBe(expected)
})
