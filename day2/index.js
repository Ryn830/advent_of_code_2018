/**
  * For example, if you see the following box IDs:
  *    abcdef contains no letters that appear exactly two or three times.
  *    bababc contains two a and three b, so it counts for both.
  *    abbcde contains two b, but no letter appears exactly three times.
  *    abcccd contains three c, but no letter appears exactly two times.
  *    aabcdd contains two a and two d, but it only counts once.
  *    abcdee contains two e.
  *    ababab contains three a and three b, but it only counts once.
  * Of these box IDs, four of them contain a letter which appears exactly twice,
  * and three of them contain a letter which appears exactly three times.
  * Multiplying these together produces a checksum of 4 * 3 = 12.
  *
  * What is the checksum for your list of box IDs?
  */

const data = require('./data')
module.exports.part1 = function () {
  const [tot2, tot3] = data.map(id => {
    const filteredCounts = Object.values(countLetters(id))
      .filter(count => {
        return count > 1 && count < 4
      })
    return unique(filteredCounts)
  })
  .reduce((all, id) => {
    const [num2s, num3s] = id.reduce((total, value) => {
      if (value === 2) {
        total[0]++
      }
      if (value === 3) {
        total[1]++
      }
      return total
    }, [0, 0])
    all[0] += num2s
    all[1] += num3s
    return all
  }, [0, 0])
  console.log(tot2 * tot3)

  function countLetters (str) {
    return str.split('').reduce((counts, letter) => {
      counts[letter] = counts[letter] || 0
      counts[letter]++
      return counts
    }, {})
  }

  function unique (arr) {
    const uniques = arr.reduce((index, curr) => {
      index[curr] = true
      return index
    }, {})
    return Object.keys(uniques).map(val => parseInt(val))
  }
}

/**
  * Confident that your list of box IDs is complete, you're ready to find the boxes full of prototype fabric.
  * The boxes will have IDs which differ by exactly one character at the same position in both strings.
  * For example, given the following box IDs:
  *    abcde
  *    fghij
  *    klmno
  *    pqrst
  *    fguij
  *    axcye
  *    wvxyz
  * The IDs abcde and axcye are close, but they differ by two characters (the second and fourth).
  * However, the IDs fghij and fguij differ by exactly one character, the third (h and u).
  * Those must be the correct boxes.
  * What letters are common between the two correct box IDs? (In the example above, this
  * is found by removing the differing character from either ID, producing fgij.)
  */

module.exports.part2 = function (ids) {
  for (let i = 0; i < ids.length; i++) {
    for (let j = i + 1; j < ids.length; j++) {
      let current = ids[i]
      let compare = ids[j]
      let similarities = []
      for (let k = 0; k < current.length; k++) {
        if (current[k] === compare[k]) {
          similarities.push(current[k])
        }
      }
      if (similarities.length === current.length - 1) {
        console.log(similarities.join(''))
      }
    }
  }
}
