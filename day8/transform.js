const fs = require('fs')

let data = fs.readFileSync('./raw_data.txt', { encoding: 'utf8' })
  .split(' ')
  .map(value => ` ${parseInt(value, 10)}`).join(',')

let formatted = `module.exports = [${ data } ]`

fs.writeFileSync('./data.js', formatted)
