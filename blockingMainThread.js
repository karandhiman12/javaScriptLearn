console.log("Start");

setTimeout(function cb() {
    console.log("Callback");//it will print after "End" because setTimeout does not ensure that it will only take 5 secs
}, 5000);//it is more like it will take atleast 5 secs

let startTime = new Date().getTime();
let endTime = startTime;

while(endTime < startTime + 10000) {//it will block main for 10 secs i.e. no code will be executed for 10 secs
    endTime = new Date().getTime();
}

console.log("End");