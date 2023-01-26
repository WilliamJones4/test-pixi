import { AnimatedSprite, BaseTexture, Spritesheet } from "pixi.js";

import Game from "./Game";


const w = 136;
const h = 685;


const fireImageData = {
  frames: {
    fire_1: {
      frame: {
        x: 90,
        y: 0,
        w: 120, h
      },
      sourceSize: {
        w: 120, h
      },
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 120, h
      }
    },
    fire_2: {
      frame: {
        x: 90 + w,
        y: 0,
        w: 120, h
      },
      sourceSize: {
        w: 120, h
      },
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 120, h
      }
    },
    fire_3: {
      frame: {
        x: 90 + w * 2,
        y: 0,
        w: 120, h
      },
      sourceSize: {
        w: 120, h
      },
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 120, h
      }
    },
    fire_4: {
      frame: {
        x: 90 + w * 3,
        y: 0,
        w: 120, h
      },
      sourceSize: {
        w: 120, h
      },
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 120, h
      }
    },
    fire_5: {
      frame: {
        x: 90 + w * 4,
        y: 0,
        w: 120, h
      },
      sourceSize: {
        w: 120, h
      },
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 120, h
      }
    },
  },
  meta: {
    image: "./images/fire.png",
    format: "RGB888",
    size: {
      w: 980,
      h: 685
    },
    scale: "1"
  },
  animations: {
    fire: [
      "fire_1",
      "fire_2",
      "fire_3",
      "fire_4",
      "fire_5"
    ]
  }
};


class Game3 extends Game {
  private readonly spriteSheet: Spritesheet;
  private fire_animation: AnimatedSprite;

  constructor(parent: HTMLElement) {
    super(parent, "#241f21");

    this.spriteSheet = new Spritesheet(
      BaseTexture.from(fireImageData.meta.image),
      fireImageData
    );
  }

  async load() {
    return this.spriteSheet.parse();
  }

  start() {
    this.fire_animation = new AnimatedSprite(this.spriteSheet.animations.fire);
    this.fire_animation.animationSpeed = 0.083333;
    this.fire_animation.play();
    this.fire_animation.anchor.set(0.5);
    this.fire_animation.position.x = this.screen.width / 2;
    this.fire_animation.position.y = this.screen.height / 2;

    this.stage.addChild(this.fire_animation);
  }
}

export default Game3;
