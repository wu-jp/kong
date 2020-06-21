// var regex = /id="[^"]*"/;
// var string = '<div id="container" class="main"></div>';
// console.log(string.match(regex)[0]);

// var result = "hello".replace(/^|$/g, "#");
// console.log(result);

// var result = "I\nlove\njavascript".replace(/^|$/gm, '#');
// console.log(result);

// var result = "[JS]Lesson_o1.pm4".replace(/\b/g, "#");
// console.log(result);

var result = /(?=he)^^he(?=\w)llo$\b\b$/.test("hello");
console.log(result);