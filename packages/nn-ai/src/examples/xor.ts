import { NeuralNetwork } from "..";

async function main() {
  const neuralNetwork = new NeuralNetwork();

  neuralNetwork.addInputs(2);

  neuralNetwork.addHiddenLayer({ units: 2, activation: "lrelu" });

  neuralNetwork.addOutputs({ units: 1, activation: "relu" });

  neuralNetwork.prepare({
    learningRate: 0.03,
    loss: "ecm",
    initialize: "he",
  });

  const trainData = [
    {
      input: [0, 0],
      target: [0],
    },
    {
      input: [0, 1],
      target: [1],
    },
    {
      input: [1, 0],
      target: [1],
    },
    {
      input: [1, 1],
      target: [0],
    },
  ];

  async function trainAndPrint() {
    await neuralNetwork.train(
      { trainData, maxSteps: 1000 },
      ({ step, maxSteps, loss }) => {
        process.stdout.moveCursor(0, -3);
        process.stdout.cursorTo(0);
        process.stdout.clearScreenDown();
        process.stdout.write("step " + step + " / " + maxSteps + "\n");
        process.stdout.write("loss: " + loss + "\n");
      }
    );

    console.log("-----------------");

    let correct = true;

    for (let i = 0; i < trainData.length; i++) {
      const result = Math.round(neuralNetwork.execute(trainData[i].input)[0]);

      const target = trainData[i].target[0];

      if (result !== target) {
        correct = false;
      }

      console.log(`test ${i + 1} -- result ${result} -> ${target}`);
    }

    return correct;
  }

  while (true) {
    if (await trainAndPrint()) {
      break;
    }
  }
}

main();
