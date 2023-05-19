import { IInitializeFunction } from "../types";
import { randomUniform } from "../utils";

const xavierglorot: IInitializeFunction = {
  weight: (initConfig) => {
    const limit = Math.sqrt(6 / (initConfig.nIn + initConfig.nOut));

    return randomUniform(-limit, limit);
  },
  bias: (initConfig) => {
    const limit = Math.sqrt(1 / initConfig.nIn);

    return randomUniform(-limit, limit);
  },
};

const he: IInitializeFunction = {
  weight: (initConfig) => {
    const limit = Math.sqrt(2 / initConfig.nIn);

    return randomUniform(0, limit);
  },
  bias: () => {
    return randomUniform(0, 0.1);
  },
};

const uniform: IInitializeFunction = {
  weight: () => {
    return randomUniform(-1, 1);
  },
  bias: () => {
    return randomUniform(-1, 1);
  },
};

const normal: IInitializeFunction = {
  weight: () => {
    return randomUniform(0.1, 1);
  },
  bias: () => {
    return randomUniform(0.1, 1);
  },
};

export const initializeFunctions = {
  xavierglorot,
  he,
  uniform,
  normal,
};

export type InitializeFunctionsKeys = keyof typeof initializeFunctions;
