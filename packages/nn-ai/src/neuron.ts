import { Connector } from "./connector";
import { INeuronFunction, InitializeValues } from "./types";
import { constantFunction } from "./neuronFunctions/utilsFunctions";
import { initializeFunctions } from "./neuronFunctions";

export class Neuron {
  private connectors: Connector[] = [];

  public z: number = 1;

  public y: number = 0;

  private b: number = Math.random() * 2 - 1;

  private learningRate: number = 0.03;

  constructor(public activationFunction: INeuronFunction = constantFunction) {}

  connect(neuron: Neuron) {
    this.connectors.push(new Connector(neuron));
  }

  initializeBiasAndWeights(initConfig: InitializeValues) {
    this.initializeBias(initConfig);

    for (let connector of this.connectors) {
      connector.initializeWeight(initConfig);
    }
  }

  private initializeBias(initConfig: InitializeValues) {
    this.b = initializeFunctions[initConfig.mode].bias(initConfig);

    console.log("new bias:", this.b);
  }

  execute() {
    if (this.connectors.length === 0) {
      return this.y;
    }

    this.z = this.calculate();

    this.y = this.activationFunction.execute(this.z);

    return this.y;
  }

  calculate() {
    return (
      this.connectors.reduce(
        (acc, connector) => connector.calculate() + acc,
        0
      ) + this.b
    );
  }

  refine(dcda: number) {
    if (this.connectors.length === 0) {
      return;
    }

    const dadz = this.activationFunction.derivative(this.z);

    for (let connector of this.connectors) {
      connector.backPropagation(dcda * dadz);
    }

    this.b = this.b - this.learningRate * (dcda * dadz);
  }

  setValue(value: number) {
    this.y = value;
  }

  setActivation(activation: INeuronFunction) {
    this.activationFunction = activation;
  }

  setLearningRate(learningRate: number) {
    this.learningRate = learningRate;

    for (let connector of this.connectors) {
      connector.setLearningRate(learningRate);
    }
  }
}
