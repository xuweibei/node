## 模块规范

- Node 中的模块规范（commonjs）（node 自己实现的），es6Module（import，export），umd 统一模块规范
  （如果浏览器不支持 commonjs，requirejs，直接就将变量放到 window 上），amd 规范 requirejs cmd 规范 seajs

## commonjs 规范

- 可以把复杂的代码拆分成小的模块，方便管理代码维护
- 每个模块之间的内容都是相互独立的，互不影响的（解决变量冲突的问题） 单例模式（不能完全解决，就是命名空间）
  使用自执行函数来解决

规范定义：

- 每个文件都是一个模块
- 如果你希望模块中的变量被别人使用，可以使用 module.exports 导出这个变量
- 如果另一个模块想使用这个模块导出的结果 需要使用 require 语法来引用（同步）

## 模块的分类

- require('fs') 核心模块。内置模块 不是自己写的，也不是安装来的是 node 中自己提供的，可以直接只用
- require（'commander'）; 别人写的模块，通过 npm install 安装过来的 就是第三方模块，不需要有路径
- 自定义模块 require('./promise,js') 自定义模块就是子级写的模块 引用时需要增加路径（相对或绝对路径）
