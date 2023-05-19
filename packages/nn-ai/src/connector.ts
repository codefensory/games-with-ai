import { Neuron } from "./neuron";
import { initializeFunctions } from "./neuronFunctions";
import { constantFunction } from "./neuronFunctions/utilsFunctions";
import { InitializeValues } from "./types";

export class Connector {
  public calculateFunction = constantFunction;

  private w: number = Math.random() * 2 - 1;

  private learningRate: number = 0.03;

  constructor(public connectedNeuron: Neuron) {}

  calculate() {
    return this.calculateFunction.execute(this.connectedNeuron.y * this.w);
  }

  setLearningRate(learningRate: number) {
    this.learningRate = learningRate;
  }

  initializeWeight(initConfig: InitializeValues) {
    this.w = initializeFunctions[initConfig.mode].weight(initConfig);

    console.log("new weight:", this.w);
  }

  backPropagation(dcdz: number) {
    const dzda = this.w;

    this.connectedNeuron.refine(dcdz * dzda);

    this.adjustGradiendW(dcdz);
  }

  private adjustGradiendW(dcdz: number) {
    const dzdw = this.connectedNeuron.y;

    this.w = this.w - this.learningRate * (dcdz * dzdw);
  }
}
