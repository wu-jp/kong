class CreateUser {
    constructor(name) {
        this.name = name;
        this.getName();
    }
    getName() {
        return this.name;
    }
}

// 代理实现单例模式
var ProxyMode = (function() {
    var instance = null;
    return function(name) {
        if(!instance) {
            instance = new CreateUser(name);
        }
        return instance;
    }
})();

// 测试单例模式的实例
var a = new ProxyMode('a');
console.log(a) // => CreateUser { name: 'a' }
var b = new ProxyMode('b');
console.log(b) // => CreateUser { name: 'a' }

// 因为单例模式只实例化一次，所以下面的实例是相等的
console.log(a === b); // => true