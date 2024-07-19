import { useState } from "react";

const initialGameBoard=[
    [null,null,null],
    [null,null,null],
    [null,null,null],
];

export default function GameBoard({onSquareSelect, board}){
    // const [gameBoard,setGameBoard]=useState(initialGameBoard);

    // const handleTurn=(rowIndex, colIndex)=>{
    //     setGameBoard((prevGameBoard)=>{
    //         const updatedGameBoard=[...prevGameBoard.map(prevArray=>[...prevArray])];

    //         updatedGameBoard[rowIndex][colIndex]=activeSymbol;
    //         return updatedGameBoard;
    //     })
    //     onSquareSelect();
    // }
    
    return(
        <ol id="game-board">
            {board.map((row,rowIndex)=><li key='rowIndex'>
                <ol>
                    {row.map((playerSymbol,colIndex)=><li key='colIndex'><button onClick={()=>onSquareSelect(rowIndex,colIndex)} disabled={playerSymbol!==null}>{playerSymbol}</button></li>)}
                </ol>
            </li>)}
        </ol>
    )
}