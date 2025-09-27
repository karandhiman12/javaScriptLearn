//spread operator in js
"use strict";

// Sample product database
const products = [
    { id: 1, name: "Laptop", price: 75000 },
    { id: 2, name: "Phone", price: 40000 },
    { id: 3, name: "Headphones", price: 5000 },
    { id: 4, name: "Smart Watch", price: 12000 }
];

// Function to find a product by ID
function findProduct(id) {
    return products.find(product => product.id === id) || null;
}

// Creating user accounts using the spread operator
const user1 = { id: 101, name: "Karan", location: "Gujarat" };
const user2 = { id: 102, name: "Satyam", location: "Delhi" };

const users = [user1, user2];

// Order processing system
const orders = [];

function placeOrder(userId, productIds) {
    const user = users.find(user => user.id === userId);

    if (!user) {
        console.log("User not found!");
        return;
    }

    // Retrieve products
    const orderedProducts = productIds.map(id => findProduct(id)).filter(prod => prod !== null);

    if (orderedProducts.length === 0) {
        console.log("No valid products found for the given IDs.");
        return;
    }

    // Calculate total price
    const totalPrice = orderedProducts.reduce((sum, prod) => sum + prod.price, 0);

    // Create order object using spread operator
    const order = {
        orderId: `ORD-${Date.now()}`,
        user: { ...user }, // Cloning user data
        products: [...orderedProducts], // Cloning products array
        totalAmount: totalPrice,
        date: new Date().toLocaleString()
    };

    orders.push(order);
    console.log("Order placed successfully!", order);
}

// Place orders
placeOrder(101, [1, 3]);
placeOrder(102, [2, 4]);

// Display all orders
console.log("All Orders:", orders);
