import {test, isPrime, isSquare, isFibonacci} from "./utils.js";

const divisorMax = 3;
const trainingSize = 300;
const testSize = 50;
const trainingCycles = 200;

console.log(`Training Size: ${trainingSize}, TestSize: ${testSize}, Training Cycles: ${trainingCycles}`);

for (let divisor=2; divisor<=divisorMax; divisor++) {
    const success = test(trainingSize, testSize, trainingCycles, (number) => (number%divisor===0?1:0));
    console.log(`Finding multiples of ${divisor}: Success ${success}% of the time.`);
}

let success = test(trainingSize, trainingSize, trainingCycles,(number) => isPrime(number));
console.log(`Finding Prime: Success ${success}% of the time.`);

success = test(trainingSize, trainingSize, trainingCycles,(number) => isSquare(number));
console.log(`Finding Square: Success ${success}% of the time.`);

success = test(trainingSize, trainingSize, trainingCycles,(number) => isFibonacci(number));
console.log(`Finding Fibonacci: Success ${success}% of the time.`);
