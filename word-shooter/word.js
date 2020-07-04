import helper from './helper.js';

export default class Word {
    constructor(word) {
        // events
        this.onDie = null;
        this.onHit = null;

        this.init(word);
        this.createElement();
        this.resetStartPosition();
    }

    // sets Word's properties
    init(word) {
        this.word = word;
        this.letters = word.split("");

        // if DOM element crated, change it's innerText
        if(this.el) {
            this.el.innerText = this.word;
        }
    }

    createElement() {
        this.el = document.createElement("div");
        this.el.innerText = this.word;
        this.el.classList.add("word");

        helper.wrapper.append(this.el);
    
        // set margin to center element in the view
        this.el.style.margin = `-${this.el.offsetHeight/2}px 0 0 -${this.el.offsetWidth/2}px`;
    }

    resetStartPosition() {
        // a random angle of entrance to view
        this.angle = helper.random(0, 360);

        // some trigonometry
        const x = Math.sin(this.angle * (Math.PI / 180)) * helper.radius;
        const y = Math.cos(this.angle * (Math.PI / 180)) * helper.radius;

        // move element to x,y
        this.elTransform = `translate(${x}px, ${y}px)`;
        // rotate to target
        this.elTransform += `rotate(${180 - this.angle}deg)`;
        
        this.el.style.transform = this.elTransform;
    }

    attack() {
        const sequence = [{
            offset: 0,
            transform: this.elTransform
        },{
            offset: 1,
            transform: `rotate(${180 - this.angle}deg) translate(0,0)`
        }];

        this.attackAnimation = this.el.animate(sequence, {
            duration: 20000,
            delay: 0
        });

        this.attackAnimation.onfinish = () => {
            // if animation finishes hero got hit
            this.onHit(this);
        };
    }

    stop() {
        this.attackAnimation.pause();
    }

    damage(letter) {
        this.letters.splice(0,1);
        this.el.innerText = this.letters.join("");

        if(!this.el.classList.contains("target")) {
            this.el.classList.add("target");
        }

        if(this.letters.length === 0) {
            this.onDie(this);
        }
    }

    reset(word) {
        this.el.classList.remove("target");
        this.init(word);
        this.resetStartPosition();
        this.attackAnimation.cancel();

        this.attack();
    }
}