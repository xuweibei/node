// promise 解决异步问
// 1.多个异步请求并发（希望同步最终的结果） promise all
// 2.链式异步请求的问题 上一个人的输出是下一个人的输入 Promise的链式调用可以解决这个问题
// 缺点 1 . 还是基于回调

// 1.promise 有三个状态  成功（resolve） 失败（reject） 等待（pending）
