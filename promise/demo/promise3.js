function MyPromise(exeuctor) {
  let self = this
  self.status = 'pending'
  self.value = undefined
  self.reason = undefined
  self.onResoveCallBacks = []
  self.onRejectCallBacks = []

  function resolve(value) {
    if (value instanceof MyPromise) {
      return value.then(resolve, reject)
    }

    setTimeout(() => {
      if (self.status === 'pending') {
        self.value = value
        self.status = 'resolved'
        self.onResoveCallBacks.forEach((item) => item(value))
      }
    })
  }

  function reject(err) {
    setTimeout(() => {
      if (self.status === 'pending') {
        self.status = 'rejected'
        self.reason = err
        self.onRejectCallBacks.forEach((item) => item(err))
      }
    })
  }

  try {
    exeuctor(resolve, reject)
  } catch (err) {
    reject(err)
  }
}

function resolvePromise(promise, x, resolve, reject) {
  if (promise === x) {
    return reject(new TypeError('循环引用错误'))
  }
  let called, then
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      then = x.then
      if (typeof then === 'function') {
        then.call(
          x,
          (y) => {
            if (called) return
            called = true
            resolvePromise(promise, y, resolve, reject)
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
      : (v) => {
          throw v
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
    promise = new MyPromise((resolve, reject) => {
      self.onResoveCallBacks.push(() => {
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

MyPromise.prototype.catch = function (reject) {
  return MyPromise.prototype.then(null, reject)
}

MyPromise.prototype.all = function (promises) {
  return new MyPromise((resolve, reject) => {
    let result = []
    let count = 0
    for (i = 0; i < promises.length; i++) {
      promises[i].then(
        (value) => {
          result[i] = value
          if (++count === promises.length) {
            resolve(result)
          }
        },
        (err) => {
          reject(err)
        }
      )
    }
  })
}

MyPromise.deferred = MyPromise.defer = function () {
  let def = {}
  def.promise = new MyPromise((resolve, reject) => {
    def.resolve = resolve
    def.reject = reject
  })
  return def
}

try {
  module.exports = MyPromise
} catch (ee) {}
