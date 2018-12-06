/**
  --- Day 3: No Matter How You Slice It ---
  The Elves managed to locate the chimney-squeeze prototype fabric for Santa's suit (thanks to someone who helpfully wrote its box IDs on the wall of the warehouse in the middle of the night). Unfortunately, anomalies are still affecting them - nobody can even agree on how to cut the fabric.

  The whole piece of fabric they're working on is a very large square - at least 1000 inches on each side.

  Each Elf has made a claim about which area of fabric would be ideal for Santa's suit. All claims have an ID and consist of a single rectangle with edges parallel to the edges of the fabric. Each claim's rectangle is defined as follows:

  The number of inches between the left edge of the fabric and the left edge of the rectangle.
  The number of inches between the top edge of the fabric and the top edge of the rectangle.
  The width of the rectangle in inches.
  The height of the rectangle in inches.
  A claim like #123 @ 3,2: 5x4 means that claim ID 123 specifies a rectangle 3 inches from the left edge, 2 inches from the top edge, 5 inches wide, and 4 inches tall. Visually, it claims the square inches of fabric represented by # (and ignores the square inches of fabric represented by .) in the diagram below:

  ...........
  ...........
  ...#####...
  ...#####...
  ...#####...
  ...#####...
  ...........
  ...........
  ...........
  The problem is that many of the claims overlap, causing two or more claims to cover part of the same areas. For example, consider the following claims:

  #1 @ 1,3: 4x4
  #2 @ 3,1: 4x4
  #3 @ 5,5: 2x2
  Visually, these claim the following areas:

  ........
  ...2222.
  ...2222.
  .11XX22.
  .11XX22.
  .111133.
  .111133.
  ........
  The four square inches marked with X are claimed by both 1 and 2. (Claim 3, while adjacent to the others, does not overlap either of them.)

  If the Elves all proceed with their own plans, none of them will have enough fabric. How many square inches of fabric are within two or more claims?
  */

module.exports.p1 = function (claims) {
  let fabric = (new Array(1000).fill(null)).map(_ => {
    return new Array(1000).fill(0)
  })
  // Apply claims to fabric
  claims.forEach(claim => {
    const [x, y, w, h] = claim
    for (let j = y; j <= h + y - 1; j++) {
      for (let i = x; i <= w + x - 1; i++) {
        fabric[j][i]++
      }
    }
  })
  // Map reduce over fabric
  let count = fabric.map(row => {
    return row.reduce((multipleClaimed, fabricSquare) => {
      if (fabricSquare > 1) multipleClaimed++
      return multipleClaimed
    }, 0)
  }).reduce((total, rowCount) => {
    return total + rowCount
  }, 0)
  console.log(count)
}

/**
  --- Part Two ---
  Amidst the chaos, you notice that exactly one claim doesn't overlap by even a single square inch of fabric with any other claim. If you can somehow draw attention to it, maybe the Elves will be able to make Santa's suit after all!

  For example, in the claims above, only claim 3 is intact after all claims are made.

  What is the ID of the only claim that doesn't overlap?
 */

module.exports.p2 = function (claims) {
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
  // Search through each square, if the square doens't have more than a single claim.
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
  Object.entries(areaOfOneClaimSquares).forEach(([claimNum, area]) => {
    const [x, y, w, h] = claims[claimNum - 1] // Correct for index offset
    if (area === (w * h)) {
      console.log(claimNum)
    }
  })
 }
