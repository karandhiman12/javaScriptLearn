// Creating an object
const user = {
    firstName: "Karan",
    lastName: "Dhiman",
    age: 25,
    country: "India"
};

// Object destructuring to extract properties into variables
const { firstName, lastName, age, country } = user;

// Now, these variables hold the extracted values
console.log(firstName); // "Karan"
console.log(lastName);  // "Dhiman"
console.log(age);       // 25
console.log(country);   // "India"
