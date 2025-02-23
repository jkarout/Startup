function doMath(operation, a, b) {
    return operation(a, b);
}


function add(a , b) {
    return a + b;
}

console.log(doMath(add, 5, 3)); 