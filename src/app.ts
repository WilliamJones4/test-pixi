import { Application } from "pixi.js";


class Game {
  private readonly app: Application<HTMLCanvasElement>;
  private readonly parent: HTMLElement;
  
  constructor(parent: HTMLElement) {
    this.app = new Application<HTMLCanvasElement>({ backgroundColor: "black" });
    this.parent = parent;
  }

  display(): Game {
    this.parent.appendChild(this.app.view);
    return this;
  }

  start(): void {
  }
}

const game = new Game(document.body);
game
  .display()
  .start();
