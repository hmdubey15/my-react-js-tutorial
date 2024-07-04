import { useCallback, useState } from 'react';
import cx from 'classnames';

import './starRating.css';

function StarRating() {
  const [rating, setRating] = useState<number>(0);
  const [hoveredStars, setHoveredStars] = useState<number>(0);

  const handleSetRating = useCallback(
    (clickedIndex: number) => () => {
      setRating(clickedIndex + 1);
    },
    []
  );

  const handleHoverOverStar = useCallback(
    (hoveredIndex: number) => () => {
      setHoveredStars(hoveredIndex + 1);
    },
    []
  );

  const handleMouseLeavesStar = useCallback(() => {
    setHoveredStars(0);
  }, []);

  return (
    <div className="container">
      {new Array(5).fill(0).map((_, index) => {
        const isYellowStar = (hoveredStars === 0 && index + 1 <= rating) || index + 1 <= hoveredStars;
        return (
          <div
            key={index}
            onClick={handleSetRating(index)}
            onMouseEnter={handleHoverOverStar(index)}
            onMouseLeave={handleMouseLeavesStar}
            className={cx('star', {
              'selected-star': isYellowStar,
              'unselected-star': !isYellowStar,
            })}
          />
        );
      })}
    </div>
  );
}

export default StarRating;
