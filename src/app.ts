import Game3 from "./Game3";


const game = new Game3(document.body);
game
  .display()
  .load()
    .then(() => {
      game.start();
    });
