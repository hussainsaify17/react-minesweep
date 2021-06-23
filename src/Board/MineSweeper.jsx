import { useState } from "react";
import Board from "./Board";

const inputDataFields = ['vCellsCount', 'hCellsCount', 'totalMines']

const MineSweeper = () => {
    const [boardInfo, updateBoardInfo] = useState({
        vCellsCount: 0,
        hCellsCount: 0,
        totalMines: 0
    })
    const handleChange = (e) => {
        updateBoardInfo({
            ...boardInfo,
            [e.target.name]: e.target.value
        })
    }
    const [gameStarted, updateGameStarted] = useState(false)
    return (
        <div className="game">
            {gameStarted ?
                (<Board {...boardInfo} />) :
                (<>
                    {inputDataFields.map(field => <input
                        key={field}
                        type='number'
                        name={field}
                        onChange={handleChange}
                        value={boardInfo[field]} />)}
                    <button
                        disabled={!Object.values(boardInfo).every(x => x > 0)}
                        onClick={() => updateGameStarted(true)}>
                        Start Game
                    </button>
                </>)}
        </div>
    );
}

export default MineSweeper
