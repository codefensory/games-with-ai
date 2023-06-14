import { neuralNetwork } from "./NeuralNetwork";

function getNextPositionTable(currentTable: number[]) {
  const player = currentTable[0];

  const table = currentTable.slice(1, 10);

  const allowMovements = table.reduce((acc, curr, pos) => {
    if (curr === 0) {
      return [...acc, pos];
    }

    return acc;
  }, []);

  if (allowMovements.length === 0) {
    return currentTable;
  }

  const nextIndexMovement = Math.round(
    Math.random() * (allowMovements.length - 1)
  );

  table[allowMovements[nextIndexMovement]] = player === 1 ? 1 : 2;

  return table;
}

export const useNeuralNetwork = (props: {
  callback: (params: { step: number; loss: number }) => void;
}) => {
  const learn = async (currentTable: number[]) => {
    const targetTable = getNextPositionTable(currentTable);

    console.log("target:", targetTable);

    await neuralNetwork.train(
      {
        trainData: [{ input: currentTable, target: targetTable }],
        maxSteps: 2,
      },
      props.callback
    );
  };

  const play = (currentTable: number[]) => {
    return neuralNetwork.execute(currentTable);
  };

  return {
    learn,
    play,
  };
};
