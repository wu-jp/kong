// let arr = [1, 2, 3];

// let arrNew = arr;

// arrNew[0] = 10;

// console.log(arr);
// console.log(arrNew);

// let arr = [1, 2, 3];
// let newArr = arr.slice();
// newArr[0] = 100;

// console.log(newArr); //[ 100, 2, 3 ]

// console.log(arr); //[1, 2, 3]

// let arr = [1, 2, {val: 4}];
// let newArr = arr.slice();
// newArr[2].val = 1000;

// console.log(arr);//[ 1, 2, { val: 1000 } ]

// 手动实现浅拷贝
// const shallowClone = (target) => {
//   if (typeof target === "object" && target !== null) {
//     const cloneTarget = Array.isArray(target) ? [] : {};
//     for (let prop in target) {
//       if (target.hasOwnProperty(prop)) {
//         cloneTarget[prop] = target[prop];
//       }
//     }
//     return cloneTarget;
//   } else {
//     return target;
//   }
// };

// var arr = [1, 2, 3];
// var obj = {
//   a: 1,
//   b: 2,
//   c: function () {
//     console.log("666");
//   },
// };

// var obj1 = {
//   a: 1,
//   b: 2,
//   c: {
//     d: 3,
//     e: 4,
//     f: {
//       g: 5,
//     },
//   },
// };

// console.log(shallowClone(arr));

// console.log(shallowClone(obj));

// var ha = shallowClone(obj1);
// console.log(ha);

// obj1.c.f.h = 6;
// console.log(ha);
