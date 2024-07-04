import React, { useState, useRef, useEffect } from 'react';

import { PUPPIES_URLS } from './constants';

import './infiniteScrollingTiles.css';

// Question - https://frontendeval.com/questions/scrolling-tiles?tab=question 

const InfiniteScrollingTiles = () => {
  const [selectedImgUrl, setSelectedImgUrl] = useState(PUPPIES_URLS[0]);
  const [puppiesUrlsList, setPuppiesUrlsList] = useState(PUPPIES_URLS);

  const puppiesCarouselRef = useRef(null);
  const observerPuppiesRef = useRef(null);

  useEffect(() => {
    observerPuppiesRef.current = new IntersectionObserver((entries, observer) => {
      if (entries.length > 1) return;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === puppiesCarouselRef.current.lastElementChild)
            setPuppiesUrlsList((prevPuppiesUrlsList) => [...prevPuppiesUrlsList, ...PUPPIES_URLS]);
          observer.unobserve(entry.target);
        }
      });
    });

    return () => {
      observerPuppiesRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    for (const child of puppiesCarouselRef.current.children) {
      observerPuppiesRef.current.observe(child);
    }
  }, [puppiesUrlsList]);

  console.log({ puppiesUrlsList });

  return (
    <div className="main-container">
      <div className="puppies-carousel" ref={puppiesCarouselRef}>
        {puppiesUrlsList.map((url, i) => (
          <img
            key={`${url}_${i}`}
            src={url}
            alt="Puppy"
            onClick={() => {
              setSelectedImgUrl(url);
            }}
          />
        ))}
      </div>
      <img className="selected-pet" alt="No-pic-selected" src={selectedImgUrl} width="400px" />
    </div>
  );
};

export default InfiniteScrollingTiles;
