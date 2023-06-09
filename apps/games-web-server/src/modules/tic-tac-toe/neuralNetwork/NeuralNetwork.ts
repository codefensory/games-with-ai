import { NeuralNetwork } from "nn-ai";

export const neuralNetwork = new NeuralNetwork();

if (typeof window !== "undefined") {
  console.log("prepare neuralNetwork");

  neuralNetwork.addInputs(10);

  neuralNetwork.addHiddenLayer({ units: 8, activation: "lrelu" });
  neuralNetwork.addHiddenLayer({ units: 8, activation: "relu" });

  neuralNetwork.addOutputs({ units: 9, activation: "relu" });

  neuralNetwork.prepare({
    learningRate: 0.03,
    loss: "ecm",
    initialize: "xavierglorot",
  });

  console.log("neuralNetwork prepared");
}
