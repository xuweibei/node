//node在浏览器中进行调试的方法
// 1.(node --inspect-brk 文件名来解析)  Chrome中访问 chrome://inspect/#devices
// 2.直接使用创建launch.js文件来测试，VSCOde自带的

const fs = require('fs')
const a2 = require('./note.md')
console.log(a2)
const a = 1
const b = 2

function aa(a, b) {
  return a + b
}

aa(a, b)
