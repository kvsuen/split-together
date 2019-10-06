import React from 'react';
import { useParams } from 'react-router-dom';
import ButtonRedirect from '../../components/RedirectButton/button-redirect.component';

import './room-invitation.style.css';

const QRCode = require('qrcode.react');

const RoomInvitationPage = () => {
  const roomId = useParams().id

  return (
    <div className="room-invite">
      <div className='room-invite_header'>
        <h1>Invitation</h1>
        <h2>Room#: {roomId}</h2>
      </div>
      <div className='qr-code_container'>
        <div className="qr-code">
          <QRCode value={`https://1668118e.ngrok.io/room/${roomId}`}/>
        </div>
        <ButtonRedirect
          route={`/room/${roomId}`}
        >
          Enter Room
        </ButtonRedirect>
      </div>


    </div>
  );
};

export default RoomInvitationPage;
