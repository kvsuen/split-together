import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';

import classnames from 'classnames';
import QrReader from 'react-qr-reader';
import NumberButton from '../../../components/NumberButton/numberbutton.component';

import './room-entry.style.css';

import Switch from '@material-ui/core/Switch';
import BackspaceOutlinedIcon from '@material-ui/icons/BackspaceOutlined';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';

import Axios from 'axios';
import { useSpring, animated } from 'react-spring';

const RoomEntryPage = () => {
  const regex = /room\/.*/g;

  const [state, setState] = useState({
    qrReaderStatus: false,
    result: 'No result',
    text: '',
    redirect: false,
    inputFull: false
  });

  const [qrStatus, setStatus] = useState(false);
  
  const contentProps = useSpring({
    width: state.inputFull ? "80vw" : "0vw" ,
    borderTop: state.inputFull ? `red .1vh solid` : "#808edf .1vh solid"
  })

  const qrScanner = () => {
    if (state.qrReaderStatus) {
      setState({ ...state, qrReaderStatus: false });
    } else {
      setState({ ...state, qrReaderStatus: true });
    }
    toggleQrStatus()
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
  const digits = [1,2,3,4,5,6,7,8,9]

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
        key={digit}
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
    const code = Number(document.getElementById('route-id').value);

    Axios.get(`${process.env.REACT_APP_API_SERVER_URL}/rooms`)
      .then(res => {
        if (res.data.includes(code)) {
          history.push(`room/${state.text}`)
        } else {
          setState({...state, inputFull: true})
        }
      })
      .catch(err => console.log(err))

  };

  const itemClass = classnames("code__input", {
    "code__input--full": state.inputFull,
  });

  const bodyClass = classnames("body", {
    "body--qrOpen": qrStatus 
  });

  const toggleQrStatus = () => {
    qrStatus ? setStatus(false) : setStatus(true)
  };

  return (
    <>
    <div className={bodyClass} onClick={() => qrScanner()}/>
    <div className={'room_entry_page'}>
      {!state.qrReaderStatus && (
        <div>
          <h1>Room Entry</h1>
        </div>
      )}
        <div className={'input_container'}>

          {!state.qrReaderStatus && (
          <>
          <main id="input_container__body">
            <div>
              <img id="room_icon" src={require("../icons/room.png")} width="120px" alt="fail"/>
            </div>
            <div className="firstline">
              Enter the room via numeric code
            </div>
            <div>
              or scan the QR code
            </div>
          </main>
            <input
              className={`input_container__input ${itemClass}`}
              id="route-id"
              type="text"
              value={state.text}
              placeholder='Input room code'
              onChange={() => handleChange()}
              readOnly
            />
            <animated.div className="underline" style= {contentProps}>
              <br></br>
            </animated.div>
          </>
          )}

          {state.qrReaderStatus && (
            <div className="qrReader">
              <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '100%' }}
              />
            </div>
          )}
          <footer className="footerWrapper">
            <div className={'entry_footer'}>
              <div className='qrSwitch'>
                <div id='qrSwitch__switch'>
                  QR Scanner
                  <Switch
                    checked={state.qrReaderStatus}
                    onChange={() => qrScanner()}
                    color="primary"
                  />
                </div>
              </div>
            </div>

            <section id='section__wrapper'>
              <div className='numpad__wrapper'>
                {numberPad}
              </div>
              <div id="numpad__sideWrapper">
              <NumberButton 
                digit={0}
                targetRoomCode={targetRoomCode}
              />
              <div className='numpad__backspace' onClick={() => deleteANumber()}>
                <BackspaceOutlinedIcon/>
              </div>
              <Route render={({ history }) => (
                <div className="numpad__enter" onClick={() => validRoom(history)}>
                  <CheckCircleOutlineOutlinedIcon/>
                </div>
              )} />
              </div>
            </section>
          </footer>
        </div>
      
      
      {state.redirect && <Redirect to={`${state.result}`} />}
    </div>
    </>
  );
};

export default RoomEntryPage;
