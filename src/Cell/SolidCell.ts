import { Cell } from "./Cell";
import type { DrawPosition, ValidVec2 } from "../utils";
import type { Game } from "../Game";

export abstract class SolidCell extends Cell {
  constructor(game: Game, pos: ValidVec2, public color: string) {
    super(game, pos);
  }

  draw(position: DrawPosition): void {
    Cell.drawCell(this.color, this.game.canvas.ctx, position);
  }
}
