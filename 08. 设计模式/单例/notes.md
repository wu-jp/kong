# 单例模式

> 单例模式的定义：保证一个类仅有一个实例，并提供一个访问他的全局访问点。实现的方法为先判断实例是否存在，如果存在就直接放回，不存在就创建了再返回，这就保证了一个类只有一个实例对象。

## 条件

- 确保只有一个实例
- 可以全局访问

## 适用

适用于弹框的实例，全局缓存

弹窗，无论点击多少次，弹窗只应该被创建一次。

## 实现单例模式

```js
const singleton = function(name) {
    this.name = name;
    this.instance = null;
}

singleton.prototype.getName = function() {
    console.log(this.name)
}

singleton.getInstance = function(name) {
    if(!this.instance) { // 关键语句
        this.instance = new singleton(name)
    }
    return this.instance
}

//test
const a = singleton.getInstance('a') //通过 getInstance 来获实例
const b = singleton.getInstance('b')
console.log(a === b)
```

## Javascript 中的单例模式

因为Javascript是无类语言，而且JS中的全局对象符合单利模式的条件。很多时候我们把全局对象当成单例模式来使用。

```js
var obj = {}
```

## 弹框层的实践

实现弹框的一种做法是先创建好弹框, 然后使之隐藏, 这样子的话会浪费部分不必要的 DOM 开销, 我们可以在需要弹框的时候再进行创建, 同时结合单例模式实现只有一个实例, 从而节省部分 DOM 开销。下列为登入框部分代码:

```js
const createLoginLayer = function() {
    const div = document.createElement("div");
    div.innerHtml = "登入浮框";
    div.style.display = "none";
    document.body.appendChild(div);
    return div
}
```

使用单例模式和创建弹框代码解耦

```js
const getSingle = function() {
    const result
    return function() {
        return result || result = fn.apply(this.arguments)
    }
}
```

```js
const createSingleLoginLayer = getSingle(createLoginLayer)

document.getElementById('loginBtn').onclick = function() {
    createSingleLoginLayer()
}
```
