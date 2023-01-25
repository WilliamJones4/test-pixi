import { posix } from "path";
import { 
  Application,
  Point,
  Rectangle,
  Ticker,
  Text,
  Sprite
} from "pixi.js";

import CardGroupSprite from "./sprites/CardGroupSprite";
import CardSprite from "./sprites/CardSprite";
import FpsSprite from "./sprites/FpsSprite";


class Game {
  private readonly app: Application<HTMLCanvasElement>;
  private readonly parent: HTMLElement;
  private readonly start_pos: Point;
  private readonly end_pos: Point;
  private readonly nb_cards: number;
  
  private readonly cards: CardSprite[];
  private readonly start_cards_group: CardGroupSprite;
  private readonly end_cards_group: CardGroupSprite;
  private readonly fps: FpsSprite;
  private readonly startBtn: Text;

  private moving_cards: Map<number, CardSprite>;
  private last_action_time: number;
  private next_move_card: number;
  
  constructor(parent: HTMLElement) {
    this.app = new Application<HTMLCanvasElement>({ backgroundColor: "black" });
    this.parent = parent;

    this.start_pos = new Point(this.screen.width / 4, this.screen.height / 4);
    this.end_pos = new Point(this.start_pos.x * 3, this.start_pos.y);

    this.nb_cards = 144;
    this.cards = [];
    this.start_cards_group = new CardGroupSprite();
    this.end_cards_group = new CardGroupSprite();
    this.fps = new FpsSprite();
    this.startBtn = new Text("Start");

    this.moving_cards = new Map<number, CardSprite>();
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
      card.rotation = Math.random() - 0.5;

      this.start_cards_group.addChild(card);
      this.cards.push(card);
    }
  }

  generateSprites(): void {
    this.start_cards_group.anchor.set(0.5);
    this.start_cards_group.position = this.start_pos;
    this.app.stage.addChild(this.start_cards_group);

    this.end_cards_group.anchor.set(0.5);
    this.end_cards_group.position = this.end_pos;
    this.end_cards_group.addChild(new Sprite());
    this.app.stage.addChild(this.end_cards_group);

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
        const child = this.start_cards_group.removeChildAt(this.next_move_card);
        child.position = this.start_cards_group.position;
        this.moving_cards.set(this.next_move_card, child);
        this.last_action_time = this.lastTime;
      }
    }

    this.moving_cards.forEach((card, start_time) => {
      if (start_time + 2000 < this.lastTime) {
        card.position.x = 0;
        card.position.y = 0;
        this.end_cards_group.addChild(card);
        this.moving_cards.delete(start_time);
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
