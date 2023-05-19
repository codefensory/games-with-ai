import { InitializeFunctionsKeys } from "./neuronFunctions";

export type INeuronFunction<T = number> = {
  execute: (value: T) => number;
  derivative: (value: T) => number;
};

export type InitializeValues = {
  nIn: number;
  nOut: number;
  mode: InitializeFunctionsKeys;
};

export type IInitializeFunction = {
  weight: (initConfig: InitializeValues) => number;
  bias: (initConfig: InitializeValues) => number;
};

export type TrainConfig = {
  learnRate: number;
};
