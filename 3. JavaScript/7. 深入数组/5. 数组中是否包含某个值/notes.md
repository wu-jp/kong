# JS 判断数组中是否包含某个值

## 1. array.indexOf

> 此方法判断数组中是否存在某个值，如果存在，则返回数组元素的下标，否则返回-1。

```js
var arr = [1, 2, 3, 4];
var index = arr.indexOf(3);
console.log(index);
```

## 2. array.includes(searchElement[,fromIndex])

> 此方法判断数组中是否存在某个值，如果存在返回 true，否则返回 false

```js
var arr = [1, 2, 3, 4];

if (arr.includes(3)) {
  console.log("存在");
} else {
  console.log("不存在");
}
```

## 3. array.find(callback[,thisArg])

> 返回数组中满足条件的第一个元素的下标，如果没有找到，返回-1

```js
var arr = [1, 2, 3, 4];
var result = arr.findIndex((item) => {
  return item > 3;
});
console.log(result);
```

当然，for 循环当然是没有问题的，这里讨论的是数组方法，就不再展开了。
