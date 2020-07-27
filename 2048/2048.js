import grid from './modules/grid.js';

grid.init();

document.addEventListener("keyup", function(e) {
    let direction = null;

    if(e.keyCode === 38) {
        direction = "UP";
    } else if(e.keyCode === 39) {
        direction = "RIGHT";
    } else if(e.keyCode === 40) {
        direction = "DOWN";
    } else if(e.keyCode === 37) {
        direction = "LEFT";
    }

    if(direction !== null) {
        grid.slide(direction);
    }

    return false;
});