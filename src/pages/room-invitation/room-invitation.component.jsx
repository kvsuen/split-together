import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ButtonRedirect from '../../components/RedirectButton/button-redirect.component';
import './room-invitation.style.css';
import Button from '../../components/Button/button.component';
const QRCode = require('qrcode.react');



const RoomInvitationPage = () => {

  const roomId = useParams().id

  return (
    <div className="room-invite">
      <h1>Room Invitation</h1>
      <h2>Room: {roomId}</h2>
      <div className="linebreak">
         <br></br>
      </div>
      <div className="qr-code">
        <QRCode value={`https://1668118e.ngrok.io/room/${roomId}`}/>
      </div>
      <ButtonRedirect
        route={`/room/${roomId}`}
      >
        ENTER ROOM
      </ButtonRedirect>

    </div>
  );
};

export default RoomInvitationPage;
