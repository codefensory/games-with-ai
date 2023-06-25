import { addComponent, addEntity } from "bitecs";
import { Application, Container } from "pixi.js";
import { ISystem } from "~/utils/ecs";
import { MazeWorld } from "../../types/ecs";
import { Player, Position, RectRenderer } from "../components";
import { GridSystem, PlayerSystem, RectRendererSystem } from "../systems";

const SIZE = 79;

const GAME_TABLE = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, -1, -1, -1],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 2],
];

export class Level1 {
  private containers: Container[] = Array.from(
    { length: 2 },
    () => new Container()
  );

  private systems: ISystem[] = [];

  constructor(private world: MazeWorld, app: Application) {
    this.containers.forEach((container) => app.stage.addChild(container));

    world.state = {
      containers: this.containers,
      grid: GAME_TABLE,
      gridSize: SIZE,
    };

    this.systems = [
      new GridSystem(),
      new PlayerSystem(),
      new RectRendererSystem(),
    ];
  }

  prepare() {
    const eidPlayer = addEntity(this.world);

    addComponent(this.world, Player, eidPlayer);
    Player.x[eidPlayer] = 0;
    Player.y[eidPlayer] = 0;

    addComponent(this.world, Position, eidPlayer);

    addComponent(this.world, RectRenderer, eidPlayer);
    RectRenderer.width[eidPlayer] = this.world.state.gridSize;
    RectRenderer.height[eidPlayer] = this.world.state.gridSize;
    RectRenderer.color[eidPlayer] = 0xfff;
    RectRenderer.strokeWidth[eidPlayer] = 1;
    RectRenderer.containerId[1];

    for (let system of this.systems) {
      system.onCreate?.(this.world);
    }
  }

  update() {
    for (let system of this.systems) {
      system.onUpdate?.(this.world);
    }
  }
}
