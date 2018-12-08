const p1 = require('./part1')
const p2 = require('./part2')
const data = require('./data')

module.exports.p1 = function () {
  console.log("Part 1:", p1(data))
}

module.exports.p2 = function () {
  console.log("Part 2:", p2(data, 10000))
}
