import { Cell, CellType } from "./Cell";
import type { DrawPosition } from "../utils";
import { ControllableCell } from "./ControllableCell";
import { Keyboard, KeysConfig } from "../managers";
import { CollectableCell } from "./CollectableCell";

export class Player extends ControllableCell {
  type: CellType = CellType.Player;

  collectAround(): void {
    const neighbors = this.game.grid.getNeighbors(this);
    const collectableNeighbors = neighbors
      .getArray()
      .filter(
        (cell): cell is CollectableCell => cell instanceof CollectableCell
      );

    collectableNeighbors.forEach((cell) => {
      cell.collect(this);
    });
  }

  async step() {
    const pressedKey = await Keyboard._.waitForAny();

    if (!pressedKey.isDown) return;

    if (KeysConfig._.is("player.up", pressedKey.key)) {
      this.goUp();
    } else if (KeysConfig._.is("player.down", pressedKey.key)) {
      this.goDown();
    } else if (KeysConfig._.is("player.left", pressedKey.key)) {
      this.goLeft();
    } else if (KeysConfig._.is("player.right", pressedKey.key)) {
      this.goRight();
    } else if (KeysConfig._.is("player.pick", pressedKey.key)) {
      this.collectAround();
    }
  }

  draw(position: DrawPosition): void {
    Cell.drawCell("#22DD66", this.game.canvas.ctx, position);
  }
}
