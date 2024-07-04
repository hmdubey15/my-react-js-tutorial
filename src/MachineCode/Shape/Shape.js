import React, { useEffect, useMemo, useRef, useState } from 'react';

import './shape.css';

// Problem - https://www.youtube.com/watch?v=DCoIeGt4g7M&t=548s&ab_channel=DevtoolsTech

const BOX_DATA = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1],
];

const Shape = () => {
  const [selectedPairs, setSelectedPairs] = useState({});

  // We can't add local variable in first useEffect because it will run everytime dependency changes.
  const intervalIdRef = useRef(null); 

  const totalOnes = useMemo(
    () =>
      BOX_DATA.reduce((acc1, arr) => {
        return (
          acc1 +
          arr.reduce((acc2, data) => {
            return acc2 + data;
          }, 0)
        );
      }, 0),
    []
  );

  useEffect(() => {
    if (Object.keys(selectedPairs).length === totalOnes) {
      intervalIdRef.current = setInterval(() => {
        setSelectedPairs((prevSelectedPairs) => {
          const keys = Object.keys(prevSelectedPairs);
          const n = keys.length;
          if (n === 0) {
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = null;
            return {};
          }
          delete prevSelectedPairs[keys[n - 1]];
          return { ...prevSelectedPairs };
        });
      }, 300);
    }
  }, [selectedPairs, totalOnes]);

  useEffect(
    () => () => {
      clearInterval(intervalIdRef.current);
    },
    []
  );

  const handleItemClick = (i, j) => () => {
    if (!selectedPairs[JSON.stringify({ i, j })])
      setSelectedPairs((prevSelectedPairs) => ({ ...prevSelectedPairs, [JSON.stringify({ i, j })]: 1 }));
  };

  return (
    <div>
      <h1>Uber question: Draw shape given in 2-D Array</h1>
      {BOX_DATA.map((rowArr, i) => (
        <div className="box-row" key={i}>
          {rowArr.map((data, j) => (
            <div
              className={selectedPairs[JSON.stringify({ i, j })] ? 'colored-element' : 'blank-element'}
              key={(i + 1) * (j + 1)}
              style={{ ...(data === 0 ? { visibility: 'hidden' } : {}) }}
              onClick={handleItemClick(i, j)}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Shape;
