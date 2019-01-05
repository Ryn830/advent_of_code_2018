const data = require('./data')
const part1 = require('./part1')
const part2 = require('./part2')

module.exports.p1 = function () {
  return part1(data)
}

module.exports.p2 = function () {
  return part2(data)
}
