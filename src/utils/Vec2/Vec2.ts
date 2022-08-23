import { ReadonlyVec2 } from "./ReadonlyVec2";
import type { ArrayVec2, ValidVec2, Vec2Switcher } from "./types";

export class Vec2 {
  static get zero(): Vec2 {
    return new Vec2(0, 0);
  }
  static get one(): Vec2 {
    return new Vec2(1, 1);
  }

  constructor(public x: number, public y: number) {}

  private _operator(
    func: (this: Vec2, x: number, y: number) => void
  ): (x: number | ValidVec2, y?: number) => void {
    return (x, y) => {
      const vec = Vec2.fromArr(x, y);
      func.call(this, vec[0], vec[1]);
    };
  }

  add(x: number, y: number): this;
  add(vec: ValidVec2): this;
  add(x: number | ValidVec2, y?: number): this {
    this._operator((x, y) => {
      this.x += x;
      this.y += y;
    })(x, y);
    return this;
  }

  sub(x: number, y: number): this;
  sub(vec: ValidVec2): this;
  sub(x: number | ValidVec2, y?: number): this {
    this._operator((x, y) => {
      this.x -= x;
      this.y -= y;
    })(x, y);
    return this;
  }

  mul(x: number, y: number): this;
  mul(vec: ValidVec2): this;
  mul(x: number | ValidVec2, y?: number): this {
    this._operator((x, y) => {
      this.x *= x;
      this.y *= y;
    })(x, y);
    return this;
  }

  div(x: number, y: number): this;
  div(vec: ValidVec2): this;
  div(x: number | ValidVec2, y?: number): this {
    this._operator((x, y) => {
      this.x /= x;
      this.y /= y;
    })(x, y);
    return this;
  }

  mag(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  clone(): Vec2 {
    return new Vec2(this.x, this.y);
  }

  readonly(): ReadonlyVec2 {
    return new ReadonlyVec2(this.x, this.y);
  }

  /** x-y */
  getKey(): string {
    return `${this.x}-${this.y}`;
  }

  distance(other: ValidVec2): number {
    const otherVec = Vec2.fromArr(other, false);
    return this.sub(otherVec).mag();
  }

  from(vec: ValidVec2): this;
  from(x: number, y: number): this;
  from(xVec: ValidVec2 | number, y?: number): this {
    const _this = this;

    Vec2.fromFn({
      vec(vec) {
        _this.x = vec.x;
        _this.y = vec.y;
      },
      readonly(vec) {
        _this.x = vec.x;
        _this.y = vec.y;
      },
      array(arr) {
        _this.x = arr[0];
        _this.y = arr[1];
      },
      object(obj) {
        _this.x = obj.x;
        _this.y = obj.y;
      },
      nums(x, y) {
        _this.x = x;
        _this.y = y;
      },
    })(xVec, y);

    return this;
  }

  static from(vec: ValidVec2): Vec2;
  static from(x: number, y: number): Vec2;
  static from(xVec: ValidVec2 | number, y?: number): Vec2 {
    if (xVec instanceof Vec2) return xVec.clone();
    if (xVec instanceof ReadonlyVec2) return xVec.mutable();
    if (Array.isArray(xVec)) return new Vec2(xVec[0], xVec[1]);
    if (typeof xVec === "object") return new Vec2(xVec.x, xVec.y);
    return new Vec2(xVec, y!);
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

  static toKey(vec: ValidVec2): string;
  static toKey(x: number, y: number): string;
  static toKey(xVec: ValidVec2 | number, y?: number): string {
    return Vec2.fromFn({
      vec(vec) {
        return vec.getKey();
      },
      readonly(vec) {
        return vec.getKey();
      },
      array(arr) {
        return `${arr[0]}-${arr[1]}`;
      },
      object(obj) {
        return `${obj.x}-${obj.y}`;
      },
      nums(x, y) {
        return `${x}-${y}`;
      },
      others() {
        return `0-0`;
      },
      invalid() {
        return `0-0`;
      },
    })(xVec, y)!;
  }
}
