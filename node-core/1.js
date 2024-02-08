// console.log(global)
// console.log(process.argv) // 默认两参数，1.node.exe ; 2.node 当前执行的文件（解析用户自己传递的参数）
// console.log(process.cwd()) // 当前用户的工作目录 用户可以切换
// console.log(process.env) // 环境变量
// console.log(process.nextTick)

const { program } = new require('commander')
program.version('12.23.2')
program.option('-p,--port <v>', 'set your port')
program.option('-c,--config <v>', 'set your config file')
let r = program.parse(process.argv)
console.log(r)
