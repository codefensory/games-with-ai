import { Container, Graphics } from "pixi.js";
import { ISystem } from "~/utils/ecs";
import { MazeWorld } from "../../types/ecs";

export class GridSystem implements ISystem {
  private gridEids: number[] = [];

  private colors = {
    "-1": 0x222222,
    "0": 0xffffff,
    "1": 0x4444ff,
    "2": 0xff1133,
  };

  onCreate(world: MazeWorld) {
    const graphics = new Graphics();

    for (let y = 0; y < world.state.grid.length; y++) {
      const colsValue = world.state.grid[y];

      for (let x = 0; x < colsValue.length; x++) {
        graphics.lineStyle(1, 0x0, 1);
        graphics.beginFill(this.colors[colsValue[x]]);
        graphics.drawRect(
          x * world.state.gridSize + 1,
          y * world.state.gridSize + 1,
          world.state.gridSize,
          world.state.gridSize
        );
        graphics.endFill();
      }
    }

    world.state.containers[0].addChild(graphics);
  }
}
