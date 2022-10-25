export default class ZoneWin {
  constructor(c, world) {
    this.c = c;
    this.width = 320;
    this.height = 50;
    this.position = {
      x: world.width / 2 - this.width / 2,
      y: 0,
    };
  }
  draw() {
    this.c.fillStyle = "#a6fda1";
    this.c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
