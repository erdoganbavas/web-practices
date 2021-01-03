import vars from "./vars.js";

export default class Column {
    constructor(context, sprite) {
        this.context = context;
        this.sprite = sprite;
        
        // this is the gap between top and bottom column
        // 1/4 of the canvas height
        this.gap = this.context.canvas.height * .25;
        this.gapTopPosition = this.context.canvas.height * .3;

        this.height = 160 * this.context.canvas.height / 256;
        this.width = 26 * this.context.canvas.width / 144;

        this.position = {
            x: this.context.canvas.width, // start right side of canvas
            topY: this.gapTopPosition - this.height, // top column y position
            bottomY: this.gapTopPosition + this.gap // bottom column y position
        }

    }

    draw(frame) {
        // check if out of canvas
        if(this.position.x + this.width < 0) {
            this.reviveColumn();
        }

        // regulate frame - optional
        frame = Math.floor(frame * 9 / vars.FPS);

        // in 3 seconds pass whole canvas
        this.position.x -= this.context.canvas.width / (3 * vars.FPS);

        // draw top
        this.context.drawImage(
            this.sprite,
            56, 323,
            26, 160,
            this.position.x, this.position.topY,
            this.width, this.height
        );

        // draw bottom
        this.context.drawImage(
            this.sprite,
            84, 323,
            26, 160,
            this.position.x, this.position.bottomY,
            this.width, this.height
        );
    }

    reviveColumn() {
        this.position.x = this.context.canvas.width;

        // generate a random number between .1 - .5
        let randNum = Math.floor(Math.random() * 50) / 100;
        randNum = randNum < .1 ? .1 : randNum;

        this.gapTopPosition = this.context.canvas.height * randNum;
        this.position.topY = this.gapTopPosition - this.height;
        this.position.bottomY = this.gapTopPosition + this.gap;
        
        this.onRevive();
    }
}