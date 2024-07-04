import { useMemo, useRef, useState } from 'react';

import { throttle } from './progressBar.helpers';
import { PROGRESS_BAR_COMPLETION_TIME, MAX_RUNNING_PROGRESS_BARS } from './progressBar.constants';

import './progressBarAddOnClick.css';

function ProgressBarAddOnClick() {
  const [curPb, setCurPb] = useState(1);
  const [runningPbs, setRunningPbs] = useState(0);
  const isOn = useRef(false);

  const addProgressBarInRunningQueue = useMemo(
    () =>
      throttle(
        () => {
          setRunningPbs((prevRunPbs) => prevRunPbs + 1);
        },
        MAX_RUNNING_PROGRESS_BARS,
        PROGRESS_BAR_COMPLETION_TIME
      ),
    []
  );

  const handleAddProgressBar = () => {
    setCurPb((prevPb) => prevPb + 1);
    if (isOn.current) addProgressBarInRunningQueue();
  };

  const handleStartProgressBars = () => {
    isOn.current = true;
    for (let i = 0; i < curPb; i++) addProgressBarInRunningQueue();
  };

  const handleReset = () => {
    isOn.current = false;
    setCurPb(0);
    setRunningPbs(0);
  };

  return (
    <div className="main-app">
      <h1>Concurrent Progress Bars</h1>
      <button onClick={handleAddProgressBar}>Add</button>
      <button onClick={handleStartProgressBars}>Start</button>
      <button onClick={handleReset}>Reset</button>
      <div style={{ '--p-bar-time': `${PROGRESS_BAR_COMPLETION_TIME / 1000}s` } as React.CSSProperties}>
        {new Array(curPb).fill(null).map((_, index) => (
          <div key={index} className="progress-bar">
            <div className={index + 1 <= runningPbs ? 'bar-filling' : ''} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProgressBarAddOnClick;
