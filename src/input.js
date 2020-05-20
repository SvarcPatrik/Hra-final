export default class InputHandler {
  constructor(player, game) {
    document.addEventListener("keydown", event => {
      switch (event.keyCode) {
        case 37:
          player.moveLeft();
          break;

        case 39:
          player.moveRight();
          break;

        case 38:
          player.Jump();
          break;

        case 27:
          game.tooglePause();
          break;

        case 13:
          game.start();
          break;

        case 73:
          game.toogleInfo();
          break;

        case 77:
          game.toogleMusic();
          break;
      }
    });

    document.addEventListener("keyup", event => {
      switch (event.keyCode) {
        case 37:
          if (player.speedx < 0) {
            player.stop();
          }
          break;

        case 39:
          if (player.speedx > 0) {
            player.stop();
          }
          break;

        case 38:
          if (player.speedy < 0) {
            player.stop();
          }
          break;
      }
    });
  }
}
