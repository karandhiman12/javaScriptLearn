//async and await in js

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

async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched Data:", data);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Example usage
const apiUrl = "https://jsonplaceholder.typicode.com/posts/1";
fetchData(apiUrl);
