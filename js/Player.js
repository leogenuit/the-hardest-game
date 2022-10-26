const keys = {
  ArrowUp: { pressed: false },
  ArrowDown: { pressed: false },
  ArrowLeft: { pressed: false },
  ArrowRight: { pressed: false },
};

export default class Player {
  constructor(c, world) {
    this.world = world;
    this.c = c;
    this.width = 30; // Largeur du player
    this.height = 30; // Hauteur du player
    this.position = {
      x: (world.width - this.width) / 2,
      y: world.height - this.height,
    };
  }
  draw() {
    this.c.beginPath();
    this.c.fillStyle = "#fd0201"; // Le player sera un carré rouge
    this.c.strokeStyle = "black";
    this.c.lineWidth = 4;
    this.c.fillRect(this.position.x, this.position.y, this.width, this.height);
    this.c.strokeRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  moveUp() {
    this.position.y -= 3;
  }
  moveDown() {
    this.position.y += 3;
  }
  moveLeft() {
    this.position.x -= 3;
  }
  moveRight() {
    this.position.x += 3;
  }

  update() {
    for (const key in keys) {
      switch (key) {
        case "ArrowUp":
          if (keys[key].pressed && this.position.y > 0) {
            this.moveUp();
          }
          break;
        case "ArrowDown":
          if (
            keys[key].pressed &&
            this.position.y < this.world.height - this.height
          ) {
            this.moveDown();
          }
          break;
        case "ArrowLeft":
          if (keys[key].pressed && this.position.x > 0) {
            this.moveLeft();
          }
          break;
        case "ArrowRight":
          if (
            keys[key].pressed &&
            this.position.x < this.world.width - this.width
          ) {
            this.moveRight();
          }
          break;

        default:
          console.log("nothing here");
          break;
      }
    }
    this.draw();
  }
}
document.addEventListener("keydown", ({ key }) => {
  //console.log(key);
  switch (key) {
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      console.log("lefttttt");
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      // console.log("righttttt");
      break;
    case "ArrowUp":
      keys.ArrowUp.pressed = true;
      // console.log("uuuup");
      break;
    case "ArrowDown":
      keys.ArrowDown.pressed = true;
      // console.log("doooown");
      break;
  }
});

document.addEventListener("keyup", ({ key }) => {
  //console.log(key);
  switch (key) {
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      // console.log("lefttttt");
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      // console.log("righttttt");
      break;
    case "ArrowUp":
      keys.ArrowUp.pressed = false;
      // console.log("uuuuuuuuuuuup");
      break;
    case "ArrowDown":
      keys.ArrowDown.pressed = false;
      // console.log("doooown");
      break;
  }
});
