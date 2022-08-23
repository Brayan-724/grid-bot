import type { ReadonlyVec2 } from "./ReadonlyVec2";
import type { Vec2 } from "./Vec2";

export type ArrayVec2 = [x: number, y: number];
export type ObjectVec2 = { x: number; y: number };
export type ValidVec2 = ArrayVec2 | ObjectVec2 | Vec2 | ReadonlyVec2;

export type Vec2Switcher<T> = {
  array?(vec: ArrayVec2): T;
  object?(vec: ObjectVec2): T;
  vec?(vec: Vec2): T;
  readonly?(vec: ReadonlyVec2): T;
  nums?(x: number, y: number): T;
  others?(...args: [vec: ValidVec2] | ArrayVec2): T;
  invalid?(): T | never;
};
