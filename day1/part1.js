/**
 * Part 1
 */
module.exports = (data) => {
  return data.reduce((all, el) => {
    return all + el
  }, 0)
}
