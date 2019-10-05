import React, { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';

import classnames from 'classnames';
import QrReader from 'react-qr-reader';
import NumberButton from '../../../components/NumberButton/numberbutton.component';

import './room-entry.style.css';

import Switch from '@material-ui/core/Switch';
import BackspaceOutlinedIcon from '@material-ui/icons/BackspaceOutlined';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';

const RoomEntryPage = () => {
  const regex = /room\/.*/g;

  const [state, setState] = useState({
    qrReaderStatus: false,
    result: 'No result',
    text: '',
    redirect: false,
    inputFull: false
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
    } else {
      //logic here for wiggle effect?
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
    setState({...state, text: codeField.value, inputFull: false})
  }

  const validRoom = (history) => {
    //!!!!!!NEED FEATURE ADDED!!!!!!
    //ARRAY FROM AXIOS CALL NEED ALL ROOM IDS
    const valid = [2, 5];
    const code = Number(document.getElementById('route-id').value);
    if (valid.includes(code)) {
      history.push(`room/${state.text}`)
    } else {
      setState({...state, inputFull: true})
    }
  };

  //-----------WIP---------------------
  const itemClass = classnames("code__input", {
    "code__input--full": state.inputFull,
  });

  return (
    <div className={'room_entry_page'}>
      <h1>Room Entry</h1>
      {!state.qrReaderStatus && (
        <div className={'input_container'}>
          <input
            className={`input_container__input ${itemClass}`}
            id="route-id"
            type="text"
            value={state.text}
            placeholder='Input room code'
            onChange={() => handleChange()}
            readOnly
          />
          
          <div className='numpad__wrapper'>
            {numberPad}
            <div className='backspace' onClick={() => deleteANumber()}>
              <BackspaceOutlinedIcon/>
            </div>
            <Route render={({ history }) => (
              <div className="backspace" onClick={() => validRoom(history)}>
                <CheckCircleOutlineOutlinedIcon/>
              </div>
            )} />
          </div>
        </div>
      )}
      
      <div className={'entry_footer'}>
        <div className='qrSwitch'>
          <div id='qrSwitch__head'>QR Scanner</div>
          <div id='qrSwitch__switch'>
            Off
            <Switch
              onChange={() => qrScanner()}
              color="primary"
            />
            On
          </div>
        </div>
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
