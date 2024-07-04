import { useState, useRef } from 'react';

import './ticTacToe.css';

const N = 4;

const INITIAL_ENTRIES = new Array(N * N).fill('');

const TikTacToe = () => {
  const [entries, setEntries] = useState(() => INITIAL_ENTRIES);
  const [gameStatus, setGameStatus] = useState('Tic Tac Toe Game Live');
  const isItPlayer1Turn = useRef(true);
  const rowsData = useRef<number[][]>(new Array(N).fill(null).map(() => [0, 0]));
  const colsData = useRef<number[][]>(new Array(N).fill(null).map(() => [0, 0]));
  const diagData = useRef<number[][]>(new Array(2).fill(null).map(() => [0, 0]));

  /* 🚨 Instead of creating 3 different refs like this, a 2-D array memoization can be done! Think that way! */

  const handleBoxClick = (index: number) => () => {
    if (entries[index] !== '') return;
    const newEntries = structuredClone(entries);
    newEntries[index] = isItPlayer1Turn.current ? 'O' : 'X';
    setEntries(newEntries);
    const row = Math.floor(index / N);
    const col = index % N;

    if (isItPlayer1Turn.current) {
      rowsData.current[row][0] += 1;
      colsData.current[col][0] += 1;
      if (row === col) diagData.current[0][0] += 1;
      if (row + col === N - 1) diagData.current[1][0] += 1;
      if (rowsData.current[row][0] === N || colsData.current[col][0] === N || diagData.current[0][0] === N || diagData.current[1][0] === N) {
        setGameStatus('Player 1 won!');
        setEntries(INITIAL_ENTRIES);
      }
    } else {
      rowsData.current[row][1] += 1;
      colsData.current[col][1] += 1;
      if (row === col) diagData.current[0][1] += 1;
      if (row + col === N - 1) diagData.current[1][1] += 1;
      if (rowsData.current[row][1] === N || colsData.current[col][1] === N || diagData.current[0][1] === N || diagData.current[1][1] === N) {
        setGameStatus('Player 2 won!');
        setEntries(INITIAL_ENTRIES);
      }
    }

    isItPlayer1Turn.current = !isItPlayer1Turn.current;
  };

  return (
    <div className="app-container">
      <h1>{gameStatus}</h1>
      <div className="game-grid" style={{ '--cols': N } as React.CSSProperties}>
        {entries.map((data, index) => (
          <div key={index} className="game-grid-item" onClick={handleBoxClick(index)}>
            {data}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TikTacToe;
