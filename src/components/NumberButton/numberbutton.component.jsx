import React from 'react';

const NumberButton = ({ targetRoomCode, digit }) => {

  return (
    <div className='digit' onClick={() => targetRoomCode(digit)}>
      {digit}
    </div>
  );
};

export default NumberButton;