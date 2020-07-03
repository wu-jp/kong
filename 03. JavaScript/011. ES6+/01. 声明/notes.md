# 第一章

大纲：

- var 声明与变量提升
- 块级声明
  - let 声明
  - 禁止重复声明
  - 常量声明
    - 对比常量声明与 let 声明
    - 使用 const 声明对象
  - 暂时性死区
- 循环中的块级绑定
  - 循环内的函数
  - 循环内的 let 声明
  - 循环内的常量声明
- 全局块级绑定
- 总结

## var 声明与变量提升

使用 `var`关键字声明变量，无论去实际声明位置在何处，都会被视为声明在所在函数的顶部（如果声明不在任何函数内部，则视为全局作用域的顶部），这就是变量提升（hoisting）。

直接上代码：😁

```js
function getValue(condition) {
  if(condition){
    var value = 'blue';
    // todo
    return value;
  } else {
    // value 在此处是可以访问的，值为undefined
    return null;
  }
  // value 在此处是可以访问的，值为undefined
}
```

JS 引擎在后台对`getValue`函数进行了调整，就像这样：

```js
function getValue(condition) {
  var value;
  if(condition){
    value = 'blue';
    // todo
    return value;
  } else {
    return null;
  }
}
```

`value`变量的声明被提升到了顶部，而初始化工作则保留在了原处。

为了解决这种不易理解的转换行为，ES6 引入了块级作用域。

## 块级声明

块级作用域（词法作用域）：让所声明的变量在指定的作用域外无法被访问。

块级作用域在一下情况下被创建：

1. 在一个函数内部
2. 在一个代码块（由一对花括号包裹）内部

### let 声明

`let`声明的语法和`var`声明的语法一致。但是`let`声明会将变量的作用域限制在当前代码块内，且变量不会提升到代码块的顶部，因此你需要主动将`let`声明放置在顶部，以便整个代码块都可以访问到这个变量。

栗子🌰：

```js
function getValue(condition) {
  if (condition) {
    let value = 'blue';
    // todo
    return value;
  } else {
    // value 在此处不可用
    return null;
  }
  // value 在此处不可用
}
```

### 禁止重复声明

如果一个标识符已经在**代码块**中被定义，那么在此代码块内使用同一个标识符进行`let`声明会导致报错。

```js
var count = 30;
let count = 31; // 语法错误
```

在嵌套的作用域内使用`let`声明同名的变量，则不会报错。

```js
var count 30;
if(condition) {
  let count = 31; // 不会抛出错误
  // todo
}
```

### 常量声明

在 ES6 中使用`const`声明的变量会被认为是常量（constant），这意味着它们的值在被赋值完成后就不能被改变。所以`const`声明的变量需要在声明后立马赋值（初始化）。

```js
// 有效的常量
const maxItems = 30;

// 语法错误，未进行初始化
const name;

// 抛出错误，不可改变
maxItems = 31;
```

#### 对比`const`常量声明和`let`声明

共同点：

- 都是块级作用域，在代码块外无法访问，不会变量提升
- 同一代码块内，不可重复声明，无论之前的变量是用`var`还是`let`声明的
- 代码块内，在声明之前都是无法访问的（暂时性死区），试图访问会抛出引用错误

不同点：

- `let`声明的变量可以进行重新赋值，`const`声明的变量不能重新赋值
- `let`声明的变量可以不赋值（初始化），`const`声明的变量必须立马赋值

#### 使用`const`声明对象

`const`声明会阻止对于变量绑定与变量自身值得修改，但是这意味着`const`声明不会阻止对变量成员的修改。

栗子如下🌰：

```js
const person = {
  name: 'wuyi'
}

// 工作正常
person.name = 'wu-jp'

// 抛出错误
person = {
  name: 'wu-jp'
}
```

`const`阻止的是对于变量绑定的修改，而不是阻止对绑定成员的修改。（可以改变房间里的东西，但是不能改房间号）

### 暂时性死区

使用`let`或者`const`声明的变量，在运行到声明处之前都是无法访问的，试图访问会导致一个引用的错误。即使在通常是安全的操作时（例如使用`typeof`运算符），也是如此。例如：

```js
if(condition) {
  console.log(typeof value) // 引用错误
  let value = 'blue'
}
```

当 JS 引擎检视的代码块中发现有变量声明时，它会在面对`var`的情况时将声明提升到函数或全局作用域的顶部，而面对`let`和`const`时会将声明放在暂时性死区内。任何在暂时性死区内访问变量的企图都会导致运行时错误（runtime error）。只有执行到变量的声明语句时，该变量才会从暂时性死区内移除并且可以安全使用。

可以在变量被定义的代码块之外对该变量使用`typeof`，尽管结果并非预料。

```js
console.log(typeof value); // 'undefined'

if(condition) {
  let value = 'blue'
}
```

当`typeof`运算被调用时，`value`并没有在暂时性死区内，因为这发生在定义`value`变量的代码块外部。

暂时性死区只是块级变量的一个独特的表现，而另一个独特的表现则是在循环中使用它。

## 循环中的块级绑定

开发者最需要使用块级作用域的场景，或许就是在 for 循环内。

```js
for(var i = 0; i < 10; i++) {
  process(item[i])
}

// i 在此处仍然可以被访问
console.log(i); // 10
```

我们希望只有在`for`循环内才可以访问到`i`，然而在 JS 中，循环结束后 `i` 任然可以被访问到，因为`var`声明会存在变量提升。

使用`let`:

```js
for(let i = 0; i < 10; i++) {
  process(item[i])
}

// i 在此不可访问，抛出错误
console.log(i);
```

变量`i`仅在`for`循环内部可用，一旦循环结束，该变量在任意位置都不可访问。

### 循环内的函数

```js
var funcs = []

for (var i = 0; i < 10; i++) {
  funcs.push( function () { console.log(i) } )
}
funcs.forEach(function(func) {
  func() // 输出 10 十次
})
```

原本我们想着会输出0-9的数组，但是却是10*10。这是因为变量`i`在循环的每次迭代中都被共享了，意味着循环内创建的哪些函数都拥有着同一个变量的引用。

立即执行函数表达式

```js
var funcs = []

for(var i = 0; i < 10; i++) {
  funcs.push((function(value) {
    return function() {
      console.log(value)
    }
  }(i)))
}

funcs.forEach(function(func) {
  func() // 输出 0~9
})
```

 这种写法在循环内使用了IIFE。变量`i`被传递给IIFE，从而创建了`value`变量作为自身副本并将值存储在其中。`value`变量的值被迭代中的函数所使用，因此在循环从0到9的过程中调用每个函数都返回了预期的值。

### 循环内的 `let`声明

```js
var funcs = []

for(let i = 0; i < 10; i++) {
  funcs.push(function() {
    console.log(i)
  })
}

funcs.forEach(function(func) {
  func() // 输出 0~9
})
```

在循环中`let`声明每次都创建了一个新的`i`变量，因此在循环内部创建的函数获得了各自`i`副本，而每个`i`副本的直都在每次循环迭代声明变量的时候就被确定了。这种方式在`for-in`和`for-of`循环中同样适用。

```js
var funcs = [],
    object = {
      a: true,
      b: true,
      c: true
    }

for(let key in object) {
  funcs.push(function() {
    console.log(key)
  })
}

funcs.forEach(function(func) {
  func(); // 依次输出 'a' 'b' 'c'
})
```

### 循环内的常量声明

ES6 规范没有明确禁止循环中使用`const`声明，然而它会根据循环的方式不同而有不同的行为。在常规的`for`循环中，你可以在初始化时使用`const`，但循环会在你试图改变变量值时抛出错误。

```js
for funcs = []

// 在一次迭代后抛出错误
for(const i = 0; i < 10; i++) {
  funcs.push(function() {
    console.log(i)
  })
}
```

在循环中，你只能使用`const`来声明一个不会改变的变量

而另一方面，`const`变量在`for-in`或者`for-or`循环中使用时，与`let`效果一样。

```js
var funcs = [],
    object = {
      a: true,
      b: true,
      c: true
    }

// 不会抛出错误
for (const key in object) {
  funcs.push(function () {
    console.log(key)
  })
}

funcs.forEach(function(func) {
  func(); // 依次输出 'a' 'b' 'c'
})
```

## 全局块级绑定

`let`与`const`不同于`var`的另一个方面就表现在全局作用域上。当在全局作用域上使用`var`时，它会创将一个新的全局变量，并成为全局对象（window）的一个属性。这意味着，使用`var`可能会覆盖一个已有的全局属性。例如：

```js
// 在浏览器中
var RegExp = 'hello'
console.log(window.RegExp) // 'hello'

var ncz = 'hi'
console.log(window.ncz) // 'hi'
```

然而你在全局作用域下使用`let`或`const`，虽然在全局作用域上会创建新的绑定，但不会有任何属性被添加到全局对象上。这也就意味着你不能使用`let`或者`const`来覆盖一个全局变量，你只能将其屏蔽。例如：

```js
// 在浏览器中
let RegExp = 'hello'
console.log(RegExp) // 'hello'
console.log(window.RegExp === RegExp) // false

const ncz = 'hi'
console.log(ncz) // 'hi'
console.log('ncz' in window) // false
```

此代码的`let`声明创建了`RegExp`的一个绑定，并屏蔽了全局的`RegExp`。这表示`window.RegExp`与`RexExp`是不同的。因此全局作用域没有被污染。同样，`const`声明创建的`ncz`，并没有在全局对象上创建属性。

> 若你想代码能从全局对象中被访问，你仍然需要使用`var`。在浏览器中跨越帧或窗口去访问代码时，这种做法是非常普遍的。

## 总结

`let`与`const`块级绑定将词法作用域引入JS，这两种声明方式都不会进行提升，并且它会在声明它们的代码的代码块内部存在。由于变量能够在必要的位置被准确声明，其表现更加接近其他语言，并且减少了无心错误的产生。你不能在变量声明之前使用它，即便使用的是`typeof`这样的安全运算符。由于块级绑定存在暂时性死区，试图在声明位置之前使用会导致错误。

`let`与`const`的表现在很对情况下都相似与`var`，然而在循环中就不是这样了。在`for-in`与`for-of`循环中，`let`与`const`都能在每一次迭代时创建一个新的绑定。

块级绑定当前的最佳实践就是：在默认情况下使用`const`，而只在你知道变量需要被改变的情况下才使用`let`。这在代码中能保证基本层次的不可变性，有助于防止某些类型的错误。
