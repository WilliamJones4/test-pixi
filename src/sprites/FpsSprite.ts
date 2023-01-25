import { Text } from "pixi.js";


class FpsSprite extends Text {
  constructor() {
    super();
    this.x = 0;
    this.y = 0;
    this.style.fill = "white";
    this.fps = 60;
  }

  set fps(fps: number) {
    this.text = `FPS: ${ fps.toFixed() }`;
  }
}

export default FpsSprite;
