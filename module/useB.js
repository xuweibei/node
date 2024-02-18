// const a = require('./a')

// console.log(a)

const path = require('path')
const fs = require('fs')
const vm = require('vm')

function Module(id) {
  this.id = id
  this.exports = null
}
Module.wrap = function (script) {
  const arr = [
    '(function(exports,require,module,__filename,__dirname){',
    script,
    '})',
  ]
  return arr.join('')
}
Module._extensions = {
  '.js': function (module) {
    let content = fs.readFileSync(module.id, 'utf8')
    let fnStr = Module.wrap(content)
    let fn = vm.runInThisContext(fnStr)
    let exports = module.exports
    let require = myRequire
    let __filename = module.id
    let __dirname = path.dirname(module.id)
    fn.call(exports, exports, require, module, __filename, __dirname)
  },
  '.json': function (module) {
    let r = fs.readFileSync(module.id)
    module.exports = JSON.parse(r)
  },
}
Module.prototype.load = function (filename) {
  let extname = path.extname(filename)
  Module._extensions[extname](this)
}

Module.catch = {}
Module._load = function (filePath) {
  let filename = Module._resolveFileName(filePath)
  if (Module.catch[filename]) {
    // 判断是否有缓存
    return Module.catch[filename].exports
  }

  let module = new Module(filename)
  Module.catch[filename] = module // 缓存
  module.load(filename)
  return module.exports
}
function myRequire(filePath) {
  return Module._load(filePath)
}
Module._resolveFileName = function (filepath) {
  let filePath = path.resolve(__dirname, filepath)
  let exists = fs.existsSync(filePath)
  if (exists) return filePath
  let keys = Object.keys(Module._extensions)
  for (let i = 0; i < keys.length; i++) {
    let currentPath = filePath + keys[i]
    if (fs.existsSync(currentPath)) {
      return currentPath
    }
  }
}
const a = myRequire('./a.js')
myRequire('./a.js')
myRequire('./a.js')
myRequire('./a.js')
console.log(a)
