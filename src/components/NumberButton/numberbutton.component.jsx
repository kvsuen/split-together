import React from 'react';
import classnames from 'classnames'
import './numberbutton.style.css'

const NumberButton = ({ targetRoomCode, digit, select }) => {

  const classnamesObj = {};
  let testDigit = '';

  if (select !== null && select !== undefined) {
    testDigit = select.includes(digit); 
  }

  classnamesObj[`digit--clicked${digit}`] = testDigit;

  const digitClass = classnames('digit', 
    classnamesObj
  )

  return (
    <div className={digitClass} onClick={() => targetRoomCode(digit)}>
      {digit}
    </div>
  );
};

export default NumberButton;