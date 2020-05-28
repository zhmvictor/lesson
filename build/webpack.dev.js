const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

// 通过配置文件知道打包流程，webpack 默认配置文件名 webpack.config.js。
// 如果没找到配置文件，webpack 会有一套自己的默认配置。
// 自定义配置文件名 npx webpack --config xxx.js
const devConfig = {
	// 打包模式： 
	// 'production' 模式下代码会压缩，默认模式(生产模式)
	// 'development' 模式下代码不会被压缩(开发者模式)
	// 开发者模式下默认配置了devtools, 此时将devtools设置为none可以将其关闭
	mode: 'development',

	// 映射打包文件与源文件
	// sourceMap 本质是映射关系，
	// sourceMap 用于决定 控制台输出错误代码 在打包代码文件还是在源代码文件 出现错误提示
	// sourceMap的意义是: 当开发者想知道源代码报错信息位置时，可以在 devtools 中配置sourceMap
	// sourceMap 更适用于开发环境，供开发者调试使用(比如提示代码错误信息的位置)，即development模式
	// 最佳实践模式：
	// development devtool: 'cheap-module-eval-source-map'
	// production devtool: 'cheap-module-source-map'
	// 具体参考webpack官网devtool
	devtool: 'cheap-module-eval-source-map', // 性能较高，提示错误信息最全的方式


	// 启动服务器运行模式，如：http://localhost:8080/
	// 启用devServer后打包的文件会放在内存里
	devServer: {
		// 服务器的位置
		contentBase: './dist',
		// 指定监听的端口
		// port： '8081',

		// 热模块更新可以实现不刷新页面，局部更新
		hot: true,  // 开启 Hot Module Replacement(HMR)
		// hotOnly: true,
	},

	// plugin 可以在webpack运行到某个时刻时，帮你做一些事情。类似于Vue生命周期函数
	plugins: [
		// 配置热模块更新
		new webpack.HotModuleReplacementPlugin({
  		// Options...
		})
	],

	// 开发环境默认不支持Tree Shaking, 所以要进行以下配置
	// 生产环境不需要该配置
	optimization: {
		usedExports: true,
	},
}

module.exports = merge(commonConfig, devConfig);