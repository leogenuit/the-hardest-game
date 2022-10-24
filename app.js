const world = document.querySelector("#game-board");
const c = world.getContext("2d");

world.width = world.clientWidth;
world.height = world.clientHeight;

let frames = 0;

const keys = {
  ArrowUp: { pressed: false },
  ArrowDown: { pressed: false },
  ArrowLeft: { pressed: false },
  ArrowRight: { pressed: false },
};

class Player {
  constructor() {
    this.width = 30; // Largeur du player
    this.height = 30; // Hauteur du player
    this.position = {
      x: (world.width - this.width) / 2,
      y: world.height - this.height,
    };
  }
  draw() {
    c.fillStyle = "red"; // Le player sera un carré rouge
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
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
    // Prends la position du player
    // Ajoute sa vitesse de déplacement
    // Dessine à nouveau le player
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
            this.position.y < world.height - this.height
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
          if (keys[key].pressed && this.position.x < world.width - this.width) {
            this.moveRight();
          }
          break;

        default:
          console.log("nothing here");
          break;
      }
    }
    this.draw();
    // if (keys.ArrowLeft.pressed && this.position.x >= 0) {
    //   this.velocity.x = -3;
    // } else if (
    //   keys.ArrowRight.pressed &&
    //   this.position.x <= world.width - this.width
    // ) {
    //   this.velocity.x = +3;
    // } else if (keys.ArrowUp.pressed && this.position.y >= 0) {
    //   this.velocity.y = -3;
    // } else if (
    //   keys.ArrowDown.pressed &&
    //   this.position.y <= world.height - this.height
    // ) {
    //   this.velocity.y = +3;
    // } else {
    //   this.velocity.x = 0;
    //   this.velocity.y = 0;
    // }
  }
}
class ZoneWin {
  constructor() {
    this.width = 300;
    this.height = 50;
    this.position = {
      x: world.width / 2 - this.width / 2,
      y: 0,
    };
  }
  draw() {
    c.fillStyle = "rgb(6, 239, 22)";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
class Ball {
  constructor({ position }) {
    this.velocity = {
      x: 2,
      y: 0,
    };
    this.image = null;
    this.width = 40;
    this.height = 40;
    this.image = new Image();
    this.image.src = "./blue-ball.jpeg";

    this.position = {
      x: position.x,
      y: position.y,
    };
  }

  draw() {
    c.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update({ velocity }) {
    this.position.x += velocity.x;
    this.position.y += velocity.y;
    if (this.position.y + this.height === player.position) {
      console.log("you'r died");
    }
    this.draw();
  }
}
// class Grid {
//   constructor() {
//     this.position = { x: 0, y: 0 };
//     this.velocity = { x: 0.5, y: 0 };
//     this.arrayBalls = [];
//     let rows = Math.floor((world.height / 34) * (1 / 3));
//     const columns = Math.floor((world.width / 34) * (2 / 3));
//     this.height = rows * 34;
//     this.width = columns * 34;
//     for (let x = 0; x < columns; x++) {
//       for (let y = 0; y < rows; y++) {
//         this.arrayBalls.push(
//           new Ball({
//             position: {
//               x: x * 34,
//               y: y * 34,
//             },
//           })
//         );
//       }
//     }
//   }
//   update() {
//     this.position.x += this.velocity.x;
//     this.position.y += this.velocity.y;
//     this.velocity.y = 0;
//     if (this.position.x + this.width >= world.width || this.position.x == 0) {
//       this.velocity.x = -this.velocity.x;
//       this.velocity.y = 32;
//     }
//   }
// }
function finishedLevel() {
  if (
    player.position.y < zoneWin.position.y + zoneWin.height - player.height &&
    player.position.x < zoneWin.position.x + zoneWin.width - player.width &&
    player.position.x > zoneWin.position.x
  )
    console.log("⚜️⚡️💥🔥🌈 YOU WIN 🌈🔥💥⚜️⚡️ height");

  {
    //alert("⚜️⚡️💥🔥🌈 YOU WIN 🌈🔥💥⚜️⚡️");
  }
}
// let grids = [new Grid()];
const player = new Player(world);
const zoneWin = new ZoneWin();
// const badBall = new Ball(50, 50);
// //Boucle d'animation
// console.log(badBall);
const groupOfBalls = [
  new Ball({ position: { x: 50, y: world.height / 2 } }),
  new Ball({ position: { x: 150, y: world.height / 2 } }),
  new Ball({ position: { x: 250, y: world.height / 2 } }),
  new Ball({ position: { x: 350, y: world.height / 2 } }),
  new Ball({ position: { x: 500, y: world.height / 2 } }),
  new Ball({ position: { x: 600, y: world.height / 2 } }),
  new Ball({ position: { x: 700, y: world.height / 2 } }),
  new Ball({ position: { x: 800, y: world.height / 2 } }),
];

const animationLoop = () => {
  c.clearRect(0, 0, world.width, world.height);
  zoneWin.draw();

  player.update();
  for (const ball of groupOfBalls) {
    ball.update({ velocity: { x: 2, y: 0 } });
  }
  // badBall.update({ velocity: { x: 2, y: 0 } });
  finishedLevel();

  // grids.forEach((grid, indexGrid)=> {
  //   grid.update();
  //   grid.arrayBalls.forEach
  // })

  frames++;
  requestAnimationFrame(animationLoop);
};

animationLoop();

addEventListener("keydown", ({ key }) => {
  //console.log(key);
  switch (key) {
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      // console.log("lefttttt");
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

addEventListener("keyup", ({ key }) => {
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
