import vars from "./modules/vars.js";
import Bird from "./modules/bird.js";
import Ground from "./modules/ground.js";
import Column from "./modules/column.js";


let frame = 0; // frame number in current second
let score = 0;

const canvasElement = document.getElementById("c");
const context = canvasElement.getContext("2d");

const canvasHeight = Math.floor(window.innerHeight);
const canvasWidth = Math.floor(canvasHeight * 9/16);
canvasElement.width = canvasWidth;
canvasElement.height = canvasHeight;

// calculate gravity
// in 5 seconds gravity must pull bird top to bottom
vars.GRAVITY = Math.floor(canvasHeight / (-1 * 5 * vars.FPS));

// sprite
const sprite = new Image();
sprite.src = "sprite.png";

// game elements
const bird = new Bird(context, sprite);
const ground = new Ground(context, sprite);
const columns = new Column(context, sprite);

// bind event on  column revive to inscrease score
columns.onRevive = increaseScore;

canvasElement.onclick = () => {
    bird.jump();
}

const gameInterval = setInterval(() => {
    // clear canvas
    context.clearRect(0, 0, canvasWidth,canvasHeight);

    // draw bird
    bird.draw(frame);

    // draw ground
    ground.draw(frame);

    // draw columns
    columns.draw(frame);


    // check if bird touched ground
    if(bird.isTouchingGround(ground)) {
        alert("Game Over");
        clearInterval(gameInterval);
    }

    // check if bird touched columns
    if(bird.isTouchingColumns(columns)) {
        alert("Game Over");
        clearInterval(gameInterval);
    }

    // print score
    context.fillStyle = "black";
    context.textAlign = "center";
    context.font = "38px Arial";
    context.fillText(score, canvasWidth/2, 40);

    frame = (frame + 1) % vars.FPS;

}, 1000 / vars.FPS);

function increaseScore() {
    score += 1;
}