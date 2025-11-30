//scope of var, let and const in JavaScript

let a = 10;
var b = 11;
const c = 12;
{
	let a = 110;
	var b = 130;
	const c = 140;

	console.log(a);
	console.log(b);
	console.log(c);
}

console.log(a);
console.log(b);
console.log(c);