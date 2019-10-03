import React, { useState } from 'react';
import Button from '../../../components/Button/button.component';
import QrReader from 'react-qr-reader';
import ButtonRedirect from '../../../components/RedirectButton/button-redirect.component';
import { Redirect } from 'react-router-dom';

import './room-entry.style.css';

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

  return (
    <div className={'room_entry_page'}>
      <header className={'room_header'}>
        <h2 className={'room_header__title'}>Room Entry</h2>
      </header>
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

          <ButtonRedirect route={`room/${state.text}`} text={'ENTER ROOM'} />
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
