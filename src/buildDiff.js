import { union } from 'es-toolkit/array'
import sortBy from 'lodash/sortBy.js'
import { isObject } from './utils.js'

const getSortedKeys = (data1, data2) => { // data1 and data2 are objects!!!
  const keys1 = Object.keys(data1)
  const keys2 = Object.keys(data2)
  const uniqueKeys = union(keys1, keys2)
  const sortedKeys = sortBy(uniqueKeys)
  return sortedKeys
}

const getDiffTree = (data1, data2) => {
  const sortedUniqueKeys = getSortedKeys(data1, data2)
  const diffResult = sortedUniqueKeys.map((key) => {
    if (Object.hasOwn(data1, key) && !Object.hasOwn(data2, key)) {
      return { key,
        type: 'removed',
        value: data1[key] }
    }

    if (Object.hasOwn(data2, key) && !Object.hasOwn(data1, key)) {
      return { key,
        type: 'added',
        value: data2[key] }
    }

    if (isObject(data1[key]) && isObject(data2[key])) {
      return { key,
        type: 'nested',
        children: getDiffTree(data1[key], data2[key]) }
    }

    if (data1[key] === data2[key]) {
      return { key,
        type: 'unchanged',
        value: data2[key] }
    }

    return { key,
      type: 'updated',
      oldValue: data1[key],
      newValue: data2[key] }
  })

  return diffResult
}

export default getDiffTree
