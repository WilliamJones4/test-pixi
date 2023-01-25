import { 
  Application,
  Point,
  Rectangle,
  Ticker,
  Text
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
  private readonly startBtn: Text;
  private moving_cards: number[];
  
  constructor(parent: HTMLElement) {
    this.app = new Application<HTMLCanvasElement>({ backgroundColor: "black" });
    this.parent = parent;

    this.start_pos = new Point(this.screen.width / 4, this.screen.height / 4);
    this.end_pos = new Point(this.start_pos.x, this.start_pos.y * 3);

    this.nb_cards = 144;
    this.cards = [];
    this.fps = new FpsSprite();
    this.startBtn = new Text("Start");

    this.tickerListener = this.tickerListener.bind(this);
  }

  display(): Game {
    this.parent.appendChild(this.app.view);
    return this;
  }

  generateCards(): void {
    for (let idx = 0; idx < this.nb_cards; idx++) {
      const card = new CardSprite(idx);
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
    this.app.stage.addChild(this.startBtn);
  }

  tickerListener() {
    this.fps.fps = this.ticker.FPS;
  }

  start(): void {
    this.generateSprites();

    this.ticker.add(this.tickerListener);
  }

  get screen(): Rectangle {
    return this.app.screen;
  }

  get ticker(): Ticker {
    return this.app.ticker;
  }
}

const game = new Game(document.body);
game
  .display()
  .start();
