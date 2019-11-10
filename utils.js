import {NeuralNet} from "./neural-net.js";

function test(trainingSize, testSize, trainingCycles, outputRule) {

    //console.log(`Training Size: ${trainingSize}, TestSize: ${testSize}, Training Cycles: ${trainingCycles}`);

    const numberOfInputs = (trainingSize).toString(2).length;

    let trainingData = {input: [], output: []};
    for (let i=0; i<trainingSize; i++) {
        trainingData.input.push((i).toString(2).padStart(numberOfInputs,"0").split(''));
        trainingData.output.push(outputRule(i));
    }

    let testData = [];
    for (let i=trainingSize; i<(trainingSize+testSize); i++) {
        testData.push({
            input: (i).toString(2).padStart(numberOfInputs,"0").split(''),
            output: outputRule(i)
        });
    }

    let neuralNet = new NeuralNet(trainingData, 200);

    let successCount = 0;

    testData.forEach((test) => {
        let output = neuralNet.calculate(test.input);
        if (output === test.output) successCount++;
    });

    const percentageSuccess =  (successCount/testData.length*100).toFixed(2);

    return percentageSuccess;
}

function range(start,end) {
    let length = (end - start + 1);
    return Array.from({ length }, (_, i) => start + i);
}

function isPrime(number){
    if (number==2 || number==3) {
        return true
    }
    if(number<2 ||number % 2===0){
        return false
    }
    else{
        for (let index = 3; index <= Math.sqrt(number); index=index+2) {
            if (number%index===0) {
                return false
            }
        }
    }
    return true
}

function isSquare(number) {
    return number > 0 && Math.sqrt(number) % 1 === 0;
}

function isFibonacci(number) {
    if (isSquare(5*(number*number)-4) || isSquare(5*(number*number)+4)) {
        return true;
    } else { return false; }
}

export {test, isPrime, isSquare, isFibonacci}