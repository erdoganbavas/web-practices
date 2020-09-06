export default {
    randomIntegers(n, min, max) {
        let randomNumber = null;
        const result = [];

        while(n > 0) {
            randomNumber = Math.round(min + Math.random() * (max - min));
            if(result.indexOf(randomNumber) === -1) {
                result.push(randomNumber);
                n--;
            }
        }

        return result;
    },
    neighbours(index, colCount, rowCount) {
        const neighbours = [];

        const {i, j} = this.flatten2Cartesian(index, colCount);

        // right side
        if(i+1 < colCount) {
            // right
            neighbours.push(index + 1);

            // right down
            if(j+1 < rowCount) {
                neighbours.push(index + 1 + colCount);
            }

            // right up
            if(j > 0) {
                neighbours.push(index + 1 - colCount);
            }
        }

        // left side
        if(i > 0) {
            // left
            neighbours.push(index - 1);

            // left down
            if(j+1 < rowCount) {
                neighbours.push(index - 1 + colCount);
            }

            // left up
            if(j > 0) {
                neighbours.push(index - 1 - colCount);
            }
        }

        // up
        if(j > 0) {
            neighbours.push(index - colCount);
        }

        // down
        if(j+1 < rowCount) {
            neighbours.push(index + colCount);
        }

        return neighbours;
    },
    flatten2Cartesian(index, colCount) {
        return {
            'i': index % colCount,
            'j': (index - (index%colCount)) / colCount
        }
    },
    cartesian2Flatten(i, j, colCount) {
        return (j / colCount) + i;
    }
}