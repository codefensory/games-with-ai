import { NeuralNetwork } from "nn-ai";

export const neuralNetwork = new NeuralNetwork();

if (typeof window !== "undefined") {
  console.log("prepare neuralNetwork");

  neuralNetwork.addInputs(10);

  neuralNetwork.addHiddenLayer({ units: 8, activation: "sigmoide" });
  neuralNetwork.addHiddenLayer({ units: 8, activation: "tanh" });

  neuralNetwork.addOutputs({ units: 9, activation: "tanh" });

  neuralNetwork.prepare({ learningRate: 0.03, loss: "ecm", initialize: "he" });

  console.log("neuralNetwork prepared");
}
