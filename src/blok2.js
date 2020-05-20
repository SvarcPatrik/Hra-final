export default class Blok2 {
  constructor() {
    this.image = document.getElementById("blok_img");
    this.height = 250;
    this.width = 150;
    this.position = {
      x: 460,
      y: 270
    };
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.y,
      this.position.x,
      this.width,
      this.height
    );
    //ctx.drawImage(this.image, 590, 300, 100, 20);
  }
}
