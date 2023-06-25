import { Container } from "pixi.js";

export interface MazeWorld {
  state?: WorldState;
}

export interface WorldState {
  gridSize: number;
  grid: number[][];
  containers: Container[];
}
