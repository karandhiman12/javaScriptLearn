"use strict"; // Enables strict mode to prevent accidental errors

// "this" in global space
console.log(this); 
// In non-strict mode, "this" refers to the global object (window in browsers).
// In strict mode, "this" is undefined in the global context.

// "this" inside a function"
function abc() {
    console.log(this);
}
abc(); 
// In non-strict mode, "this" refers to the global object (window in browsers).
// In strict mode, "this" is undefined because functions in strict mode don't automatically bind "this" to the global object.

// "this" inside an object's method"
const name1 = {
    name: "Karan",
    printName: function() {
        console.log(this.name); // "this" refers to the object `name1`
    }
};

name1.printName(); // Outputs "Karan" because "this" refers to `name1`

const name2 = {
    name: "Satyam"
};

// Using the `call` method to override "this" context of `name1` with `name2`
name1.printName.call(name2); 
// Outputs "Satyam" because "this" now refers to `name2` instead of `name1`

// "this" inside an arrow function
const obj = {
    a: 567,
    x: () => {
        console.log(this);
    }
};

obj.x(); 
// Arrow functions do not have their own `this` binding.
// Instead, they inherit `this` from their surrounding lexical scope (global in this case).
