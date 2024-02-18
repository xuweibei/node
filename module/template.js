const ejs = require('ejs')
const path = require('path')
const fs = require('fs')

// ejs.renderFile(
//   path.resolve(__dirname, 'template.html'),
//   { name: 1, age: 2 },
//   function (err, data) {
//     console.log(data)
//   }
// )

function renderFile(pathRouter, obj, cb) {
  fs.readFile(pathRouter, 'utf8', (err, html) => {
    if (err) {
      return cb(err, html)
    }
    html = html.replace(/\{\{([^}]+)\}\}/g, function () {
      let key = arguments[1].trim()
      return obj[key]
    })
    cb(err, html)
  })
}

renderFile(
  path.resolve(__dirname, 'template.html'),
  { name: 'xiaoming', age: 2 },
  (err, data) => {
    console.log(data)
  }
)
