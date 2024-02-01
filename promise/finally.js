//表示 无论如何都会执行的意思
//如果返回了一个promise 会等待这个promise执行完毕（如果是失败的promise 会用他的失败的原因传给下一个）

Promise.prototype.finally = function (callback) {
  return this.then(
    (v) => {
      return Promise.resolve(callback()).then(() => value)
    },
    (resason) => {
      return Promise.resolve(callback()).then(() => {
        throw resason
      })
    }
  )
}
