const expect = require('chai').expect

const data = require('./data')
const part1 = require('./part1')
const part2 = require('./part2')
const index = require('./index')

describe('day3', function () {
  describe('index', function () {
    it('should contain exports for part1 and part2', function () {
      expect(index.p1).to.be.an.instanceOf(Function)
      expect(index.p2).to.be.an.instanceOf(Function)
    })

    it('should return results for p1 and p2', function () {
      expect(index.p1()).to.be.a('number')
      expect(index.p2()).to.be.a('String')
    })
  })
})
