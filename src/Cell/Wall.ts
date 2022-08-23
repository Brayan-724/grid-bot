import { CellType } from "./Cell";
import { SolidCell } from "./SolidCell";
import type { ValidVec2 } from "../utils";
import { Game } from "../Game";

export class Wall extends SolidCell {
  type: CellType = CellType.Wall;
  
  constructor(game: Game, pos: ValidVec2) {
    super(game, pos, "black");
  }
}
