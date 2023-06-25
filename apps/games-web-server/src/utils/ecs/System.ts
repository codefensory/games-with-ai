import { IWorld } from "bitecs";

export interface ISystem {
  onCreate?(world: IWorld): void;
  onUpdate?(world: IWorld): void;
}
