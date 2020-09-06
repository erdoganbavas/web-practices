import helper from "./modules/helper.js";
import {Cell, Bomb} from "./modules/square.js";

const miner = (function() {
    const colCount = 6;
    const rowCount = 6;
    const bombCount = 4;

    let visibleCellCount = 0;

    // flatten array of grid objects
    const grid = [];
    const cellElements = [];

    const wrapper = document.getElementById("mineSweeper");
    const gridElement = wrapper.getElementsByClassName("grid")[0];

    // add proper grid dimension to CSS/grid's style
    gridElement.style.gridTemplateColumns = "1fr ".repeat(colCount);

    // generate bombCount random integers, these will be bombs' positions on grid
    const bombIndexes = helper.randomIntegers(bombCount, 0, colCount*rowCount - 1);
    bombIndexes.forEach(bombIndex => {
        grid[bombIndex] = new Bomb();
    });

    // all bombs are planted
    // mark surrounding squares with bomb count
    bombIndexes.forEach(bombIndex => {
        const neighbours = helper.neighbours(bombIndex, colCount, rowCount);

        neighbours.forEach(neighbour => {
            // fill square with Cell object if it is empty
            if(typeof grid[neighbour] === "undefined") {
                grid[neighbour] = new Cell();
            }

            if(!grid[neighbour].isBomb) {
                grid[neighbour].increaseValue();
            }
        })
    });

    // insert DOM elements and create missing Cell object for grid array
    for (let i = 0; i < (colCount*rowCount); i++) {
        if(typeof grid[i] === "undefined") {
            grid[i] = new Cell();
        }

        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.innerHTML = `<div class="center">${grid[i].value}</div>`;

        cellElement.addEventListener("click", function(evt) {
            grid[i].show();
            visibleCellCount++;

            if(grid[i].isBomb) {
                alert("boom, game over!");
            } else {
                if(grid[i].value === 0) {
                    showNonBombNeighbours(i);
                }

                // check if game overs
                check();
            }
        });

        gridElement.appendChild(cellElement);
        grid[i].element = cellElement;
    }

    function showNonBombNeighbours(i) {
        const neighbours = helper.neighbours(i, colCount, rowCount);

        neighbours.forEach(neighbour => {
            // show cell if it is not a bomb and is not visible
            if(grid[neighbour].isBomb === false && grid[neighbour].isVisible === false) {
                grid[neighbour].show();
                visibleCellCount++;

                // call recursively only for non-surrounding cells / value=0
                if(grid[neighbour].value === 0) {
                    showNonBombNeighbours(neighbour);
                }
            }
        });
    }

    function check() {
        if(visibleCellCount + bombCount === colCount * rowCount) {
            // all cells are visible and all bomb cells are hidden
            alert("hooray!");
        }
    }
})();