const columnCount = Math.floor(window.innerWidth / 30);
const rowCount = Math.floor(window.innerHeight / 30);

for(let i=0; i<columnCount; i++) {
    const p = document.createElement('p');
    setupColumn(p);
    document.body.append(p);
}

function setupColumn(p) {
    const delay = random(100, 300);
    const duration = random(100, 2000);
    const hasChildren = p.children.length > 0;

    for(let j=0; j<rowCount; j++){
        const span = hasChildren ? p.children.item(j) : document.createElement('span');
    
        span.innerText = getRandomChar();
        const animation = span.animate([
            { opacity: '1' },
            { opacity: '0.05' }
        ], {
            duration: duration,
            delay: delay + (j * 75), // add delay for every char
            fill: 'forwards' // keep element with the last state of anim
        });

        // re build column after last char disappear
        if(j === rowCount-1) {
            animation.onfinish = () => {
                setupColumn(p);
            };
        }

        if(!hasChildren) {
            p.appendChild(span);
        }
    }
}

function random(from, to) {
    return Math.trunc(Math.random() * (to - from + 1) + from);
}

function getRandomChar() {
    // some ranges for chars of latin and other alphabets
    const charRanges = [
        [0x3041, 0x30ff],
        [0x0021, 0x007a],
        [0x00bc, 0x02af]
    ];

    const i = random(0, charRanges.length - 1);
    return String.fromCharCode(random(charRanges[i][0], charRanges[i][1]));
}