import Player from "./Player.js";
import Ball from "./Ball.js";
import ZoneLose from "./ZoneLose.js";
import ZoneWin from "./ZoneWin.js";

let levelIndex = 0;
let groupOfBalls = [];
const world = document.querySelector("#game-board");
const c = world.getContext("2d");

const playTheGame = document.querySelector("#play-the-game");
const playTheRules = document.querySelector("#play-the-rules");
const game = document.querySelector("#game");
const main = document.querySelector("#main");
const rules = document.querySelector("#rules");
const deathTotal = document.querySelector("#death-amount");
const levelActual = document.querySelector("#level-up");
const audio = document.querySelector("#audio");
const winScreen = document.querySelector("#win-screen");
const getSurprise = document.querySelector("#get-surprise");
const surprise = document.querySelector("#surprise");
const exorciste = document.querySelector("#exorciste");

let deathCounter = 0;
let levelCounter = 1;
let frameId = null;

function showWinScreen() {
  game.classList.add("hidden");
  winScreen.classList.remove("hidden");
}

playTheGame.addEventListener("click", (e) => {
  e.preventDefault();
  audio.play();
  main.classList.add("hidden");
  game.classList.remove("hidden");
  createNewLevel();
  animationLoop();
});

playTheRules.addEventListener("click", (e) => {
  e.preventDefault();
  main.classList.add("hidden");
  rules.classList.remove("hidden");
  // animationLoop();
});

getSurprise.addEventListener("click", (e) => {
  e.preventDefault();
  audio.pause();
  exorciste.play();
  winScreen.classList.add("hidden");
  surprise.classList.remove("hidden");
});

world.width = window.innerWidth * 0.8;
world.height = window.innerHeight * 0.7;

let frames = 0;

function createNewLevel() {
  groupOfBalls = levels[levelIndex].balls.map((ball) => {
    return new Ball(c, player, ball);
  });
  // levels[levelIndex].zonesLose
}

function finishedLevel() {
  if (
    player.position.y < zoneWin.position.y + zoneWin.height - player.height &&
    player.position.x < zoneWin.position.x + zoneWin.width - player.width &&
    player.position.x > zoneWin.position.x
  ) {
    if (levelCounter === 5) {
      console.log(frameId);
      cancelAnimationFrame(frameId);
      showWinScreen();
      return;
    }
    newLevel();
    levelCounter += 1;
    levelActual.textContent = levelCounter;
  }
}
function respawn() {
  player.position.x = (world.width - player.width) / 2;
  player.position.y = world.height - player.height;
  deathTotal.textContent = deathCounter;
}
function deadFence() {
  if (
    player.position.x < zoneLoseLeft.position.x + zoneLoseLeft.width ||
    player.position.x + player.width > zoneLoseRight.position.x
  ) {
    deathCounter++;
    respawn();
    // console.log("you're died :(");
  }
}
function newLevel() {
  levelIndex++;
  createNewLevel();

  respawn();
}
function deadBall(ball) {
  const isInY =
    player.position.y < ball.position.y + ball.height &&
    player.position.y + player.height > ball.position.y;
  const isInX =
    player.position.x < ball.position.x + ball.width &&
    player.position.x + player.width > ball.position.x;
  if (isInY && isInX) {
    deathCounter++;
    respawn();
    console.log("dead");
  }
}

function bounceBall() {
  groupOfBalls.forEach((ball) => {
    if (ball.position.x > world.width - ball.width || ball.position.x <= 0) {
      ball.velocity.x *= -1;
    }
  });
}

const niveau1 = {
  balls: [{ position: { x: 0, y: 200 } }, { position: { x: 0, y: 350 } }],
  zonesLose: [{ position: { x: 0, y: 100 }, size: { x: 50, y: 100 } }],
};

const niveau2 = {
  balls: [
    { position: { x: 300, y: 200 } },
    { position: { x: 300, y: 400 } },
    { position: { x: 600, y: 200 } },
    { position: { x: 600, y: 400 } },
  ],
  zonesLose: [{ position: { x: 0, y: 100 }, size: { x: 300, y: 150 } }],
};
const niveau3 = {
  balls: [
    { position: { x: 300, y: 200 } },
    { position: { x: 300, y: 400 } },
    { position: { x: 300, y: 300 } },
    { position: { x: 600, y: 200 } },
    { position: { x: 600, y: 300 } },
    { position: { x: 600, y: 400 } },
  ],
  zonesLose: [{ position: { x: 0, y: 100 }, size: { x: 300, y: 150 } }],
};
const niveau4 = {
  balls: [
    { position: { x: 300, y: 200 } },
    { position: { x: 300, y: 400 } },
    { position: { x: 300, y: 300 } },
    { position: { x: 300, y: 100 } },
    { position: { x: 600, y: 100 } },
    { position: { x: 600, y: 200 } },
    { position: { x: 600, y: 300 } },
    { position: { x: 600, y: 400 } },
  ],
  zonesLose: [{ position: { x: 0, y: 100 }, size: { x: 300, y: 150 } }],
};
const niveau5 = {
  balls: [
    { position: { x: 0, y: 100 } },
    { position: { x: 0, y: 150 } },
    { position: { x: 0, y: 200 } },
    { position: { x: 0, y: 250 } },
    { position: { x: 0, y: 300 } },
    { position: { x: 0, y: 350 } },
    { position: { x: 0, y: 400 } },
  ],
  zonesLose: [{ position: { x: 0, y: 100 }, size: { x: 50, y: 100 } }],
};

const player = new Player(c, world);
const zoneWin = new ZoneWin(c, world);
const levels = [niveau1, niveau2, niveau3, niveau4, niveau5];
const zoneLoseLeft = new ZoneLose(c, world, "left");
const zoneLoseRight = new ZoneLose(c, world, "right");

const animationLoop = () => {
  console.log("run");
  c.clearRect(0, 0, world.width, world.height);
  zoneWin.draw();
  zoneLoseLeft.draw();
  zoneLoseRight.draw();

  player.update();
  for (const ball of groupOfBalls) {
    ball.update();
    deadBall(ball);
  }
  bounceBall();
  deadFence();

  frames++;
  frameId = requestAnimationFrame(animationLoop);
  finishedLevel();
};
