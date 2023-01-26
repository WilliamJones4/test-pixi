import { Application, Container, Rectangle, Ticker } from "pixi.js";


class Game {
  private readonly app: Application<HTMLCanvasElement>;
  private readonly parent: HTMLElement;


  constructor(parent: HTMLElement) {
    this.app = new Application<HTMLCanvasElement>({ backgroundColor: "black" });
    this.parent = parent;

    this.tickerListener = this.tickerListener.bind(this);
  }

  display(): Game {
    this.parent.appendChild(this.app.view);
    return this;
  }

  tickerListener() {}

  start(): void {
    this.ticker.add(this.tickerListener);
  }

  get stage(): Container {
    return this.app.stage;
  }

  get screen(): Rectangle {
    return this.app.screen;
  }

  get ticker(): Ticker {
    return this.app.ticker;
  }

  get lastTime(): number {
    return this.ticker.lastTime;
  }
}

export default Game;
