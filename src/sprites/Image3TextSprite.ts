import { Sprite, Texture } from "pixi.js";


class Image3TextSprite extends Sprite {

  private readonly image_names: string[];
  private readonly textures: Record<string, Texture>;

  constructor(image_names: string[], textures: Record<string, Texture>) {
    super();
    this.image_names = image_names;
    this.textures = textures;
  }

  update() {
    this.removeChildren();
  }
}

export default Image3TextSprite;
