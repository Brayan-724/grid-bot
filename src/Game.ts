import { DrawableGrid } from "./Grid";
import { Coin, Player, Wall } from "./Cell";
import { CellMemory, GameConfig } from "./managers";
import { Vec2, Canvas } from "./utils";

export class Game {
  grid: DrawableGrid;
  readonly size: Vec2;
  readonly canvas: Canvas;

  player!: Player;
  playerMemory!: CellMemory;

  mapLoaded: boolean = false;

  constructor(canvas: HTMLCanvasElement, readonly config: GameConfig) {
    this.size = new Vec2(canvas.width, canvas.height);
    this.canvas = new Canvas(canvas);
    this.grid = new DrawableGrid(this, 21, 21);
  }

  loadMap(map: string) {
    this.grid.reset();

    const playerPosition = Vec2.zero;
    const walls: Wall[] = map
      .trim()
      .split("\n")
      .flatMap((line, y) => {
        return line
          .trim()
          .split(" ")
          .map((char, x) => {
            switch (char) {
              case "#":
                return new Wall(this, new Vec2(x, y));

              case "?":
                return new Coin(this, new Vec2(x, y));

              case "%":
                playerPosition.from([x, y]);
            }
            return null;
          })
          .filter((v): v is Wall => v !== null);
      });

    this.player = new Player(this, playerPosition);
    this.playerMemory = new CellMemory(this, this.player);
    this.grid.addCell(this.player);

    walls.map((wall) => this.grid.addCell(wall));

    this.mapLoaded = true;
  }

  async step() {
    await this.player.step();
  }

  draw() {
    this.grid.draw();
  }
}
