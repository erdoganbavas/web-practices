document.addEventListener("DOMContentLoaded", () => {
    const button = new Explosive("button");
})

class Explosive{
    constructor(el) {
        this.element = document.querySelector(el);
        this.particleHeight = 0;
        this.particleWidth = 0;
        this.columnCount = 25;
        this.rowCount = 10;
        this.duration = 1000;

        this.updateDimensions();

        if (document.body.animate) {
            this.element.addEventListener("click", this.explode.bind(this, this.duration));
        }
    }

    // sets dimension vars
    updateDimensions() {
        this.particleWidth = this.element.offsetWidth / this.columnCount;
        this.particleHeight = this.element.offsetHeight / this.rowCount;
    }

    explode(duration) {
        if(!this.element.classList.contains("exploding")) {
            this.element.classList.add("exploding");

            this.createParticles(this.columnCount * this.rowCount, duration);
        }
    }

    createParticles(count, duration) {
        for (let particleIndex = 0; particleIndex < count; particleIndex++) {
            // position of particle
            const particleColumn = (this.particleWidth / 2) + this.particleWidth * (particleIndex % this.columnCount),
                  particleRow = (this.particleHeight / 2) + this.particleWidth * Math.floor(particleIndex / this.columnCount);


            new Particle(this.element, particleColumn, particleRow, this.particleWidth, this.particleHeight, duration);
        }
    }
}


class Particle {
    constructor(parent, column, row, w, h, duration) {
        const parentWidth = parent.offsetWidth;
        const parentHeight = parent.offsetHeight;

        this.startPosition = {
            x: column - w/2,
            y: row - h/2
        }

        const targetFactor = randomFloat(.5, 2);
        this.targetPosition = {
            x: targetFactor * (this.startPosition.x + this.startPosition.x - parentWidth/2),
            y: targetFactor * (this.startPosition.y + this.startPosition.y - parentHeight/2)
        };

        const maxAngle = 360,
            rotX = randomInt(0, maxAngle),
            rotY = randomInt(0, maxAngle),
            rotZ = randomInt(0, maxAngle);

        this.div = document.createElement("div");
        this.div.className = "particle moving";
        this.div.style.width = w + "px";
        this.div.style.height = h + "px";
        this.div.style.transform = `translate(${this.startPosition.x}px, ${this.startPosition.y}px) rotateX(0) rotateY(0) rotateZ(0)`;
    
        parent.appendChild(this.div);

        this.runSequence(this.div, [
            {
                opacity: 1,
                transform: `translate(${this.startPosition.x}px, ${this.startPosition.y}px) rotateX(0) rotateY(0) rotateZ(0)`,
                offset: 0
            },
            {
                opacity: .6,
                transform: `translate(${this.targetPosition.x}px, ${this.targetPosition.y}px) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotY}deg)`,
                offset: .98
            },
            {
                opacity: 1,
                transform: `translate(${this.startPosition.x}px, ${this.startPosition.y}px) rotateX(0) rotateY(0) rotateZ(0)`,
                offset: 1
            }
        ], duration, randomFloat(0, 100));
    }

    runSequence(el, keyframes, duration, delay) {
        let animation = el.animate(keyframes, {
            duration: duration,
            easing: "cubic-bezier(0.25, 1, 0.25, 1)",
            delay: delay
        });

        animation.onfinish = () => {
            el.classList.remove("moving");

            // reset to button if no moving particle
            if(!document.querySelector(".particle.moving")) {
                el.parentElement.className = "";
                el.parentElement.innerHTML = "Explode";
            }
        };
    }
}

function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

function randomInt(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}