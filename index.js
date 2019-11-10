import {isFibonacci, isPrime, isSquare, test} from "./utils.js";

const origLog = console.log;
console.log = (message) => {
    const div = document.getElementById('results');
    const ul = div.getElementsByTagName('ul')[0];
    const li = document.createElement('li');
    li.textContent = message;
    ul.appendChild(li);
    origLog(message);
};

window.onload = () => {
    document.getElementById('run').addEventListener('click', () => {
        // worker.postMessage({message: 'HI THERE'})
        clear();
        let counter = 0;
        let message = undefined;
        let generator = run();
        const runTest = () => {
            if (message !== undefined) console.log(message);
            counter++;
            setTimeout(() => {
                let result = generator.next();
                message = result.value;
                if (!result.done && counter < 1000) runTest();
            }, 100);
        };
        runTest();
    });
};

function* run() {
    const divisorMax = getValue('divisorMax', 10);
    const trainingSize = getValue('trainingSize',300);
    const testSize = getValue('testSize',50);
    const trainingCycles = getValue('trainingCycles',200);

    yield `Training Size: ${trainingSize}, TestSize: ${testSize}, Training Cycles: ${trainingCycles}`;

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