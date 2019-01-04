/**
 * Part 2
 */
module.exports = (data) => {
  let values = []
  for (let i = 0; i < 150; i++) {
    values = values.concat(data)
  }
  let index = {}
  let count = 0
  let result = null
  values.forEach(value => {
    count += value
    index[count] = index[count] || 0
    index[count]++
    if (index[count] === 2) {
      result = result || count
    }
  })
  return result
}
