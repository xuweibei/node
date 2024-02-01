const { rejects } = require('assert')
const fs = require('fs')
const { resolve } = require('path')
const util = require('util')

// const read = util.promisify(fs.readFile)

const promisify =
  (fn) =>
  (...args) =>
    new Promise((resolve, reject) => {
      fn(...args, (err, value) => {
        if (err) reject(err)
        resolve(value)
      })
    })

const read = promisify(fs.readFile)

read('./name.txt', 'utf-8').then((data) => {
  console.log(data)
})
