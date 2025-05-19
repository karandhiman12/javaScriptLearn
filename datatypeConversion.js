// Declaring variables with different types of values
let val = 34;           // Number
let str = "34";         // String representing a number
let rtm = "34DF";       // String with non-numeric characters
let flag = 1;           // Number used for boolean conversion

// Type conversions
let val2 = String(val);  // Converts number to string
let str2 = Number(str);  // Converts string to number (works if string is numeric)
let rtm2 = Number(rtm);  // Tries to convert a non-pure numeric string to number (will be NaN)
let flag2 = Boolean(flag); // Converts number to boolean (non-zero is true)

// Additional conversions for better understanding
let zeroFlag = Boolean(0);   // Will be false since 0 is falsy
let emptyString = Boolean(""); // Will be false since empty string is falsy
let nonEmptyString = Boolean("hello"); // Will be true since non-empty strings are truthy

let boolStr = Boolean("false"); // Attention: Non-empty strings are always true, even "false"

console.log(typeof(val2), val2);  // Expected output: string "34"
console.log(typeof(str2), str2);  // Expected output: number 34
console.log(typeof(rtm2), rtm2);  // Expected output: number NaN (invalid conversion)
console.log(typeof(flag2), flag2);// Expected output: boolean true

console.log(typeof(zeroFlag), zeroFlag); // Expected output: boolean false
console.log(typeof(emptyString), emptyString); // Expected output: boolean false
console.log(typeof(nonEmptyString), nonEmptyString); // Expected output: boolean true
console.log(typeof(boolStr), boolStr); // Expected output: boolean true (even though it's the word "false")

