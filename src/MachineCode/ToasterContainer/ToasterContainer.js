import React, { useState, useCallback } from 'react';

import { TOASTER_TYPE } from './toasterContainer.constants';

import './toasterContainer.css';
import Toaster from './Toaster';

const ToasterContainer = () => {
  const [toasters, setToasters] = useState({});

  const handleBtnContainerClick = useCallback((event) => {
    const toasterType = event.target.dataset.toasterType;
    if (!toasterType) return;
    const uniqueId = Date.now();
    setToasters((prevToasters) => ({ ...prevToasters, [uniqueId]: toasterType }));
  }, []);

  return (
    <div>
      <div className="btn-container" onClick={handleBtnContainerClick} role="button" tabIndex={0}>
        <button data-toaster-type={TOASTER_TYPE.SUCCESS} className="btn">
          Success ✅
        </button>
        <button data-toaster-type={TOASTER_TYPE.INFO} className="btn">
          Info ℹ️
        </button>
        <button data-toaster-type={TOASTER_TYPE.WARNING} className="btn">
          Warning ⚠️
        </button>
        <button data-toaster-type={TOASTER_TYPE.ERROR} className="btn">
          Error ❌
        </button>
      </div>

      <div className='toaster-container'>
        {Object.keys(toasters).map((toasterId) => (
          <Toaster key={toasterId} id={toasterId} type={toasters[toasterId]} setToasters={setToasters} />
        ))}
      </div>
    </div>
  );
};

export default ToasterContainer;
