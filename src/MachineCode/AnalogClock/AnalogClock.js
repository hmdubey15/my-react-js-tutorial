import React, { useEffect, useState } from 'react';

import './analogClock.scss';

const AnalogClock = () => {
  const [sec, setSec] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSec((prevSec) => prevSec + 1);
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="clock">
      {new Array(12).fill(0).map((_, key) => (
        <div className="time-stamp" style={{ transform: `rotate(${30 * (key + 1)}deg)` }}>
          <div style={{ transform: `rotate(-${30 * (key + 1)}deg)` }}>{key + 1}</div>
        </div>
      ))}
      <div className="second-hand" style={{ transform: `rotate(${6 * sec}deg)` }}></div>
      <div className="minute-hand" style={{ transform: `rotate(${sec / 10}deg)` }}></div>
      <div className="hour-hand" style={{ transform: `rotate(${sec / 120}deg)` }}></div>
    </div>
  );
};

export default AnalogClock;
