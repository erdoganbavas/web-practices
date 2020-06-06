const game = (function() {
    const wrapper = document.getElementById("game-wrapper");
    const row = 4;
    const col = 4;
    const cellWidth = wrapper.offsetWidth / col;
    const cellHeight = wrapper.offsetHeight / row;

    const symbols = "ABCDEFGHJKLMNOPRS123456789".split("");
    const cells = [];
    let previousCellIndex = null; // last clicked cell index
    let canPlay = false; // flag if game is playable

    // create grid
    const grid = document.createElement("div");
    grid.classList.add("grid");
    wrapper.appendChild(grid);

    //create info panel
    const infoPanel = document.createElement("div");
    infoPanel.classList.add("info-panel");
    wrapper.appendChild(infoPanel);

    // create cells
    for (let i = 0; i < row*col; i+=2) {
        const symbol = randomSymbol();
        
        for (let j = 0; j < 2; j++) {
            const currentCellIndex = i + j;
            const cellElement = document.createElement("div");
            cellElement.innerText = symbol;
            cellElement.classList.add("cell");
            cellElement.style.width = (100 / col) + "%"
            
            const cell = {
                symbol: symbol,
                element: cellElement,
                hasMatch: false
            }

            // give it a couple seconds and turn over
            setTimeout(() => {
                cellElement.classList.add("hide");
            }, randomInt(300, 350));

            //switch with a random previous one
            // no need to loop for shuffling
            if(currentCellIndex > 2) {
                const previousRandIndex = randomInt(0, i);

                cells[currentCellIndex] = cells[previousRandIndex];
                cells[previousRandIndex] = cell;

            } else {
                cells[currentCellIndex] = cell;
            }
        }
    }

    // add all elements to DOM
    for (let i = 0; i < cells.length; i++) {
        cells[i].element.addEventListener("click", () => { cellClick(i) });

        grid.appendChild(cells[i].element);
        canPlay = true;
    }

    function randomSymbol(){
        const symbolIndex = randomInt(0, symbols.length-1);
        const symbol = symbols[symbolIndex];

        // delete symbol from symbols
        symbols.splice(symbolIndex, 1);
        return symbol;
    }

    function randomInt(min, max){
        return Math.round(Math.random() * (max - min)) + min;
    }

    function cellClick(cellIndex) {
        const cellElement = cells[cellIndex].element;

        if(canPlay && cellElement.classList.contains("hide")) {
            canPlay = false;
            cellElement.classList.remove("hide");

            if(previousCellIndex === null) {
                // it is first click for a match
                previousCellIndex = cellIndex;
                canPlay = true
            } else {
                // second click! check if it is a match

                if(cells[previousCellIndex].symbol === cells[cellIndex].symbol) {
                    // a match
                    cells[previousCellIndex].hasMatch = true;
                    cells[cellIndex].hasMatch = true;

                    showInfo("MATCH", 'green');

                    setTimeout(() => {
                        previousCellIndex = null;

                        const gameOver = checkGameOver();
                        if(gameOver) {
                            showInfo("GAME OVER", 'green');
                        } else {
                            canPlay = true;
                        }
                    }, 500);
                } else {
                    // no match
                    showInfo("NO MATCH!", "red");

                    setTimeout(() => {
                        // hide both cells
                        cells[previousCellIndex].element.classList.add("hide");
                        cellElement.classList.add("hide");

                        previousCellIndex = null;
                        canPlay = true;
                    }, 500);
                }
            }
        }
    }

    function showInfo(message, type){
        infoPanel.innerHTML = `<span class="${type}">${message}</span>`;
    }

    function checkGameOver() {
        let gameIsOver = true;

        for (let i = 0; i < cells.length; i++) {
            gameIsOver = cells[i].hasMatch === false ? false : gameIsOver;
        }

        return gameIsOver;
    }
})();