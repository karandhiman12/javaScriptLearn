const API_URL = "https://jsonplaceholder.typicode.com/todos/1";

async function handleAsync() {
    try {
        const data = await fetch(API_URL);
        const jsonValue = await data.json();
        console.log(jsonValue);
    }
    catch(err) {
        console.log("Error is: "+err);
    }
}

handleAsync();