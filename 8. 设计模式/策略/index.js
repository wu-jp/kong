// 策略类
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

// 环境类
const calculateBonus = function(level, salary) {
    return strategy[level](salary);
}

console.log(calculateBonus('A', 10000)); // => 30000