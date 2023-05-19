import { INeuronFunction } from "../types";

export const constantFunction: INeuronFunction = {
  execute: (value) => {
    return value;
  },
  derivative: () => {
    return 1;
  },
};
