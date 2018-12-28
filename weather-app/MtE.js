
const _ = require('lodash');
console.log(_.flatten([ [1,2,3], [4], [4,6] ]))
var aArray=[['zero', 'one'], ['two', 'three'], ['four', 'five']];
bArray = aArray.filter( (el, index) => {
    console.log(el, index)
     if(index !==1){
         return el;
     };
});
console.log(bArray)
var a = [['zero', 'one'], ['two', 'three'], ['four', 'five']];
// console.log(a.slice(0, 1));      // in ra  ['zero', 'one']
console.log(a)
console.log(a.slice(1, 2));    