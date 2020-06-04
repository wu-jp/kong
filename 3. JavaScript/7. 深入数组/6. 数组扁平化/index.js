var arr = [1, "3", [2, "a", ["b", 4]]];

function flatten(arr) {
  return arr.reduce((prev, next) => {
    return prev.concat(Array.isArray(next) ? flatten(next) : next);
  }, []);
}

console.log(flatten(arr));
