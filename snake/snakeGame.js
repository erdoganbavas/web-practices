import Game from "./modules/game.js";

const snake = (function() {
    const game = new Game({});

    const gameInterval = setInterval(() => {
        if(game.loop() === false) {
            clearInterval(gameInterval);
        }
    }, 200); 

})();