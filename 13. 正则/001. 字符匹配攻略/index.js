// var regex = /hello/;
// console.log(regex.test('hello'))

// var regex = /\d{2,5}?/g;
// var string = "123 1234 12345 123456";
// console.log(string.match(regex));

// var regex = /^(0?[0-9]|1[0-9]|[2][0-3]):(0?[0-9]|[1-5][0-9])$/;
// console.log(regex.test("23:59"));
// console.log(regex.test("02:04"));
// console.log(regex.test("7:9"));

// var regex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[0-9]|[12][0-9]|3[01])$/;
// console.log(regex.test("2020-06-14"))

// var regex = /^[a-zA-Z]:\\([^\\:*<>|"?\r\n/]+\\)*([^\\:*<>|"?\r\n/]+)?$/;
// console.log(regex.test("F:\\study\\javascript\\regex\\regular expression.pdf"));
// console.log(regex.test("F:\\study\\javascript\\regex\\"));
// console.log(regex.test("F:\\study\\javascript"));
// console.log(regex.test("F:\\"));

var regex = /id=".*?"/;
var string = '<div id="container" class="main"></div>';
console.log(string.match(regex)[0]);