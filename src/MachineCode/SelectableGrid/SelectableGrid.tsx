import { useCallback, useEffect, useMemo, useState } from 'react';

import './selectableGrid.css';

const N = 13;

function throttle(callback: (...callbackArgs: any[]) => any, timeIv = 500) {
  let noOfCalls = 0;
  const maxLimit = 3;
  return function (this: any, ...args: any[]) {
    if (noOfCalls === maxLimit) return;
    noOfCalls++;
    callback.apply(this, args);
    setTimeout(() => {
      noOfCalls--;
    }, timeIv);
  };
}

function SelectableGrid() {
  const [startIndex, setStartIndex] = useState<number | null>(null);
  const [endIndex, setEndIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleGridClickReleased = () => {
      setStartIndex(null);
      setEndIndex(null);
    };
    document.addEventListener('mouseup', handleGridClickReleased);
    return () => {
      document.removeEventListener('mouseup', handleGridClickReleased);
    };
  }, []);

  // Find out whether throttling is even necessary or not!

  const throttledMouseMove = useMemo(
    () =>
      throttle((event: React.MouseEvent<HTMLDivElement>) => {
        if (startIndex == null) return;
        const target = event.target as HTMLElement;
        const index: number = Number(target.dataset.index);
        setEndIndex(index);
      }, 50),
    [startIndex]
  );

  const handleGridItemClicked = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const index: number = Number(target.dataset.index);
    setStartIndex(index);
    setEndIndex(index);
  }, []);

  const squareGrid = useMemo(() => {
    if (startIndex == null || endIndex == null) return null;
    const R1 = Math.floor(startIndex / N);
    const R2 = Math.floor(endIndex / N);
    const C1 = startIndex % N;
    const C2 = endIndex % N;
    return { R1, R2, C1, C2 };
  }, [startIndex, endIndex]);

  const shouldHighlight = useCallback(
    (index: number) => {
      if (squareGrid != null) {
        const { R1, R2, C1, C2 } = squareGrid;
        const r = Math.floor(index / N);
        const c = index % N;
        if (r >= Math.min(R1, R2) && r <= Math.max(R1, R2) && c >= Math.min(C1, C2) && c <= Math.max(C1, C2)) return 'selected-grid-item';
      }
      return '';
    },
    [squareGrid]
  );

  return (
    <div className="container">
      <h1>Selectable Grid</h1>
      <div style={{ '--cols': N } as React.CSSProperties} className="matrix" onMouseDown={handleGridItemClicked} onMouseOver={throttledMouseMove}>
        {new Array(N * N).fill(null).map((_, index) => (
          <div key={index} data-index={index} className={`matrix-item ${shouldHighlight(index)}`}></div>
        ))}
      </div>
    </div>
  );
}

export default SelectableGrid;
