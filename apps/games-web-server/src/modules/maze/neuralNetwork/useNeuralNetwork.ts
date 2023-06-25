import { neuralNetwork } from "./NeuralNetwork";

export const useNeuralNetwork = (props?: {
  callback?: (params: { step: number; loss: number }) => void;
}) => {
  const learn = (input: number[], target: number[]) => {
    return neuralNetwork.train({ trainData: [{ input, target }], maxSteps: 1 });
  };

  const execute = (currentTable: number[]) => {
    return neuralNetwork.execute(currentTable);
  };

  return {
    learn,
    execute,
  };
};
