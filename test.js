import {isFibonacci, isPrime, isSquare, test} from "./utils.js";


function* run2() {
    const divisorMax = getValue('divisorMax', 10);
    const trainingSize = getValue('trainingSize',300);
    const testSize = getValue('testSize',50);
    const trainingCycles = getValue('trainingCycles',200);

    console.log(`Training Size: ${trainingSize}, TestSize: ${testSize}, Training Cycles: ${trainingCycles}`);

    for (let divisor=2; divisor<=divisorMax; divisor++) {
        const success = test(trainingSize, testSize, trainingCycles, (number) => (number%divisor===0?1:0));
        yield `Finding multiples of ${divisor}: Success ${success}% of the time.`;
    }

    let success = test(trainingSize, trainingSize, trainingCycles,(number) => isPrime(number));
    yield `Finding Prime: Success ${success}% of the time.`;

    success = test(trainingSize, trainingSize, trainingCycles,(number) => isSquare(number));
    yield `Finding Square: Success ${success}% of the time.`;

    success = test(trainingSize, trainingSize, trainingCycles,(number) => isFibonacci(number));
    yield `Finding Fibonacci: Success ${success}% of the time.`;

}

async function run() {

    const divisorMax = getValue('divisorMax', 10);
    const trainingSize = getValue('trainingSize',300);
    const testSize = getValue('testSize',50);
    const trainingCycles = getValue('trainingCycles',200);

    console.log(`Training Size: ${trainingSize}, TestSize: ${testSize}, Training Cycles: ${trainingCycles}`);

    return Promise.all([new Promise((resolve, reject) => {
        for (let divisor=2; divisor<=divisorMax; divisor++) {
            const success = test(trainingSize, testSize, trainingCycles, (number) => (number%divisor===0?1:0));
            console.log(`Finding multiples of ${divisor}: Success ${success}% of the time.`);
            resolve();
        }
    }),new Promise((resolve, reject) => {
        let success = test(trainingSize, trainingSize, trainingCycles,(number) => isPrime(number));
        console.log(`Finding Prime: Success ${success}% of the time.`);
        resolve();
    }), new Promise((resolve, reject) => {
        const success = test(trainingSize, trainingSize, trainingCycles,(number) => isSquare(number));
        console.log(`Finding Square: Success ${success}% of the time.`);
        resolve();
    }), new Promise((resolve, reject) => {
        const success = test(trainingSize, trainingSize, trainingCycles,(number) => isFibonacci(number));
        console.log(`Finding Fibonacci: Success ${success}% of the time.`);
        resolve();
    })]);
}

function clear() {
    const div = document.getElementById('results');
    let ul = div.getElementsByTagName('ul')[0];
    div.removeChild(ul);
    ul = document.createElement('ul');
    div.appendChild(ul);
}

function getValue(elementId, defaultValue) {
    const el = document.getElementById(elementId);
    if (el === null) return defaultValue;
    const value = el.value;
    return (value === undefined || value === null ? defaultValue : parseInt(value));
}

export {run, clear, run2};