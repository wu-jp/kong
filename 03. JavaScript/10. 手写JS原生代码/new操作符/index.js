function Person(name) {
  this.name = name
}
Person.prototype.eat = function() {
  console.log('ratting')
}
var wu = new Person('wu')
console.log(wu)
wu.eat()