# 基础函数篇

## 1. 静态方法

### 1.1 Array.isArray()

#### Array.isArray 方法返回一个布尔值，表示参数是否为数组。它可以弥补 typeof 运算符的不足

```js
var arr = [1, 2, 3];

typeof arr; //"object"
Array.isArray(arr); //true
```

## 2. 实例方法

### 2.1 valueOf、toString

#### valueOf 方法是一个`所有对象`都拥有的方法，表示对该对象求值。不同对象的 valueOf 方法不尽一致，数组的 valueOf 方法返回数组本身

```js
var arr = [1, 2, 3];
arr.valueOf(); //[1, 2, 3]
```

#### toString 方法也是`对象的通用方法`，数组的 toString 方法返回数组的字符串形式

```js
var arr = [1, 2, 3];
arr.toString(); //"1,2,3"

var arr2 = [1, 2, 3, [4, 5, 6]];
arr.toString(); //"1,2,3,4,5,6"
```

### 2.2 push()、pop()

#### push 方法用于在数组的末端添加一个或多个元素，并返回添加新元素后的数组长度。注意，该方法会改变原数组

```js
var arr = [];

arr.push(1); // 1
arr.push("a"); // 2
arr.push(true, {}); // 4
arr; // [1, 'a', true, {}]
```

#### pop 方法用于删除数组的最后一个元素，并返回该元素。注意，该方法会改变原数组

```js
var arr = ["a", "b", "c"];

arr.pop(); // 'c'
arr; // ['a', 'b']
```

> 对空数组使用`pop`方法，不会报错，而是返回`undefined`。

`push`和`pop`结合使用，就构成了“后进先出”的栈结构`（stack）`

```js
var arr = [];
arr.push(1, 2);
arr.push(3);
arr.pop();
arr; // [1, 2]
```

### 2.3 shift()、unshift()

#### shift 方法用于删除数组的第一个元素，并返回该元素。注意，该方法会改变原数组

```js
var a = ["a", "b", "c"];

a.shift(); // 'a'
a; // ['b', 'c']
```

shift()方法可以遍历并清空一个数组

```js
var list = [1, 2, 3, 4];
var item;

while ((item = list.shift())) {
  console.log(item);
}

list; // []
```

上面代码通过 list.shift()方法每次取出一个元素，从而遍历数组。它的前提是数组元素不能是 0 或任何布尔值等于 false 的元素，因此这样的遍历不是很可靠。

push()和 shift()结合使用，就构成了“先进先出”的队列结构（queue）

#### unshift 方法用于在数组的第一个位置添加元素，并返回添加新元素后的数组长度。注意，该方法会改变原数组

```js
var a = ["a", "b", "c"];

a.unshift("x"); // 4
a; // ['x', 'a', 'b', 'c']
```

unshift()方法可以接受多个参数，这些参数都会添加到目标数组头部

```js
var arr = ["c", "d"];
arr.unshift("a", "b"); // 4
arr; // [ 'a', 'b', 'c', 'd' ]
```

### 2.4 join()

#### join 方法以指定参数作为分隔符，将所有数组成员连接为一个字符串返回。如果不提供参数，默认用逗号分隔

```js
var a = [1, 2, 3, 4];

a.join(" "); // '1 2 3 4'
a.join(" | "); // "1 | 2 | 3 | 4"
a.join(); // "1,2,3,4"
```

如果数组成员是 undefined 或 null 或空位，会被转成空字符串

```js
[undefined, null].join('#')
// '#'

['a',, 'b'].join('-')
// 'a--b'
```

通过 call 方法，这个方法也可以用于字符串或类似数组的对象。

```js
Array.prototype.join.call("hello", "-");
// "h-e-l-l-o"

var obj = { 0: "a", 1: "b", length: 2 };
Array.prototype.join.call(obj, "-");
// 'a-b'
```

### 2.5 concat()

#### concat 方法用于多个数组的合并。它将新数组的成员，添加到原数组成员的后部，然后返回一个新数组，原数组不变

```js
['hello'].concat(['world'])
// ["hello", "world"]

['hello'].concat(['world'], ['!'])
// ["hello", "world", "!"]

[].concat({a: 1}, {b: 2})
// [{ a: 1 }, { b: 2 }]

[2].concat({a: 1})
// [2, {a: 1}]
```

除了数组作为参数，concat 也接受其他类型的值作为参数，添加到目标数组尾部。

```js
[1, 2, 3].concat(4, 5, 6);
// [1, 2, 3, 4, 5, 6
```

如果数组成员包括对象，concat 方法返回当前数组的一个浅拷贝。所谓“浅拷贝”，指的是新数组拷贝的是对象的引用。

```js
var obj = { a: 1 };
var oldArray = [obj];

var newArray = oldArray.concat();

obj.a = 2;
newArray[0].a; // 2
```

上面代码中，原数组包含一个对象，concat 方法生成的新数组包含这个对象的引用。所以，改变原对象以后，新数组跟着改变

### 2.6 reverse()

#### reverse 方法用于颠倒排列数组元素，返回改变后的数组。注意，该方法将改变原数组

```js
var a = ["a", "b", "c"];

a.reverse(); // ["c", "b", "a"]
a; // ["c", "b", "a"]
```

### 2.7 slice()

#### slice 方法用于提取目标数组的一部分，返回一个新数组，原数组不变

```js
arr.slice(start, end);
```

它的第一个参数为起始位置（从 0 开始，会包括在返回的新数组之中），第二个参数为终止位置（但该位置的元素本身不包括在内）。如果省略第二个参数，则一直返回到原数组的最后一个成员

```js
var a = ["a", "b", "c"];

a.slice(0); // ["a", "b", "c"]
a.slice(1); // ["b", "c"]
a.slice(1, 2); // ["b"]
a.slice(2, 6); // ["c"]
a.slice(); // ["a", "b", "c"]
```

上面代码中，最后一个例子 slice()没有参数，实际上等于返回一个原数组的拷贝

如果 slice()方法的参数是负数，则表示倒数计算的位置

```js
var a = ["a", "b", "c"];
a.slice(-2); // ["b", "c"]
a.slice(-2, -1); // ["b"]
```

如果第一个参数大于等于数组长度，或者第二个参数小于第一个参数，则返回空数组

```js
var a = ["a", "b", "c"];
a.slice(4); // []
a.slice(2, 1); // []
```

slice()方法的一个重要应用，是将类似数组的对象转为真正的数组

```js
Array.prototype.slice.call({ 0: "a", 1: "b", length: 2 });
// ['a', 'b']

Array.prototype.slice.call(document.querySelectorAll("div"));
Array.prototype.slice.call(arguments);
```

上面代码的参数都不是数组，但是通过 call 方法，在它们上面调用 slice()方法，就可以把它们转为真正的数组

### 2.8 splice()

#### splice 方法用于删除原数组的一部分成员，并可以在删除的位置添加新的数组成员，返回值是被删除的元素。注意，该方法会改变原数组

```js
arr.splice(start, count, addElement1, addElement2, ...);
```

splice 的第一个参数是删除的起始位置（从 0 开始），第二个参数是被删除的元素个数。如果后面还有更多的参数，则表示这些就是要被插入数组的新元素

```js
var a = ["a", "b", "c", "d", "e", "f"];
a.splice(4, 2); // ["e", "f"]
a; // ["a", "b", "c", "d"]
```

上面代码从原数组 4 号位置，删除了两个数组成员

```js
var a = ["a", "b", "c", "d", "e", "f"];
a.splice(4, 2, 1, 2); // ["e", "f"]
a; // ["a", "b", "c", "d", 1, 2]
```

上面代码除了删除成员，还插入了两个新成员

起始位置如果是负数，就表示从倒数位置开始删除

```js
var a = ["a", "b", "c", "d", "e", "f"];
a.splice(-4, 2); // ["c", "d"]
```

上面代码表示，从倒数第四个位置 c 开始删除两个成员

如果只是单纯地插入元素，splice 方法的第二个参数可以设为 0

```js
var a = [1, 1, 1];

a.splice(1, 0, 2); // []
a; // [1, 2, 1, 1]
```

如果只提供第一个参数，等同于将原数组在指定位置拆分成两个数组

```js
var a = [1, 2, 3, 4];
a.splice(2); // [3, 4]
a; // [1, 2]
```

### 2.9 indexOf、lastIndexOf

#### indexOf 方法返回给定元素在数组中第一次出现的位置，如果没有出现则返回-1

```js
var a = ["a", "b", "c"];

a.indexOf("b"); // 1
a.indexOf("y"); // -1
```

indexOf 方法还可以接受第二个参数，表示搜索的开始位置

```js
["a", "b", "c"].indexOf("a", 1); // -1
```

#### lastIndexOf 方法返回给定元素在数组中最后一次出现的位置，如果没有出现则返回-1

```js
var a = [2, 5, 9, 2];
a.lastIndexOf(2); // 3
a.lastIndexOf(7); // -1
```

_注意_，这两个方法不能用来搜索 NaN 的位置，即它们无法确定数组成员是否包含 NaN

```js
[NaN].indexOf(NaN); // -1
[NaN].lastIndexOf(NaN); // -1
```

这是因为这两个方法内部，使用严格相等运算符（===）进行比较，而 NaN 是唯一一个不等于自身的值
