//Promise.resolve()
//参数为： promise对象
let p1 = new Promise((resolve) => {
  resolve("foo");
});
let p2 = Promise.resolve(p1);

console.log(p1 === p2);

//参数为：thenable对象
let thenable = {
  then: (resolve) => {
    resolve(1);
  },
};
let p4 = Promise.resolve(thenable);
p4.then((value) => {
  console.log(value);
});
console.log(2);

//参数为：原始值或者不具有then方法的对象
let p3 = Promise.resolve("boo");
p3.then((s) => {
  console.log(s);
});
console.log(p3);

//参数为： 空
// 当参数为空，会直接返回一个resolved状态的Promise对象
let p5 = Promise.resolve();

p5.then(() => {
  console.log("ha");
});
console.log(p5);
