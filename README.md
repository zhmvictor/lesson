# lesson
webpack练习


### package.json 命令笔记

- webpack --watch 
监听源代码文件，一旦源代码文件发生变化，webpack就会自动重新打包。
打开浏览器的形式是 file: //xxxx/xxx/xx 的形式。

- webpack-dev-serve --open
启用服务器运行模式，监听源文件代码，一旦源文件代码发生变化，
webpack会自动重新打包，并且自动更新浏览器。 --open 表示会自动打开浏览器。
打开浏览器的行还是是 http 形式，如：http://localhost:8080/


### 热模块更新

```
// 需要单独处理的某些文件/数据
if(module.hot) {
	module.hot.accept('xxxx', () => {
		// 函数处理逻辑
	})
}
```

### .babelrc 文件

用于配置 babel 的配置项 options

