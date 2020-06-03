# 谈谈你对原型链的理解

## 1.原型对象和构造函数的关系

在 JavaScript 中，每当定义一个函数数据类型(普通函数、类)时候，都会天生自带一个 prototype 属性，这个属性指向函数的原型对象

当函数经过 new 调用时，这个函数就成为了构造函数，返回一个全新的实例对象，这个实例对象有一个`__proto__`属性，指向构造函数的原型对象。

![Alt text](./1.png)

## 2.能不能描述一下原型链

JavaScript 对象通过 prototype 指向父类对象，直到指向 Object 对象为止，这样就形成了一个原型指向的链条, 即原型链。

![Alt text](./2.png)

- 对象的 hasOwnProperty() 来检查对象自身中是否含有该属性
- 使用 in 检查对象中是否含有某个属性时，如果对象中没有但是原型链中有，也会返回 true

## 3.constructor

constructor，每个原型都有一个 constructor 属性指向关联的构造函数。

```js
function Person() {}

console.log(Person === Person.prototype.constructor); //true
```

```js
function Person() {}

var person = new Person();

console.log(person.__proto__ == Person.prototype); //true

console.log(Person.prototype.constructor == Person); //true
//顺便学习一个ES5的方法,可以获得对象的原型
console.log(Object.getPrototypeOf(person) === Person.prototype); // true
```

## 4.实例与原型

当读取实例的属性时，如果找不到，就会查找与对象关联的原型中的属性，如果还查不到，就去找原型的原型，一直找到最顶层为止

举个栗子：

```js
function Person() {}

Person.prototype.name = "Kevin";

var person = new Person();

person.name = "Daisy";
console.log(person.name); // Daisy

delete person.name;
console.log(person.name); // Kevin
```

在这个例子中，我们给实例对象 person 添加了 name 属性，当我们打印 person.name 的时候，结果自然为 Daisy。

但是当我们删除了 person 的 name 属性时，读取 person.name，从 person 对象中找不到 name 属性就会从 person 的原型也就是 person.`__proto__` ，也就是 Person.prototype 中查找，幸运的是我们找到了 name 属性，结果为 Kevin。

但是万一还没有找到呢？原型的原型又是什么呢？

## 5.原型的原型
