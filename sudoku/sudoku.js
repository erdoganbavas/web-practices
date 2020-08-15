const sudokuSolver = (function() {
    const inputElements = [];
    const wrapper = document.getElementsByClassName("sudoku")[0];

    let step = 0;

    // create and add inputs to DOM
    for (let i = 0; i < 81; i++) {
        const element = document.createElement("input");
        element.type = "number";
        element.classList.add("number");

        inputElements[i] = element;
        wrapper.appendChild(element);
    }

    // return square's index out of i,j coordinates
    function getSquareIndex(i,j) {
        return Math.floor(i/3) + (Math.floor(j/3) * 3);
    }

    function findNumber(numbers, rows, cols, squares) {
        // check for step count
        if(step > 1000) {
            alert("Too many loops, stops to prevent stack overflow!");
            return false;
        }

        step++;

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const cellNumber = numbers[i][j];
                
                if(cellNumber === 0) {
                    let possibilities = [];

                    // k start from 1 because it is exact number value of cell
                    for (let k = 1; k < 10; k++) {
                        const kover2 = Math.pow(2, k);
                        if(
                            (rows[i] & kover2) === 0 &&
                            (cols[j] & kover2) === 0 &&
                            (squares[getSquareIndex(i,j)] & kover2) === 0
                        ) {
                             // k is absent at relevent row column and square
                             // add to possibilities
                             possibilities.push(k);
                        }
                    }

                    if(possibilities.length === 1) {
                        // cell has one possibility
                        numbers[i][j] = possibilities[0];
                        inputElements[(i*9) + j].value = possibilities[0];
                        inputElements[(i*9) + j].classList.add("changed");

                        //change row column and square flags
                        const valueOver2 = Math.pow(2, possibilities[0]);
                        rows[i] = rows[i] | valueOver2;
                        cols[j] = cols[j] | valueOver2;
                        squares[getSquareIndex(i,j)] = squares[getSquareIndex(i,j)] | valueOver2;

                        return findNumber(numbers, rows, cols, squares);
                    }
                }
            }
        }

        return true;
    }

    return {
        solve: function() {
            const numbers = [];
            const rows = [0,0,0,0,0,0,0,0,0];
            const cols = [0,0,0,0,0,0,0,0,0];
            const squares = [0,0,0,0,0,0,0,0,0];
        
            // prepare row column and square values bit flagged
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    const cellNumber = parseInt(inputElements[(i*9)+j].value || 0);

                    if(numbers[i]) {
                        numbers[i][j] = cellNumber;
                    } else {
                        numbers[i] = [cellNumber];
                    }
                    
                    if(cellNumber > 0) {
                        // merge row's previous numbers with cellNumber
                        rows[i] = rows[i] | Math.pow(2, cellNumber);

                        // same with col and square
                        cols[j] = cols[j] | Math.pow(2, cellNumber);
                        squares[ getSquareIndex(i,j) ] = squares[ getSquareIndex(i,j) ] | Math.pow(2, cellNumber);
                    }
                }
            }

            // recursively find missing numbers
            if(findNumber(numbers, rows, cols, squares)) {

            }
        }
    }
})();