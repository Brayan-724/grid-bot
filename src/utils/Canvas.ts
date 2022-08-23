import { CTX } from "./CTX";

export class Canvas {
  readonly ctx: CanvasRenderingContext2D;
  readonly helper: CTX;

  constructor(public canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Canvas not supported");
    }

    this.ctx = ctx;
    this.helper = new CTX(canvas, ctx);
  }
}
