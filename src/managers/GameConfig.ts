import { Dificult, DificultManager } from "./DificultManager";

export class GameConfig {
  readonly dificultConfig: DificultManager = new DificultManager();

  constructor() {
    this.dificultConfig.setDificult(Dificult.Hard);
  }

  get dificult(): Dificult {
    return this.dificultConfig.dificult;
  }

  set dificult(dificult: Dificult) {
    this.dificultConfig.setDificult(dificult);
  }
}
