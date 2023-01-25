import { Text } from "pixi.js";


class FpsSprite extends Text {
  constructor() {
    super();
    this.x = 50;
    this.y = 100;
    this.style.fill = "white";
    this.fps = 60;
  }

  set fps(fps: number) {
    this.text = `FPS: ${ fps.toFixed() }`;
  }
}

export default FpsSprite;
