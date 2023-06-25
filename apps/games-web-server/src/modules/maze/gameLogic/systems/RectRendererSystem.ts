import { defineQuery, enterQuery, exitQuery } from "bitecs";
import { Graphics } from "pixi.js";
import { ISystem } from "~/utils/ecs";
import { MazeWorld } from "../../types/ecs";
import { Position, RectRenderer } from "../components";

export class RectRendererSystem implements ISystem {
  private rectQuery = defineQuery([RectRenderer, Position]);
  private enteredRects = enterQuery(defineQuery([RectRenderer]));
  private exitedRects = exitQuery(defineQuery([RectRenderer]));

  private rectsById: Record<number, Graphics> = {};

  onUpdate(world: MazeWorld) {
    this.initEntities(world);

    for (let eid of this.rectQuery(world)) {
      const rect = this.rectsById[eid];

      rect.x = Position.x[eid];
      rect.y = Position.y[eid];
    }

    this.destroyEntities(world);
  }

  private initEntities(world: MazeWorld) {
    for (let eid of this.enteredRects(world)) {
      const rect = new Graphics();

      this.rectsById[eid] = rect;

      this.generateRect(rect, eid);

      world.state.containers[RectRenderer.containerId[eid]].addChild(rect);
    }
  }

  private generateRect(rect: Graphics, eid: number) {
    if (RectRenderer.strokeWidth[eid]) {
      rect.lineStyle(
        RectRenderer.strokeWidth[eid],
        RectRenderer.strokeColor[eid],
        1
      );
    }

    rect.beginFill(RectRenderer.color[eid]);
    rect.drawRect(
      Position.x[eid] + RectRenderer.strokeWidth[eid],
      Position.y[eid] + RectRenderer.strokeWidth[eid],
      RectRenderer.width[eid] + RectRenderer.strokeWidth[eid],
      RectRenderer.height[eid]
    );
    rect.endFill();
  }

  private destroyEntities(world: MazeWorld) {
    for (let eid of this.exitedRects(world)) {
      const rect = this.rectsById[eid];

      if (!rect) {
        continue;
      }

      world.state.containers[RectRenderer.containerId[eid]].removeChild(rect);

      delete this.rectsById[eid];
    }
  }
}
