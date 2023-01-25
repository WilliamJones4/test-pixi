import { Sprite, Texture } from "pixi.js";


class CardSprite extends Sprite {
  constructor() {
    super();
    this.texture = Texture.from("/images/hero.png");
  }
}

export default CardSprite;
