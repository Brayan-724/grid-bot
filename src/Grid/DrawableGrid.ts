import { Cell } from "../Cell";
import type { Game } from "../Game";
import { DrawPosition } from "../utils";
import { Grid } from "./Grid";

export class DrawableGrid extends Grid {
  cellSize!: number;
  private _lastCtx: CanvasRenderingContext2D | null = null;

  constructor(public readonly game: Game, width: number, height: number) {
    super(width, height);
  }

  getDrawPosition(cell: Cell): DrawPosition {
    return new DrawPosition(
      cell.pos.x * this.cellSize,
      cell.pos.y * this.cellSize,
      this.cellSize
    );
  }

  drawCell(cell: Cell): void {
    cell.draw(this.getDrawPosition(cell));
  }

  draw(): void {
    const canvas = this.game.canvas.canvas;
    const ctx = this.game.canvas.ctx;
    const CTX = this.game.canvas.helper;

    // Get size of cell
    if (this._lastCtx !== ctx) {
      const size = Math.min(
        canvas.width / this.width,
        canvas.height / this.height
      );
      this.cellSize = size;
      this._lastCtx = ctx;
    }

    // Draw background
    CTX.block(() => {
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    });

    // Draw cells
    this.game.playerMemory.seenCells.forEach((cell) => {
      if (cell === null) return;
      this.drawCell(cell);
    });

    // Draw player
    this.drawCell(this.game.player);

    // Draw grid
    CTX.block(() => {
      ctx.strokeStyle = "black";
      ctx.lineWidth = 1;
      ctx.beginPath();

      for (let x = 0; x <= this.width; x++) {
        ctx.moveTo(x * this.cellSize, 0);
        ctx.lineTo(x * this.cellSize, ctx.canvas.height);
      }

      for (let y = 0; y <= this.height; y++) {
        ctx.moveTo(0, y * this.cellSize);
        ctx.lineTo(ctx.canvas.width, y * this.cellSize);
      }

      ctx.stroke();
    });
  }
}
