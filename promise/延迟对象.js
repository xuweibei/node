const fs = require('fs')
const Promise = require('./demo/promise3')

function read(fileName) {
  let def = Promise.defer()
  fs.readFile(fileName, 'utf-8', (err, data) => {
    if (err) def.reject(err)
    def.resolve(data)
  })
  return def.promise
}
read('./name.txt')
  .then(
    (v) => {
      return read(v)
    },
    (err) => {
      console.log(err)
    }
  )
  .then((e) => {
    console.log(e)
  })
