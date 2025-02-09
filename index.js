var varCount = 0;
let letCount = 0;

console.log("Initial - var : %d, let: %d", varCount, letCount);

for (var varCount = 1; varCount < 2; varCount++) {
    for (let letCount = 1; letCount < 2; letCount++) {
        console.log("Inside - var : %d, let: %d", varCount, letCount);
    }
}

const h1El = document.querySelector('h1');
h1El.textContent= 'Result - var : ${varCount}, let: ${letCount}';
console.log('Final - var: %d, let: %d', varCount, letCount);