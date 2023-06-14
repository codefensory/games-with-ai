import { useState } from "react";
import { useNeuralNetwork } from "../neuralNetwork";

function textToNumber(player: string) {
  return player === "X" ? 1 : 2;
}

function numberToText(value: number) {
  return value === 1 ? "X" : "O";
}

function normalizeTable(table: number[]) {
  return table.map((cell) => Math.round(cell));
}

function isCorrectMove(current: number[], next: number[]) {
  const player = current[0];

  const table = current.slice(1, 10);

  const posibleNextMove = table.reduce((acc, curr, pos) => {
    if (curr === 0) {
      return [...acc, pos];
    }

    return acc;
  }, []);

  if (posibleNextMove.length === 0) {
    return true;
  }

  const totalPlayerPos = table.reduce((acc, curr) => {
    if (curr === player) {
      return acc + curr;
    }

    return acc;
  }, 0);

  const totalNewPlayerPos = next.reduce((acc, curr) => {
    if (curr === player) {
      return acc + curr;
    }

    return acc;
  }, 0);

  console.log("correct: ", totalNewPlayerPos, totalPlayerPos);

  return totalNewPlayerPos === totalPlayerPos + 1;
}

export default function TicTacToeMainPage() {
  const { play, learn } = useNeuralNetwork({
    callback: ({ step, loss }) => {
      //console.log("step:", step, "loss:", loss);
    },
  });

  const [board, setBoard] = useState(Array(9).fill(0));

  const [currentPlayer, setCurrentPlayer] = useState(textToNumber("X"));

  const [winner, setWinner] = useState(null);

  const handleNextMove = async () => {
    const currentTable = [currentPlayer, ...board];

    console.log("currentTable:", currentTable);

    const realResult = play(currentTable);

    const resultPlay = normalizeTable(realResult);

    console.log("realResult:", [...realResult]);

    console.log("result:", [...resultPlay]);

    const isCorrect = isCorrectMove(currentTable, resultPlay);

    if (!isCorrect) {
      await learn(currentTable);

      return;
    }

    setCurrentPlayer(
      currentPlayer === textToNumber("X")
        ? textToNumber("O")
        : textToNumber("X")
    );

    setBoard(resultPlay);
  };

  const handleClick = (index) => {
    if (board[index] === 0 && !winner) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      checkWinner(newBoard);
      setCurrentPlayer(
        currentPlayer === textToNumber("X")
          ? textToNumber("O")
          : textToNumber("X")
      );
    }
  };

  const checkWinner = (board) => {
    // Código de verificación de ganador
  };

  const resetGame = () => {
    setBoard(Array(9).fill(0));
    setCurrentPlayer(textToNumber("X"));
    setWinner(null);
  };

  return (
    <div className="tic-tac-toe">
      <h1 className="title">Tic Tac Toe IA vs IA</h1>
      <div className="game">
        <div className="board">
          {board.map((cell, index) => (
            <div
              key={index}
              className={`cell ${numberToText(cell)}`}
              onClick={() => handleClick(index)}
            >
              {cell === textToNumber("X") && (
                <svg className="icon" viewBox="0 0 100 100">
                  <line className="line" x1="20" y1="20" x2="80" y2="80" />
                  <line className="line" x1="80" y1="20" x2="20" y2="80" />
                </svg>
              )}
              {cell === textToNumber("O") && (
                <svg className="icon" viewBox="0 0 100 100">
                  <circle className="circle" cx="50" cy="50" r="35" />
                </svg>
              )}
            </div>
          ))}
        </div>
        <div className="player-turn">
          <p>Turno del jugador:</p>
          <div className={`current-player ${numberToText(currentPlayer)}`}>
            {numberToText(currentPlayer)}
          </div>
        </div>
      </div>

      <div className="winner-message">
        <button onClick={handleNextMove}>Next move</button>
        <button onClick={resetGame}>Reiniciar</button>
      </div>

      {winner && (
        <div className="winner-message">
          <p>{`¡El jugador ${winner} ha ganado!`}</p>
          <button onClick={resetGame}>Reiniciar</button>
        </div>
      )}
    </div>
  );
}
