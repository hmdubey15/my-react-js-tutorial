import { DIRECTION, N } from './constants';

export const getRandomNumberExcluding = (excludeArray) => {
  const allCoordinates = Array.from({ length: N * N }, (_, index) => index);
  const availableCoordinates = allCoordinates.filter((item) => !excludeArray.includes(item));
  let randomNumber = Math.floor(Math.random() * availableCoordinates.length);
  return availableCoordinates[randomNumber];
};

export const arrowKeyPressed = (setDirection) => (event) => {
  setDirection((prevDir) => {
    switch (event.key) {
      case 'ArrowUp':
        return prevDir === DIRECTION.DOWN ? prevDir : DIRECTION.UP;
      case 'ArrowDown':
        return prevDir === DIRECTION.UP ? prevDir : DIRECTION.DOWN;
      case 'ArrowLeft':
        return prevDir === DIRECTION.RIGHT ? prevDir : DIRECTION.LEFT;
      case 'ArrowRight':
        return prevDir === DIRECTION.LEFT ? prevDir : DIRECTION.RIGHT;
      default:
        return prevDir;
    }
  });
  event.preventDefault();
};

export const handleMoveSnake = (setSnake, direction, pointLoc, setPointLoc, setCurrentScore) => () => {
  setSnake((prevSnake) => {
    const arr = Array.from(prevSnake);
    const firstData = arr.shift();
    const lastData = arr[arr.length - 1];
    let newData;
    if (direction === DIRECTION.RIGHT) newData = lastData + (((lastData + 1) % N) - (lastData % N));
    else if (direction === DIRECTION.LEFT) newData = lastData - ((lastData % N) - ((lastData - 1 + N) % N));
    else if (direction === DIRECTION.DOWN) newData = (lastData + N) % (N * N);
    else if (direction === DIRECTION.UP) newData = (lastData - N + N * N) % (N * N);
    if (arr.includes(newData)) return new Set();
    if (newData === pointLoc) {
      setPointLoc(getRandomNumberExcluding([firstData, ...arr, newData]));
      setCurrentScore((prevScore) => prevScore + 1);
      return new Set([firstData, ...arr, newData]);
    }
    return new Set([...arr, newData]);
  });
};
