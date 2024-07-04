import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import './toasterContainer.css';

const Toaster = ({ id, type, setToasters }) => {
  const destroyToaster = useCallback(() => {
    setToasters((prevToasters) => {
      const clonePrevToaster = { ...prevToasters };
      delete clonePrevToaster[id];
      return clonePrevToaster;
    });
  }, [setToasters, id]);

  useEffect(() => {
    setTimeout(() => {
      destroyToaster();
    }, 5000);
  }, [destroyToaster]);

  return <div className={`toaster ${type}`} onClick={destroyToaster} role="button" tabIndex={0}>{`Hi, I am ${type} toaster!`}</div>;
};

Toaster.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  setToasters: PropTypes.func.isRequired,
};

export default Toaster;
