import React, { useState } from 'react';
import Board from './component/Board';
import './App.css';

const Game = () => {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null), lastMove: null }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [invalidMove, setInvalidMove] = useState(false);

  const handleClick = (i) => {
    const historyUpToCurrentStep = history.slice(0, stepNumber + 1);
    const current = historyUpToCurrentStep[historyUpToCurrentStep.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      setInvalidMove(true);
      return;
    }

    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(historyUpToCurrentStep.concat([{ squares, lastMove: i }]));
    setStepNumber(historyUpToCurrentStep.length);
    setXIsNext(!xIsNext);
    setInvalidMove(false);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
    setInvalidMove(false);
  };

  const resetGame = () => {
    setHistory([{ squares: Array(9).fill(null), lastMove: null }]);
    setStepNumber(0);
    setXIsNext(true);
    setInvalidMove(false);
  };

  const current = history[stepNumber];
  const winnerInfo = calculateWinner(current.squares);
  const winner = winnerInfo ? winnerInfo.winner : null;
  const winningLine = winnerInfo ? winnerInfo.line : [];

  const status = winner
    ? `Winner: ${winner}`
    : stepNumber === 9
    ? 'Draw!'
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={handleClick}
          winningLine={winningLine}
          lastMove={current.lastMove}
        />
      </div>
      <div className="game-info">
        <div className={winner ? "winner-message" : ""}>{status}</div>
        {invalidMove && <div className="invalid">Invalid move!</div>}
        <button onClick={resetGame} className="btn btn-primary mt-3">
          Restart Game
        </button>
        <ol>
          {history.map((step, move) => (
            <li key={move}>
              <button
                className="btn btn-link"
                onClick={() => jumpTo(move)}
              >
                {move ? `Go to move #${move}` : 'Go to game start'}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  return null;
};

export default Game;
