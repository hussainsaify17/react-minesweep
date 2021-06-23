// get mines
const getMines = (data = []) => {
    let mineArray = [];

    data.forEach(datarow => {
        datarow.forEach((dataitem) => {
            if (dataitem.isMine) {
                mineArray.push(dataitem);
            }
        });
    });

    return mineArray;
}

// get Flags
const getFlags = (data) => {
    let mineArray = [];

    data.forEach(datarow => {
        datarow.forEach((dataitem) => {
            if (dataitem.isFlagged) {
                mineArray.push(dataitem);
            }
        });
    });

    return mineArray;
}

// get Hidden cells
const getHidden = (data) => {
    let mineArray = [];
    data.forEach(datarow => {
        datarow.forEach((dataitem) => {
            if (!dataitem.isRevealed) {
                mineArray.push(dataitem);
            }
        });
    });
    return mineArray;
}

const getRandomNumber = (axis) => Math.floor(Math.random() * axis);

const createEmptyArray = (height, width) => {
    let data = [];

    for (let i = 0; i < height; i++) {
        data.push([]);
        for (let j = 0; j < width; j++) {
            data[i][j] = {
                x: i,
                y: j,
                isMine: false,
                neighbour: 0,
                isRevealed: false,
                isEmpty: false,
                isFlagged: false,
            };
        }
    }
    return data;
}

// plant mines on the board
const plantMines = (data, height, width, mines) => {
    let randomx, randomy, minesPlanted = 0;

    while (minesPlanted < mines) {
        randomx = getRandomNumber(width);
        randomy = getRandomNumber(height);
        try{
            if (!(data[randomx][randomy].isMine)) {
                data[randomx][randomy].isMine = true;
                minesPlanted++;
            }
        }
        catch{
            console.log(height, width)
        }
    }

    return (data);
}

export { getMines, getFlags, getHidden, getRandomNumber, createEmptyArray, plantMines }