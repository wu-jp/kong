# 1.什么是高阶函数

概念简单如下：

> 一个函数就可以接收另一个函数作为参数或者返回值为一个函数，这种函数就称之为高阶函数

那对应到数组中有哪些方法呢？

# 2.数组中的高阶函数

## 1.map

- 参数：接受两个参数，一个是回调函数，一个是回调函数的 this 值（可选）。
  其中，回调函数被默认传入三个参数，依次为：当前元素，当前索引，整个数组

- 创建一个新数组，其结果是该是数组中每个元素都调用一个提供的函数后返回的结果

- 对原数组没有影响

```js
let nums = [1, 2, 3];
let obj = { val: 5 };

let newNums = nums.map(function (item, index, array) {
  return item + index + array[index] + this.val;
  //对第一个元素，1 + 0 + 1 + 5 = 7
  //对第二个元素，2 + 1 + 2 + 5 = 10
  //对第三个元素，3 + 2 + 3 + 5 = 13
}, obj);

console.log(newNums); //[7, 10, 13]
```

当然，后面的参数都是可选的 ，不用的话可以省略。

## 2.reduce

- 参数：接受两个参数，一个为初始值一个为回调函数，。
  回调函数中有三个默认参数，依次为：累计值、当前值、整个数组。

```js
let nums = [1, 2, 3];

// 多个数的加和
let newNums = nums.reduce(function (preSum, curVal, array) {
  return preSum + curVal;
}, 0);

console.log(newNums); //6
```

不传默认值会怎样？

不传默认值会自动以第一个元素为初始值，然后从第二个元素开始依次累计

## 3.filter

- 参数：一个函数参数。这个函数接受一个默认值，就是当前元素。这个作为参数的函数返回一个布尔值，决定元素是否保留。

- filter 方法返回值是一个新数组，这个数组里面包含参数里面所有被保留的项

```js
let nums = [1, 2, 3];

// 保留奇数项
let oddNums = nums.filter((item) => item % 2);

console.log(oddNums);
```

## 4. sort

- 参数：一个用于比较的函数，他有两个参数，分别是代表比较的两个元素。

举个栗子：

```js
let nums = [2, 3, 1];

//两个比较的元素分别为a, b
nums.sort(function (a, b) {
  if (a > b) return 1;
  else if (a < b) return -1;
  else if (a == b) return 0;
});
```

当比较函数返回值大于 0，则 a 在 b 的后面，即 a 的下标应该比 b 大。

反之，则 a 在 b 的后面，即 a 的下标比 b 小。

整个过程就完成了一次升序的排列。

当然还有一个需要注意的情况，就是比较函数不传的时候，是如何进行排序的？

> 答案是将数字转换为字符串，然后根据字母 unicode 值进行升序排序，也就是根据字符串的比较规则进行升序排序

## 5. some、every

- 参数: 两个参数，一个是函数参数，这个函数有三个参数，依次是：当前成员，当前下标，整个数组。 一个是用来绑定参数函数的 this 值。
- 返回值： 一个布尔值

some 方法只要有一个元素满足条件就返回 true，都不满足返回 false

```js
var arr = [1, 2, 3, 4, 5];
arr.some(function (elem, index, arr) {
  return elem >= 3;
});
// true
```

上面代码中，如果数组 arr 有一个成员大于等于 3，some 方法就返回 true。

every 方法是所有元素都满足返回 true，否则返回 false

```js
var arr = [1, 2, 3, 4, 5];
arr.every(function (elem, index, arr) {
  return elem >= 3;
});
// false
```

_注意_，对于空数组，some 方法返回 false，every 方法返回 true，回调函数都不会执行

```js
function isEven(x) { return x % 2 === 0 }

[].some(isEven) // false
[].every(isEven) // tru
```
