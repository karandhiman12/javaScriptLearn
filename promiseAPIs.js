//Promises in JavaScript

const p1 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("P1 successful."), 3000);
});

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("P2 successful."), 2000);
});

const p3 = new Promise((resolve, reject) => {
    setTimeout(() => reject("P3 failed."), 4000);
});

// Promise.all - Resolves when all promises succeed
Promise.all([p1, p2, p3])
    .then((results) => {
        console.log("Promise.all results:", results);
    })
    .catch((error) => {
        console.error("Promise.all error:", error);
    });

// Promise.allSettled - Resolves when all promises have settled (fulfilled or rejected)
Promise.allSettled([p1, p2, p3])
    .then((results) => {
        console.log("Promise.allSettled results:", results);
    });

// Promise.any - Resolves as soon as the first promise fulfills
Promise.any([p1, p2, p3])
    .then((result) => {
        console.log("Promise.any result:", result);
    })
    .catch((error) => {
        console.error("Promise.any error:", error);
    });

// Promise.race - Resolves or rejects as soon as the first promise settles
Promise.race([p1, p2, p3])
    .then((result) => {
        console.log("Promise.race result:", result);
    })
    .catch((error) => {
        console.error("Promise.race error:", error);
    });
