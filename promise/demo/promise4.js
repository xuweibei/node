function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('循环引用'))
  }
  let called, then
  if ((x !== null) & (typeof x === 'object' || typeof x === 'function')) {
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
          (e) => {
            if (called) return
            called = true
            reject(e)
          }
        )
      } else {
        resolve(x)
      }
    } catch (e) {
      if (called) return
      called = true
      reject(e)
    }
  } else {
    resolve(x)
  }
}

class MyPromise {
  constructor(exeuctor) {
    this.status = 'pending'
    this.value = undefined
    this.reason = undefined
    this.onResoveledCallBacks = []
    this.onRejectedCallBacks = []

    let resolve = (value) => {
      if (value instanceof MyPromise) {
        return value.then(resolve, reject)
      }

      setTimeout(() => {
        if (this.status === 'pending') {
          this.status = 'resolved'
          this.value = value
          this.onResoveledCallBacks.forEach((item) => item(value))
        }
      })
    }

    let reject = (value) => {
      setTimeout(() => {
        if (this.status === 'pending') {
          this.status = 'rejected'
          this.reason = value
          this.onRejectedCallBacks.forEach((item) => item(value))
        }
      })
    }

    try {
      exeuctor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (v) => v
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (e) => {
            throw e
          }
    let promise2
    if (this.status === 'resolved') {
      promise2 = new MyPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      })
    }

    if (this.status === 'rejected') {
      promise2 = new MyPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      })
    }

    if (this.status === 'pending') {
      promise2 = new MyPromise((resolve, reject) => {
        this.onResoveledCallBacks.push(() => {
          try {
            let x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })

        this.onRejectedCallBacks.push(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      })
    }

    return promise2
  }
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
} catch (e) {}
