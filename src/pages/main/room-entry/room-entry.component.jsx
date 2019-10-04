import React, { useState } from 'react';
import QrReader from 'react-qr-reader';
import ButtonRedirect from '../../../components/RedirectButton/button-redirect.component';
import { Redirect } from 'react-router-dom';

import './room-entry.style.css';
import NumberButton from '../../../components/NumberButton/numberbutton.component';

const RoomEntryPage = () => {
  const regex = /room\/.*/g;

  const [state, setState] = useState({
    qrReaderStatus: false,
    result: 'No result',
    text: '',
    redirect: false
  });

  const qrScanner = () => {
    if (state.qrReaderStatus) {
      setState({ ...state, qrReaderStatus: false });
    } else {
      setState({ ...state, qrReaderStatus: true });
    }
  };

  function handleScan(data) {
    if (data) {
      const parsedStr = data.match(regex);

      setState({
        ...state,
        redirect: true,
        result: parsedStr
      });
    }
  }

  function handleError(err) {
    console.error(err);
  }

  const handleChange = () => {
    setState({
      ...state,
      text: document.getElementById('route-id').value
    });
  };

  //NUMPAD GENERATOR
  const digits = [1,2,3,4,5,6,7,8,9,0]

  const targetRoomCode = (digit) => {
    let codeField = document.getElementById('route-id')
    if (codeField.value.length < 3) {
      codeField.value += digit;
      setState({...state, text: codeField.value})
    }
  }

  const numberPad = digits.map((digit) => {
    return (
      <NumberButton 
        digit={digit}
        targetRoomCode={targetRoomCode}
      />
    )
  });

  const deleteANumber = () => {
    const codeField = document.getElementById('route-id');
    codeField.value = codeField.value.slice(0, codeField.value.length - 1);
    setState({...state, text: codeField.value})
  }

  return (
    <div className={'room_entry_page'}>
      <h1>Room Entry</h1>
      {!state.qrReaderStatus && (
        <div className={'input_container'}>
          <input
            className={'input_container__input'}
            id="route-id"
            type="text"
            value={state.text}
            placeholder='Input room number'
            onChange={() => handleChange()}
          />
          
          <div className='numpad__wrapper'>
            {numberPad}
            <div className='digit' onClick={() => deleteANumber()}>
              D
            </div>
            <ButtonRedirect className={'entry_button'} route={`room/${state.text}`} >ENTER ROOM</ButtonRedirect>
          </div>

        </div>
      )}
      
      <div className={'entry_footer'}>
        <button className={'entry_footer__switch'} onClick={() => qrScanner()}>QR READER</button>
      </div>

      {state.qrReaderStatus && (
        <div>
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: '100%' }}
          />
        </div>
      )}
      {state.redirect && <Redirect to={`${state.result}`} />}
    </div>
  );
};

export default RoomEntryPage;
