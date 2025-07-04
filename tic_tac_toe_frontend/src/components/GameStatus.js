import React from "react";

// PUBLIC_INTERFACE
function GameStatus({ status, nextPlayer, mode }) {
  /**
   * GameStatus displays the current game state (turn, winner, draw).
   * @param {string} status - 'playing', 'draw', 'win'
   * @param {string|null} nextPlayer - 'X', 'O', or null if game ended
   * @param {object} mode - { type: '2p'|'ai' }
   */
  let msg;
  if (status === "win") {
    msg = (
      <span>
        <span className="ttt-winner">{nextPlayer === "O" ? "X" : "O"}</span>{" "}
        wins!
      </span>
    );
  } else if (status === "draw") {
    msg = <span className="ttt-draw">It’s a draw!</span>;
  } else {
    msg = (
      <span>
        <span style={{ fontWeight: 600 }}>
          {mode.type === "ai" && nextPlayer === "O"
            ? "Computer"
            : nextPlayer === "X"
            ? "X"
            : "O"}
        </span>
        ’s turn
      </span>
    );
  }
  return (
    <div className="ttt-status" aria-live="polite">
      {msg}
    </div>
  );
}

export default GameStatus;
