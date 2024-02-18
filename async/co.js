const fs = require('fs')

function* read() {
  let name = yield fs.readFile('./name.txt', 'utf-8', () => {})
  let age = yield fs.readFile(name, 'utf-8', () => {})
  return age
}

function co(it) {
  return new Promise((resolve, reject) => {
    function next() {
      let { value, done } = it.next()
      if (!done) {
        Promise.resolve(value).then((data) => {
          next(data)
        }, reject)
      } else {
        resolve(value)
      }
    }
    next()
  })
}

co(read()).then((data) => {
  console.log(data)
})
