// 什么是闭包
// 函数的定义的作用域和函数执行的作用域 不在同一个作用域 after就是一个闭包函数

function after(a) {
  return function () {
    console.log(a)
  }
}

// 发布订阅模式
let event = {
  arr: [],
  on(cb) {
    this.arr.push(cb)
  },
  emit() {
    this.arr.forEach((item) => item())
  },
}

event.on(function () {
  console.log('1')
})

event.on(function () {
  console.log('2')
})

const fs = require('fs')
fs.readFile('./name.text', 'utf-8', (err, value) => {
  console.log(value)
  event.emit()
})
