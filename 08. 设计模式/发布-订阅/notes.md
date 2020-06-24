# 发布订阅模式

发布订阅模式是一种对象间一对多的的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到状态改变的通知。

## 作用

1. 广泛应用于异步编程中（替代了传值回调函数）
2. 对象之间松散耦合的编写代码

## 自定义事件

```js
// 自定义一个公司
let corp = {};
// 这里放一个列表用来缓存回调函数
corp.list = [];
// 去订阅事件
corp.on = function(fn) {
  this.list.push(fn)
}
// 发布事件
corp.emit = function() {
  this.list.forEach(cb=>{
    cb.apply(this, arguments);
  })
}

// 测试
corp.on(function(position, salary) {
  console.log('你的职位是' + position);
  console.log('期望薪水' + salary);
})
corp.on(function(skill, hobby) {
  console.log('你的技能是' + skill);
  console.log('爱好' + hobby);
})

corp.emit('前端', 10000);
corp.emit('端茶倒水', 'LOL');
/*
  你的职位是前端
  期望薪水10000
  你的技能是前端
  爱好10000
  你的职位是端茶倒水
  期望薪水LOL
  你的技能是端茶倒水
  爱好LOL
*/
```

上面通过自定义事件实现了一个简单的发布订阅模式，不过从打印出来的结果来看，有点小尴尬。Why？

因为在正常的情况下，希望打印的是酱紫的：

```js
/*
    你的职位是：前端
    期望薪水：10000

    你的技能有： 端茶和倒水
    爱好： 足球
*/
```

之所以出现此种情况，那是在on方法的时候一股脑的都将fn函数全部放到了列表中。

然而需要的只是一个简单的key值，就可以解决了。让我们改写一下上面的代码。

```js
let corp = {};
// 这次换成一个对象类型的缓存列表
corp.list = {};

corp.on = function(key, fn) {
    // 如果对象中没有对应的key值
    // 也就是说明没有订阅过
    // 那就给key创建个缓存列表
    if (!this.list[key]) {
        this.list[key] = [];
    }
    // 把函数添加到对应key的缓存列表里
    this.list[key].push(fn);
};
corp.emit = function() {
    // 第一个参数是对应的key值
    // 直接用数组的shift方法取出
    let key = [].shift.call(arguments),
        fns = this.list[key];
    // 如果缓存列表里没有函数就返回false
    if (!fns || fns.length === 0) {
        return false;
    }
    // 遍历key值对应的缓存列表
    // 依次执行函数的方法
    fns.forEach(fn => {
        fn.apply(this, arguments);
    });
};

// 测试用例
corp.on('join', (position, salary) => {
    console.log('你的职位是：' + position);
    console.log('期望薪水：' + salary);
});
corp.on('other', (skill, hobby) => {
    console.log('你的技能有： ' + skill);
    console.log('爱好： ' + hobby);
});

corp.emit('join', '前端', 10000);
corp.emit('join', '后端', 10000);
corp.emit('other', '端茶和倒水', '足球');
/*
    你的职位是：前端
    期望薪水：10000
    你的职位是：后端
    期望薪水：10000
    你的技能有： 端茶和倒水
    爱好： 足球
*/
```

## 来个通用的

现在来搞个通用的发布订阅模式实现，和刚才的差不多，不过这次起名也要隆重些了，直接叫event吧，看代码

```js
let event = {
    list: {},
    on(key, fn) {
        if (!this.list[key]) {
            this.list[key] = [];
        }
        this.list[key].push(fn);
    },
    emit() {
        let key = [].shift.call(arguments),
            fns = this.list[key];

        if (!fns || fns.length === 0) {
            return false;
        }
        fns.forEach(fn => {
            fn.apply(this, arguments);
        });
    },
    remove(key, fn) {
        // 这回我们加入了取消订阅的方法
        let fns = this.list[key];
        // 如果缓存列表中没有函数，返回false
        if (!fns) return false;
        // 如果没有传对应函数的话
        // 就会将key值对应缓存列表中的函数都清空掉
        if (!fn) {
            fns && (fns.length = 0);
        } else {
            // 遍历缓存列表，看看传入的fn与哪个函数相同
            // 如果相同就直接从缓存列表中删掉即可
            fns.forEach((cb, i) => {
                if (cb === fn) {
                    fns.splice(i, 1);
                }
            });
        }
    }
};

function cat() {
    console.log('一起喵喵喵');
}
function dog() {
    console.log('一起旺旺旺');
}

event.on('pet', data => {
    console.log('接收数据');
    console.log(data);
});
event.on('pet', cat);
event.on('pet', dog);
// 取消dog方法的订阅
event.remove('pet', dog);
// 发布
event.emit('pet', ['二哈', '波斯猫']);
/*
    接收数据
    [ '二哈', '波斯猫' ]
    一起喵喵喵
*/
```

这样其实就实现了一个可以使用的发布订阅模式了，其实说起来也是比较简单的，来一起屡屡思路吧

## 思路

- 创建一个对象(缓存列表)
- on方法用来把回调函数fn都加到缓存列表中
- emit方法取到arguments里第一个当做key，根据key值去执行对应缓存列表中的函数
- remove方法可以根据key值取消订阅

# node的核心模块

用过node的朋友们，应该对这个模块不陌生，可以说这个在node中真的是很重要的模块了，在使用后发现，这完全是个大写的发布订阅模式啊

简直是无所不在的存在啊，那么废话不再，实现依旧。先来看看如何使用吧，来个测试用例看看

## 测试用例

```js
/ {'失恋',  [findboy, drink]}
// 监听的目的 就是为了构造这样一个对象 一对多的关系    on

// 发布的时候 会让数组的函数依次执行    emit
// [findboy, drink]

// let EventEmitter = require('events');
// 这里用接下来我们写的
let EventEmitter = require('./events');
let util = require('util');

function Girl() {
}
// Girl继承EventEmitter上的方法
util.inherits(Girl, EventEmitter);  // 相当于Girl.prototype.__proto__ = EventEmitter.prototype
let girl = new Girl();
let drink = function (data) {
    console.log(data);
    console.log('喝酒');
};
let findboy = function () {
    console.log('交友');
};

girl.on('newListener', function (eventName) {
    // console.log('名称： ' + eventName);
});
girl.on('结婚', function() {});
girl.setMaxListeners(3);
console.log(girl.getMaxListeners());
girl.once('失恋', drink);       // {'失恋': [drink]}
girl.once('失恋', drink);       // {'失恋': [drink]}
girl.prependListener('失恋', function () {
    console.log('before');
});
girl.once('失恋', drink);       // {'失恋': [drink]}
girl.emit('失恋', '1');
```

以上代码就是events核心模块的使用方法，不用吝啬，快快动手敲起来吧

## 实现一个EventEmitter

下面来到了最重要也是最激动人心的时刻了，来开始实现一个EventEmitter吧

```js
function EventEmitter() {
    // 用Object.create(null)代替空对象{}
    // 好处是无杂质，不继承原型链的东东
    this._events = Object.create(null);
}
// 默认最多的绑定次数
EventEmitter.defaultMaxListeners = 10;
// 同on方法
EventEmitter.prototype.addListener = EventEmitter.prototype.on;
// 返回监听的事件名
EventEmitter.prototype.eventNames = function () {
    return Object.keys(this._events);
};
// 设置最大监听数
EventEmitter.prototype.setMaxListeners = function (n) {
    this._count = n;
};
// 返回监听数
EventEmitter.prototype.getMaxListeners = function () {
    return this._count ? this._count : this.defaultMaxListeners;
};
// 监听
EventEmitter.prototype.on = function (type, cb, flag) {
    // 默认值，如果没有_events的话，就给它创建一个
    if (!this._events) {
        this._events = Object.create(null);
    }
    // 不是newListener 就应该让newListener执行以下
    if (type !== 'newListener') {
        this._events['newListener'] && this._events['newListener'].forEach(listener => {
            listener(type);
        });
    }
    if (this._events[type]) {
        // 根据传入的flag来决定是向前还是向后添加
        if (flag) {
            this._events[type].unshift(cb);
        } else {
            this._events[type].push(cb);
        }
    } else {
        this._events[type] = [cb];
    }
    // 监听的事件不能超过了设置的最大监听数
    if (this._events[type].length === this.getMaxListeners()) {
        console.warn('警告-警告-警告');
    }
};
// 向前添加
EventEmitter.prototype.prependListener = function (type, cb) {
    this.on(type, cb, true);
};
EventEmitter.prototype.prependOnceListener = function (type, cb) {
    this.once(type, cb, true);
};
// 监听一次
EventEmitter.prototype.once = function (type, cb, flag) {
    // 先绑定，调用后删除
    function wrap() {
        cb(...arguments);
        this.removeListener(type, wrap);
    }
    // 自定义属性
    wrap.listen = cb;
    this.on(type, wrap, flag);
};
// 删除监听类型
EventEmitter.prototype.removeListener = function (type, cb) {
    if (this._events[type]) {
        this._events[type] = this._events[type].filter(listener => {
            return cb !== listener && cb !== listener.listen;
        });
    }
};
EventEmitter.prototype.removeAllListener = function () {
    this._events = Object.create(null);
};
// 返回所有的监听类型
EventEmitter.prototype.listeners = function (type) {
    return this._events[type];
};
// 发布
EventEmitter.prototype.emit = function (type, ...args) {
    if (this._events[type]) {
        this._events[type].forEach(listener => {
            listener.call(this, ...args);
        });
    }
};

module.exports = EventEmitter;
```

上面我们通过努力实现了node的核心模块events，完成了EventEmitter的功能，可喜可贺，可喜可贺，给自己点个赞吧！

完成是完成了，但是大家还是要反复写反复推敲的，毕竟都没有过目不忘的本领，还是要努力的，加油，加油

哈哈，那么最后的最后，来写个小小的总结

# 总结

**优点**

- 对象之间的解耦
- 异步编程中，可以更松耦合的代码编写

**缺点**

- 创建订阅者本身要消耗一定的时间和内存
- 多个发布者和订阅者嵌套一起的时候，程序难以跟踪维护

强如发布订阅模式，也是劲酒虽好，不要贪杯的道理哦。过度使用的话，都会出现上述缺点的问题。不过合理开发合理利用，这都不是什么大问题的。