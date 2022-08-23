import { SolidCell } from "./SolidCell";
import type { Player } from "./Player";

export abstract class CollectableCell extends SolidCell {
  collect(target: Player) {
    this.game.grid.deleteCell(this.pos);
    this.onCollect(target);
  }
  
  abstract onCollect(target: Player): void;
}
