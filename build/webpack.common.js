// node 核心模块，供 path 使用
const path = require('path');

// 会在打包结束后自动生成一个html文件，并把打包生成的js文件自动引入到这个html文件中
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 自动清除上一次打包的文件
// 现在webpack已经内置了自动清除功能, 似乎只会清除上一次打包的.js文件，并没有将整个dist文件夹删掉，此处原理存疑，待后续研究
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // 入口文件，开始打包的文件
  // 简写形式  entry: './src/index.js',
  entry: {
    // lodash: './src/lodash.js',
    // 键名main是打包生成的文件的默认名字
    // 如果output不设置filename, 则打包后文件名称为 main.js
    main: './src/index.js',
  },

  // loader 是 webpack 提供的一种打包方案
  // webpack 不能识别非 .js 结尾的模块，需要通过 loader 识别
  module: {
    rules: [
      {
        // Polyfill 是一块代码（通常是 Web 上的 JavaScript），用来为旧浏览器提供它没有原生支持的较新的功能。
        // 在所有代码的最开头引入

        // 将 ES6 的语法翻译成 ES5 语法, 适配更低端的浏览器
        test: /\.js$/, // 匹配 .js 文件
        // exclude 表示需要排除的文件，即不转译的文件
        // 此处表示不转译 node_modules 依赖的文件(没必要)
        // 也可以加快打包速度，提高打包性能
        exclude: /node_modules/,
        // 使用 babel-loader
        loader: 'babel-loader',
        // options: {
        // 	// 适用于写业务的代码
        // 			// presets: [['@babel/preset-env', {
        // 			// 	// 限制什么情况下需要转译ES6 成 ES5
        //    //       targets: {
        //    //       // 当谷歌浏览器版本大于67时，不需要转译
        //    //        chrome: '67',
        //    //      },
        //    //      // 限制只转译使用的方法，可以减小打包文件的体积
        // 			// 	useBuiltIns: 'usage'
        // 			// }]],

        // 			// 适用于写类库代码
        // 			// plugins: [["@babel/plugin-transform-runtime", {
        // 			// 	"absoluteRuntime": false,
        //    //      "corejs": 2,
        //    //      "helpers": true,
        //    //      "regenerator": true,
        //    //      "useESModules": false,
        //    //      "version": "7.0.0-beta.0"
        // 			// }]]
        // },
      },
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
            },
          },
          // 用于打包 .scss 文件
          'sass-loader',
          // 样式自动增加厂商前缀
          'postcss-loader',
        ],
      },
      {
        test: /\.(jpg|png|gif)$/, // 匹配文件格式
        use: {
          // url-loader 是 webpack的loader, 也可以打包 图片
          // 适合打包小的图片
          loader: 'url-loader',
          options: {
            // placeholder 占位符
            name: '[name]_[hash].[ext]',
            // 将图片打包到 dist/image/ 目录下
            outputPath: 'image/',
            // 限制图片的大小，单位字节，
            // 当图片小于限制字节时，图片会被打包到bundle.js
            // 当图片大于限制字节时，图片会被打包到指定路径
            limit: 204800,
          },
        },
      },
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
        },
      },
    ],
  },
  // plugin 可以在webpack运行到某个时刻时，帮你做一些事情。类似于Vue生命周期函数
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['dist'],
      root: path.resolve(__dirname, '../'),
    }),
  ],

  optimization: {
    // webpack 自带的代码分割功能
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
					priority: -10,
					filename: 'vendors.js',
        },
				default: {
					priority: -20,
          reuseExistingChunk: true,
          filename: 'common.js',
			  },
      },
    },
  },

  // 打包出口
  output: {
    // 打包出的文件资源想要存放的地址
    // 比如项目打包后放在cdn上，则publicPath: 'https://cdn.com.cn'
    // publicPath: '/',

    // 打包出的文件名
    // [name]是占位符, 对应entry里的键名, 可用于打包多个文件
    filename: '[name].js',

    // 打包出的文件路径，绝对路径。
    // __dirname 是 webpack.config.js 所在的当前路径
    // 第二个参数是 打包文件所在的文件夹名
    path: path.resolve(__dirname, '../dist'),
  },
};
