import React from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./GameOver";
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]
/// to show which player play x or o 
function deriveActivePlayer(gameTurn) {
  let currentPlayer = 'x';
  if ( gameTurn.length > 0 && gameTurn[0].player === 'x') {
    currentPlayer = 'o';
  }
  return currentPlayer;
}
function deriveWinner(gameBoard , players) {
  let winner ;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = 
    gameBoard[combination[0].row][combination[0].column] ;
    const secondSquareSymbol =
     gameBoard[combination[1].row][combination[1].column] ;
    const thirdSquareSymbol =
     gameBoard[combination[2].row][combination[2].column] ;
    if (firstSquareSymbol && 
      firstSquareSymbol ===secondSquareSymbol && 
      firstSquareSymbol === thirdSquareSymbol) {
        winner = players[firstSquareSymbol];
       console.log(firstSquareSymbol)
    }
  } 
  return winner;
}
function App() {
 
const [gameTurn , setGameTurn ] = useState([])
const [players , setPlayers] =useState({
  'x' : 'Player 1',
  'o' : 'Player 2'

})
 const activePlayer = deriveActivePlayer(gameTurn);
 let gameBoard = [...initialGameBoard.map(arr=>[...arr])] ;
 for (const turn of gameTurn) {
     const {square , player} = turn;
     const {row , col} = square;
     gameBoard[row][col] = player;
     
 }
const winner = deriveWinner(gameBoard,players)
const hasDraw = gameTurn.length === 9 && !winner;
 function handleSelectSquare(rowIndex , colIndex) {

  //setActivePlayer((currentActive) => currentActive === 'x' ? 'o' : 'x' )

  ////  check prev player is x make current b 0 
  // get information for player rowindex , colindex , currentPlayer x or o  
  setGameTurn(prevTurn =>{
   const currentPlayer = deriveActivePlayer(prevTurn)
    const updateTurn = [{square : { 
      row : rowIndex,
      col : colIndex 
    },
    player :currentPlayer
  },
  ...prevTurn];
  
  return updateTurn;
  
  })
  console.log(gameTurn)

}
function handleRestart() {
  setGameTurn([]);
  
}
function handlePlayerNameChange(symbol , newName) {
  setPlayers(prevPlayer => {
    return {
      ...prevPlayer,
      [symbol] : newName,
    }
  })
}
  return (
      <main>
        <div id="game-container">
          
    
        <ol id="players" className="highlight-player">
        <Player initialName='player1' symbol='x' isActive={activePlayer === 'x'} 
        onChange={handlePlayerNameChange}/>
        <Player initialName='player2' symbol='o' isActive={activePlayer === 'o' }
         onChange={handlePlayerNameChange}/>
        </ol>
        {(winner ||  hasDraw) && <GameOver  winner={winner } onRestart={handleRestart}/> }
        <GameBoard onSelectSquare={handleSelectSquare} gameBoard={gameBoard} />

         </div> 
         <Log turns={gameTurn} />
      </main>
  )
}

export default App
