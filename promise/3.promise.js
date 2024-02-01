const fs = require('fs')
const Promise = require('./promise')

function read(filename) {
  return new Promise((resolve, rejects) => {
    fs.readFile(filename, 'utf-8', (err, data) => {
      if (err) return rejects(err)
      resolve(data)
    })
  })
}

new Promise((resolve, rejects) => {
  resolve(3)
})
  .then(
    (data) => {
      console.log(data, 'data')
      throw new Error('11')
      return 1 //当不写return时，默认返回return undefined
    },
    (err) => {
      //如果这里的函数没有写，上面的promise出错时，就会向下查找err的函数来执行
      console.log(err, 'err')
      // throw err
      // return new Promise()
    }
  )
  .then(
    (data) => {
      console.log(data, 22)
    },
    (err) => {
      console.log(err, 33)
    }
  )
