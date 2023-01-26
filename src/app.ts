import Game1 from "./Game1";
import Game2 from "./Game2";
import Game3 from "./Game3";


const game = new Game3(document.body);
game
  .display()
  .load()
    .then(() => {
      game.start();
    });
