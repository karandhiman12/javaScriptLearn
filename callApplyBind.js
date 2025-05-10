// Creating an object "name1" with first and last name properties
const name1 = {
    firstName: "Karan",
    lastName: "Dhiman",
};

// Defining a function "printName" that prints the full name along with hometown and state
let printName = function(hometown, state) {
    console.log(this.firstName + " " + this.lastName + " from " + hometown + ", " + state);
};

// Using the "call" method to invoke the function with "name1" as the "this" context
//printName.call(name1, "Chandigarh", "Chandigarh"); // Uncomment to see this in action

// Creating another object "name2" with first and last name properties
const name2 = {
    firstName: "Keshav",
    lastName: "Sharma",
};

// Using the "call" method to invoke "printName" with "name2" as the "this" context
printName.call(name2, "Mohali", "Punjab"); // Arguments passed individually

// Using the "apply" method to invoke "printName" with "name2" as the "this" context
// The key difference is that arguments are passed as an array
printName.apply(name2, ["Ambala", "Haryana"]);

// Using the "bind" method to create a new function with "name2" as the "this" context
// Unlike "call" and "apply", "bind" does not invoke the function immediately
const boundPrintName = printName.bind(name2, "Una", "Himachal"); 

// Calling the bound function explicitly
boundPrintName();
