import { useCallback, useMemo, useState } from 'react';
import cx from 'classnames';
import './memoryGame.css';
import { getRandomArrayForGame } from './memoryGame.helpers';

const N = 4; // Even number only

function MemoryGame() {
  const numsOnBoxes = useMemo(() => getRandomArrayForGame(N), []);

  const [turnedStatus, setTurnedStatus] = useState<boolean[]>([]);

  const [isItemClickable, setIsItemClickable] = useState(true);

  const [prevTurnedIndex, setPrevTurnedIndex] = useState(-1); // -1: None have turned!

  const handleTurnCard = useCallback(
    (index: number) => () => {
      if (!isItemClickable) return;
      const newTurnedStatus = [...turnedStatus];
      if (prevTurnedIndex !== -1) {
        newTurnedStatus[index] = true;
        setPrevTurnedIndex(-1);
        if (numsOnBoxes[prevTurnedIndex] !== numsOnBoxes[index]) {
          setIsItemClickable(false);
          setTimeout(() => {
            newTurnedStatus[prevTurnedIndex] = false;
            newTurnedStatus[index] = false;
            setTurnedStatus([...newTurnedStatus]);
            setIsItemClickable(true);
          }, 1000);
        }
      } else {
        newTurnedStatus[index] = true;
        setPrevTurnedIndex(index);
      }
      setTurnedStatus(newTurnedStatus);
    },
    [prevTurnedIndex, numsOnBoxes, turnedStatus, isItemClickable]
  );

  return (
    <div className="container">
      <h1>Memory Game</h1>
      <div className="game-box">
        {numsOnBoxes.map((num, index) => (
          <div role="button" key={index} className={cx('grid-item', turnedStatus[index] ? 'turned-grid-item' : '')} onClick={handleTurnCard(index)}>
            {turnedStatus[index] ? num : ''}
          </div>
        ))}
      </div>
      <button className="reset-button">Reset</button>
    </div>
  );
}

export default MemoryGame;
