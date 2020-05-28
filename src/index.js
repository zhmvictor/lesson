// import _ from 'lodash';

// console.log(_.join(['a', 'b', 'c'], '***'));
// console.log(_.join(['a', 'd', 'c'], '***'));

// function getComponent() {
//   // webpackChunkName 魔法注释
//   return import(/* webpackChunkName: "lodash" */'lodash').then(({ default: _}) => {
//     let element = document.createElement('div');
//     element.innerHTML = _.join(['a', 'b'], '***');
//     return element;
//   });
// }

// getComponent().then(element => {
//   document.body.appendChild(element);
// })

import test from './test.js';
console.log(test.name);
