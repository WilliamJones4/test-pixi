import { Application } from "pixi.js";

import CardSprite from "./card";


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
    const card = new CardSprite();
    card.anchor.set(0.5);
    card.x = this.app.screen.width / 2;
    card.y = this.app.screen.height / 2;

    this.app.stage.addChild(card);
  }
}

const game = new Game(document.body);
game
  .display()
  .start();
