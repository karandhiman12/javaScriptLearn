const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("P1 has been resolved.");
    }, 2000);
});

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("P2 has been resolved.");
    }, 5000);
});

async function handleAsync() {
    console.log("First in the function");

    const h1 = await p2;
    console.log("Hello world 2");
    console.log(h1);

    const h2 = await p2;
    console.log("Hello world 1");
    console.log(h2);
}

console.log("WTF");
handleAsync();



