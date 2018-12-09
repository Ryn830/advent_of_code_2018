const fs = require('fs')

const data = fs.readFileSync('./raw_data.txt', { encoding: 'utf8' })

const formatted = data.split('\n').map(line => {
  const [_, step1, step2] = /Step (\D) must be finished before step (\D) can begin./.exec(line)
  return [step1, step2]
})
.sort(([a1, b1], [a2, b2]) => {
  // Sorting in Node vs Chrome are different.
  // Character codes are necessary in Node, not in Chrome.
  let [a1c, b1c] = [a1.charCodeAt(0), b1.charCodeAt(0)]
  let [a2c, b2c] = [a2.charCodeAt(0), b2.charCodeAt(0)]
  if (a1c === a2c) {
    return (b1c < b2c) ? -1 : (b1c > b2c) ? 1 : 0
  }
  return (a1c < a2c) ? -1 : 1
})
.map(([a, b]) => {
  return `  ["${ a }", "${ b }"]`
})
.join(',\n')

fs.writeFileSync('./data.js', `module.exports = [\n${ formatted }\n]`)
