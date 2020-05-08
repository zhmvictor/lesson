// ES Module 模块引入方式-浏览器不识别
// CommonJS 模块引入规范
// var Header  = require('./header.js');
// var Sidebar = reuqire('./sidebar.js');
// var Content = require('./content.js');

// CMD
// AMD


// webpack 模块打包工具
// 最初是 js 模块打包工具 -> 现在能打包各种文件
// import Header from './header.js';
// import Sidebar from './sidebar.js';
// import Content from './content.js';
// new Header();
// new Sidebar();
// new Content();


// 打包图片和样式
// import style from './index.scss';
// import frz from './frz.jpg';
// import createFrz from './createFrz';
// var img = new Image();
// img.src = frz;
// img.classList.add(style.frz);
// var root = document.getElementById('root');
// root.append(img);
// new createFrz();

// 打包字体
import './index.scss';
var root = document.getElementById('root');
root.innerHTML = '<div class="iconfont iconbad"></div>';
