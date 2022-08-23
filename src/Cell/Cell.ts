import type { Game } from "../Game";
import { DrawPosition, ReadonlyVec2, Vec2 } from "../utils";
import type { ValidVec2 } from "../utils";

export type SavedCell = null | Cell;

export enum CellType {
  Empty,
  Wall,
  Gold,
  Player,
  Bot,
}

export abstract class Cell {
  /** Cell type */
  abstract readonly type: CellType;

  /** Virtual position */
  pos: ReadonlyVec2; 
  /** Draw position */
  drawPos: Vec2;

  constructor(
    public readonly game: Game,
    pos: ValidVec2
  ) {
    this.pos = ReadonlyVec2.from(pos);
    this.drawPos = Vec2.from(pos);
  }

  /**
   * Override draw position with virtual position.
   */
  updateDraw() {
    this.drawPos.from(this.pos);
  }

  /**
   * Get key for grid map from position.\
   * `(x, y) => "x-y"`
   */
  getKey(): string {
    return this.pos.getKey();
  }

  abstract draw(position: DrawPosition): void;

  /** @returns true if cell has empty type or be null */
  static isEmpty(cell: SavedCell): boolean {
    return cell === null || cell.type === CellType.Empty;
  }

  /** Draw a fill-rect */
  static drawCell(
    color: string,
    ctx: CanvasRenderingContext2D,
    position: DrawPosition
  ) {
    ctx.fillStyle = color;

    ctx.fillRect(position.x, position.y, position.size, position.size);
  }
}
