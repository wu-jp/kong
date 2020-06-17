# 策略模式

> 定义：要实现某个功能，有多种方案可选择。我们定义策略，把他们一个个封装起来，并且使用它们可以相互转换。

## JS中的策略模式

通常写法：

```js
const S = function(salary) {
    return salary * 4
}

const A = function(salary) {
    return salary * 3
}

const B = function(salary) {
    return salary * 2
}

const calculateBonus = function(func, salary) {
    return func(salary)
}

console.log(B, 5000);
```

策略模式写法：

```js
const strategy = {
    'S': function(salary) {
        return salary * 4
    },
    'A': function(salary) {
        return salary * 3
    },
    'B': function(salary) {
        return salary * 2
    }
}

const calculateBonus = function(level, salary) {
    return strategy[level](salary);
}

calculateBonus('A', 10000)
```

## 优点

- 减少大量if语句
- 复用性好
