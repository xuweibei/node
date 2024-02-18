//node 中自己的微任务 nextTick /queueMicrotask
// console.log(1)
// queueMicrotask(() => {
//   console.log(2)
// })

setTimeout(() => {
  console.log(1)
  Promise.resolve().then(() => {
    console.log('then')
  })
  process.nextTick(() => {
    console.log('nextTick')
  })
})
setTimeout(() => {
  console.log(2)
})
// 1 nextTick then 2
// nextTick比promise还快一些
setTmmediate(() => {
  //ie下才有这个方法
  console.log(11)
})

//macrotask 宏任务 script、UI、setTimeout、setInterval、requestFrameAnimation、setTmmediate

//microtask 微任务 promise.then mutationObserver nextTick
