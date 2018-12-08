module.exports.opposites = function () {
  const lowers = 'abcdefghijklmnopqrstuvwxyz'
  const capitals = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let index = lowers.split('').reduce((all, char, index) => {
    all[char] = capitals[index]
    return all
  }, {})
  return capitals.split('').reduce((all, char, index) => {
    all[char] = lowers[index]
    return all
  }, index)
}