function MyPromise(executor) {
  let self = this
  self.status = 'pending'
  self.value = undefined
  self.reason = undefined
  self.onResolvedCallBacks = []
  self.onRejectCallBacks = []

  function resolve(data) {
    if (data instanceof MyPromise) {
      return data.then(resolve, reject)
    }

    setTimeout(function () {
      if (self.status === 'pending') {
        self.status = 'resolved'
        self.value = data
        self.onResolvedCallBacks.forEach((fn) => fn(data))
      }
    })
  }

  function reject(err) {
    setTimeout(function () {
      if (self.status === 'pending') {
        self.status = 'rejected'
        self.reason = err
        self.onRejectCallBacks.forEach((fn) => fn(err))
      }
    })
  }

  try {
    executor(resolve, reject)
  } catch (err) {
    reject(err)
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('循环引用'))
  }

  let then
  let called
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      then = x.then
      if (typeof then === 'function') {
        then.call(
          x,
          (y) => {
            if (called) return
            called = true
            resolvePromise(promise2, y, resolve, reject)
          },
          (err) => {
            if (called) return
            called = true
            reject(err)
          }
        )
      } else {
        resolve(x)
      }
    } catch (err) {
      if (called) return
      called = true
      reject(err)
    }
  } else {
    resolve(x)
  }
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (v) => v
  onRejected =
    typeof onRejected === 'function'
      ? onRejected
      : (err) => {
          throw err
        }
  let self = this
  let promise2
  if (self.status === 'resolved') {
    promise2 = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          let x = onFulfilled(self.value)
          resolvePromise(promise2, x, resolve, reject)
        } catch (err) {
          reject(err)
        }
      })
    })
  }
  if (self.status === 'rejected') {
    promise2 = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          let x = onRejected(self.reason)
          resolvePromise(promise2, x, resolve, reject)
        } catch (err) {
          reject(err)
        }
      })
    })
  }
  if (self.status === 'pending') {
    promise2 = new MyPromise((resolve, reject) => {
      self.onResolvedCallBacks.push(() => {
        try {
          let x = onFulfilled(self.value)
          resolvePromise(promise2, x, resolve, reject)
        } catch (err) {
          reject(err)
        }
      })
      self.onRejectCallBacks.push(() => {
        try {
          let x = onRejected(self.reason)
          resolvePromise(promise2, x, resolve, reject)
        } catch (err) {
          reject(err)
        }
      })
    })
  }
  return promise2
}

// const p = new MyPromise((resolve, reject) => {
//   resolve(1)
// })

// p.then(
//   (data) => {
//     console.log(data, 'success')
//     return 2
//     return new MyPromise((resolve, reject) => {
//       resolve(22)
//     })
//   },
//   (err) => {
//     console.log(err, 'error')
//     return err
//   }
// ).then(
//   (data) => {
//     console.log(data, 'success2')
//   },
//   (err) => {
//     console.log(err, 'error3')
//   }
// )
// MyPromise.deferred = MyPromise.defer = function () {
//   let defer = {}
//   defer.promise = new MyPromise((resolve, reject) => {
//     defer.resolve = resolve
//     defer.reject = reject
//   })
//   return defer
// }

MyPromise.deferred = MyPromise.defer = function () {
  var defer = {}
  defer.promise = new MyPromise(function (resolve, reject) {
    defer.resolve = resolve
    defer.reject = reject
  })
  return defer
}

try {
  module.exports = MyPromise
} catch (e) {}
