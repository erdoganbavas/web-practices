const ledTime = (function() {
    // will display time in hh:mm:ss format
    // need 6 block of led numbers and 2 for :
    // every block is 5*7 cell

    const wrapper = document.getElementsByClassName("led-time")[0];
    const blocks = [];

    const block = document.createElement("div");
    block.classList.add("block");

    const cell = document.createElement("div");
    cell.classList.add("cell");

    for(let i = 0; i < 5*7; i++) {
        const _cell = cell.cloneNode();
        block.appendChild(_cell);
    }
    // generic block element created
    // clone and append to wrapper

    for(let i = 0; i < 8; i++) {
        const _block = block.cloneNode(true);
        _block.classList.add("block-" + i);

        wrapper.appendChild(_block);
        blocks[i] = {
            'element': _block,
            'value': null
        };
    }

    blocks[2].element.classList.add("column");
    blocks[2].value = "column";
    blocks[5].element.classList.add("column");
    blocks[5].value = "column";

    setInterval(() => {
        const values = [];
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const second = now.getSeconds();


        values[0] = Math.floor(hour/10); /// first block's value
        values[1] = hour%10;

        values[2] = null; // column

        values[3] = Math.floor(minute/10);
        values[4] = minute%10;

        values[5] = null; // column

        values[6] = Math.floor(second/10);
        values[7] = second%10;

        for (let i = 0; i < values.length; i++) {
            const value = values[i];

            if(i !== 2 && i !== 5 && blocks[i].value !== value) {
                blocks[i].element.classList.remove("number-" + blocks[i].value);
                blocks[i].element.classList.add("number-" + value);
                blocks[i].value = value;
            }
        }
    },1000)

})();