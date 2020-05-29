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


### Development 和 Production 模式的区别

为了便于开发和发布，将开发版本和生产版本的webpack配置文件分开配置。

为了避免多个配置文件间的配置冗余，提出一个具有公共配置的文件。

- webapck.dev.js: 开发版本配置文件
- webapck.prod.js: 发布版本配置文件
- webpack.common.js: 公共配置文件
- webpack-merge: 用于合并公共配置与开发（或发布）配置内容


### Tree Shaking

- Tree Shaking 英文译为 “摇树”
- Tree Shaking 将 import 引入的模块进行打包，未引入的模块会去掉，可以减少打包体积
- Tree Shaking 只支持 ES Module, 因为ES Module 底层是静态引入方式，即 Tree Shaking 只支持静态引入方式
- Tree Shaking 更适用于生产环境，未使用的export不会被加进打包内容

### Code Splitting 代码分割

> 引导

- 第一种方式：

首次访问页面，加载main.js(2mb)，打包文件很大，加载时间很长。
当页面业务逻辑发生变化时，又要重新加载2mb的内容

- 第二种方式：

mian.js 被拆成 main.js(1mb) 和 lodash.js(1mb)，
首次访问时页面，并行加载两个 1mb 的内容。
当业务逻辑发生变化时，只要加载 main.js(1mb) 即可，因为lodash.js 没有变化

> 总结

1.代码分割可以提高代码性能

2.代码分割本身是一种概念，与 webpack 无关，只不过 webpack 内置了代码分割功能

3.同步代码，需要在 webpack 的 optimization 中配置splitChunks

4.异步代码(import): 无需做任何配置，会自动代码分割


### splitChunks --webpack自定义的代码分割配置

- chunks: 对哪种引入的类型的代码做分割，initial(同步代码)/async(异步代码)/all(所有代码)，打包同步代码时需要与cacheGroups.vendors配合使用

- minSize：代码分割的最小体积限制，即引入的模块超出minSize时，才做代码分割

- minChunks: 当一个模块至少被用了多少次后才进行代码分割

- maxAsyncRequests: 最多同时加载的模块数，超出的文件不会再做代码分割

- maxInitialRequests: 入口文件最多加载的个数，超出的文件不会再做代码分割

- automaticNameDelimiter: 自动分割的文件名的连接符

- cacheGroups: 缓存组，可以将多个相同的匹配模式打包到同一个缓存组的文件里

- priority: 打包匹配优先级，值越大优先级越高

- reuseExistingChunk: 复用之前已经被打包过的模块，不会再次打包


### chunk 是什么？

每一个打包的.js文件都是一个 chunk


### 打包分析

Prefetching/Preloading


### CSS 文件的代码分割

mini-css-extract-plugin: 分割 css 代码

optimize-css-assets-webpack-plugin: css 代码合并与压缩


### webpack与浏览器缓存

处理浏览器缓存问题，加上 hash 值，每次打包后文件名不同，浏览器就会重新请求， 例：
```
output: {
	filename: '[name].[contenthash].js',
	chunkFilename: '[name].[contenthash].js',
}
```

### Shimming 

垫片？？？


### 环境变量

env