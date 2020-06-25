// function deepCopy(fromObj,toObj) { // 深拷贝函数
//   // 容错
//   if(fromObj === null) return null // 当fromObj为null
//   if(fromObj instanceof RegExp) return new RegExp(fromObj) // 当fromObj为正则
//   if(fromObj instanceof Date) return new Date(fromObj) // 当fromObj为Date

//   toObj = toObj || {}
  
//   for(let key in fromObj){ // 遍历
//     if(typeof fromObj[key] !== 'object'){ // 是否为对象
//       toObj[key] = fromObj[key] // 如果为原始数据类型，则直接赋值
//     }else{
//       toObj[key] = new fromObj[key].constructor // 如果为object，则new这个object指向的构造函数
//       deepCopy(fromObj[key],toObj[key]) // 递归
//     }
//   }
//   return toObj
// }

// let dog = {
//   name:"小白",
//   sex:"公",
//   friends:[
//     {
//       name:"小黄",
//       sex:"母"
//     }
//   ]
// }

// let dogCopy = deepCopy(dog)
// // 此时我们把dog的属性进行修改
// dog.friends[0].sex = '公'
// console.log(dog)
// console.log(dogCopy)

// let dog = {
//   name:"小白",
//   sex:"公",
//   friends:[
//     {
//       name:"小黄",
//       sex:"母"
//     }
//   ]
// }

// function deepCopy(obj) {
//   if(obj === null) return null
//   if(typeof obj !== 'object') return obj
//   if(obj instanceof RegExp) return new RegExp(obj)
//   if(obj instanceof Date) return new Date(obj)
//   let newObj = new obj.constructor
//   for(let key in obj){
//     newObj[key] = deepCopy(obj[key])
//   }
//   return newObj
// }

// let dogCopy = deepCopy(dog)
// dog.friends[0].sex = '公'
// console.log(dogCopy)


// // 利用JSON.stringify和JSON.parse
// let swr = {
//   name:"邵威儒",
//   age:28
// }
// let swrCopy = JSON.parse(JSON.stringify(swr))

// console.log(swrCopy)
// // { name:"邵威儒",age:28 }

// // 此时我们修改swr的属性
// swr.age = 29
// console.log(swr)
// // { name:"邵威儒",age:29 }

// // 但是swrCopy却不会受swr影响
// console.log(swrCopy)
// // { name:"邵威儒",age:28 }

// // 这种方式进行深拷贝，只针对json数据这样的键值对有效
// // 对于函数等等反而无效，不好用，接着继续看方法二、三。