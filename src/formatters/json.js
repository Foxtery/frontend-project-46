const getJsonOutput = (diffTree) => {
  const result = JSON.stringify(diffTree, null, 2)
  return result
}

export default getJsonOutput
