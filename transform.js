const fs = require('fs')

fs.readFile('./day3/data.txt', { encoding: 'utf8'}, function (error, data) {
  let transform = data.split('\n').map(line => {
    const [_, x, y, w, h] = /#\d*\s@\s(\d*),(\d*):\s(\d*)x(\d*)/.exec(line)
    return `[${[x, y, w, h]}]`
  })
  console.log(transform)
  fs.writeFileSync('./day3/coordinates.js', transform)
})