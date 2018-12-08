/**
  --- Day 6: Chronal Coordinates ---
  The device on your wrist beeps several times, and once again you feel like you're falling.

  "Situation critical," the device announces. "Destination indeterminate. Chronal interference detected. Please specify new target coordinates."

  The device then produces a list of coordinates (your puzzle input). Are they places it thinks are safe or dangerous? It recommends you check manual page 729. The Elves did not give you a manual.

  If they're dangerous, maybe you can minimize the danger by finding the coordinate that gives the largest distance from the other points.

  Using only the Manhattan distance, determine the area around each coordinate by counting the number of integer X,Y locations that are closest to that coordinate (and aren't tied in distance to any other coordinate).

  Your goal is to find the size of the largest area that isn't infinite. For example, consider the following list of coordinates:

  1, 1
  1, 6
  8, 3
  3, 4
  5, 5
  8, 9
  If we name these coordinates A through F, we can draw them on a grid, putting 0,0 at the top left:

  ..........
  .A........
  ..........
  ........C.
  ...D......
  .....E....
  .B........
  ..........
  ..........
  ........F.
  This view is partial - the actual grid extends infinitely in all directions. Using the Manhattan distance, each location's closest coordinate can be determined, shown here in lowercase:

  aaaaa.cccc
  aAaaa.cccc
  aaaddecccc
  aadddeccCc
  ..dDdeeccc
  bb.deEeecc
  bBb.eeee..
  bbb.eeefff
  bbb.eeffff
  bbb.ffffFf
  Locations shown as . are equally far from two or more coordinates, and so they don't count as being closest to any.

  In this example, the areas of coordinates A, B, C, and F are infinite - while not shown here, their areas extend forever outside the visible grid. However, the areas of coordinates D and E are finite: D is closest to 9 locations, and E is closest to 17 (both including the coordinate's location itself). Therefore, in this example, the size of the largest area is 17.

  What is the size of the largest area that isn't infinite?
  */
module.exports = function (coords) {
  const [w, h] = calculateMaximums(coords)
  const grid = createGrid(w, h)
  const firstRun = findAreas(grid, coords)

  const translated = shiftCoords(coords, 10)
  const [w2, h2] = calculateMaximums(translated)
  const grid2 = createGrid(Math.floor(w2 * 1.5), Math.floor(h2 + 1.5))
  const secondRun = findAreas(grid2, translated)

  const finiteAreas = firstRun.filter(area => secondRun.includes(area))
  const max = Math.max(...finiteAreas)
  return max
}

module.exports.utils = {
  calculateMaximums,
  createGrid,
  findAreas,
  mdis,
  shiftCoords,
}

function shiftCoords (coords, shiftFactor) {
  return coords.map(pair => {
    return pair.map(value => value + shiftFactor)
  })
}

function calculateMaximums (coords) {
  const w = Math.max(...coords.map(c => c[0]))
  const h = Math.max(...coords.map(c => c[1]))
  return [w, h]
}

function createGrid (w, h) {
  return new Array(h).fill(null).map(r => {
    return new Array(w).fill(null)
  })
}

function findAreas (grid, coords) {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      // Needs to reduce the coords down to the closest point in coords
      let distances = coords.map(coord => mdis([x,y], coord))
      let min = Math.min(...distances)
      if (distances.filter(d => d === min).length > 1) {
        grid[y][x] = '-'
      } else {
        grid[y][x] = distances.reduce((closest, curr, index, array) => {
          if (!closest && closest !== 0) return index
          if (array[closest] > curr) return index
          return closest
        }, null)
      }
    }
  }

  const areasIndex = grid.reduce((total, row) => {
    const counts = row.reduce((count, index) => {
      count[index] = count[index] || 0
      count[index]++
      return count
    }, {} )
    for (let key in counts) {
      total[key] = total[key] || 0
      total[key] += counts[key]
    }
    return total
  }, {})

  delete areasIndex['-']

  return Object.values(areasIndex)
}

// Manhattan distance formula for 2d
function mdis ([x1,y1], [x2, y2]) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2)
}
