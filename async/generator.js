// generator 生成器 =》 遍历器=》 数组=》 类数组 长的像数组

//... 拓展运算符，运力就是，后面的对象内部有遍历器，才可以把结果遍历完放到数组中 [...new Set()]

const likeArray = { 0: 'a', 1: 'b', 2: 'c', length: 3 }
// console.log([...likeArray]) // 直接这样就会报错

// console.log(Array.from(likeArray))
// likeArray[Symbol.iterator] = function () {
//   //自定义遍历器， 类数组就能转化为数组
//   let i = 0
//   return {
//     next: () => {
//       return { value: this[i], done: i++ === this.length }
//     },
//   }
// }

likeArray[Symbol.iterator] = function* () {
  //generator 语法
  let i = 0
  while (i !== this.length) {
    yield this[i++]
  }
}
// console.log([...likeArray])

// function* read() {
//   yield 1
//   yield 2
//   yield 3
// }
// let it = read()
// let flag = false
// do {
//   const { value, done } = it.next()
//   console.log(value)
//   flag = done
// } while (!flag)

function* read() {
  let a = yield 1
  console.log(a) // 2
  let b = yield 2
  console.log(b) // 3
  let c = yield 3
  console.log(c)
  return c
}

let it = read()
// 传递参数为蛇形执行，除第一次外，都是把next中的参数传给上一次的yield的返回结果
it.next('1') // 第一次的next传参没有任何意义
it.next('2')
it.next('3')
