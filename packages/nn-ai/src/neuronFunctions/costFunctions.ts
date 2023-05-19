import { INeuronFunction } from "../types";
import { CostProps } from "./types";

const ecm: INeuronFunction<CostProps> = {
  execute: ({ yPred, yTarg }) => {
    return 0.5 * Math.pow(yTarg - yPred, 2);
  },
  derivative: ({ yPred, yTarg }) => {
    return yPred - yTarg;
  },
};

const binaryCrossentropy: INeuronFunction<CostProps> = {
  execute: ({ yPred, yTarg }) => {
    const epsilon = 1e-7;

    const clippedPreds = yPred < 0 ? (yPred + 1) / 2 : yPred;

    return -(
      yTarg * Math.log(clippedPreds + epsilon) +
      (1 - yTarg) * Math.log(1 - clippedPreds + epsilon)
    );
  },
  derivative: ({ yPred, yTarg }) => {
    const epsilon = 1e-7;

    const clippedPreds = yPred < 0 ? (yPred + 1) / 2 : yPred;

    return -(
      yTarg / (clippedPreds + epsilon) -
      (1 - yTarg) / (1 - (clippedPreds + epsilon))
    );
  },
};

export const costFunctions = {
  ecm,
  binaryCrossentropy,
};

export type CostFunctionsKeys = keyof typeof costFunctions;
