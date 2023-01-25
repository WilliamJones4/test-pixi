import { Application } from "pixi.js";

import CardSprite from "./sprites/CardSprite";


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

  generate_cards(nb_cards = 144): void {
    for (let idx = 0; idx < nb_cards; idx++) {
      const card = new CardSprite();
      card.anchor.set(0.5);
      card.x = this.app.screen.width / 2;
      card.y = this.app.screen.height / 2;
      card.rotation = Math.random() - 0.5;

      this.app.stage.addChild(card);
    }
  }

  start(): void {
    this.generate_cards();
  }
}

const game = new Game(document.body);
game
  .display()
  .start();
