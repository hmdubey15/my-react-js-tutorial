import { useState, useRef, useEffect } from 'react';

import ScrollingTile from './ScrollingTile';
import { FLOW_TIME, PUPPIES_URLS } from './constants';

import './infiniteScrollingTiles.css';

// Question - https://frontendeval.com/questions/scrolling-tiles?tab=question

// TODO: ♦️ Still incomplete! Infinite auto scrolling is difficult to achive

const InfiniteScrollingTiles = () => {
  return (
    <div>
      <ScrollingTile imgUrls={PUPPIES_URLS} flowRate={FLOW_TIME.SLOWED} />
      {/* <ScrollingTile imgUrls={PUPPIES_URLS} flowRate={FLOW_TIME.FREE} /> */}
      {/* <img /> */}
    </div>
  );
};

export default InfiniteScrollingTiles;
