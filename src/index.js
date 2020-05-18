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
// import './index.scss';
// var root = document.getElementById('root');
// root.innerHTML = '<div class="iconfont iconbad"></div>';


// sourceMap
// 是一个映射关系, 映射dist目录下main.js和源文件index.js中相同内容所在位置(代码在多少行)的映射
// console.log('hello zhm###');

// import './style.css';

// var btn = document.createElement('button');
// btn.innerHTML = '新增';
// document.body.appendChild(btn);

// btn.onclick = function() {
// 	var div = document.createElement('div');
// 	div.innerHTML = 'item';
// 	document.body.appendChild(div);
// }


const arr = [
	new Promise(() => {}),
	new Promise(() => {}),
];

arr.map(item => {
	console.log(item);
});