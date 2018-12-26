var somePromise = new Promise((resolve, reject) => {
    setTimeout(() =>{
        // resolve('Its worked.');
        reject('Unable to connect');
    },2500)
});

// Way 1:
// somePromise.then((message)=> {
//     console.log('Message: ', message);
// }).catch(err => {
//     console.log("Something wrong: ", err);
// }) 

// Way 2: 
somePromise.then((message)=> {
    console.log('Message: ', message);
},(errMsg) => {
    console.log("Something wrong: ", errMsg);
});

var asyncAdd = (a, b) => {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if(typeof a === 'number' && typeof b === 'number') {
                resolve(a+b);
            }else{
                reject('Arguments must be number');
            }
        }, 1000);
    })
}

// asyncAdd(3,4)
// .then((result)=>{
//     console.log('Result: ', result);
//     return asyncAdd(result, '3');
// }, (errMsg)=>{
//     console.log('Failed because ', errMsg);
// })
// .then((result2)=>{
//     console.log('Result 2: ', result2);
// }, (errMsg) => {
//     console.log('Failed')
// })

asyncAdd(3,4)
.then((result)=>{
    console.log('Result: ', result);
    return asyncAdd(result, '3');
})
.then((result2)=>{
    console.log('Result 2: ', result2);
})
.catch((errMsg)=>{
    console.log('Failed because ', errMsg);
})