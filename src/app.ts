import Game2 from "./Game2";

const game = new Game2(document.body);
game
  .display()
  .load()
    .then(() => {
      game.start();
    });
