import { useState } from "react";
import {
    getMines,
    getFlags,
    getHidden,
    createEmptyArray,
    plantMines,
} from '../helpers'
import Block from "./Block";

const Board = (props) => {
    const initBoardData = (vCellsCount, hCellsCount, mines) => {
        let data = createEmptyArray(vCellsCount, hCellsCount);
        data = plantMines(data, vCellsCount, hCellsCount, mines);
        data = getNeighboursInfo(data, vCellsCount, hCellsCount);
        return data;
    }

    const revealBoard = () => {
        let updatedData = boardData;
        updatedData.forEach((datarow) => {
            datarow.forEach((dataitem) => {
                dataitem.isRevealed = true;
            });
        });
        setBoardData(updatedData)
    }

    // fetch Area info
    const getAreaInfo = (x, y, data) => {
        const areaInfo = [];

        //Top 
        if (x > 0) {
            areaInfo.push(data[x - 1][y]);
        }

        //Bottom
        if (x < props.vCellsCount - 1) {
            areaInfo.push(data[x + 1][y]);
        }

        //Left
        if (y > 0) {
            areaInfo.push(data[x][y - 1]);
        }

        //Right
        if (y < props.hCellsCount - 1) {
            areaInfo.push(data[x][y + 1]);
        }

        //Top Left
        if (x > 0 && y > 0) {
            areaInfo.push(data[x - 1][y - 1]);
        }

        // Top Right
        if (x > 0 && y < props.hCellsCount - 1) {
            areaInfo.push(data[x - 1][y + 1]);
        }

        // Bottom Right
        if (x < props.vCellsCount - 1 && y < props.hCellsCount - 1) {
            areaInfo.push(data[x + 1][y + 1]);
        }

        // Bottom Left
        if (x < props.vCellsCount - 1 && y > 0) {
            areaInfo.push(data[x + 1][y - 1]);
        }

        return areaInfo;
    }

    // update neighbouring cell information
    const getNeighboursInfo = (data, vCellsCount, hCellsCount) => {
        let updatedData = data;

        for (let i = 0; i < vCellsCount; i++) {
            for (let j = 0; j < hCellsCount; j++) {
                if (data[i][j].isMine !== true) {
                    let mine = 0;
                    const area = getAreaInfo(data[i][j].x, data[i][j].y, data);
                    area.forEach(value => {
                        if (value.isMine) {
                            mine++;
                        }
                    });
                    if (mine === 0) {
                        updatedData[i][j].isEmpty = true;
                    }
                    updatedData[i][j].neighbour = mine;
                }
            }
        }

        return updatedData;
    };

    const [boardData, setBoardData] = useState(initBoardData(props.vCellsCount, props.hCellsCount, props.totalMines))
    const [gameStatus, updateGameStatus] = useState("Game started")
    const [mineCount, updateMineCount] = useState(props.totalMines)

    const toggleEmptyCells = (x, y, data) => {
        let areaInfo = getAreaInfo(x, y, data);
        areaInfo.forEach(value => {
            if (!value.isFlagged && !value.isRevealed && (value.isEmpty || !value.isMine)) {
                data[value.x][value.y].isRevealed = true;
                if (value.isEmpty) {
                    toggleEmptyCells(value.x, value.y, data);
                }
            }
        });
        return data;

    }

    const _handleCellClick = (x, y) => {

        if (boardData[x][y].isRevealed || boardData[x][y].isFlagged) return null;

        if (boardData[x][y].isMine) {
            updateGameStatus("You Lost.");
            revealBoard();
            alert("game over");
        }

        let updatedData = JSON.parse(JSON.stringify(boardData));
        updatedData[x][y].isFlagged = false;
        updatedData[x][y].isRevealed = true;

        if (updatedData[x][y].isEmpty) {
            updatedData = toggleEmptyCells(x, y, updatedData);
        }

        if (getHidden(updatedData).length === props.totalMines) {
            updateMineCount(0)
            updateGameStatus("You Win.")
            revealBoard();
            alert("You Win");
        }

        setBoardData(updatedData)
        updateMineCount(props.totalMines - getFlags(updatedData).length)
    }

    const _handleContextMenu = (e, x, y) => {
        e.preventDefault();
        let updatedData = JSON.parse(JSON.stringify(boardData));
        let mines = mineCount;

        if (updatedData[x][y].isRevealed) return;

        if (updatedData[x][y].isFlagged) {
            updatedData[x][y].isFlagged = false;
            mines++;
        } else {
            updatedData[x][y].isFlagged = true;
            mines--;
        }

        if (mines === 0) {
            const mineArray = getMines(updatedData);
            const FlagArray = getFlags(updatedData);
            if (JSON.stringify(mineArray) === JSON.stringify(FlagArray)) {
                updateMineCount(0)
                updateGameStatus("You Win.")
                revealBoard();
                alert("You Win");
            }
        }

        setBoardData(updatedData)
        updateMineCount(mines)
    }

    const renderMineSweeper = (data) => {
        return <div className='minesweeper'>{data.map((datarow) => {
            return <div key={datarow.length * Math.random()}>{datarow.map((dataitem) => {
                return (
                    <div key={dataitem.x * datarow.length + dataitem.y}>
                        <Block
                            onClick={() => _handleCellClick(dataitem.x, dataitem.y)}
                            cMenu={(e) => _handleContextMenu(e, dataitem.x, dataitem.y)}
                            value={dataitem}
                        />
                    </div>);
            })}</div>
        })}</div>;
    }

    return (
        <div>
            {renderMineSweeper(boardData)}
            <div>
                <h1>{gameStatus}</h1>
                <span>Mines remaining: {mineCount}</span>
            </div>
        </div>
    );
}

export default Board
