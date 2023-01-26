import { 
  Point,
  Text,
  Sprite
} from "pixi.js";

import CardGroupSprite from "./sprites/CardGroupSprite";
import CardSprite from "./sprites/CardSprite";
import FpsSprite from "./sprites/FpsSprite";
import Game from "./Game";


class Game1 extends Game {
  private readonly start_pos: Point;
  private readonly end_pos: Point;
  private readonly nb_cards: number;
  
  private readonly cards: CardSprite[];
  private readonly start_cards_group: CardGroupSprite;
  private readonly end_cards_group: CardGroupSprite;
  private readonly moving_cards_group: CardGroupSprite;
  private readonly fps: FpsSprite;
  private readonly startBtn: Text;

  private moving_cards_info: Map<number, CardSprite>;     // StartTime - Card
  private last_action_time: number;
  private next_move_card: number;
  
  constructor(parent: HTMLElement) {
    super(parent);

    this.start_pos = new Point(this.screen.width / 4, this.screen.height / 4);
    this.end_pos = new Point(this.start_pos.x * 3, this.start_pos.y);

    this.nb_cards = 144;
    this.cards = [];
    this.start_cards_group = new CardGroupSprite();
    this.end_cards_group = new CardGroupSprite();
    this.moving_cards_group = new CardGroupSprite();
    this.fps = new FpsSprite();
    this.startBtn = new Text("Start");

    this.moving_cards_info = new Map<number, CardSprite>();
    this.last_action_time = 0;

    this.tickerListener = this.tickerListener.bind(this);
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
    this.stage.addChild(this.start_cards_group);

    this.end_cards_group.anchor.set(0.5);
    this.end_cards_group.position = this.end_pos;
    this.end_cards_group.addChild(new Sprite());
    this.stage.addChild(this.end_cards_group);

    this.stage.addChild(this.moving_cards_group);

    this.generateCards();

    this.stage.addChild(this.fps);

    this.startBtn.style.align = "center";
    this.startBtn.x = this.screen.width / 2;
    this.startBtn.style.fill = "white";
    this.stage.addChild(this.startBtn);
  }

  tickerListener() {
    super.tickerListener();

    this.fps.fps = this.ticker.FPS;

    if (this.last_action_time + 1000 < this.lastTime) {
      if (this.next_move_card > 0) {
        this.next_move_card -= 1;
        const child = this.start_cards_group.removeChildAt(this.next_move_card);

        child.position = this.start_cards_group.position;
        this.moving_cards_info.set(this.lastTime, child);
        this.last_action_time = this.lastTime;
        
        this.moving_cards_group.addChild(child);
      }
    }

    this.moving_cards_info.forEach((card, start_time) => {
      if (start_time + 2000 < this.lastTime) {
        card.position.x = 0;
        card.position.y = 0;
        this.moving_cards_info.delete(start_time);
        this.moving_cards_group.removeChildAt(0);
        this.end_cards_group.addChild(card);
      } else {
        const duration = this.lastTime - start_time;
        const deltaX = (this.end_pos.x - this.start_pos.x) / 2000 * duration;
        const deltaY = (this.end_pos.y - this.start_pos.y) / 2000 * duration;
        card.position.x = this.start_pos.x + deltaX;
        card.position.y = this.start_pos.y + deltaY;
      }
    });
  }

  start(): void {
    super.start();

    this.generateSprites();

    this.last_action_time = 0;
    this.next_move_card = 144;
  }
}


export default Game1;
