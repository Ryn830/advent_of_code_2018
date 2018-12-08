const fs = require('fs')

const raw = fs.readFileSync('./raw_data.txt', { encoding: 'utf8' })

const formatted = raw.split('\n')
.map(line => {
  const match = /(\d*),\s(\d*)/.exec(line)
  return `\n  [${ match[1]}, ${ match[2] }]`
})

const final = `module.exports = [${ formatted }\n]\n`
fs.writeFileSync('./data.js', final)
