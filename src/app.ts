import { Application, Point, Rectangle } from "pixi.js";

import CardSprite from "./sprites/CardSprite";


class Game {
  private readonly app: Application<HTMLCanvasElement>;
  private readonly parent: HTMLElement;
  private readonly start_pos: Point;
  private readonly end_pos: Point;
  
  constructor(parent: HTMLElement) {
    this.app = new Application<HTMLCanvasElement>({ backgroundColor: "black" });
    this.parent = parent;

    this.start_pos = new Point(this.screen.width / 4, this.screen.height / 4);
    this.end_pos = new Point(this.start_pos.x * 3, this.start_pos.y * 3);
  }

  display(): Game {
    this.parent.appendChild(this.app.view);
    return this;
  }

  generate_cards(nb_cards = 144): void {
    for (let idx = 0; idx < nb_cards; idx++) {
      const card = new CardSprite();
      card.anchor.set(0.5);
      card.position = this.start_pos;
      card.rotation = Math.random() - 0.5;

      this.app.stage.addChild(card);
    }
  }

  start(): void {
    this.generate_cards();
  }

  get screen(): Rectangle {
    return this.app.screen;
  }
}

const game = new Game(document.body);
game
  .display()
  .start();
