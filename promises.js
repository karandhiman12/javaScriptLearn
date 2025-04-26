let API = "https://jsonplaceholder.typicode.com/todos";

let result = fetch(API);

result.then(function(){
    console.log(result);
})
