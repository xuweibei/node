const path = require('path')
const fs = require('fs')

function renderFile(pathRouter, obj, cb) {
  fs.readFile(pathRouter, 'utf8', (err, html) => {
    let head = `let str = '';\r\n with(obj){\r\n`
    head += 'str+=`'
    html = html.replace(/\{\%([^%]+)\%\}/g, function () {
      return '`\r\n' + arguments[1] + '\r\nstr+=`\r\n'
    })
    let tail = '`}\r\n return str;'
    let fn = new Function('obj', head + html + tail)
    cb(err, fn(obj))
  })
}
renderFile(
  path.resolve(__dirname, 'template2.html'),
  { arr: [1, 2, 3] },
  (err, data) => {
    console.log(data)
  }
)

const vm = require('vm') // node的虚拟机模块，可以创建沙箱环境（一个干净的环境）
vm.runInThisContext('console.log(a)') // 和eval的区别在于不会去从上下文的作用域中找值
