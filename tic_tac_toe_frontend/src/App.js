import React, { useState, useEffect } from 'react';
import './App.css';

// Custom theme variables (can be set in CSS as well)
const COLORS = {
  primary: '#1976d2',
  secondary: '#424242',
  accent: '#fbc02d',
};

// PUBLIC_INTERFACE
function App() {
  // For modern light/dark theme toggle (same as template demo)
  const [theme, setTheme] = useState('light');
  
  // Effect to set theme data attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  
  // Placeholder state (actual game state to come)
  const [mode, setMode] = useState('2P'); // '2P' | 'AI' (stub)
  
  // PUBLIC_INTERFACE
  const handleModeChange = (e) => setMode(e.target.value);
  // PUBLIC_INTERFACE
  const handleReset = () => {}; // stub
  
  // Grid display: a 3x3 array of { value: 'X' | 'O' | null }
  const emptyBoard = Array(9).fill(null);
  const [board] = useState(emptyBoard); // stub: static empty board
  
  // Basic styling (CSS is in App.css, but key overrides here for quick theme)
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 60px)',
    gridTemplateRows: 'repeat(3, 60px)',
    gap: '10px',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '24px 0',
  };

  const cellStyle = {
    width: '60px',
    height: '60px',
    background: '#fff',
    border: `2px solid ${COLORS.primary}`,
    fontSize: '2rem',
    color: COLORS.primary,
    fontWeight: 700,
    textAlign: 'center',
    cursor: 'not-allowed',
    transition: 'background 0.2s',
    borderRadius: '12px',
    boxShadow: `0 2px 8px #0001`,
    lineHeight: '60px',
    userSelect: 'none',
  };

  const panelStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    background: 'var(--bg-secondary, #f8f9fa)',
    borderRadius: '20px',
    boxShadow: '0 4px 24px 0 #0003',
    minWidth: '340px',
    maxWidth: '98vw',
  };

  // PUBLIC_INTERFACE
  return (
    <div className="App" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Theme toggle, same as template */}
      <button
        className="theme-toggle"
        onClick={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
      <main style={panelStyle}>
        <h1 style={{ fontWeight: 700, fontSize: '2.1rem', color: COLORS.primary, marginBottom: 8 }}>Tic Tac Toe</h1>
        {/* Game status placeholder */}
        <div
          style={{
            fontSize: '1.08rem',
            minHeight: '2.3em',
            color: COLORS.secondary,
            fontWeight: 500,
            marginBottom: 8,
          }}
        >
          {/* Placeholder, e.g., "Player X's turn" */}
          <span>Game status will appear here.</span>
        </div>
        {/* Controls: Game mode and Reset (stubs) */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <select
            value={mode}
            onChange={handleModeChange}
            aria-label="Choose game mode"
            disabled
            style={{
              padding: '6px 16px',
              borderRadius: 8,
              fontSize: '14px',
              border: `1.5px solid ${COLORS.primary}`,
              color: COLORS.primary,
              background: '#fff',
              fontWeight: 600,
              cursor: 'not-allowed',
            }}
          >
            <option value="2P">2 Players</option>
            <option value="AI">Vs. AI</option>
          </select>
          <button
            type="button"
            onClick={handleReset}
            disabled
            style={{
              background: COLORS.accent,
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '6px 18px',
              fontWeight: 600,
              letterSpacing: 1,
              cursor: 'not-allowed',
              opacity: 0.9,
              fontSize: '14px',
              boxShadow: '0 1px 4px #0002',
              transition: 'opacity 0.2s',
            }}
          >
            Reset
          </button>
        </div>
        {/* Centered Grid */}
        <div style={gridStyle} aria-label="Tic Tac Toe board">
          {board.map((cell, idx) => (
            <div key={idx} style={cellStyle} aria-label={`Cell ${idx + 1}`} tabIndex="-1">
              {cell}
            </div>
          ))}
        </div>
        {/* Footer (optional) */}
        <footer style={{ fontSize: 13, color: COLORS.secondary, marginTop: 8, opacity: 0.84 }}>
          <span>
            Built with <span role="img" aria-label="React">⚛️</span> &mdash; Modern UI | Light theme | v0.1
          </span>
        </footer>
      </main>
    </div>
  );
}

export default App;
