import Player from './components/Player';
import GameBoard from './components/GameBoard';
import './index.css'
import { useState } from 'react';
import Log from './components/Log';
import {WINNING_COMBINATIONS} from './winning-combinations';
import GameOver from './components/GameOver';

function deriveActivePlayer(gameTurns){
  let currentPlayer='X'

  if(gameTurns.length>0 && gameTurns[0].player==='X')
    {
      currentPlayer='O';
    }
    return currentPlayer;
}

const initialGameBoard=[
  [null,null,null],
  [null,null,null],
  [null,null,null],
];

function App() {
  const [turns, setTurns]=useState([]);

  const activePlayer=deriveActivePlayer(turns);

  
  let gameBoard=[...initialGameBoard.map((array)=>[...array])];

  for (const turn of turns){
      const {symbol,player}=turn;
      const {row,col}=symbol;

      gameBoard[row][col]=player;
  }


  let winner;
  for(const combination of WINNING_COMBINATIONS)
  {
    let firstSquareSymbol=gameBoard[combination[0].row][combination[0].column];
    let secondSquareSymbol=gameBoard[combination[1].row][combination[1].column];
    let thirdSquareSymbol=gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbol && firstSquareSymbol===secondSquareSymbol && firstSquareSymbol===thirdSquareSymbol)
    {
      winner=firstSquareSymbol;
    }
  }

  let hasDraw= turns.length===9 && !winner;

  function handleSquareSelect(rowIndex,colIndex){
    setTurns(prevTurns=>{
      const currentPlayer=deriveActivePlayer(prevTurns);
      
      const updatedTurns=[{
          symbol:{
          row:rowIndex,
          col:colIndex,
        },
        player:currentPlayer
      },...prevTurns];
      return updatedTurns;
    });
  }

  function handleRestart(){
    setTurns([]);
  }

  return (
    <>
      <header>
        <h1>Tic Tac Toe</h1>
        <img src="../public/game-logo.png" alt="" />
      </header>

      <main>

        <div id="game-container">
          <ol id="players" className='highlight-player'>
            <Player initialName="Shayan" symbol="X" isActive={activePlayer==='X'}/>
            <Player initialName="Hamza" symbol="O" isActive={activePlayer==='O'}/> 
          </ol>
          {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
          <GameBoard onSquareSelect={handleSquareSelect} board={gameBoard}/>
        </div>
        <Log turns={turns}/>
      </main>
    </>
  )
}

export default App
