import { useState } from 'react';

import { IMAGES_LIST } from './imagesData';

import './leftRightImageCarousel.css';

const N = IMAGES_LIST.length;

const LeftRightImageCarousel = () => {
  const [selectedImage, setSelectedImage] = useState(0);

  const handleNextBtnClick = () => {
    setSelectedImage((selectedImage + 1) % N);
  };

  const handlePrevBtnClick = () => {
    setSelectedImage((selectedImage + N - 1) % N);
  };

  return (
    <div className="carousel">
      <button className="left-btn" onClick={handlePrevBtnClick}>
        &#10094;
      </button>
      <button className="right-btn" onClick={handleNextBtnClick}>
        &#10095;
      </button>
      <div className="slider">
        {new Array(N).fill(null).map((_, index) => (
          <button
            onClick={() => {
              setSelectedImage(index);
            }}
            className={selectedImage === index ? 'selected-btn' : 'unselected-btn'}
          ></button>
        ))}
      </div>
      <img src={IMAGES_LIST[selectedImage].src} alt={IMAGES_LIST[selectedImage].alt} />
    </div>
  );
};

export default LeftRightImageCarousel;
