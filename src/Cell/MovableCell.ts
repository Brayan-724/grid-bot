import { ReadonlyVec2 } from "../utils";
import { Cell } from "./Cell";
import type { ValidVec2 } from "../utils";

export abstract class MovableCell extends Cell {
  setPos(pos: ValidVec2): void {
    this.game.grid.deleteCell(this.pos);
    this.pos = ReadonlyVec2.from(pos);
    this.game.grid.setCell(this.pos, this);
  }

  checkMove(relative: ValidVec2): boolean {
    const newPos = this.pos.add(relative);
    return this.game.grid.isEmpty(newPos);
  }

  moveTo(relative: ValidVec2): void {
    const newPos = this.pos.add(relative);
    if (!this.game.grid.isEmpty(newPos)) return;
    this.setPos(newPos);
  }

  moveToAbs(pos: ValidVec2): void {
    if (!this.game.grid.isEmpty(pos)) return;
    this.setPos(pos);
  }

  goUp(): void {
    this.moveTo([0, -1]);
  }

  goDown(): void {
    this.moveTo([0, 1]);
  }

  goLeft(): void {
    this.moveTo([-1, 0]);
  }

  goRight(): void {
    this.moveTo([1, 0]);
  }
}
