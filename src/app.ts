import Game from "./Game";
import Game1 from "./Game1";
import Game2 from "./Game2";
import Game3 from "./Game3";


const onload = () => {
  const btn1 = document.getElementById("task1");
  const btn2 = document.getElementById("task2");
  const btn3 = document.getElementById("task3");

  let game: Game;

  const start_game = (gameid: number) => {
    if (game) {
      game.destroy();
    }
    if (gameid === 1) {
      game = new Game1(document.body);
    } else if (gameid === 2) {
      game = new Game2(document.body);
    } else if (gameid === 3) {
      game = new Game3(document.body);
    }
    game
      .display()
      .load()
        .then(() => {
          game.start();
        });
  };

  btn1.onclick = () => {
    start_game(1);
  };

  btn2.onclick = () => {
    start_game(2);
  };

  btn3.onclick = () => {
    start_game(3);
  };
};

window.onload = onload;
