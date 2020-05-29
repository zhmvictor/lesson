// import _ from 'lodash';

// let element = document.createElement('div');
// element.innerHTML = _.join(['a', 'b'], '***');
// document.body.appendChild(element);


// async function getComponent() {
//   // webpackChunkName 魔法注释
//   const { default: _ } = await import(/* webpackChunkName: "lodash" */'lodash');
//   const element = document.createElement('div');
//   element.innerHTML = _.join(['a', 'b'], '***');
//   return element;
// }

// document.addEventListener('click', () => {
//   getComponent().then(element => {
//     document.body.appendChild(element);
//   })
// })

console.log(this === window);


