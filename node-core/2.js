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
  console.log(11)
})
