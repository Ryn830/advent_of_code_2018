const data = require('./day1_data')

/**
 * Part 1
 */
module.exports.part1 = () => {
  const result = data.reduce((all, el) => {
    return all + el
  }, 0)
  console.log(result)
}

/**
 * Part 2
 */
module.exports.part2 = () => {
  let values = []
  for (let i = 0; i < 150; i++) {
    values = values.concat(data)
  }
  let index = {}
  let count = 0
  values.forEach(value => {
    count += value
    index[count] = index[count] || 0
    index[count]++
    if (index[count] === 2) {
      console.log(count)
      process.exit(0)
    }
  })
}
