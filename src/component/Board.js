import React from 'react';
import Square from './Square';

const Board = ({ squares, onClick, winningLine, lastMove }) => {
  const renderSquare = (i) => {
    const isWinningSquare = winningLine.includes(i);
    const isLastMove = lastMove === i;
    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => onClick(i)}
        isWinningSquare={isWinningSquare}
        isLastMove={isLastMove}
      />
    );
  };

  return (
    <div className="board">
      {squares.map((square, i) => renderSquare(i))}
    </div>
  );
};

export default Board;
