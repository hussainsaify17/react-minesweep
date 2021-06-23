import { useState } from "react";
import Board from "./Board";
import {placeholders} from '../constant'
const inputDataFields = ['vCellsCount', 'hCellsCount', 'totalMines']

const MineSweeper = () => {
    const [boardInfo, updateBoardInfo] = useState({
        vCellsCount: '',
        hCellsCount: '',
        totalMines: ''
    })
    const handleChange = (e) => {
        updateBoardInfo({
            ...boardInfo,
            [e.target.name]: Number(e.target.value)
        })
    }
    const [gameStarted, updateGameStarted] = useState(false)
    const isValid = Object.values(boardInfo).every(x => x && x*1 > 0);
    const moreBombs = boardInfo.vCellsCount * boardInfo.hCellsCount < boardInfo.totalMines
    return (
        <div className="game">
            {gameStarted ?
                (<Board {...boardInfo} />) :
                (<>
                <h2>Choose your difficulty.</h2>
                    {inputDataFields.map(field => <input
                        key={field}
                        type='number'
                        name={field}
                        placeholder={placeholders[field]}
                        onChange={handleChange}
                        value={boardInfo[field]} />)}
                    <button
                        disabled={!isValid || moreBombs}
                        onClick={() => updateGameStarted(true)}>
                        Start Game
                    </button>
                    <div className='error'>{moreBombs &&
                        <>Total bombs needs to be less than {boardInfo.vCellsCount * boardInfo.hCellsCount}</>}</div>
                </>)}
        </div>
    );
}

export default MineSweeper
