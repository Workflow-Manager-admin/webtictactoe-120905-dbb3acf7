import React, { useState, useEffect } from "react";
import "./App.css";
import GameBoard from "./components/GameBoard";
import GameStatus from "./components/GameStatus";
import Controls from "./components/Controls";

// Helper for computing game winner
function calculateWinner(board) {
  // Winning lines for 3x3 grid
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      return board[a]; // 'X' or 'O'
    }
  }
  return null;
}

// (Very simple "random move" AI for placeholder)
function getAIMove(board) {
  const empty = board.map((val, i) => (val ? null : i)).filter((v) => v !== null);
  if (empty.length === 0) return null;
  return empty[Math.floor(Math.random() * empty.length)];
}

// PUBLIC_INTERFACE
function App() {
  // Board state: 9 cells (null/"X"/"O")
  const [board, setBoard] = useState(Array(9).fill(null));
  // 'X' starts first always
  const [xIsNext, setXIsNext] = useState(true);
  // Game mode: 2p or AI
  const [mode, setMode] = useState({ type: "2p" });
  // Game status state ('playing', 'win', 'draw')
  const [status, setStatus] = useState("playing");
  // Theme (from scaffold)
  const [theme, setTheme] = useState("light");

  // Effect to apply theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Reset the board and states
  // PUBLIC_INTERFACE
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setStatus("playing");
  };

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Handle mode change (AI or 2P)
  // PUBLIC_INTERFACE
  const handleModeChange = (newMode) => {
    if (mode.type !== newMode) {
      setMode({ type: newMode });
      resetGame();
    }
  };

  // Compute winner and draw
  useEffect(() => {
    const winner = calculateWinner(board);
    if (winner) {
      setStatus("win");
    } else if (board.every((cell) => cell)) {
      setStatus("draw");
    } else {
      setStatus("playing");
    }
  }, [board]);

  // Effect for AI's move when needed
  useEffect(() => {
    if (
      status === "playing" &&
      mode.type === "ai" &&
      !xIsNext
    ) {
      const timer = setTimeout(() => {
        const aiMove = getAIMove(board);
        if (aiMove !== null && board[aiMove] == null) {
          setBoard((b) => {
            const copy = b.slice();
            copy[aiMove] = "O";
            return copy;
          });
          setXIsNext(true);
        }
      }, 500); // delay for UX
      return () => clearTimeout(timer);
    }
  }, [status, board, xIsNext, mode]);

  // Handle cell click
  // PUBLIC_INTERFACE
  const handleCellClick = (i) => {
    if (board[i] || status !== "playing") return;
    // If AI and it's not X's turn, don't process click
    if (mode.type === "ai" && !xIsNext) return;

    const newBoard = board.slice();
    newBoard[i] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  // Current player
  const nextPlayer = status === "playing" ? (xIsNext ? "X" : "O") : null;

  return (
    <div className="App">
      <header className="ttt-header">
        <h1 className="ttt-title">Tic Tac Toe</h1>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </header>
      <main className="ttt-main">
        <GameStatus status={status} nextPlayer={nextPlayer} mode={mode} />
        <GameBoard
          board={board}
          onCellClick={handleCellClick}
          disabled={
            status !== "playing" || (mode.type === "ai" && !xIsNext)
          }
        />
        <Controls
          onReset={resetGame}
          mode={mode}
          onModeChange={handleModeChange}
        />
      </main>
      <footer className="ttt-footer">
        <small>
          Modern React Tic Tac Toe &middot;{" "}
          <a
            href="https://reactjs.org"
            rel="noopener noreferrer"
            target="_blank"
            style={{ color: "var(--primary-color)" }}
          >
            Learn React
          </a>
        </small>
      </footer>
    </div>
  );
}

export default App;
