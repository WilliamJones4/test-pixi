import { Sprite, Text, Texture } from "pixi.js";


class CardSprite extends Sprite {
  background: Sprite;
  idSprite: Text;

  constructor(id: number) {
    super();
    this.background = new Sprite(Texture.from("./images/card-body.png"));
    this.background.anchor.set(0.5);
    this.addChild(this.background);
    
    this.idSprite = new Text(`${ id }`);
    this.idSprite.anchor.set(0.5);
    this.addChild(this.idSprite);
  }
}

export default CardSprite;
