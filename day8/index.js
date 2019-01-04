const example = require('./example')
const data = require('./data')
const part1 = require('./part1')
const part2 = require('./part2')

module.exports.p1 = function () {
  // console.log('Part 1:', part1(example))
  console.log('Part 1:', part1(data))
}

module.exports.p2 = function () {
  console.log('Part 2:', part2(example))
  // console.log('Part 2:', part2(data))
}
