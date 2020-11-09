export default {
    randomInteger(min, max, notIn) {
        let randomInt = null;
        let n = 1000; // try this much, prevent stack overflow

        if(typeof notIn === 'undefined') {
            notIn = null;
        }

        while(n > 0) {
            randomInt = Math.round(min + Math.random() * (max-min));
            
            if(notIn !== null && notIn.indexOf(randomInt) === -1) {
                return randomInt;
            } else {
                n--;
            }
        }

        alert('Random number generator failed :S');
        return -1;
    },
    flatten2Cartesian(index, colCount) {
        return {
            'i': index % colCount,
            'j': (index - (index % colCount)) / colCount
        }
    },
    neighbor(index, direction, colCount, rowCount) {
        const {i, j} = this.flatten2Cartesian(index, colCount);

        // right
        if(i+1 < colCount && direction === 'RIGHT') {
            return index + 1;
        }

        // up
        if(j>0 && direction === 'UP') {
            return index - colCount;
        }

        // left
        if(i>0 && direction === 'LEFT') {
            return index - 1;
        }

        // down
        if(j+1 < rowCount && direction === 'DOWN') {
            return index + colCount;
        }

        return false;
    }
}