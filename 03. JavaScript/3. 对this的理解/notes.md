# 谈谈你对 this 的理解

主要的 this 隐式绑定指向的场景讨论

1. 全局上下文
2. 直接调用函数
3. 对象的方法的形式调用
4. DOM 事件绑定
5. new 构造函数绑定
6. 箭头函数

## 1.全局上下文

全局上下文默认 this 指向 window, 严格模式下指向 undefined。

## 2.直接调用函数

比如：

```js
let obj = {
  a: function () {
    console.log(this);
  },
};
let func = obj.a;
func();
```

这种情况是直接调用，this 指向全局上下文

## 3.对象的方法的形式调用

```js
let obj = {
  a: function () {
    console.log(this);
  },
};
obj.a();
```

这就是`对象.方法`的情况，this 指向这个对象

## 4.DOM 事件绑定

onclick 和 addEventListener 中 this 默认指向绑定事件的元素。

IE 比较奇异，使用 attachEvent，里面的 this 默认指向 window。

## 5.new 构造函数

此时构造函数的 this 指向 new 的实例对象

## 6.箭头函数

箭头函数没有 this, 因此也不能绑定。里面的 this 会指向当前最近的非箭头函数的 this，找不到就是 window(严格模式是 undefined)。比如:

```js
let obj = {
  a: function() {
    let do = () => {
      console.log(this);
    }
    do();
  }
}
obj.a(); // 找到最近的非箭头函数a，a现在绑定着obj, 因此箭头函数中的this是obj
```

> 优先级: new > call、apply、bind > 对象.方法 > 直接调用。
