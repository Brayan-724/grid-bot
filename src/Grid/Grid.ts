import { ArrayVec2, Neighbors, ValidVec2, Vec2 } from "../utils";
import { Cell, SavedCell } from "../Cell";

export class Grid {
  readonly grid: Map<string, SavedCell> = new Map();

  constructor(readonly width: number, readonly height: number) {}

  /**
   * Clear grid map
   */
  reset() {
    this.grid.clear();
  }

  /**
   * Check if position is inside of grid
   */
  isValidPosition(pos: ValidVec2): boolean {
    const [x, y] = Vec2.fromArr(pos, false);

    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }

  /**
   * Add cell to grid map. Auto-assigns cell position.
   * @throws Error if cell position is already taken.
   */
  addCell(cell: Cell) {
    if (!this.isValidPosition(cell.pos)) return;

    const key = cell.getKey();

    if (this.grid.has(key)) {
      throw new Error("Cell already exists");
    }

    this.grid.set(key, cell);
  }

  setCell(pos: ValidVec2, cell: SavedCell) {
    this.grid.set(Vec2.toKey(pos), cell);
  }

  deleteCell(pos: ValidVec2) {
    this.grid.delete(Vec2.toKey(pos));
  }

  /**
   * Get cell from grid map.
   */
  getCell(pos: ValidVec2): SavedCell | undefined {
    if (!this.isValidPosition(pos)) return;

    return this.grid.get(Vec2.toKey(pos));
  }

  /**
   * Get all neighbors of cell.
   */
  getNeighbors(cell: Cell): Neighbors {
    const neighbors = new Neighbors(undefined, undefined, undefined, undefined);

    const pos = cell.pos;

    const l = (r: ArrayVec2, s: keyof Neighbors) => {
      const neighbor = this.getCell([pos.x + r[0], pos.y + r[1]]);

      if (neighbor) {
        neighbors[s] = neighbor as Cell;
      }
    };

    l([0, -1], "top");
    l([0, 1], "bottom");
    l([-1, 0], "left");
    l([1, 0], "right");

    return neighbors;
  }

  /**
   * Convert grid map to array of cells.
   */
  getAllCells(): SavedCell[] {
    const cells: SavedCell[] = [];

    this.grid.forEach((cell) => {
      cells.push(cell);
    });

    return cells;
  }

  isEmpty(pos: ValidVec2): boolean {
    if (!this.isValidPosition(pos)) return false;

    const cell = this.grid.get(Vec2.toKey(pos));

    return !cell || Cell.isEmpty(cell);
  }
}
