import { 
  Application,
  Point,
  Rectangle,
  Sprite,
} from "pixi.js";

import CardSprite from "./sprites/CardSprite";
import FpsSprite from "./sprites/FpsSprite";


class Game {
  private readonly app: Application<HTMLCanvasElement>;
  private readonly parent: HTMLElement;
  private readonly start_pos: Point;
  private readonly end_pos: Point;
  private readonly nb_cards: number;
  
  private readonly cards: CardSprite[];
  private readonly fps: FpsSprite;
  private moving_cards: number[];
  
  constructor(parent: HTMLElement) {
    this.app = new Application<HTMLCanvasElement>({ backgroundColor: "black" });
    this.parent = parent;

    this.start_pos = new Point(this.screen.width / 4, this.screen.height / 4);
    this.end_pos = new Point(this.start_pos.x, this.start_pos.y * 3);

    this.nb_cards = 144;
    this.cards = [];
    this.fps = new FpsSprite();

    this.tickerListener = this.tickerListener.bind(this);
  }

  display(): Game {
    this.parent.appendChild(this.app.view);
    return this;
  }

  generateCards(): void {
    for (let idx = 0; idx < this.nb_cards; idx++) {
      const card = new CardSprite();
      card.anchor.set(0.5);
      card.position = this.start_pos;
      card.rotation = Math.random() - 0.5;

      this.app.stage.addChild(card);
      this.cards.push(card);
    }
  }

  generateSprites(): void {
    this.generateCards();
    this.app.stage.addChild(this.fps);
  }

  tickerListener(speed: number) {
    this.fps.fps = this.app.ticker.FPS;
  }

  start(): void {
    this.generateSprites();

    this.app.ticker.add(this.tickerListener);
  }

  get screen(): Rectangle {
    return this.app.screen;
  }
}

const game = new Game(document.body);
game
  .display()
  .start();
