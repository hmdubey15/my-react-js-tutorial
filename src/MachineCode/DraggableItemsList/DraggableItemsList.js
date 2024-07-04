import React, { useState, useRef } from 'react';

import './draggableItemsList.css';

function DraggableItemsList() {
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  const [draggingIndex, setDraggingIndex] = useState(null);

  const dragElRefs = useRef([]);

  const handleDragStart = (i) => () => {
    setDraggingIndex(i);
    dragElRefs.current[i].current.classList.add('dragging');
  };

  const handleDragEnd = (i) => () => {
    dragElRefs.current[i].current.classList.remove('dragging');
  };

  const handleDragOver = (i) => (e) => {
    e.preventDefault();
    if(draggingIndex === i) return;
    setNumbers((prevNumbers) => {
      const newNumbers = [...prevNumbers];
      const element = newNumbers[draggingIndex];
      newNumbers.splice(draggingIndex, 1);
      newNumbers.splice(i, 0, element);
      return newNumbers;
    });
    setDraggingIndex(i);
  }

  const handleDrop = () => {
    setDraggingIndex(null);
  }

  return (
    <div className="list">
      {numbers.map((data, i) => (
        <div
          key={data}
          className="item"
          draggable
          ref={dragElRefs.current[i] ?? (dragElRefs.current[i] = React.createRef())}
          onDragStart={handleDragStart(i)}
          onDragEnd={handleDragEnd(i)}
          onDragOver={handleDragOver(i)}
          onDrop={handleDrop}
        >
          {data}
        </div>
      ))}
    </div>
  );
}

export default DraggableItemsList;
