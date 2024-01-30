const currying = (fn, arr = []) => {
  let len = fn.length
  return function (...args) {
    arr = [...arr, ...args]
    if (arr.length < len) {
      return currying(fn, arr)
    } else {
      return fn(...arr)
    }
  }
}

function sum(a, b, c, d, e, f) {
  return a + b + c + d + e + f
}

const a1 = currying(sum)(1, 2)(3, 4)(5, 6)
console.log(a1)
