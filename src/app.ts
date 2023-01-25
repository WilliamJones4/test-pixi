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

  private moving_cards: Map<number, number>;
  private last_action_time: number;
  private next_move_card: number;
  
  constructor(parent: HTMLElement) {
    this.app = new Application<HTMLCanvasElement>({ backgroundColor: "black" });
    this.parent = parent;

    this.start_pos = new Point(this.screen.width / 4, this.screen.height / 4);
    this.end_pos = new Point(this.start_pos.x * 3, this.start_pos.y);

    this.nb_cards = 144;
    this.cards = [];
    this.fps = new FpsSprite();
    this.startBtn = new Text("Start");

    this.moving_cards = new Map<number, number>();
    this.last_action_time = 0;

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

    this.startBtn.style.align = "center";
    this.startBtn.x = this.screen.width / 2;
    this.startBtn.style.fill = "white";
    this.app.stage.addChild(this.startBtn);
  }

  tickerListener() {
    this.fps.fps = this.ticker.FPS;

    if (this.last_action_time + 1000 < this.lastTime) {
      if (this.next_move_card > 0) {
        this.next_move_card -= 1;
        this.moving_cards.set(this.next_move_card, this.last_action_time);
        this.last_action_time = this.lastTime;
      }
    }

    this.moving_cards.forEach((start_time, key) => {
      if (start_time + 2000 < this.lastTime) {
        this.cards[key].position = this.end_pos;
        this.moving_cards.delete(key);
      } else {
      }
    });
  }

  start(): void {
    this.generateSprites();

    this.ticker.add(this.tickerListener);

    this.last_action_time = 0;
    this.next_move_card = 144;
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

const game = new Game(document.body);
game
  .display()
  .start();
