const expect = require('chai').expect

const data = require('./data')
const part1 = require('./index').part1
const part2 = require('./index').part2

describe('day2', function () {
  describe('index', function () {
    it('should contain exports for part1 and part2', function () {
      expect(part1).to.be.an.instanceOf(Function)
      expect(part2).to.be.an.instanceOf(Function)
    })
  })
})
