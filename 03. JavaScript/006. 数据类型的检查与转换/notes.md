# js 数据类型——概念篇

## 1.原始数据类型有哪些？引用数据类型有哪些？

在 js 中，存在 6 种原始值，分别是：

- boolean
- null
- undefined
- number
- string
- symbol

引用数据类型：对象 Object（包含普通对象-Object，数组对象-Array，正则对象-RegExp，日期对象-Date，数学函数-Math，函数对象-Function）

## 2.说出下面运行的结果，解释原因

```js
function test(person) {
  person.age = 26;
  person = {
    name: "hzj",
    age: 18,
  };
  return person;
}
const p1 = {
  name: "fyq",
  age: 19,
};
const p2 = test(p1);
console.log(p1); // -> ?
console.log(p2); // -> ?
```

结果：

```js
p1：{name: “fyq”, age: 26}
p2：{name: “hzj”, age: 18}
```

> 原因: 在函数传参的时候传递的是对象在堆中的内存地址值，test 函数中的实参 person 是 p1 对象的内存地址，通过调用 person.age = 26 确实改变了 p1 的值，但随后 person 变成了另一块内存空间的地址，并且在最后将这另外一份内存空间的地址返回，赋给了 p2。

## 3.null 是对象吗？为什么？

结论：null 不是对象。

解释：虽然 typeof null 会输出 object，但是这只是 JS 存在的一个悠久 Bug。在 JS 的最初版本中使用的是 32 位系统，为了性能考虑使用低位存储变量的类型信息，000 开头代表是对象然而 null 表示为全零，所以将它错误的判断为 object

## 4. '1'.toString()为什么可以调用？

其实在这个语句运行的过程中做了这样几件事情：

```js
var s = new String("1");
s.toString();
s = null;
```

第一步: 创建 String 类实例。

第二步: 调用实例方法。

第三步: 执行完方法立即销毁这个实例。

整个过程体现了基本包装类型的性质，而基本包装类型恰恰属于基本数据类型，包括 Boolean, Number 和 String。

## 5. 0.1+0.2 为什么不等于 0.3?

0.1 和 0.2 在转换成二进制后会无限循环，由于标准位数的限制后面多余的位数会被截掉，此时就已经出现了精度的损失，相加后因浮点数小数位的限制而截断的二进制数字在转换为十进制就会变成 0.30000000000000004。

# js 数据类型——检查篇

## 1. typeof 是否能正确判断数据类型？

对于原始类型来说，除了 null 都可以调用 typeof 显示正确的类型。

```js
typeof 1; // 'number'
typeof "1"; // 'string'
typeof undefined; // 'undefined'
typeof true; // 'boolean'
typeof Symbol(); // 'symbol'
```

但对于引用数据类型，除了函数之外，都会显示"object"。

```js
typeof []; // 'object'
typeof {}; // 'object'
typeof console.log; // 'function'
```

因此采用 typeof 判断对象数据类型是不合适的，采用 instanceof 会更好，instanceof 的原理是基于原型链的查询，只要处于原型链中，判断永远为 true

```js
const Person = function () {};
const p1 = new Person();
p1 instanceof Person; // true

var str1 = "hello world";
str1 instanceof String; // false

var str2 = new String("hello world");
str2 instanceof String; // true
```

## 2. instanceof 能否判断基本数据类型？

能。例如下面这种方式：

```js
class PrimitiveNumber {
  static [Symbol.hasInstance](x) {
    return typeof x === "number";
  }
}
console.log(111 instanceof PrimitiveNumber); // true
```

如果你不知道 Symbol，可以看看 MDN 上关于 hasInstance 的解释。

其实就是自定义 instanceof 行为的一种方式，这里将原有的 instanceof 方法重定义，换成了 typeof，因此能够判断基本数据类型。

## 3. 能不能手动实现一下 instanceof 的功能？

核心: 原型链的向上查找。

```js
function myInstanceof(left, right) {
  //基本数据类型直接返回false
  if (typeof left !== "object" || left === null) return false;
  //getProtypeOf是Object对象自带的一个方法，能够拿到参数的原型对象
  let proto = Object.getPrototypeOf(left);
  while (true) {
    //查找到尽头，还没找到
    if (proto == null) return false;
    //找到相同的原型对象
    if (proto == right.prototype) return true;
    proto = Object.getPrototypeof(proto);
  }
}
```

测试:

```js
console.log(myInstanceof("111", String)); //false
console.log(myInstanceof(new String("111"), String)); //true
```

## 4. Object.is 和===的区别？

Object 在严格等于的基础上修复了一些特殊情况下的失误，具体来说就是+0 和-0，NaN 和 NaN。

源码如下：

```js
function is(x, y) {
  if (x === y) {
    //运行到1/x === 1/y的时候x和y都为0，但是1/+0 = +Infinity， 1/-0 = -Infinity, 是不一样的
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    //NaN===NaN是false,这是不对的，我们在这里做一个拦截，x !== x，那么一定是 NaN, y 同理
    //两个都是NaN的时候返回true
    return x !== x && y !== y;
  }
}
```

## 4. Object.prototype.toString()判断数据类型？

toString 方法的作用是返回一个对象的字符串形式，默认情况下返回类型字符串。

```js
var o1 = new Object();
o1.toString(); // "[object Object]"

var o2 = { a: 1 };
o2.toString(); // "[object Object]"
```

上面代码调用空对象的 toString 方法，结果返回一个字符串 object Object，其中第二个 Object 表示该值的构造函数。这是一个十分有用的判断数据类型的方法。

由于实例对象可能会自定义 toString 方法，覆盖掉 Object.prototype.toString 方法，所以为了得到类型字符串，最好直接使用 `Object.prototype.toString` 方法。通过函数的 `call` 方法，可以在任意值上调用这个方法，帮助我们判断这个值的类型。

```js
Object.prototype.toString.call(value);
```

- 不同数据类型的 Object.prototype.toString 方法返回值如下
- 数值：返回[object Number]。
- 字符串：返回[object String]。
- 布尔值：返回[object Boolean]。
- undefined：返回[object Undefined]。
- null：返回[object Null]。
- 数组：返回[object Array]。
- arguments 对象：返回[object Arguments]。
- 函数：返回[object Function]。
- Error 对象：返回[object Error]。
- Date 对象：返回[object Date]。
- RegExp 对象：返回[object RegExp]。
- 其他对象：返回[object Object]。

这就是说，Object.prototype.toString 可以看出一个值到底是什么类型

```js
Object.prototype.toString.call(2); // "[object Number]"
Object.prototype.toString.call(""); // "[object String]"
Object.prototype.toString.call(true); // "[object Boolean]"
Object.prototype.toString.call(undefined); // "[object Undefined]"
Object.prototype.toString.call(null); // "[object Null]"
Object.prototype.toString.call(Math); // "[object Math]"
Object.prototype.toString.call({}); // "[object Object]"
Object.prototype.toString.call([]); // "[object Array]"
```

利用这个特性，可以写出一个比 typeof 运算符更准确的类型判断函数

```js
var type = function (o) {
  var s = Object.prototype.toString.call(o);
  return s.match(/\[object (.*?)\]/)[1].toLowerCase();
};

type({}); // "object"
type([]); // "array"
type(5); // "number"
type(null); // "null"
type(); // "undefined"
type(/abcd/); // "regex"
type(new Date()); // "date"
```

在上面这个 type 函数的基础上，还可以加上专门判断某种类型数据的方法

```js
var type = function (o) {
  var s = Object.prototype.toString.call(o);
  return s.match(/\[object (.*?)\]/)[1].toLowerCase();
};

[
  "Null",
  "Undefined",
  "Object",
  "Array",
  "String",
  "Number",
  "Boolean",
  "Function",
  "RegExp",
].forEach(function (t) {
  type["is" + t] = function (o) {
    return type(o) === t.toLowerCase();
  };
});

type.isObject({}); // true
type.isNumber(NaN); // true
type.isRegExp(/abc/); // true
```
