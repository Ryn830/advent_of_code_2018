

/**
  --- Part Two ---
  Amidst the chaos, you notice that exactly one claim doesn't overlap by even a single square inch of fabric with any other claim. If you can somehow draw attention to it, maybe the Elves will be able to make Santa's suit after all!

  For example, in the claims above, only claim 3 is intact after all claims are made.

  What is the ID of the only claim that doesn't overlap?
 */

module.exports = function (claims) {
  let fabric = (new Array(1000).fill(null)).map(_ => {
    return new Array(1000).fill([])
  })
  // Apply claims to fabric
  claims.forEach((claim, index) => {
    const [x, y, w, h] = claim
    for (let j = y; j <= h + y - 1; j++) {
      for (let i = x; i <= w + x - 1; i++) {
        let claimNum = index + 1 // Correct for the offset
        fabric[j][i] = fabric[j][i].concat(claimNum)
      }
    }
  })
  // Tally the number of claims for each given square of fabric
  let oneClaimSquares = fabric.map(row => {
    return row.reduce((multipleClaimed, fabricSquare) => {
      if (fabricSquare.length === 1) multipleClaimed = multipleClaimed.concat(fabricSquare)
      return multipleClaimed
    }, [])
  }).reduce((total, rowCount) => {
    return total.concat(rowCount)
  }, [])

  // Create a map of claimNumbers to the areas
  let areaOfOneClaimSquares = oneClaimSquares.reduce((count, claim) => {
    count[claim] = count[claim] || 0
    count[claim]++
    return count
  }, {})

  // Calculate the expected area for the claim and see if the areas match
  // Log the claim number that matches
  let result = null
  Object.entries(areaOfOneClaimSquares).forEach(([claimNum, area]) => {
    const [x, y, w, h] = claims[claimNum - 1] // Correct for index offset
    if (area === (w * h)) {
      result = claimNum
    }
  })
  return result
 }
