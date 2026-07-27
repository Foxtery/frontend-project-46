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

test('compare two files. Default stylish output', () => {
  const filepath1 = getFixturePath('file1.yaml')
  const filepath2 = getFixturePath('file2.json')
  const expected = fs.readFileSync(getFixturePath('expected.txt'), 'utf-8')

  const actual = genDiff(filepath1, filepath2)

  expect(actual).toBe(expected)
})

test('compare two JSON files. Stylish output', () => {
  const filepath1 = getFixturePath('file1.json')
  const filepath2 = getFixturePath('file2.json')
  const expected = fs.readFileSync(getFixturePath('expected.txt'), 'utf-8')

  const actual = genDiff(filepath1, filepath2, 'stylish')

  expect(actual).toBe(expected)
})

test('compare two files. Plain output', () => {
  const filepath1 = getFixturePath('file1.json')
  const filepath2 = getFixturePath('file2.yml')
  const expected = fs.readFileSync(getFixturePath('expectedPlain.txt'), 'utf-8')

  const actual = genDiff(filepath1, filepath2, 'plain')

  expect(actual).toBe(expected)
})

test('compare two files. JSON output', () => {
  const filepath1 = getFixturePath('file1.json')
  const filepath2 = getFixturePath('file2.yml')
  const expected = fs.readFileSync(getFixturePath('expectedJson.txt'), 'utf-8')

  const actual = genDiff(filepath1, filepath2, 'json')

  expect(actual).toBe(expected)
})

test('throws an error for unknown format', () => {
  const filepath1 = getFixturePath('file1.json')
  const filepath2 = getFixturePath('file2.yml')

  expect(() => {
    genDiff(filepath1, filepath2, 'someformat')
  }).toThrow('Unknown format: someformat')
})

test('compare two JSON files. JSON result', () => {
  const filepath1 = getFixturePath('file1.json')
  const filepath2 = getFixturePath('file2.json')
  const expected = fs.readFileSync(getFixturePath('expectedJson.txt'), 'utf-8')

  const actual = genDiff(filepath1, filepath2, 'json')

  expect(JSON.parse(actual)).toEqual(JSON.parse(expected))
})
