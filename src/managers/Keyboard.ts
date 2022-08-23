import { KeysConfig } from "./KeysConfig";

export class KeyEvent {
  constructor(public readonly key: string, public readonly isDown: boolean) {}
}

export class Keyboard {
  readonly keys: Map<string, boolean> = new Map();
  private readonly events: Set<(key: KeyEvent) => void> = new Set();
  private readonly downEvents: Map<string, () => void> = new Map();
  private readonly upEvents: Map<string, () => void> = new Map();

  constructor() {
    this.register();
  }

  register() {
    window.addEventListener("keydown", (e) => {
      this.onKeyDown(e);
    });
    window.addEventListener("keyup", (e) => {
      this.onKeyUp(e);
    });
  }

  onKeyDown(e: KeyboardEvent) {
    if (!KeysConfig._.hasKey(e.key)) {
      return;
    }

    this.keys.set(e.key, true);
    const callback = this.downEvents.get(e.key);
    if (callback) {
      callback();
    }

    this.events.forEach((callback) => {
      callback(new KeyEvent(e.key, true));
    });
  }

  onKeyUp(e: KeyboardEvent) {
    if (!KeysConfig._.hasKey(e.key)) {
      return;
    }

    this.keys.set(e.key, false);
    const callback = this.upEvents.get(e.key);
    if (callback) {
      callback();
    }

    this.events.forEach((callback) => {
      callback(new KeyEvent(e.key, false));
    });
  }

  callbackEvent(callback: (key: KeyEvent) => void) {
    this.events.add(callback);

    return () => {
      this.events.delete(callback);
    };
  }

  callbackDown(key: string, callback: () => void) {
    const prevCallback = this.downEvents.get(key);
    if (prevCallback) {
      this.downEvents.set(key, () => {
        prevCallback();
        callback();
      });
      return () => {
        this.downEvents.set(key, () => {});
      };
    }

    this.downEvents.set(key, callback);

    return () => {
      this.downEvents.set(key, () => {});
    };
  }

  callbackUp(key: string, callback: () => void) {
    const prevCallback = this.upEvents.get(key);
    if (prevCallback) {
      this.upEvents.set(key, () => {
        prevCallback();
        callback();
      });
      return () => {
        this.upEvents.set(key, () => {});
      };
    }

    this.upEvents.set(key, callback);

    return () => {
      this.upEvents.set(key, () => {});
    };
  }

  isPressed(key: string): boolean {
    return this.keys.get(key) || false;
  }

  isReleased(key: string): boolean {
    return !this.keys.get(key) || false;
  }

  waitForDown(key: string): Promise<void> {
    return new Promise((res) => {
      this.callbackDown(key, res);
    });
  }

  waitForUp(key: string): Promise<void> {
    return new Promise((res) => {
      this.callbackUp(key, res);
    });
  }

  waitForAny(): Promise<KeyEvent> {
    return new Promise((res) => {
      this.callbackEvent((key) => {
        res(key);
      });
    });
  }

  static _ = new Keyboard();
}
