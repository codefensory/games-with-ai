import { INeuronFunction } from "../types";

const relu: INeuronFunction = {
  execute: (x) => {
    return Math.max(0, x);
  },
  derivative: (x) => {
    return x > 0 ? 1 : 0;
  },
};

const lrelu: INeuronFunction = {
  execute: (x) => {
    return x > 0 ? x : 0.01 * x;
  },
  derivative: (x) => {
    return x > 0 ? 1 : 0.01;
  },
};

const constant: INeuronFunction = {
  execute: (x) => {
    return x;
  },
  derivative: () => {
    return 1;
  },
};

const sigmoide: INeuronFunction = {
  execute: (x) => {
    return 1 / (1 + Math.exp(-x));
  },
  derivative: (x) => {
    return sigmoide.execute(x) * (1 - sigmoide.execute(x));
  },
};

const heaviside: INeuronFunction = {
  execute: (x) => {
    return x < 0 ? 0 : 1;
  },
  derivative: (x) => {
    return x > 0 ? 1 : 0;
  },
};

const tanh: INeuronFunction = {
  execute: (x) => {
    return Math.tanh(x);
  },
  derivative: (x) => {
    return 1 - Math.pow(Math.tanh(x), 2);
  },
};

export const activationFunctions = {
  relu,
  lrelu,
  constant,
  sigmoide,
  heaviside,
  tanh,
};

export type ActivationFunctionsKeys = keyof typeof activationFunctions;
