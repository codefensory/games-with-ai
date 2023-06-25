import { NeuralNetwork } from "nn-ai";

export const neuralNetwork = new NeuralNetwork();

if (typeof window !== "undefined") {
  console.log("prepare neuralNetwork");

  neuralNetwork.addInputs(25);

  neuralNetwork.addHiddenLayer({ units: 32, activation: "relu" });
  neuralNetwork.addHiddenLayer({ units: 32, activation: "relu" });

  neuralNetwork.addOutputs({ units: 4, activation: "constant" });

  neuralNetwork.prepare({
    learningRate: 0.03,
    loss: "ecm",
    initialize: "xavierglorot",
  });

  console.log("neuralNetwork prepared");
}
