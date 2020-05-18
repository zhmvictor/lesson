// node 核心模块，供 path 使用
const path = require('path');

// 会在打包结束后自动生成一个html文件，并把打包生成的js文件自动引入到这个html文件中
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 自动清除上一次打包的文件
// 现在webpack已经内置了自动清除功能, 似乎只会清除上一次打包的.js文件，并没有将整个dist文件夹删掉，此处原理存疑，待后续研究
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const webpack = require('webpack');

// 通过配置文件知道打包流程，webpack 默认配置文件名 webpack.config.js。
// 如果没找到配置文件，webpack 会有一套自己的默认配置。
// 自定义配置文件名 npx webpack --config xxx.js
module.exports = {
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

	// 入口文件，开始打包的文件
	// 简写形式  entry: './src/index.js',
	entry: {
		// 键名main是打包生成的文件的默认名字
		// 如果output不设置filename, 则打包后文件名称为 main.js
		main: './src/index.js',
		// sub: './src/index.js',
	},

	// 启动服务器运行模式，如：http://localhost:8080/
	devServer: {
		// 服务器的位置
		contentBase: './dist',
		// 指定监听的端口
		// port： '8081',

		// 热模块更新可以实现不刷新页面，局部更新
		hot: true,  // 开启 Hot Module Replacement(HMR)
		hotOnly: true,
	},

	// loader 是 webpack 提供的一种打包方案
	// webpack 不能识别非 .js 结尾的模块，需要通过 loader 识别
	module: {
		rules: [
		{
			test: /\.(css|scss)$/, // 匹配文件格式
			// css-loader 分析多个 css 文件的关系, 并把多个文件的 css 合并成一段 css
			// style-loader 把分析出的 css 内容挂载到页面上
			// 打包 js 文件中引入的 css/scss, 各种 loader 按从下到上的顺序执行
			use: [
			// 用于打包 .css 文件
			'style-loader', 
			{
				loader: 'css-loader',
				options: {
					// 当css/scss文件引入其他css/scss时使用
					// 表示应用 css-loader 前应用的 loader 的数量
					importLoaders: 2,
					// 开启 css 模块化打包, 使样式只生效于当前模块
					// modules: true,
				}
			},
			// 用于打包 .scss 文件
			'sass-loader',
			// 样式自动增加厂商前缀
			'postcss-loader', 
			],
		},
		// {
		// 	test: /\.(jpg|png|gif)$/, // 匹配文件格式
		// 	use: {
		// 		// url-loader 是 webpack的loader, 也可以打包 图片
		// 		// 适合打包小的图片
		// 		loader: 'url-loader', 
		// 		options: {
		// 			// placeholder 占位符
		// 			name: '[name]_[hash].[ext]',
		// 			// 将图片打包到 dist/image/ 目录下
		// 			outputPath: 'image/',
		// 			// 限制图片的大小，单位字节，
		// 			// 当图片小于限制字节时，图片会被打包到bundle.js
		// 			// 当图片大于限制字节时，图片会被打包到指定路径
		// 			limit: 204800,
		// 		},
		// 	}
		// },
		{
			test: /\.(eot|ttf|svg|woff)$/, // 匹配文件格式, 打包字体
			use: {
				// file-loader 是 webpack的loader, 打包静态资源
				loader: 'file-loader', 
				// options: {
				// 	// placeholder 占位符
				// 	name: '[name]_[hash].[ext]',
				// 	// 将图片打包到 dist/image/ 目录下
				// 	outputPath: 'image/',
				// },
			}
		}
		]
	},

	// plugin 可以在webpack运行到某个时刻时，帮你做一些事情。类似于Vue生命周期函数
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html',
		}), 
		// new CleanWebpackPlugin({
		// 	cleanAfterEveryBuildPatterns: ['dist'],
		// }),

		// 配置热模块更新
		new webpack.HotModuleReplacementPlugin({
  		// Options...
		})
	],

	// 打包出口  
	output: {
		// 打包出的文件资源想要存放的地址
		// 比如项目打包后放在cdn上，则publicPath: 'https://cdn.com.cn'
		publicPath: '/',

		// 打包出的文件名
		// [name]是占位符, 对应entry里的键名, 可用于打包多个文件
		filename: '[name].js',

		// 打包出的文件路径，绝对路径。
		// __dirname 是 webpack.config.js 所在的当前路径
		// 第二个参数是 打包文件所在的文件夹名
		path: path.resolve(__dirname, 'dist'), 
	}
}