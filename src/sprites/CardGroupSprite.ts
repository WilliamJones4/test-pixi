import { Sprite } from "pixi.js";
import CardSprite from "./CardSprite";

class CardGroupSprite extends Sprite {
  removeChildAt(index: number): CardSprite {
    // @ts-ignore
    return super.removeChildAt(index);
  }
}

export default CardGroupSprite;
