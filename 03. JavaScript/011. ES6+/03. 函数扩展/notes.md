# 第三章 函数的扩展

## 1.函数参数默认值

### 基本用法

ES6允许为函数的参数添加默认值，即直接写在参数定义的后面。

```js
function log(x, y='world') {
  console.log(x,y);
}
log('hello') //hello world
log('hello', 'es6') //hello es6
```

对于构造函数

```js
function Point(x=0, y=0) {
  this.x = x;
  this.y = y;
}
const p = new Point();
p// {x: 0, y:0}
const p1 = new Point(1,2);
p1// {x: 1, y: 2}
```

使用默认参数时，函数不能有同名参数。

```js
//不报错
function foo(x,x,y) {
  //...
}

//报错
function foo(x,x,y = 1) {
  //...
}
```

### 与结构赋值默认值结合使用

参数默认值可以与解构赋值的默认值，结合起来使用。

```js
function log({x,y = 5}) {
  console.log(x, y)
}

log({}) // undefined 5
log({x: 1}) // 1 5
log({x: 1, y: 2}) // 1 2
log() //报错
```

上面代码只使用了对象的解构赋值默认值，没有使用函数参数的默认值。只有当函数foo的参数是一个对象时，变量x和y才会通过解构赋值生成。如果函数foo调用时没提供参数，变量x和y就不会生成，从而报错。通过提供函数参数的默认值，就可以避免这种情况。

```js
function log({x, y = 5} = {}) {
  console.log(x, y)
}
log() //undefined 5
```

上面的代码，如果没有提供参数，函数foo的参数默认为一个空对象。

请问下面两种写法有什么差别？

```js
function m1({ x = 0, y = 0 } = {}) {
  return [x, y]
}
function m2({ x, y } = { x: 0, y: 0 }) {
  return [x, y]
}
```

面两种写法都对函数的参数设定了默认值，调用时可以不传参，会使用默认值。

区别：写法一函数参数的默认值是空对象，但是设置了对象解构赋值的默认值；
写法二函数参数的默认值是一个有具体属性的对象，但是没有设置对象解构赋值的默认值。

```js
// 函数没有参数的情况
m1() // [0, 0]
m2() // [0, 0]

// x 和 y 都有值的情况
m1({x: 3, y: 8}) // [3, 8]
m2({x: 3, y: 8}) // [3, 8]

// x 有值，y 无值的情况
m1({x: 3}) // [3, 0]
m2({x: 3}) // [3, undefined]

// x 和 y 都无值的情况
m1({}) // [0, 0];
m2({}) // [undefined, undefined]

m1({z: 3}) // [0, 0]
m2({z: 3}) // [undefined, undefined]
```

## 2.rest参数

ES6引入rest参数（形式为...变量名），用于获取函数的多余参数，这样就不需要使用arguments对象。rest参数搭配的变量是一个数组，该变量将多余的参数放入数组中。

```js
function add(...values) {
  let sum = 0;
  for(let val of values) {
    sum += val;
  }
  return sum;
}
add(1,2,3) //6
```

对比rest参数和arguments变量的例子：

```js
//arguments变量写法
function sortNumbers() {
  return Array.prototype.slice.call(arguments).sort();
}

//rest参数写法
const sortNumbers = (...numbers) => numbers.sort();
```

arguments对象不是一个数组，而是一个类数组。所以需要使用Array.prototype.slice.call将其转为数组。

rest参数它本身就是一个数组，数组的方法都可以使用。

需要注意的是，rest参数只能作为函数的最后一个参数，否则会报错。

## 3.严格模式

ES6规定，只要函数参数使用了默认值、解构赋值、扩展运算符，那么函数内部就不能显示的设为严格模式，否则报错。

```js
// 报错
function doSomething(a, b = a) {
  'use strict';
  // code
}

// 报错
const doSomething = function ({a, b}) {
  'use strict';
  // code
};

// 报错
const doSomething = (...a) => {
  'use strict';
  // code
};

const obj = {
  // 报错
  doSomething({a, b}) {
    'use strict';
    // code
  }
};
```

这样规定的原因是，函数内部的严格模式，同时适用于函数体和函数参数。但是，函数执行的时候，先执行函数参数，然后再执行函数体。这样就有一个不合理的地方，只有从函数体之中，才能知道参数是否应该以严格模式执行，但是参数却应该先于函数体执行。

两种方法可以规避这种限制。第一种是设定全局性的严格模式，这是合法的。

```js
'use strict';

function doSomething(a, b = a) {
  // code
}
```

第二种是把函数包在一个无参数的立即执行函数里面。

```js
const doSomething = (function () {
  'use strict';
  return function(value = 42) {
    return value;
  };
}());
```

## 4.name属性

数的name属性，返回该函数的函数名。

```js
function foo(){}
foo.name //foo
```

如果将一个匿名函数赋值给一个变量，ES5 的name属性，会返回空字符串，而 ES6 的name属性会返回实际的函数名。

```js
var f = function () {}

// es5
f.name //""

// es6
f.name //"f"
```

## 5.箭头函数

### 基本用法

单个参数：

```js
var f = v => {
  //...
}
```

多个参数：

```js
var f = (v1, v2) => {
  //...
}
```

返回语句：

```js
var sum = function (num1, num2) {
  return num1 + num2;
}
// 等同于
var sum =（num1, num2）=> num1 + num2;
```

返回一个对象：

由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号，否则会报错。

```js
let getTempItem = id => ({id: id, name: 'temp'})
```

如果箭头函数只有一行语句，且不需要返回值，可以采用下面的写法，就不用写大括号了:

```js
let fn = () => void doesNotReturn();
```

箭头函数结合变量解构使用：

```js
const person = {
  first： 1，
  last: 2
}

const full = ({person}) => first + last;
// 等同于
function full(person) {
  return person.first + person.last
}
```

箭头函数结合rest参数：

```js
const numbers = (...nums) => nums;
numbers(1,2,3,4,5); // [1,2,3,4,5]

const headAndTail = (head, ...tail) => [head, tail];
headAndTail(1,2,3) // [1,2,3]
```

### 箭头函数式使用注意点：

1. this指向函数定义时所在的对象，而不是使用时所在的对象。
2. 不可当做构造函数。
3. 不可使用arguments对象，该对象在函数内部不存在，使用rest参代替。
4. 不可使用yield命令，因此箭头函数不能作用Generator函数。

箭头函数转成 ES5 的代码如下：

```js

// ES6
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100)
}

// ES5
function foo() {
  var that = this;
  setTimeout(function() {
    console.log('id:', that.id)
  }, 100)
}
```

上面代码中，转换后的 ES5 版本清楚地说明了，箭头函数里面根本没有自己的this，而是引用外层的this。

由于箭头函数没有自己的this，所以当然也就不能用call()、apply()、bind()这些方法去改变this的指向。

### 不适用场合

由于箭头函数使得this从“动态”变成“静态”，下面两个场合不应该使用箭头函数。

1. 定义对象的方法，且该方法内部包括this。
2. 需要动态this的时候，也不应使用箭头函数。

栗子一：

```js
const cat = {
  lives: 9,
  jumps: () => {
    this.lives--;
  }
}
```

上面代码中，cat.jumps()方法是一个箭头函数，这是不合理的。调用cat.jumps()时，如果是普通函数，该方法内部的this指向cat；如果写成上面那样的箭头函数，使得this指向全局对象，因此不会得到预期结果。这是因为对象不构成单独的作用域，导致jumps箭头函数定义时的作用域就是全局作用域。

栗子二🌰：

```js
var button = document.getElementById('press');
button.addEventListener('click', () => {
  this.classList.toggle('on')
})
```

上面代码运行时，点击按钮会报错，因为button的监听函数是一个箭头函数，导致里面的this就是全局对象。如果改成普通函数，this就会动态指向被点击的按钮对象。

### 嵌套的箭头函数

箭头函数内部，还可以再使用箭头函数。

对比ES5和ES6的函数嵌套：

```js
// ES5
function insert(value) {
  return {
    into: function (array) {
      return {
        after: function(afterValue) {
          array.splice(array.indexOf(afterValue) + 1, 0, value);
          return array;
        }
      }
    }
  }
}

insert(2).into([1,3]).after(1) // [1,2,3]
```

```js
// ES6
let insert = (value) => ({into: (value) => ({after: (afterValue) => {
  array.splice(array.indexOf(afterValue) + 1, 0, value);
}})})

insert(2).into([1,3]).after(1) // [1,2,3]
```

部署一个管道机制栗子：（前一个函数的输出是后一个函数的输入）

```js
const pipeline = (...funcs) =>
  val => funcs.reduce((a, b) => b(a), val);

const plus1 = a => a + 1;
const mult2 = a => a * 2;
const addThenMult = pipeline(plus1, mult2);

addThenMult(5)
// 12
```

## 6.尾调用优化

### 什么是尾调用？

尾调用是函数式编程的一个重要概念，就是指某个函数的最后一句是调用另一个函数。

```js
function f(x) {
  //...
  return g(x)
}
```

上面函数f最后一步是调用函数g，这就是尾调用。

一下三种情况都不是尾调用：

```js
// 情况一
function f(x){
  let y = g(x);
  return y;
}

// 情况二
function f(x){
  return g(x) + 1;
}

// 情况三
function f(x){
  g(x);
}
//情况三等同于
function f(x) {
  g(x);
  return undefined;
}
```

上面代码中，情况一是调用函数g之后，还有赋值操作，所以不属于尾调用，即使语义完全一样。情况二也属于调用后还有操作，即使写在一行内。情况三是返回了一个undefined。

尾调用不一定出现在函数尾部，只要是最后一步操作即可。

### 尾调用优化

我们知道，函数调用会在内存形成一个“调用记录”，又称“调用帧”（call frame），保存调用位置和内部变量等信息。如果在函数A的内部调用函数B，那么在A的调用帧上方，还会形成一个B的调用帧。等到B运行结束，将结果返回到A，B的调用帧才会消失。如果函数B内部还调用函数C，那就还有一个C的调用帧，以此类推。所有的调用帧，就形成一个“调用栈”（call stack）。

尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用帧，因为调用位置、内部变量等信息都不会再用到了，只要直接用内层函数的调用帧，取代外层函数的调用帧就可以了。

```js
function f() {
  let m = 1;
  let n = 2;
  return g(m + n);
}
f();

// 等同于
function f() {
  return g(3);
}
f();

// 等同于
g(3);
```

上面代码中，如果函数g不是尾调用，函数f就需要保存内部变量m和n的值、g的调用位置等信息。但由于调用g之后，函数f就结束了，所以执行到最后一步，完全可以删除f(x)的调用帧，只保留g(3)的调用帧。

这就叫做“尾调用优化”（Tail call optimization），即只保留内层函数的调用帧。如果所有函数都是尾调用，那么完全可以做到每次执行时，调用帧只有一项，这将大大节省内存。这就是“尾调用优化”的意义。

注意，只有不再用到外层函数的内部变量，内层函数的调用帧才会取代外层函数的调用帧，否则就无法进行“尾调用优化”。

```js
function addOne(a){
  var one = 1;
  function inner(b){
    return b + one;
  }
  return inner(a);
}
```

上面的函数不会进行尾调用优化，因为内层函数inner用到了外层函数addOne的内部变量one。

### 尾递归

函数调用自身，称之为递归，如果函数尾部调用自身，就称之为尾递归。

递归非常消耗性能，因为同事需要保持很多调用栈，很容易发生栈溢出错误（Stack Overflow）。但是对于尾递归来说，只会存在一个调用帧。

来一个递归对比尾递归的例子🌰 阶乘函数：

```js
// 递归
// 复杂度 O(n)
function factorial(n) {
  if(n === 1) return 1;
  return n * factorial(n-1)
}
factorial(5) // 120

// 尾递归
// 复杂度 O(1)
function factorial(n, total) {
  if(n === 1) return total;
  return factorial(n-1, n * total)
}
factorial(5 ,1) //120
```

斐波那契数列（Fibonacci）：

```js
//递归
function Fibonacci(n) {
  if(n <= 1) {return 1};
  return Fibonacci(n-1) + Fibonacci(n-2)
}
Fibonacci(10) //89
Fibonacci(100) //超时
Fibonacci(500) //超时

//尾递归
function Fibonacci(n, ac1 = 1, ac2 = 1){
  if(n <= 1) {return ac2};
  return Fibonacci(n-1, ac2, ac1 + ac2);
}
Fibonacci2(100) // 573147844013817200000
Fibonacci2(1000) // 7.0330367711422765e+208
Fibonacci2(10000) // Infinity
```

ES6 中只要使用尾递归，就不会发生栈溢出（或者层层递归造成的超时），相对节省内存。

### 严格模式

ES6 的尾调用优化只在严格模式下开启，正常模式是无效的。

这是因为在正常模式下，函数内部有两个变量，可以跟踪函数的调用栈。

- func.arguments：返回调用时函数的参数。
- func.caller：返回调用当前函数的那个函数。

尾调用优化发生时，函数的调用栈会改写，因此上面两个变量就会失真。严格模式禁用这两个变量，所以尾调用模式仅在严格模式下生效。

### 尾递归优化

尾递归优化只在严格模式下生效，那么正常模式下，或者那些不支持该功能的环境中，有没有办法也使用尾递归优化呢？回答是可以的。

尾递归之所以需要优化，原因是调用栈太多，造成溢出，那么只要减少调用栈，就不会溢出。怎么做可以减少调用栈呢？就是采用“循环”换掉“递归”。

```js
function tco(f) {
  var value;
  var active = false;
  var accumulated = [];

  return function accumulator() {
    accumulated.push(arguments);
    if (!active) {
      active = true;
      while (accumulated.length) {
        value = f.apply(this, accumulated.shift());
      }
      active = false;
      return value;
    }
  };
}

var sum = tco(function(x, y) {
  if (y > 0) {
    return sum(x + 1, y - 1)
  }
  else {
    return x
  }
});

sum(1, 100000)
// 100001
```

上面代码中，tco函数是尾递归优化的实现，它的奥妙就在于状态变量active。默认情况下，这个变量是不激活的。一旦进入尾递归优化的过程，这个变量就激活了。然后，每一轮递归sum返回的都是undefined，所以就避免了递归执行；而accumulated数组存放每一轮sum执行的参数，总是有值的，这就保证了accumulator函数内部的while循环总是会执行。这样就很巧妙地将“递归”改成了“循环”，而后一轮的参数会取代前一轮的参数，保证了调用栈只有一层。

## 7.函数参数的尾逗号

ES2017 允许函数的最后一个参数有尾逗号（trailing comma）。

此前，函数定义和调用时，都不允许最后一个参数后面出现逗号。

```js
function clownsEverywhere(
  param1,
  param2
){
  //...
}
clownsEverywhere(
  'foo',
  'bar'
);
```

现在可以：

```js
function clownsEverywhere(
  param1,
  param2,
) { /* ... */ }

clownsEverywhere(
  'foo',
  'bar',
);
```

这样的规定也使得，函数参数与数组和对象的尾逗号规则，保持一致了。

## 8.Function.prototype.toString()

ES2019 对函数实例的toString()方法做出了修改。

toString()方法返回函数代码本身，以前会省略注释和空格。

```js
function /* foo comment */ foo () {}

foo.toString()
// function foo() {}
```

修改后的toString()方法，明确要求返回一模一样的原始代码。

```js
function /* foo comment */ foo () {}

foo.toString()
// "function /* foo comment */ foo () {}"
```

## 9.catch命令的参数省略

JavaScript 语言的try...catch结构，以前明确要求catch命令后面必须跟参数，接受try代码块抛出的错误对象。

```js
try {
  // ...
} catch (err) {
  // 处理错误
}
```

很多时候，catch代码块可能用不到这个参数。但是，为了保证语法正确，还是必须写。ES2019 做出了改变，允许catch语句省略参数。

```js
try {
  // ...
} catch {
  // ...
}
```
