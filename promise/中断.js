Promise.resolve(100)
  .then()
  .then(() => {
    return new Promise((resolve, reject) => {}) //这样写就中断了，下面的then 就用不上了
  })
  .then(
    (data) => {
      console.log(data)
    },
    (err) => {
      console.log(err)
    }
  )
