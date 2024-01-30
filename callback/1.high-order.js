//高阶函数的定义
// 1.如果一个函数的参数是一个函数（回调函就是一种高阶函数）
// cb是一个回调函数也是一个高阶函数
// function a(cb){

// }
// 2.如果一个函数返回一个函数 当前这个函数就是一个高阶函数
// a就是一个高阶函数
// function a (){
//   return function(){

//   }
// }
function say() {
  console.log('say')
}

Function.prototype.before = function (callback) {
  return () => {
    callback()
    // this()
  }
}

let before = say.before(function () {
  console.log('before say')
})

before()
