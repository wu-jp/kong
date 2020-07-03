# 第二章

ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构。

解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象，再进行解构赋值。

本质上，解构赋值属于**模式匹配**，只要等号两边的模式相同，左边的变量就会被赋予对应的值。

## 数组的解构赋值

数组解构的元素是依次排列的，变量的取值由它的位置决定。

### 基本用法

```js
//以前变量赋值
let a = 1;
let b = 2;
let c = 3;

//es6变量赋值
let [a, b, c] = [1, 2, 3]
```

嵌套数组解构赋值：

```js
let [foo, [[bar], baz]] = [1, [[2], 3]]
console.log(foo, bar, baz) // 1 2 3

let [, , third] = [1, 2, 3]
console.log(third) // 3

let [head, ...tail] = [1, 2, 3, 4]
console.log(head, tail) // 1 [2,3,4]

let [x, y, ...z] = ['a']
console.log(x, y, z) // 'a' undefined []
```

如果解构不成功，变量的值就等于`undefined`。

解构不成功：

```js
let [foo] = [];
let [bar, foo] = [1];
```

以上两种情况解构都不成功，`foo`的值都会等于`undefined`。

不完全解构：

等号左边的模式，只匹配一部分等号右边的数组，这种情况解构依然可以成功。

```js
let [x,y] = [1, 2, 3];
console.log(x, y) // 1 2

let [a, [b], d]  = [1, [2, 3], 4];
console.log(a,b,d) // 1 2 4
```

等号右边是不可遍历的（`Iterator`）解构，那么将会报错：

```js
// 报错
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};
```

上面的语句都会报错，因为等号右边的值，要么转为对象以后不具备 `Iterator` 接口（前五个表达式），要么本身就不具备 `Iterator` 接口（最后一个表达式）。

事实上，只要某种数据结构具有 `Iterator` 接口，都可以采用数组形式的解构赋值。

### 默认值

当等号右边的值严格等于（`===`）`undefined`时，默认值才会生效。

```js
let [foo = true] = [];
// foo = true

let [a, b = 3] = [1,2];
// a=1 b=2

let [x, y = 'b'] = ['a', undefined];
// x='a' y='b'
```

## 对象的解构赋值

对象解构的元素是没有次序的，当变量和属性同名，才能取到正确✅的值。（等号左边的变量名，等号右边对象的属性名）

对象的解构赋值的内部机制，是先找到同名属性，然后再赋值给对应的变量。真正被赋值的是后者。

当解构时取不到正确的值时，变量的值为`undefined`。

### 原理

```js
//简写
let {foo, bar} = {foo: 'aaa', bar: 'bbb'};

//完整写法
let {foo: foo, bar: bar} = {foo: 'aaa', bar: 'bbb'};

//栗子🌰：
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
// baz ='aaa'
// foo => error: foo is not defined
```

上面栗子中，**`foo`是匹配的模式，`baz`才是真正的变量**。真正被赋值的是变量`baz`，而不是模式`foo`。

### 基本用法

```js
let {bar, foo} = {foo: 'aaa', bar: 'bbb'};
// foo='aaa' bar='bbb'

let {a} = {b: 'abc'};
// a=undefined
```

对象赋值解构，可以很方便的将对象的方法赋值给某个变量：

```js
let {log, sin, cos} = Math;

let {log} = console;
log('hello') //hello
```

### 对象嵌套解构

```js
let obj = {
  p: ['hello', {y: 'world'}]
}

let {p: [x, {y}]} = obj; // => {p: [x, {y: y}]}
// x='hello' y='world'
```

`p`是模式，`y`既是模式也是变量。

### 默认值

默认值生效的条件是，对象的属性值严格等于undefined。

```js
var {x = 3} = {};
x // 3

var {x, y = 5} = {x: 1};
x // 1
y // 5

var {x: y = 3} = {};
y // 3

var {x: y = 3} = {x: 5};
y // 5

var { message: msg = 'Something went wrong' } = {};
msg // "Something went wrong"
```

## 字符串的解构赋值

字符串被转换成了一个类似数组的对象，类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值。

```js
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"

let {length： len} = 'hello';
len // 5
```

## 数值和布尔值的解构赋值

解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。

```js
let {toString: s} = 123;
s === Number.prototype.toString // true

let {toString: s} = true;
s === Boolean.prototype.toString // true
```

上面代码中，数值和布尔值的包装对象都有toString属性，因此变量s都能取到值。

```js
let { prop: x } = undefined; // TypeError
let { prop: y } = null; // TypeError
```

由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。

## 函数参数的解构赋值

先来个简单例子：

```js
function add([x, y]){
  return x + y;
}

add([1, 2]); // 3
```

函数参数使用默认值：

```js
function move({x = 0, y = 0} = {}) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]
```

上面的代码中，函数的参数是一个对象，先对参数进行解构赋值，如果参数解构失败，再使用默认值。

```js
function move({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, undefined]
move({}); // [undefined, undefined]
move(); // [0, 0]
```

上面的代码中，函数的参数是一个对象，且指定了函数move的默认参数`{x: 0, y: 0}`。如果函数不传参，将会使用默认参数，再进行解构赋值；如果函数传了参数，将对传的参数进行解构赋值。

## 圆括号问题

### 一下三种情况不可使用圆括号

1. 变量声明语句
2. 函数参数
3. 赋值语句的模式

栗子一：

```js
// 全部报错
let [(a)] = [1];

let {x: (c)} = {};
let ({x: c}) = {};
let {(x: c)} = {};
let {(x): c} = {};

let { o: ({ p: p }) } = { o: { p: 2 } };
```

上面 6 个语句都会报错，因为它们都是变量声明语句，模式不能使用圆括号。

栗子二：

```js
// 报错
function f([(z)]) { return z; }
// 报错
function f([z,(x)]) { return x; }
```

函数参数也属于变量声明，因此不能带有圆括号。

栗子三：

```js
// 全部报错
({ p: a }) = { p: 42 };
([a]) = [5];
```

上面代码将整个模式放在圆括号之中，导致报错。

```js
// 报错
[({ p: a }), { x: c }] = [{}, {}];
```

上面代码将一部分模式放在圆括号之中，导致报错。

### 可以使用圆括号的情况

赋值语句的非模式部分，可以使用圆括号

```js
[(b)] = [3]; // 正确
({ p: (d) } = {}); // 正确
[(parseInt.prop)] = [3]; // 正确
```

上面三行语句都可以正确执行，因为首先它们都是赋值语句，而不是声明语句；其次它们的圆括号都不属于模式的一部分。

第一行语句中，模式是取数组的第一个成员，跟圆括号无关；第二行语句中，模式是p，而不是d；第三行语句与第一行语句的性质一致。

## 用途

### 交换变量的值

```js
let x = 1;
let y = 2;

[x, y] = [y, x];
```

### 从函数返回多个值

```js
// 返回一个数组

function example() {
  return [1, 2, 3];
}
let [a, b, c] = example();

// 返回一个对象

function example() {
  return {
    foo: 1,
    bar: 2
  };
}
let { foo, bar } = example();
```

### 函数参数的定义

```js
// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3]);

// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});
```

### 提取 JSON 数据

```js
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};

let { id, status, data: number } = jsonData;

console.log(id, status, number);
// 42, "OK", [867, 5309]
```

### 数参数的默认值

```js
jQuery.ajax = function (url, {
  async = true,
  beforeSend = function () {},
  cache = true,
  complete = function () {},
  crossDomain = false,
  global = true,
  // ... more config
} = {}) {
  // ... do stuff
};
```

指定参数的默认值，就避免了在函数体内部再写`var foo = config.foo || 'default foo';`这样的语句。

### 遍历 Map 结构

```js
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
// second is world
```

如果只想获取键名，或者只想获取键值，可以写成下面这样

```js
// 获取键名
for (let [key] of map) {
  // ...
}

// 获取键值
for (let [,value] of map) {
  // ...
}
```

### 输入模块的指定方法

加载模块时，往往需要指定输入哪些方法。解构赋值使得输入语句非常清晰。

```js
const { SourceMapConsumer, SourceNode } = require("source-map");
```