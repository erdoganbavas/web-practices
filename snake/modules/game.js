
import Cell from './cell.js';
import helper from './helper.js';


class Game {
    constructor(opts) {
        // options
        this.rowCount = opts.rowCount ?? 12;
        this.colCount = opts.colCount ?? 12;
        this.initialSize = opts.initialSize ?? 3;

        this.grid = [];
        this.snakeIndexes = [];
        this.directions = [];
        this.foodIndex = null;

        // create grid
        this.createGrid();

        // create snake
        this.createSnake();

        this.bindEvents();
        this.createFood();
    }

    createGrid() {
        const gridSize = this.colCount * this.rowCount;
        const wrapper = document.getElementById("snake");
        const gridElement = wrapper.getElementsByClassName("grid")[0];

        // add grid dimension to css
        gridElement.style.gridTemplateColumns = "1fr ".repeat(this.colCount);
    
        // insert DOM elements 
        for(let i = 0; i<gridSize; i++) {
            this.grid[i] = new Cell();

            const cellElement = document.createElement("div");
            cellElement.classList.add("cell");

            gridElement.appendChild(cellElement);
            this.grid[i].setIndex(i);
            this.grid[i].setElement(cellElement);
        }
    }

    createSnake() {
        const gridMiddle = parseInt( (this.grid.length/2) - this.colCount/2 );
        const initialDirection = 'RIGHT';

        for (let i = 0; i < this.initialSize; i++) {
            if(i === 0) {
                // this is head
                this.grid[gridMiddle].setSnake('Head', initialDirection);
                this.snakeIndexes.push(gridMiddle);
            } else if(i === this.initialSize-1) {
                // this is tail
                this.grid[gridMiddle - i].setSnake('Tail', initialDirection);
                this.snakeIndexes.push(gridMiddle - i);
            } else {
                // this is body
                this.grid[gridMiddle - i].setSnake('Body', initialDirection);
                this.snakeIndexes.push(gridMiddle - i);
            }
            
        }

    }

    bindEvents() {
        // listen direction keys
        document.addEventListener('keydown', (e) => {
            let direction = null;

            if(e.code === 'ArrowUp') {
                direction = 'UP';
            } else if(e.code === 'ArrowDown') {
                direction = 'DOWN';
            } else if(e.code === 'ArrowRight') {
                direction = 'RIGHT';
            } else if(e.code === 'ArrowLeft') {
                direction = 'LEFT';
            } 

            if(direction !== null) {
                // set direction on index where head is
                this.directions[this.snakeIndexes[0]] = direction;
            }
        })
    }

    createFood() {
        if(this.foodIndex !== null) {
            // unset current food
            this.grid[this.foodIndex].removeFood();
        }

        this.foodIndex = helper.randomInteger(0, this.grid.length, this.snakeIndexes);

        this.grid[this.foodIndex].addFood();
    }

    loop() {
        let foodEaten = false;
        let addTailIndex = -1;
        let addTailDirection = null;

        // loop through all snake's cells
        for (let i = 0; i < this.snakeIndexes.length; i++) {
            let _direction = null;
            const _snakeIndex = this.snakeIndexes[i];
            
            // check if cell has direction record
            if(typeof this.directions[_snakeIndex] !== 'undefined' && this.directions[_snakeIndex] !== null) {
                _direction = this.directions[_snakeIndex];
            } else {
                _direction = this.grid[_snakeIndex].direction;
            }

            // get index of neighbor by the direction
            const toIndex = helper.neighbor(_snakeIndex, _direction, this.colCount, this.rowCount);

            if(toIndex === false) {
                console.log('GAME OVER! Out of grid!')
                return false;
            }

            if(this.grid[toIndex].isSnake) {
                console.log('GAME OVER! Collided!')
                return false;
            }

            // eat food
            // only head can eat
            if(i === 0 && this.foodIndex === toIndex) {
                foodEaten = true;
            }

            // reset current cell
            this.grid[_snakeIndex].reset();

            // set next cell and direction
            if(i === 0) {
                this.grid[toIndex].setSnake('Head', _direction);
            } else if (i === this.snakeIndexes.length - 1 && foodEaten === false) {
                // set it to Tail
                this.grid[toIndex].setSnake('Tail', _direction);

                // set direction to null at direction history
                this.directions[_snakeIndex] = null;

                // if food is eaten next loop's tail will clear the direction
            } else {
                this.grid[toIndex].setSnake('Body', _direction);
            }

            // save last cell's info to add food as tail
            if(foodEaten) {
                addTailIndex = _snakeIndex;
                addTailDirection = _direction;
            }

            this.snakeIndexes[i] = toIndex;
        }

        // add food as tail
        if(foodEaten) {
            this.grid[addTailIndex].setSnake('Tail', addTailDirection);
            this.snakeIndexes.push(addTailIndex);

            // and create new food
            this.createFood();
        }
    }
}

export default Game;