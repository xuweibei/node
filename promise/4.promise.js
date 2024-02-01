const Promise = require('./promise')
const promise = new Promise((resolve, reject) => {
  resolve(1)
})

let p2 = promise
  .then
  // (data) => {
  //   // return new Promise((resolve, reject) => {
  //   //   setTimeout(() => {
  //   //     resolve(123)
  //   //   }, 3000)
  //   // })
  //   return {}
  // },
  // (err) => {
  //   console.log(err, 'err')
  // }
  ()
  .then(
    (data) => {
      console.log(data, '22334')
    },
    (e) => {
      console.log(e, '1231')
    }
  )
