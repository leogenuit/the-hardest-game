import Player from "./Player.js";
import Ball from "./Ball.js";
import ZoneLose from "./ZoneLose.js";
import ZoneWin from "./ZoneWin.js";

const world = document.querySelector("#game-board");
const c = world.getContext("2d");

world.width = world.clientWidth;
world.height = world.clientHeight;

let frames = 0;

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
function deadFence() {
  if (
    player.position.x < zoneLoseLeft.position.x + zoneLoseLeft.width ||
    player.position.x + player.width > zoneLoseRight.position.x
  ) {
    player.position.x = (world.width - player.width) / 2;
    player.position.y = world.height - player.height;

    console.log("you're died :(");
  }
}
function bounceBall() {
  groupOfBalls.forEach((ball) => {
    if (ball.position.x > world.width - ball.width || ball.position.x <= 0) {
      ball.velocity.x *= -1;
    }
  });
}

const player = new Player(c, world);
const zoneWin = new ZoneWin(c, world);
const groupOfBalls = [
  new Ball(c, player, { position: { x: 50, y: world.height / 2 } }),
  new Ball(c, player, { position: { x: 150, y: world.height / 2 } }),
  new Ball(c, player, { position: { x: 250, y: world.height / 2 } }),
  new Ball(c, player, { position: { x: 500, y: world.height / 2 } }),
  new Ball(c, player, { position: { x: 350, y: world.height / 2 } }),
  new Ball(c, player, { position: { x: 600, y: world.height / 2 } }),
  new Ball(c, player, { position: { x: 700, y: world.height / 2 } }),
  new Ball(c, player, { position: { x: 800, y: world.height / 2 } }),
];
const zoneLoseLeft = new ZoneLose(c, world, "left");
const zoneLoseRight = new ZoneLose(c, world, "right");

const animationLoop = () => {
  c.clearRect(0, 0, world.width, world.height);
  zoneWin.draw();
  zoneLoseLeft.draw();
  zoneLoseRight.draw();

  player.update();
  for (const ball of groupOfBalls) {
    ball.update();
  }
  bounceBall();
  finishedLevel();
  deadFence();

  frames++;
  requestAnimationFrame(animationLoop);
};

animationLoop();
