class NeuralNet {
    constructor(trainingData, cycles) {
        this.weights = [];
        // if constructed with training data, train straight away.
        if (trainingData !== undefined) {
            this.train(trainingData, (cycles === undefined ? 200 : cycles));
        }
    }

    train(trainingData, trainingCycles) {
        // generate random weights to start with
        let weights = Array.from({length: trainingData.output.length}, () => Math.random()*2);
        // loop through the requested number of training cycles
        for (let i=1; i<=trainingCycles; i++) {
            // for each item of input training data
            trainingData.input.forEach((input, a) => {
                // calculate the output using current weights
                let output = calculateOutput(input, weights);
                // adjust each of the weights.
                weights = weights.map((weight,w) => weight + calculateDerivative(input[w], output, trainingData.output[a]));
            });
            //if (i%100 === 0) console.log(i + " cycles completed.");
        }
        // remember the weights
        this.weights = weights;
    }

    calculate(inputs) {
        return Math.round(calculateOutput(inputs, this.weights));
    }
}

function sigmoidFunction(x) {
    return 1/(1+Math.pow(Math.E, -x));
}

function sigmoidFunctionDerivative(x) {
    return sigmoidFunction(x) * (1 - sigmoidFunction(x));
}

function calculateOutput(inputs, weights) {
    let output = inputs.map((input,i) => input * weights[i]).reduce((a,v) => a+v, 0);
    return sigmoidFunction(output);
}

function calculateDerivative(input, output, expectedOutput) {
    return input * (expectedOutput - output) * sigmoidFunctionDerivative(output);
}

export {NeuralNet}