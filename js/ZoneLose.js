export default class ZoneLose {
  constructor(c, world, position) {
    this.c = c;
    this.world = world;
    (this.width = 182),
      (this.height = 700),
      (this.position = {
        x: position === "right" ? this.world.width - this.width : 0,
        y: 0,
      });
  }
  draw() {
    this.c.fillStyle = "#000";
    this.c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
