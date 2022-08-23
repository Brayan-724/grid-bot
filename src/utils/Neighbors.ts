import { Cell } from "../Cell";

export class Neighbors {
  constructor(
    public top: Cell | undefined,
    public bottom: Cell | undefined,
    public left: Cell | undefined,
    public right: Cell | undefined
  ) {}

  *getIterator(): IterableIterator<Cell> {
    if (this.top) yield this.top;
    if (this.bottom) yield this.bottom;
    if (this.left) yield this.left;
    if (this.right) yield this.right;
  }

  getArray(): Cell[] {
    return [this.top, this.bottom, this.left, this.right].filter(
      (v): v is Cell => v !== undefined
    );
  }
}
