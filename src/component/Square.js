import React from 'react';

const Square = ({ value, onClick, isWinningSquare, isLastMove }) => {
  return (
    <button
      className={`square btn ${isWinningSquare ? 'btn-success' : isLastMove ? 'btn-warning' : 'btn-light'}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Square;
