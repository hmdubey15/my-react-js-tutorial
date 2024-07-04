import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import './otpInput.css';

const OtpInput = ({ noOfBoxes }) => {
  const inputRefs = useRef([]);

  const [otp, setOtp] = useState('');

  useEffect(() => {
    inputRefs.current[0].current.classList.add('otp-input-focused');
    const keyPressEventHandler = (event) => {
      if (event.key >= '0' && event.key <= '9') {
        setOtp((prevOtp) => {
          if (prevOtp.length === noOfBoxes) return prevOtp;
          if (prevOtp.length + 1 < noOfBoxes) inputRefs.current[prevOtp.length + 1].current.classList.add('otp-input-focused');
          inputRefs.current[prevOtp.length].current.classList.remove('otp-input-focused');
          return prevOtp + event.key;
        });
      }

      if (event.key === 'Backspace') {
        setOtp((prevOtp) => {
          if (prevOtp.length < noOfBoxes) inputRefs.current[prevOtp.length].current.classList.remove('otp-input-focused');
          if (prevOtp.length - 1 >= 0)inputRefs.current[prevOtp.length - 1].current.classList.add('otp-input-focused');
          return prevOtp.substring(0, prevOtp.length - 1);
        });
      }
    };
    document.addEventListener('keydown', keyPressEventHandler);
    return () => {
      document.removeEventListener('keydown', keyPressEventHandler);
    };
  }, [noOfBoxes]);

  return (
    <div className="container">
      {new Array(noOfBoxes).fill(0).map((_, index) => (
        <div className="otp-input" key={index} ref={inputRefs.current[index] ?? (inputRefs.current[index] = React.createRef())}>
          {otp?.[index]}
        </div>
      ))}
    </div>
  );
};

OtpInput.propTypes = {
  noOfBoxes: PropTypes.number,
};

OtpInput.defaultProps = {
  noOfBoxes: 4,
};

export default OtpInput;
