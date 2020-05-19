const tictactoe = (function(){
    const infoElement = document.getElementById('info');
    const cellElements = document.getElementsByClassName('cell');
    const cells = [];

    let turn = 'O'; // who is playing
    let playing = true; // is game active

    infoElement.innerText = turn + '\'s TURN';

    for (let index = 0; index < cellElements.length; index++) {
        cellElements[index].addEventListener('click', evt => cellClick(evt, index));
    
        cells[index] = {
            element: cellElements[index],
            value: null, // is this cell X or O
            reset: function() {
                this.element.classList.remove(this.value);
                this.value = null;
            }
        }
    }

    function cellClick(evt, index) {
        if(playing && cells[index].value === null) {
            cells[index].value = turn;
            cells[index].element.classList.add(turn);

            toogleTurn();
            checkWinner();
        }
    }

    function toogleTurn() {
        turn = turn === 'O' ? 'X' : 'O';

        infoElement.innerText = turn + '\'s TURN';
    }


    function checkWinner() {
        let winner = null;

        // first row
        if(cells[0].value !== null && cells[0].value === cells[1].value && cells[0].value === cells[2].value) winner = cells[0].value;
        else if(cells[3].value !== null && cells[3].value === cells[4].value && cells[3].value === cells[5].value) winner = cells[3].value; // 2. row
        else if(cells[6].value !== null && cells[6].value === cells[7].value && cells[6].value === cells[8].value) winner = cells[6].value; // 3. row
        else if(cells[0].value !== null && cells[0].value === cells[3].value && cells[0].value === cells[6].value) winner = cells[0].value; // 1. col
        else if(cells[1].value !== null && cells[1].value === cells[4].value && cells[1].value === cells[7].value) winner = cells[1].value; // 2. col
        else if(cells[2].value !== null && cells[2].value === cells[5].value && cells[2].value === cells[8].value) winner = cells[2].value; // 3. col
        else if(cells[0].value !== null && cells[0].value === cells[4].value && cells[0].value === cells[8].value) winner = cells[0].value; // dia ltr
        else if(cells[2].value !== null && cells[2].value === cells[4].value && cells[2].value === cells[6].value) winner = cells[2].value; // dia rtl
        

        if(winner !== null) {
            playing = false;
            infoElement.innerHTML = winner + ' WINS<br><button onclick="tictactoe.restart()">RESTART</button>';
        } else if ( // check draw
            cells[0].value !== null && cells[1].value !== null && cells[2].value !== null && 
            cells[3].value !== null && cells[4].value !== null && cells[5].value !== null && 
            cells[6].value !== null && cells[7].value !== null && cells[8].value !== null
        ) {
            playing = false;
            infoElement.innerHTML = 'DRAW<br><button onclick="tictactoe.restart()">RESTART</button>';
        }
    }

    return {
        restart: function() {
            playing = true;
            turn = 'O';
            infoElement.innerText = turn + '\'s TURN';

            for (let index = 0; index < cells.length; index++) {
                cells[index].reset();
            }
        }
    }
})();