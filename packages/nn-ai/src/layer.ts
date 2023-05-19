import { INeuronFunction } from "./types";
import { Neuron } from "./neuron";

export class Layer {
  private neurons: Neuron[] = [];

  constructor(neuralFunction?: INeuronFunction, unit: number = 0) {
    for (let i = 0; i < unit; i++) {
      this.neurons.push(new Neuron(neuralFunction));
    }
  }

  addNeuron(neuralFunction?: INeuronFunction) {
    this.neurons.push(new Neuron(neuralFunction));
  }

  connectLayer(layer: Layer) {
    for (let myNeuron of this.neurons) {
      for (let lastNeuron of layer.getNeurons()) {
        myNeuron.connect(lastNeuron);
      }
    }
  }

  getNeurons() {
    return this.neurons;
  }

  length() {
    return this.neurons.length;
  }

  setActivation(activation: INeuronFunction) {
    this.neurons.forEach((neuron) => {
      neuron.setActivation(activation);
    });
  }
}
