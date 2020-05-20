export default class Blok3 {
  constructor() {
    this.image = document.getElementById("blok_img");
    this.height = 20;
    this.width = 100;
    this.position = {
      x: 300,
      y: 590
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
