export type KeysConfigItem = string | string[];

interface IKeys {
  readonly "player.up": KeysConfigItem;
  readonly "player.down": KeysConfigItem;
  readonly "player.left": KeysConfigItem;
  readonly "player.right": KeysConfigItem;
  readonly "player.see": KeysConfigItem;
  readonly "player.pick": KeysConfigItem;
  readonly "player.exit": KeysConfigItem;
}

export class KeysConfig implements IKeys {
  //#region --- keys
  private ".player.up": KeysConfigItem;
  // prettier-ignore
  get "player.up"(): KeysConfigItem { return this[".player.up"]; }
  // prettier-ignore
  protected set "player.up"(value: KeysConfigItem) { this[".player.up"] = value; }

  private ".player.down": KeysConfigItem;
  // prettier-ignore
  get "player.down"(): KeysConfigItem { return this[".player.down"]; }
  // prettier-ignore
  protected set "player.down"(value: KeysConfigItem) { this[".player.down"] = value; }

  private ".player.left": KeysConfigItem;
  // prettier-ignore
  get "player.left"(): KeysConfigItem { return this[".player.left"]; }
  // prettier-ignore
  protected set "player.left"(value: KeysConfigItem) { this[".player.left"] = value; }

  private ".player.right": KeysConfigItem;
  // prettier-ignore
  get "player.right"(): KeysConfigItem { return this[".player.right"]; }
  // prettier-ignore
  protected set "player.right"(value: KeysConfigItem) { this[".player.right"] = value; }

  private ".player.see": KeysConfigItem;
  // prettier-ignore
  get "player.see"(): KeysConfigItem { return this[".player.see"]; }
  // prettier-ignore
  protected set "player.see"(value: KeysConfigItem) { this[".player.see"] = value; }

  private ".player.pick": KeysConfigItem;
  // prettier-ignore
  get "player.pick"(): KeysConfigItem { return this[".player.pick"]; }
  // prettier-ignore
  protected set "player.pick"(value: KeysConfigItem) { this[".player.pick"] = value; }

  private ".player.exit": KeysConfigItem;
  // prettier-ignore
  get "player.exit"(): KeysConfigItem { return this[".player.exit"]; }
  // prettier-ignore
  protected set "player.exit"(value: KeysConfigItem) { this[".player.exit"] = value; }
  //#endregion

  readonly allKeys: Set<string> = new Set();

  constructor() {
    this.setKey("player.up", ["w", "ArrowUp"]);
    this.setKey("player.down", ["s", "ArrowDown"]);
    this.setKey("player.left", ["a", "ArrowLeft"]);
    this.setKey("player.right", ["d", "ArrowRight"]);
    this.setKey("player.see", ["q"]);
    this.setKey("player.pick", ["e"]);
    this.setKey("player.exit", ["f"]);
  }

  setKey(key: keyof IKeys, value: KeysConfigItem) {
    if (Array.isArray(value)) {
      this[key] = [];
      value.forEach((v) => {
        v = v.toLowerCase();

        (this[key] as string[]).push(v);
        this.allKeys.add(v);
      });
    } else {
      this[key] = value.toLowerCase();
      this.allKeys.add(value);
    }
  }

  getKey(key: keyof IKeys): KeysConfigItem {
    return this[key];
  }

  is(key: keyof IKeys, value: string): boolean {
    const configValue = this.getKey(key);
    return Array.isArray(configValue)
      ? configValue.includes(value.toLowerCase())
      : configValue === value.toLowerCase();
  }

  hasKey(value: string): boolean {
    return this.allKeys.has(value.toLowerCase());
  }

  static _ = new KeysConfig();
}
