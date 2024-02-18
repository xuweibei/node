let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('ok')
  }, 5000)
})

function wrap(fn) {
  let abrot
  let myp = new Promise((resolve, reject) => {
    abrot = reject
  })
  let p = Promise.race([fn, myp])
  p.abrot = abrot
  return p
}

let p = wrap(promise)
p.then(
  (value) => {
    console.log(value, 'success')
  },
  (err) => {
    console.log(err, 'err')
  }
)

setTimeout(() => {
  p.abrot('超时了')
}, 2000)
