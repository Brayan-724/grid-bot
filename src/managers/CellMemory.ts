import type { Cell } from "../Cell";
import type { Game } from "../Game";
import { Dificult } from "./DificultManager";

export class CellMemory {
  readonly seenCells: Set<Cell> = new Set();

  constructor(public game: Game, public target: Cell) {}

  /**
   * Reset seen cells
   */
  reset() {
    this.seenCells.clear();
  }

  /**
   * See around cell and save it to memory.
   * 
   * If dificult is {@link Dificult.Hard|`Dificult.Hard`} then reset memory.
   * @param range Range of cells from cell position.
   */
  seeAround(range: number = 2) {
    const { x, y } = this.target.pos;

    if (this.game.config.dificultConfig.is(Dificult.Hard)) {
      this.reset();
    }

    for (let i = -range; i <= range; i++) {
      for (let j = -range; j <= range; j++) {
        const cell = this.game.grid.getCell([x + i, y + j]);

        if (cell) {
          cell.updateDraw();
          this.seenCells.add(cell);
        }
      }
    }
  }
}
