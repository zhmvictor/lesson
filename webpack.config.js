const path = require('path'); // node 核心模块，供 path 使用

// 通过配置文件知道打包流程，webpack 默认配置文件名 webpack.config.js。
// 如果没找到配置文件，webpack 会有一套自己的默认配置。
// 自定义配置文件名 npx webpack --config xxx.js
module.exports = {
	// 打包模式： 
	// 'production' 模式下代码会压缩，默认模式
	// 'development' 模式下代码不会被压缩
	mode: 'development',
	// 入口文件，开始打包的文件
	// 简写形式  entry: './src/index.js',
	entry: {
		main: './src/index.js',
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
			test: /\.(eot|ttf|svg|woff)$/, // 匹配文件格式
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
	// 打包出口  
	output: {
		// 打包出的文件名
		filename: 'bundle.js',
		// 打包出的文件路径，绝对路径。
		// __dirname 是 webpack.config.js 所在的当前路径
		// 第二个参数是 打包文件所在的文件夹名
		path: path.resolve(__dirname, 'dist'), 
	}
}