let arr = [1,2,3,4,5,6,7,8,9,10];

let arr2 = arr.reduce(function(acc, curr){
    acc += curr;
    return acc;
})

console.log(arr2);

const users = [
    {firstNAme: "Karan", lastName:"Dhiman", age:23},
    {firstNAme: "Raman", lastName:"Sharma", age:24},
    {firstNAme: "Rohit", lastName:"Thakur", age:25}
];

const val = users.map((x) => x.firstNAme + " "+ x.lastName);

const val2 = users.filter((x) => x.age > 20).map((x) => x.firstNAme + " "+ x.lastName);

const val3 = users.reduce(function(acc, curr) {
    if(curr.age === 23)
        acc.push(curr.firstNAme);
    return acc;
}, []);

console.log(val);
console.log(val2);
console.log(val3);