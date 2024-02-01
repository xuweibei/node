function MyPromise(executor) {
  let self = this
  self.status = 'pending'
  self.value = undefined
  self.reason = undefined
  self.onResolveCallBacks = []
  self.onRejectCallBacks = []

  function resolve(value) {
    if (value instanceof MyPromise) {
      return value.then(resolve, reject)
    }
    setTimeout(() => {
      if (self.status === 'pending') {
        self.status = 'resolved'
        self.value = value
        self.onResolveCallBacks.forEach((item) => item(value))
      }
    })
  }

  function reject(value) {
    setTimeout(() => {
      if (self.status === 'pending') {
        self.status = 'rejected'
        self.reason = value
        self.onRejectCallBacks.forEach((item) => item(value))
      }
    })
  }

  try {
    executor(resolve, reject)
  } catch (err) {
    reject(err)
  }
}

function resolvePromise(promise, x, resolve, reject) {
  if (promise === x) {
    return reject(new TypeError('循环引用'))
  }
  let called, then
  if ((x !== null) & (typeof x === 'object' || typeof x === 'function')) {
    try {
      then = x.then
      if (typeof then === 'function') {
        then.call(
          x,
          (value) => {
            if (called) return
            called = true
            resolvePromise(promise, value, resolve, reject)
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
  let promise
  if (self.status === 'resolved') {
    promise = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          let x = onFulfilled(self.value)
          resolvePromise(promise, x, resolve, reject)
        } catch (err) {
          reject(err)
        }
      })
    })
  }
  if (self.status === 'rejected') {
    promise = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          let x = onRejected(self.reason)
          resolvePromise(promise, x, resolve, reject)
        } catch (err) {
          reject(err)
        }
      })
    })
  }
  if (self.status === 'pending') {
    promise = new Promise((resolve, reject) => {
      self.onResolveCallBacks.push(() => {
        try {
          let x = onFulfilled(self.value)
          resolvePromise(promise, x, resolve, reject)
        } catch (err) {
          reject(err)
        }
      })
      self.onRejectCallBacks.push(() => {
        try {
          let x = onRejected(self.reason)
          resolvePromise(promise, x, resolve, reject)
        } catch (err) {
          reject(err)
        }
      })
    })
  }
  return promise
}
MyPromise.deferred = MyPromise.defer = function () {
  let defer = {}
  defer.promise = new MyPromise((resolve, reject) => {
    defer.resolve = resolve
    defer.reject = reject
  })
  return defer
}

try {
  module.exports = MyPromise
} catch (e) {}
