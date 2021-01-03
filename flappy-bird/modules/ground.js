import vars from "./vars.js";

export default class Ground {
    constructor(context, sprite) {
        this.context = context;
        this.sprite = sprite;
        
        this.height = 56 * this.context.canvas.height / 256;
        this.width = 168 * this.context.canvas.width / 144;

        this.position = {
            x: 0,
            y: this.context.canvas.height - this.height
        }

        // ground image has 12px pattern loop
        // move 2px on every frame than turn back
        this.frames = [
            {x: 292, y:0},
            {x: 294, y:0},
            {x: 296, y:0},
            {x: 298, y:0},
            {x: 300, y:0},
            {x: 302, y:0},
            {x: 304, y:0},
        ]
    }

    draw(frame) {
        // regulate frame
        frame = Math.floor(frame * this.frames.length / vars.FPS);

        this.context.drawImage(
            this.sprite,
            this.frames[frame%this.frames.length].x,
            this.frames[frame%this.frames.length].y,
            168, 56,
            this.position.x, this.position.y,
            this.width, this.height
        )
    }
}