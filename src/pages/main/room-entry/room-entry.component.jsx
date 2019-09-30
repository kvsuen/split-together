import React, { useState } from 'react';
import Button from '../../../components/Button/button.component';
import QrReader from 'react-qr-reader';
import ButtonRedirect from '../../../components/RedirectButton/button-redirect.component';
import { Redirect } from "react-router-dom"


const RoomEntryPage = () => {
  const regex = /room\/.*/g;

  const [state, setState] = useState({
    qrReaderStatus: false,
    result: "No result",
    text: "",
    redirect: false
  })

  const qrScanner = () => {
    if (state.qrReaderStatus) {
      setState({...state, qrReaderStatus: false})
    } else {
      setState({...state, qrReaderStatus: true})
    }
  };

  function handleScan (data) {
    if (data) {
      
      const parsedStr = data.match(regex);
      
      setState({
        ...state,
        redirect: true,
        result: parsedStr
      })
    }
  }

  function handleError (err) {
    console.error(err)
  }

  const handleChange = () => {
    setState({
      ...state, 
      text: document.getElementById("route-id").value
    })
  }

  return (
    <div>
      <Button 
        children={'SWITCH'}
        onClick={() => qrScanner()} 
      />

      <h1>Room Entry Page</h1>
      {!state.qrReaderStatus && (
        <div>
          <input id="route-id" type="text" value={state.text} onChange={() => handleChange()}/>
          
          <ButtonRedirect 
            route={`room/${state.text}`}
            text={"ENTER ROOM"}
          />
        </div>
      )}
      {state.qrReaderStatus && (
        <div>
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%' }}
        />
        <p>{state.result}</p>
      </div>
      )}
      {state.redirect && (
        <Redirect to={`${state.result}`}/>
      )}
    </div>
  );
}
 
export default RoomEntryPage;