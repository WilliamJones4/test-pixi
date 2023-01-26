import { Assets } from "pixi.js";
import Game from "./Game";
import Image3TextSprite from "./sprites/Image3TextSprite";


class Game2 extends Game {
  private static T: number = 2000;

  private readonly image_files: string[];
  private image3TextSprite: Image3TextSprite;
  private last_action_time: number;

  constructor(parent: HTMLElement) {
    super(parent);
    this.image_files = [
      'ac-adapter',
      'appointment-missed',
      'appointment-soon',
      'audio-speakers',
      'battery-caution-charging',
      'battery-empty',
      'battery-full-charged',
      'battery-full-charging',
      'battery-full',
      'battery-good-charging',
      'battery-good',
      'battery-low-charging',
      'battery-missing',
      'computer-fail',
      'computer'
    ];

    this.last_action_time = 0;
  }

  load() {
    this.image_files.forEach(image_name => {
      Assets.add(image_name, `/images/${ image_name }.png`);
    });

    const texturesPromise = Assets.load(this.image_files);

    return new Promise((resolve: (...args: any) => any, reject) => {
      texturesPromise
        .then((textures) => {
          this.image3TextSprite = new Image3TextSprite(this.image_files, textures);
          this.stage.addChild(this.image3TextSprite);
          resolve();
          console.log('OK');
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  tickerListener(): void {
    super.tickerListener();

    if (this.last_action_time + Game2.T < this.lastTime) {
      this.image3TextSprite.update();
      this.last_action_time = this.lastTime;
    }
  }
}


export default Game2;
