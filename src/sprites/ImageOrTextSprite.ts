import { Sprite, Text, Texture } from "pixi.js";


class ImageOrTextSprite extends Sprite {
  private readonly image_child: Sprite;
  private readonly text_child: Text;

  constructor() {
    super();
    this.image_child = new Sprite();
    this.text_child = new Text();

    this.image_child.anchor.set(0.5);
    this.text_child.anchor.set(0.5);

    this.text_child.style.fill = "white";

    this.image_child.visible = false;
    this.text_child.visible = false;

    this.addChild(this.image_child);
    this.addChild(this.text_child);
  }

  set image(texture: Texture) {
    this.image_child.texture = texture;
    this.image_child.visible = true;
    this.text_child.visible = false;
  }

  set text(text: string) {
    this.text_child.text = text;
    this.text_child.visible = true;
    this.image_child.visible = false;
  }
}

export default ImageOrTextSprite;
