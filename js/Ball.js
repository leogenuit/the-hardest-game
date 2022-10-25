export default class Ball {
  constructor(c, player, { position }) {
    this.c = c;
    this.player = player;
    this.velocity = {
      x: 7,
      y: 0,
    };
    this.image = null;
    this.width = 40;
    this.height = 40;
    this.image = new Image();
    this.image.src = "./../styles/img/ball.png";

    this.position = {
      x: position.x,
      y: position.y,
    };
  }

  draw() {
    this.c.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height === this.player.position) {
      console.log("you'r died");
    }
    this.draw();
  }
}
