class Cell{
    constructor() {
        this.index = null;
        this.element = null;
        this.direction = null;
        this.isSnake = null;
    }

    setElement(el) {
        this.element = el;
    }

    setIndex(i) {
        this.index = i;
    }

    setSnake(part, direction) {
        this.resetSnakeClasses();
        
        this.element.classList.add('is' + part);
        this.setDirection(direction);

        this.isSnake = true;
    }

    resetSnakeClasses() {
        this.element.classList.remove('isHead');
        this.element.classList.remove('isBody');
        this.element.classList.remove('isTail');
    }

    resetDirectionClasses() {
        this.element.classList.remove('rightDirection');
        this.element.classList.remove('leftDirection');
        this.element.classList.remove('upDirection');
        this.element.classList.remove('downDirection');
    }

    setDirection(direction) {
        this.direction = direction;
        this.resetDirectionClasses();

        // set class
        this.element.classList.add(direction.toLowerCase() + 'Direction');
    }

    removeFood() {
        this.element.classList.remove('hasFood');
    }

    addFood() {
        this.element.classList.add('hasFood');
    }

    reset() {
        this.resetDirectionClasses();
        this.resetSnakeClasses();
        this.isSnake = false;
    }
}

export default Cell;