import {
  activationFunctions,
  ActivationFunctionsKeys,
  costFunctions,
  CostFunctionsKeys,
  initializeFunctions,
  InitializeFunctionsKeys,
} from "./neuronFunctions";
import { Layer } from "./layer";

type TrainData = {
  input: number[];
  target: number[];
};

type AddLayerConfig = {
  units: number;
  activation: ActivationFunctionsKeys;
};

export class NeuralNetwork {
  private inputsLayer: Layer = new Layer();

  private hiddenLayer: Layer[] = [];

  private outputLayer: Layer = new Layer();

  private loss: CostFunctionsKeys = "ecm";

  addInputs(units: number) {
    for (let i = 0; i < units; i++) {
      this.inputsLayer.addNeuron();
    }
  }

  addHiddenLayer(config: AddLayerConfig) {
    const newLayer = new Layer(
      activationFunctions[config.activation],
      config.units
    );

    const lastLayer =
      this.hiddenLayer[this.hiddenLayer.length - 1] || this.inputsLayer;

    newLayer.connectLayer(lastLayer);

    this.hiddenLayer.push(newLayer);
  }

  addOutputs(config: AddLayerConfig) {
    if (this.outputLayer.getNeurons().length > 0) {
      return;
    }

    for (let i = 0; i < config.units; i++) {
      this.outputLayer.addNeuron(activationFunctions[config.activation]);
    }

    const lastLayer =
      this.hiddenLayer.length > 0
        ? this.hiddenLayer[this.hiddenLayer.length - 1]
        : this.inputsLayer;

    this.outputLayer.connectLayer(lastLayer);
  }

  prepare(options: {
    learningRate: number;
    loss: CostFunctionsKeys;
    initialize?: InitializeFunctionsKeys;
  }) {
    this.hiddenLayer.forEach((layer, index) => {
      const nIn =
        index - 1 < 0
          ? this.inputsLayer.length()
          : this.hiddenLayer[index - 1].length();

      const nOut =
        index + 1 >= this.hiddenLayer.length
          ? this.outputLayer.length()
          : this.hiddenLayer[index + 1].length();

      layer.getNeurons().forEach((neuron) => {
        neuron.setLearningRate(options.learningRate);

        neuron.initializeBiasAndWeights({
          nIn,
          nOut,
          mode: options.initialize ?? "normal",
        });
      });
    });

    const nIn = (
      this.hiddenLayer[this.hiddenLayer.length - 1] || this.inputsLayer
    ).length();

    this.outputLayer.getNeurons().forEach((neuron) => {
      neuron.setValue(options.learningRate);

      console.log("output, nIn:", nIn);

      neuron.initializeBiasAndWeights({
        nIn,
        nOut: 0,
        mode: options.initialize ?? "normal",
      });
    });

    this.loss = options.loss;
  }

  execute(inputs: number[]) {
    this.inputsLayer.getNeurons().forEach((neuron, i) => {
      neuron.setValue(inputs[i]);
    });

    this.hiddenLayer.forEach((layer) => {
      layer.getNeurons().forEach((neuron) => {
        neuron.execute();
      });
    });

    const outputResult = this.outputLayer
      .getNeurons()
      .map((neuron) => neuron.execute());

    return outputResult;
  }

  async train(
    options: { trainData: TrainData[]; maxSteps: number },
    processCallback?: (values: {
      step: number;
      maxSteps: number;
      loss: number;
    }) => void
  ) {
    const lossFunction = costFunctions[this.loss];

    const maxSteps = options.maxSteps ?? 1000;

    const trainData = options.trainData;

    let step = 0;

    let currentLoss = Number.MAX_VALUE;

    while (step <= maxSteps) {
      const allLoss = [];

      for (let i = 0; i < trainData.length; i++) {
        const data =
          trainData[Math.round(Math.random() * (trainData.length - 1))];

        const outputsResult = this.execute(data.input);

        const outputNeurons = this.outputLayer.getNeurons();

        const neuronLoss = [];

        for (let j = 0; j < outputsResult.length; j++) {
          const neuron = outputNeurons[j];

          const yPred = neuron.y,
            yTarg = data.target[j];

          neuronLoss[j] = lossFunction.execute({ yPred, yTarg });

          const dcda = lossFunction.derivative({ yPred, yTarg });

          neuron.refine(dcda);
        }

        allLoss[i] =
          neuronLoss.reduce((acc, loss) => acc + loss, 0) / neuronLoss.length;
      }

      currentLoss =
        allLoss.reduce((acc, loss) => acc + loss, 0) / allLoss.length;

      processCallback?.({ step, maxSteps, loss: currentLoss });

      step++;
    }
  }
}
