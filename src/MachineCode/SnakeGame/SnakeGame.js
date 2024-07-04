import React, { useEffect, useState, useRef, useCallback } from 'react';

import { DIRECTION, INITIAL_SNAKE, N, START_TIME_INTERVAL } from './constants';
import { arrowKeyPressed, getRandomNumberExcluding, handleMoveSnake } from './helpers';

import './snakeGame.css';

const SnakeGame = () => {
  const [snake, setSnake] = useState(new Set(INITIAL_SNAKE));
  const [direction, setDirection] = useState(DIRECTION.RIGHT);
  const timerRef = useRef(null);
  const [pointLoc, setPointLoc] = useState(() => getRandomNumberExcluding(INITIAL_SNAKE));
  const [currentScore, setCurrentScore] = useState(0);

  useEffect(() => {
    const callbackFun = arrowKeyPressed(setDirection);
    document.addEventListener('keydown', callbackFun);
    return () => {
      document.addEventListener('keydown', callbackFun);
    };
  }, [setDirection]);

  useEffect(() => {
    if (pointLoc === -1) return;
    const timerFun = handleMoveSnake(setSnake, direction, pointLoc, setPointLoc, setCurrentScore);
    timerFun();
    timerRef.current = setInterval(timerFun, START_TIME_INTERVAL - currentScore);
    return () => {
      clearInterval(timerRef.current);
    };
  }, [direction, pointLoc, currentScore]);

  useEffect(() => {
    if (snake.size === 0 && pointLoc !== -1) {
      clearInterval(timerRef.current);
      setCurrentScore(0);
      setPointLoc(-1);
      alert('GAME OVER! Your score = ' + currentScore);
    }
  }, [snake, pointLoc, currentScore]);

  const getBlockClassName = useCallback(
    (index) => {
      let className;
      const arr = Array.from(snake);
      if (arr[arr.length - 1] === index) className = 'snake-head';
      else if (snake.has(index)) className = 'snake-body';
      else if (pointLoc === index) className = 'point-block';
      else className = 'empty-block';
      return className;
    },
    [snake, pointLoc]
  );

  return (
    <div>
      <h1>Current Score = {currentScore}</h1>
      <div className="game-grid" style={{ gridTemplateColumns: `repeat(${N}, 1fr)` }}>
        {new Array(N * N).fill(0).map((_, index) => (
          <div key={index} className={getBlockClassName(index)}>
            {getBlockClassName(index) === 'snake-head' ? '👁️' : ''}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SnakeGame;
