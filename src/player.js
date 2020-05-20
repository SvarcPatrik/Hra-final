import "/src/index.js";
import "/src/game.js";
import "/src/blok1.js";
import "/src/blok2.js";
import "/src/blok3.js";

export default class Player {
  constructor(game) {
    this.image = document.getElementById("player_img");
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.game = game;
    this.width = 50;
    this.height = 50;
    this.maxSpeedy = 20;
    this.speedy = 0;
    this.maxSpeedx = 3;
    this.speedx = 0;
    this.jump = true;
    this.position = {
      x: game.gameWidth / 2 - this.width / 2,
      y: game.gameHeight - this.height - 13.5
    };
  }

  moveLeft() {
    this.speedx = -this.maxSpeedx;
  }
  moveRight() {
    this.speedx = this.maxSpeedx;
  }

  Jump() {
    if (this.jump === true) {
      this.speedy = -this.maxSpeedy;
      this.jump = false;
    }
  }

  stop() {
    this.speedy = 0;
    this.speedx = 0;
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update(deltaTime) {
    this.speedy += 0.5;
    this.speedy *= 0.99;
    this.position.x += this.speedx;
    this.position.y += this.speedy;

    // kolizia z lava a prava
    if (this.position.x < 0) {
      this.position.x = 0;
    }
    if (this.position.x + this.width > this.gameWidth) {
      this.position.x = this.gameWidth - this.width;
    }

    // kolizia zo spodkom mapy
    if (this.position.y > this.gameHeight - 13.5 - this.height) {
      this.position.y = this.gameHeight - this.height - 13.5;
      this.jump = true;
      this.speedy = 0;
    }

    // kolizia z blokom
    let bottomOfPlayer = this.position.y + this.height;
    let rightSideOfPlayer = this.position.x;
    let leftSideOfPlayer = this.position.x + this.width;
    let topOfPlayer = this.position.y;
    // blok1
    let topOfBlok1 = this.game.blok1.position.y;
    let rightSideOfBlok1 = this.game.blok1.position.x;
    let leftSideOfBlok1 = this.game.blok1.position.x + this.game.blok1.width;
    // blok2
    let topOfBlok2 = this.game.blok2.position.y;
    let rightSideOfBlok2 = this.game.blok2.position.x;
    let leftSideOfBlok2 = this.game.blok2.position.x + this.game.blok2.width;
    // blok3
    let topOfBlok3 = this.game.blok3.position.y;
    let rightSideOfBlok3 = this.game.blok3.position.x;
    let leftSideOfBlok3 = this.game.blok3.position.x + this.game.blok3.width;
    let bottomOfBlok3 = this.game.blok3.position.y + this.game.blok3.height;

    // kolizia z blok1
    if (
      bottomOfPlayer >= topOfBlok1 &&
      rightSideOfPlayer >= leftSideOfBlok1 &&
      leftSideOfPlayer <= rightSideOfBlok1
    ) {
      this.position.y = this.game.blok1.position.y - this.height;
    }
    // kolizia z blok2
    if (
      bottomOfPlayer >= topOfBlok2 &&
      rightSideOfPlayer >= leftSideOfBlok2 &&
      leftSideOfPlayer <= rightSideOfBlok2
    ) {
      this.position.y = this.game.blok2.position.y - this.height;
    }

    //kolizia z blok3
    if (
      bottomOfPlayer >= topOfBlok3 &&
      rightSideOfPlayer >= leftSideOfBlok3 &&
      leftSideOfPlayer <= rightSideOfBlok3 &&
      topOfPlayer <= bottomOfBlok3
    ) {
      this.position.y = this.game.blok3.position.y - this.height;
    }
  }
}
