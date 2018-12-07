const fs = require('fs')
const moment = require('moment')

const times = fs.readFileSync('./raw_data.txt', { encoding: 'utf8' })

// Sort the times by chronological order
let sorted = times.split('\n')
  .map(time => {
    return /\[(\d*\-\d*\-\d*\s\d*\:\d*)\]/.exec(time)
  })
  .sort((a, b) => {
    // Sort by the match, a date string
    const time_format = 'YYYY-MM-DD HH:mm'
    const time1 = moment(a[0], time_format)
    const time2 = moment(b[0], time_format)
    return time1.diff(time2)
  })
  .map(match => {
    // Indent the output
    return `  "${match.input}"`
  })
  .join(',\n')

// Make output require-able
fs.writeFileSync('./data.js', `module.exports = [\n${ sorted }\n]`)
