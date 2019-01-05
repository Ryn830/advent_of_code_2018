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

 module.exports = function (ids) {
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
        return similarities.join('')
      }
    }
  }
}
