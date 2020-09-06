class Square {
    constructor() {
        this.isVisible = false;
        this.isBomb = false;
        this.element = null;
    }

    show() {
        this.element.classList.add("visible");
        this.isVisible = true;
    }
}

class Cell extends Square {
    constructor() {
        super();

        // count of bombs on neighbour squares
        this.value = 0;
    }

    increaseValue() {
        this.value += 1;
    }
}

class Bomb extends Square {
    constructor() {
        super();

        this.isBomb = true;
        this.value = "💣";
    }
}

export {Cell, Bomb}