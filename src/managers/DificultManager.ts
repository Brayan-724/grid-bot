export enum Dificult {
  Easy = 0,
  Medium = 1,
  Hard = 2,
}

export class DificultManager {
  private _dificult: Dificult = Dificult.Medium;

  get dificult(): Dificult {
    return this._dificult;
  }

  setDificult(dificult: Dificult) {
    this._dificult = dificult;
  }

  isHard(): boolean {
    return this._dificult === Dificult.Hard;
  }

  isMedium(): boolean {
    return this._dificult === Dificult.Medium;
  }

  isEasy(): boolean {
    return this._dificult === Dificult.Easy;
  }

  is(dificult: Dificult): boolean;
  is(dificults: Dificult[]): boolean;
  is(...dificults: Dificult[]): boolean;
  /** @internal */
  is(...args: (Dificult | Dificult[])[]): boolean;
  is(...args: (Dificult | Dificult[])[]): boolean {
    // `Dificult` and `Dificult[]`
    if (args.length === 1) {
      const dificult = args[0];

      // `Dificult[]`
      if (Array.isArray(dificult)) {
        return dificult.includes(this._dificult);
      }

      return dificult === this._dificult;
    }

    // SPREAD ...dificults
    const dificults = args as Dificult[];

    return dificults.includes(this._dificult);
  }

  isNot(dificult: Dificult): boolean;
  isNot(dificults: Dificult[]): boolean;
  isNot(...dificults: Dificult[]): boolean;
  isNot(...args: (Dificult | Dificult[])[]): boolean {
    return !this.is(...args);
  }
}