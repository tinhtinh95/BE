console.log('Starting app');

setTimeout(()=> {
    console.log('Second of callback');
}, 2000);

setTimeout(()=> {
    console.log('Inside of callback');
}, 0);

var sum = (a, b) => {
    return a+ b;
}

console.log(sum(2,3));

console.log('Finishing up');