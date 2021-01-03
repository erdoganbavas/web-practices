import vars from "./vars.js";

export default class Bird {
    constructor(context, sprite) {
        this.context = context;
        this.sprite = sprite;

        // initial position of bird
        this.position = {
            x: 0, y: 0
        }

        // positions of bird on sprite image
        this.frames = [
            {x: 3, y: 491},
            {x: 31, y: 491},
            {x: 59, y: 491}            
        ];

        // bird's dimensions on canvas according to background image
        this.width = 17 * this.context.canvas.width / 144;
        this.height = 12 * this.context.canvas.height / 256;
    }

    draw(frame) {
        // regulate frame. sprite seems 9 FPS
        frame = Math.floor(frame * 9 / vars.FPS);

        // add gravity
        this.position.y = Math.max(0, this.position.y - vars.GRAVITY);

        this.context.drawImage(
            this.sprite,
            this.frames[frame%this.frames.length].x,
            this.frames[frame%this.frames.length].y,
            17, 12, // bird's dimension on sprite image
            this.position.x, this.position.y, // bird's position on canvas
            this.width, this.height // bird's dimension on canvas
        )
    }

    jump() {
        this.position.y += vars.GRAVITY * vars.FPS * .6;
    }

    isTouchingGround(ground) {
        return (this.position.y + this.height) > (this.context.canvas.height - ground.height);
    }

    isTouchingColumns(columns) {
        if( (this.position.x + this.width) > columns.position.x ) {
            if(
                this.position.y < columns.gapTopPosition ||
                this.position.y > (columns.gapTopPosition + columns.gap)
            ) {
                return true;
            }
        }

        return false;
    }
}