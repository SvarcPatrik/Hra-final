import Player from "./player";
import InputHandler from "./input";
import Background from "./bg";
import Old from "./old";
import Coin from "./coin";
import Music from "./music";
import Blok1 from "./blok1";
import Blok2 from "./blok2";
import Blok3 from "./blok3";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  INFO: 3
};

const MUSIC = {
  PAUSA: 0,
  RUN: 1
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.main = document.getElementById("menu_img");
    this.image = document.getElementById("musicp.png");
    this.image1 = document.getElementById("musicr.png");

    this.gamestate = GAMESTATE.MENU;
    this.music = MUSIC.PAUSA;
    this.player = new Player(this);
    this.bg = new Background();
    this.old = new Old();
    this.coin = new Coin();
    this.blok1 = new Blok1();
    this.blok2 = new Blok2();
    this.blok3 = new Blok3();
    new InputHandler(this.player, this);
    let bmg = new Music();
  }

  start() {
    this.gamestate = GAMESTATE.RUNNING;
    this.music = MUSIC.RUN;
    bgm.play();
  }

  update(deltaTime) {
    if (
      this.gamestate === GAMESTATE.PAUSED ||
      this.gamestate === GAMESTATE.MENU
    ) {
      return;
    }
    if (this.music === MUSIC.PAUSA) {
      bgm.pause();
    } else {
      bgm.play();
    }
    this.player.update(deltaTime);
  }

  draw(ctx) {
    this.bg.draw(ctx);
    this.coin.draw(ctx);
    this.old.draw(ctx);
    this.blok1.draw(ctx);
    this.blok2.draw(ctx);
    this.blok3.draw(ctx);
    this.player.draw(ctx);

    if (this.gamestate === GAMESTATE.PAUSED) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
    }

    if (this.gamestate === GAMESTATE.MENU) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();
      //ctx.drawImage(this.main, 0, 0, this.width, this.height);
      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(
        "Stlač ENTER pre štart",
        this.gameWidth / 2,
        this.gameHeight / 2
      );

      ctx.fillText(
        "Pre návod na ovládanie stlač I",
        this.gameWidth / 2,
        this.gameHeight / 2 + 50
      );
    }

    if (this.gamestate === GAMESTATE.INFO) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(
        "Pohybuješ sa pomcou šípiek doľava a doprava",
        this.gameWidth / 2,
        this.gameHeight / 2
      );
      ctx.fillText(
        "Skáčeš pomocou šípky hore",
        this.gameWidth / 2,
        this.gameHeight / 2 + 50
      );

      ctx.fillText(
        "Stlačením M spustíte/vypnete hudbu",
        this.gameWidth / 2,
        this.gameHeight / 2 + 200
      );

      ctx.fillText(
        "->Opätovným stlačením I sa vrátite do Menu<-",
        this.gameWidth / 2,
        this.gameHeight / 2 + 100
      );

      ctx.fillText(
        "->Dvojitým stlačením ESC sa vrátite do hry<-",
        this.gameWidth / 2,
        this.gameHeight / 2 + 150
      );

      ctx.fillText(
        "Cieľom hry je dostať sa na vrchol veže",
        this.gameWidth / 2,
        this.gameHeight / 2 - 150
      );
    }

    if (this.music === MUSIC.PAUSA) {
      ctx.font = "20px Arial";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.fillText("Music muted", 60, 30);
    }

    if (this.music === MUSIC.RUN) {
      ctx.font = "20px Arial";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.fillText("Music playing", 65, 30);
    }
  }

  toogleMusic() {
    if (this.music === MUSIC.PAUSA) {
      this.music = MUSIC.RUN;
    } else {
      this.music = MUSIC.PAUSA;
    }
  }

  tooglePause() {
    if (this.gamestate === GAMESTATE.PAUSED) {
      this.gamestate = GAMESTATE.RUNNING;
    } else {
      this.gamestate = GAMESTATE.PAUSED;
    }
  }

  toogleInfo() {
    if (this.gamestate === GAMESTATE.INFO) {
      this.gamestate = GAMESTATE.MENU;
    } else {
      this.gamestate = GAMESTATE.INFO;
    }
  }
}
