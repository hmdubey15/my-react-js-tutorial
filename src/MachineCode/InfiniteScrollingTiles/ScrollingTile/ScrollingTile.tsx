import { useCallback, useEffect, useRef, useState } from 'react';
import './scrollingTile.css';

interface ScrollingTileProps {
  imgUrls: string[];
  flowRate: number;
}

function ScrollingTile({ imgUrls, flowRate }: ScrollingTileProps) {
  const [curImgUrls, setCurImgUrls] = useState(imgUrls);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurImgUrls(prevImgUrls => prevImgUrls.concat(curImgUrls))
    }, 2500);

    return () => {
      clearInterval(intervalId);
    }
  }, [curImgUrls]);

  return (
    <div className="tile-container">
      <div className="tile-track">
        {curImgUrls.map((url, index) => (
          <img key={index} src={url} alt={url} />
        ))}
      </div>
    </div>
  );
}

export default ScrollingTile;
