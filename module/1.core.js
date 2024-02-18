const path = require('path')
const fs = require('fs')

// __dirname 代表的是当前文件所在的文件夹，__dirname 并不属于global，每个模块独有的
console.log(path.resolve(__dirname, './name')) //还可以有第三个参数，但不能为 '/',否则会回到根目录
console.log(path.join(__dirname, './name.txt', '/')) //拼接
console.log(path.extname('a/b/a.min.js')) // 获取当前路径的扩展名

const exists = fs.existsSync(path.resolve(__dirname, '..', 'name.txt'))
console.log(exists, 'exists', path.resolve(__dirname, '..', 'name.txt'))
// 返回一个布尔值，证明文件是否存在 第二个参数的两个点 表示文件向上走一级
const r = fs.readFileSync(path.resolve(__dirname, '..', 'name.txt'), 'utf-8')
console.log(r)
