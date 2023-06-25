import { useRef, useState } from "react";

const TABLE_W = 5;
const TABLE_H = 5;

const GAME_TABLE = [
  1, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0, 2,
];

function getRecompense(value: number) {
  if (value === 0) {
    return -1;
  }

  if (value === 2) {
    return 100;
  }

  return -100;
}

export const useMazeController = () => {
  const [table, setTable] = useState(GAME_TABLE);

  const pos = useRef(table.findIndex((value) => value === 1));

  const move = (dir: number) => {
    let x = pos.current % TABLE_W;

    let y = Math.floor(pos.current / TABLE_H);

    switch (dir) {
      case 0:
        y--;
        break;
      case 1:
        x++;
        break;
      case 2:
        y++;
        break;
      case 3:
        x--;
        break;

      default:
        return;
    }

    if (x < 0 || x >= TABLE_W || y < 0 || y >= TABLE_H) {
      return;
    }

    const newPos = y * TABLE_H + x;

    const newTable = [...table];

    const newPosValue = newTable[newPos];

    if (newPosValue === -1) {
      return;
    }

    newTable[pos.current] = 0;

    newTable[newPos] = 1;

    setTable(newTable);

    pos.current = newPos;

    return { r: getRecompense(newPosValue), ns: newTable };
  };

  const reset = () => {
    setTable(GAME_TABLE);

    pos.current = 0;

    return GAME_TABLE;
  };

  return {
    move,
    table,
    reset,
  };
};
