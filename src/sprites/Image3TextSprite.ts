import { Sprite, Texture } from "pixi.js";
import ImageOrTextSprite from "./ImageOrTextSprite";


class Image3TextSprite extends Sprite {

  private readonly image_names: string[];
  private readonly textures: Record<string, Texture>;
  private readonly nb_children: number = 3;

  constructor(image_names: string[], textures: Record<string, Texture>) {
    super();
    this.image_names = image_names;
    this.textures = textures;

    for (let idx = 0; idx < this.nb_children; idx++) {
      const child = new ImageOrTextSprite();
      child.anchor.set(0.5);
      child.position.y = 150 * (idx + 1);
      child.position.x = 200 * (idx + 1);
      this.addChild(child);
    }

    this.update();
  }

  update() {
    for (let idx = 0; idx < this.nb_children; idx++) {
      const child = this.getChildAt(idx);
      const name = this.image_names[Math.ceil(Math.random() * this.image_names.length)];
      if (Math.random() < 0.5) {
        child.text = name;
      } else {
        if (this.textures[name] === undefined) {
          idx -= 1;
          continue;
        }
        child.image = this.textures[name];
      }
    }
  }

  getChildAt(index: number): ImageOrTextSprite {
    // @ts-ignore
    return super.getChildAt(index);
  }
}

export default Image3TextSprite;
