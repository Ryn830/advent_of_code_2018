const expect = require('chai').expect
const sinon = require('sinon')

const data = require('./data')
const part1 = require('./part1')
const part2 = require('./part2')
const index = require('./index')

describe('day1', function () {
  describe('index', function () {
    it('should contain exports for p1 and p2', function () {
      expect(index.p1).to.be.an.instanceOf(Function)
      expect(index.p2).to.be.an.instanceOf(Function)
    })

    it('should return numbers', function () {
      expect(index.p1()).to.be.a('number')
      expect(index.p2()).to.be.a('number')
    })
  })

  describe('part1', function () {
    it('should be a function', function () {
      expect(part1).to.be.an.instanceOf(Function)
    })

    it('should return the sum of an array', function () {
      expect(part1([1,2,3,4,5,6])).to.equal(21)
    })

    it('should return the correct answer', function () {
      expect(part1(data)).to.equal(442)
    })
  })

  describe('part2', function () {
    it('should be a function', function () {
      expect(part2).to.be.an.instanceOf(Function)
    })

    it('should return the correct answer', function () {
      expect(part2(data)).to.equal(59908)
    })
  })
})
