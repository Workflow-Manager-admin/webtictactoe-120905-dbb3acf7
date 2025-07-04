import React from "react";

// PUBLIC_INTERFACE
function Controls({ onReset, mode, onModeChange }) {
  /**
   * Controls for resetting and switching mode.
   * @param {Function} onReset - Handler to reset the board
   * @param {object} mode - { type: '2p'|'ai' }
   * @param {Function} onModeChange - Switch between 2p/AI mode
   */
  return (
    <div className="ttt-controls">
      <button className="ttt-btn ttt-btn-accent" onClick={onReset}>
        Reset Game
      </button>
      <div className="ttt-mode-switch">
        <button
          className={`ttt-btn ttt-btn-mode${mode.type === "2p" ? " ttt-active" : ""}`}
          onClick={() => onModeChange("2p")}
        >
          2 Player
        </button>
        <button
          className={`ttt-btn ttt-btn-mode${mode.type === "ai" ? " ttt-active" : ""}`}
          onClick={() => onModeChange("ai")}
        >
          vs Computer
        </button>
      </div>
    </div>
  );
}

export default Controls;
