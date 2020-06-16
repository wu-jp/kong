const data = {
  name: "wuyi",
  age: 18,
  wu: {
    name: "wuyi",
    age: 18,
    obj: {},
  },
  arr: [1, 2, 3],
};

const arrayProto = Array.prototype;
const arrayMethods = Object.create(arrayProto);

//观察整个对象
observer(data);
function observer(data) {
  if (Array.isArray(data)) {
    data.__proto__ = arrayMethods;
    return;
  }
  if (typeof data === "object") {
    for (let key in data) {
      defineReactive(data, key, data[key]);
    }
  }
}

["pop", "push", "shift", "unshift", "splice", "sort", "reverse"].forEach(
  (element) => {
    arrayMethods[element] = function () {
      arrayProto[element].call(this, ...arguments);
      render();
    };
  }
);

function defineReactive(data, key, value) {
  observer(value);
  Object.defineProperty(data, key, {
    get() {
      return value;
    },

    set(newVal) {
      if (value === newVal) {
        return;
      }
      value = newVal;
      render();
    },
  });
}

function $set(data, key, value) {
  if (Array.isArray(data)) {
    data.splice(key, 1, value);
    return value;
  }
  defineReactive(data, key, value);
  return value;
}

function $delete(data, key) {
  if (Array.isArray(data)) {
    data.splice(key, 1);
    return;
  }
  delete data[key];
  render();
}

function render() {
  console.log("页面重新渲染");
}

console.log(data.arr);
data.arr.splice(0, 1, 100);
data.arr.reverse();
console.log(data.arr);
