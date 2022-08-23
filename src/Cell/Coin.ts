import { CellType } from "./Cell";
import { CollectableCell } from "./CollectableCell";
import type { Game } from "../Game";
import type { Vec2 } from "../utils";
import type { Player } from "./Player";

export class Coin extends CollectableCell {
  type = CellType.Gold;

  constructor(game: Game, position: Vec2) {
    super(game, position, "#ffd700");
  }

  onCollect(target: Player) {
    console.log("hola: ", target);
  }
}
