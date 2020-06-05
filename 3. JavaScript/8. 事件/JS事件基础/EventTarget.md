# EventTarget 接口

## 1.概念

这个接口主要提供三个实例方法：

- addEventListener: 绑定事件的监听函数

- removeEventListener： 移除事件的监听函数

- dispatchEvent: 触发事件

## 2. addEventListener()

`EventTarget.addEventListener()`用于在当前节点或对象上，定义一个特定事件的监听函数。一旦这个事件发生，就会执行监听函数。该方法没有返回值

```js
target.addEventListener(type, listener[, useCapture]);
```

该方法接受三个参数：

- type：事件名称，大小写敏感

- listener：监听函数。事件发生时，会调用该监听函数

- useCapture：布尔值，表示监听函数是否在捕获阶段（capture）触发，默认为 false（监听函数只在冒泡阶段被触发）。该参数可选

举个栗子：

```js
function hello() {
  console.log("Hello world");
}

var button = document.getElementById("btn");
button.addEventListener("click", hello, false);
```

上面代码中，button 节点的 addEventListener 方法绑定 click 事件的监听函数 hello，该函数只在冒泡阶段触发

关于参数，有两个地方需要注意

1. 第二个参数除了监听函数，还可以是一个具有 handleEvent 方法的对象

   ```js
   buttonElement.addEventListener("click", {
     handleEvent: function (event) {
       console.log("click");
     },
   });
   ```

   上面代码中，addEventListener 方法的第二个参数，就是一个具有 handleEvent 方法的对象。

2. 第三个参数除了布尔值 useCapture，还可以是一个属性配置对象。该对象有以下属性

   - capture：布尔值，表示该事件是否在捕获阶段触发监听函数

   - once：布尔值，表示监听函数是否只触发一次，然后就自动移除。

   - passive：布尔值，表示监听函数不会调用事件的 preventDefault 方法。如果监听函数调用了，浏览器将忽略这个要求，并在监控台输出一行警告

   如果希望事件监听函数只执行一次，可以打开属性配置对象的 once 属性

   ```js
   element.addEventListener(
     "click",
     function (event) {
       // 只执行一次的代码
     },
     { once: true }
   );
   ```

## 3.EventTarget.removeEventListener()

`EventTarget.removeEventListener` 方法用来移除 addEventListener 方法添加的事件监听函数。该方法没有返回值

```js
div.addEventListener("click", listener, false);
div.removeEventListener("click", listener, false);
```

removeEventListener 方法的参数，与 addEventListener 方法完全一致。它的第一个参数“事件类型”，大小写敏感

注意，removeEventListener 方法移除的监听函数，必须是 addEventListener 方法添加的那个监听函数，而且必须在同一个元素节点，否则无效

```js
div.addEventListener("click", function (e) {}, false);
div.removeEventListener("click", function (e) {}, false);
```

```js
element.addEventListener("mousedown", handleMouseDown, true);
element.removeEventListener("mousedown", handleMouseDown, false);
```

上面两种情况，`removeEventListener` 方法都无效，因为参数不同

## 4. EventTarget.dispatchEvent()

`EventTarget.dispatchEvent`方法在当前节点上触发指定事件，从而触发监听函数的执行。该方法返回一个布尔值，只要有一个监听函数调用了`Event.preventDefault()`，则返回值为 false，否则为 true

```js
target.dispatchEvent(event);
```

dispatchEvent 方法的参数是一个 Event 对象的实例

```js
para.addEventListener("click", hello, false);
var event = new Event("click");
para.dispatchEvent(event);
```

如果 dispatchEvent 方法的参数为空，或者不是一个有效的事件对象，将报错

下面代码根据 dispatchEvent 方法的返回值，判断事件是否被取消了

```js
var canceled = !cb.dispatchEvent(event);
if (canceled) {
  console.log("事件取消");
} else {
  console.log("事件未取消");
}
```
