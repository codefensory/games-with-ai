import { addComponent, addEntity, createWorld } from "bitecs";
import { useEffect, useState } from "react";
import { GridElement, Position, RectRenderer } from "../gameLogic/components";
import { Level1 } from "../gameLogic/scenes";
import { useMazeController, usePixijs } from "../hooks";
import { useNeuralNetwork } from "../neuralNetwork";

export default function MazePage() {
  const pixi = usePixijs({
    width: 400,
    height: 400,
    backgroundAlpha: 0,
  });

  useEffect(() => {
    if (!pixi.app.current) {
      return;
    }

    const world = createWorld();

    const level = new Level1(world, pixi.app.current);

    level.prepare();

    const handlerTicker = () => {
      level.update();
    };

    pixi.app.current.ticker.maxFPS = 10;

    pixi.app.current.ticker.add(handlerTicker);
  }, [pixi.app]);

  return (
    <div>
      <div className="container-maze">
        <div className="board-maze" ref={pixi.viewRef}></div>
        <span className="button-group">
          <button>play</button>
          <button>learn</button>
        </span>
      </div>
    </div>
  );
}
