export class CTX {
  constructor(
    public readonly canvas: HTMLCanvasElement,
    public readonly ctx: CanvasRenderingContext2D
  ) {}

  block(fn: () => void) {
    CTX.block(this.ctx, fn);
  }

  static block(ctx: CanvasRenderingContext2D, fn: () => void) {
    ctx.save();
    fn();
    ctx.restore();
  }
}
