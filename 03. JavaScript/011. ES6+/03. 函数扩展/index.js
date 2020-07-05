function Point(x = 0, y = 0) {
  this.x = x
  this.y = y
}

const p = new Point(1, 2)
console.log(p) // => {x:1,y:2}

// 请问下面两种写法有什么差别？
function m1({ x = 0, y = 0 } = {}) {
  return [x, y]
}
function m2({ x, y } = { x: 0, y: 0 }) {
  return [x, y]
}
console.log(m1({ x: 1 })) // => [1, 0]
console.log(m2({ x: 1 })) // => [1, undefined]
// 上面两种写法都对函数的参数设定了默认值，调用时可以不传参，使用默认值
// 区别是写法一函数参数的默认值是空对象，但是设置了对象解构赋值的默认值；
// 写法二函数参数的默认值是一个有具体属性的对象，但是没有设置对象解构赋值的默认值。

function Fibonacci(n, ac1 = 1, ac2 = 1) {
  if (n <= 1) {
    return ac2
  }
  return Fibonacci(n - 1, ac2, ac1 + ac2)
}
// Fibonacci(100)
console.log(Fibonacci(100))
