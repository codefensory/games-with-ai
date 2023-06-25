import { defineQuery } from "bitecs";
import { ISystem } from "~/utils/ecs";
import { MazeWorld } from "../../types/ecs";
import { Player, Position } from "../components";

export class PlayerSystem implements ISystem {
  private playerQuery = defineQuery([Player, Position]);

  onUpdate(world: MazeWorld) {
    for (let eid of this.playerQuery(world)) {
      Position.x[eid] = Player.x[eid] * (world.state.gridSize / 2);
      Position.y[eid] = Player.y[eid] * (world.state.gridSize / 2);
    }
  }
}
