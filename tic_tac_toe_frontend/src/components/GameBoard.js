import React from "react";

// PUBLIC_INTERFACE
function GameBoard({ board, onCellClick, disabled }) {
  /**
   * GameBoard displays the 3x3 tic tac toe grid.
   * @param {Array} board - The board state, 9 cells.
   * @param {Function} onCellClick - Handler for cell clicks.
   * @param {Boolean} disabled - Whether interaction is disabled.
   */
  // Helper to render each box with proper color and click state
  const renderCell = (i) => (
    <button
      className="ttt-cell"
      onClick={() => onCellClick(i)}
      disabled={disabled || board[i]}
      aria-label={`Grid cell ${i + 1}: ${board[i] || "empty"}`}
      key={i}
    >
      {board[i]}
    </button>
  );
  return (
    <div className="ttt-board">
      {[0, 1, 2].map((row) => (
        <div className="ttt-row" key={row}>
          {[0, 1, 2].map((col) => renderCell(row * 3 + col))}
        </div>
      ))}
    </div>
  );
}

export default GameBoard;
