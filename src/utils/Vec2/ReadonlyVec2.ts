import type { ArrayVec2, ValidVec2, Vec2Switcher } from "./types";
import { Vec2 } from "./Vec2";

export class ReadonlyVec2 {
  static get zero(): ReadonlyVec2 {
    return new ReadonlyVec2(0, 0);
  }
  static get one(): ReadonlyVec2 {
    return new ReadonlyVec2(1, 1);
  }

  constructor(public readonly x: number, public readonly y: number) {}

  private _operator(
    func: (this: Vec2, x: number, y: number) => void
  ): (x: number | ValidVec2, y?: number) => Vec2 {
    return (x, y) => {
      const vec = ReadonlyVec2.fromArr(x, y);
      const out = this.mutable();
      func.call(out, vec[0], vec[1]);

      return out;
    };
  }

  add(x: number, y: number): Vec2;
  add(vec: ValidVec2): Vec2;
  add(x: number | ValidVec2, y?: number): Vec2 {
    return this._operator(function (x, y) {
      this.x += x;
      this.y += y;
    })(x, y);
  }

  sub(x: number, y: number): Vec2;
  sub(vec: ValidVec2): Vec2;
  sub(x: number | ValidVec2, y?: number): Vec2 {
    return this._operator(function (x, y) {
      this.x -= x;
      this.y -= y;
    })(x, y);
  }

  mul(x: number, y: number): Vec2;
  mul(vec: ValidVec2): Vec2;
  mul(x: number | ValidVec2, y?: number): Vec2 {
    return this._operator(function (x, y) {
      this.x *= x;
      this.y *= y;
    })(x, y);
  }

  div(x: number, y: number): Vec2;
  div(vec: ValidVec2): Vec2;
  div(x: number | ValidVec2, y?: number): Vec2 {
    return this._operator(function (x, y) {
      this.x /= x;
      this.y /= y;
    })(x, y);
  }

  mag(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  clone(): ReadonlyVec2 {
    return new ReadonlyVec2(this.x, this.y);
  }

  mutable(): Vec2 {
    return new Vec2(this.x, this.y);
  }

  /** x-y */
  getKey(): string {
    return `${this.x}-${this.y}`;
  }

  distance(other: ValidVec2): number {
    const otherVec = ReadonlyVec2.fromArr(other, false);
    return this.sub(otherVec).mag();
  }

  static from(vec: ValidVec2): ReadonlyVec2;
  static from(x: number, y: number): ReadonlyVec2;
  static from(xVec: ValidVec2 | number, y?: number): ReadonlyVec2 {
    if (xVec instanceof Vec2) return xVec.readonly();
    if (xVec instanceof ReadonlyVec2) return xVec.clone();
    if (Array.isArray(xVec)) return new ReadonlyVec2(xVec[0], xVec[1]);
    if (typeof xVec === "object") return new ReadonlyVec2(xVec.x, xVec.y);
    return new ReadonlyVec2(xVec, y!);
  }

  static fromArr(vec: ValidVec2, cloneArr?: boolean): ArrayVec2;
  static fromArr(x: number, y: number): ArrayVec2;
  /** @internal */
  static fromArr(xVec: ValidVec2 | number, y?: number | boolean): ArrayVec2;
  static fromArr(xVec: ValidVec2 | number, y?: number | boolean): ArrayVec2 {
    if (xVec instanceof Vec2 || xVec instanceof ReadonlyVec2)
      return [xVec.x, xVec.y];
    if (Array.isArray(xVec)) return y !== false ? [xVec[0], xVec[1]] : xVec;
    if (typeof xVec === "object") return [xVec.x, xVec.y];
    return [xVec, y! as number];
  }

  static fromFn<T>(switcher: Vec2Switcher<T>): {
    (vec: ValidVec2): T | undefined;
    (x: number, y: number): T | undefined;
    (xVec: ValidVec2 | number, y?: number): T | undefined;
  } {
    const ex = (t: keyof Vec2Switcher<T>) => {
      return (
        switcher[t] ||
        switcher.others ||
        switcher.invalid ||
        ((..._args: any[]) => {
          throw new Error("");
        })
      );
    };

    return (xVec: ValidVec2 | number, y?: number) => {
      if (xVec instanceof Vec2) return ex("vec")(xVec);
      if (xVec instanceof ReadonlyVec2) return ex("readonly")(xVec);
      if (Array.isArray(xVec)) return ex("array")(xVec);
      if (typeof xVec === "object") return ex("object")(xVec);
      if (typeof xVec === "number" && typeof y === "number")
        return ex("nums")(xVec, y!);
      return switcher.invalid?.();
    };
  }
}
