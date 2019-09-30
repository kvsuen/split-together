import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ButtonRedirect from '../../components/RedirectButton/button-redirect.component';
import './room-invitation.style.css';
const QRCode = require('qrcode.react');



const RoomInvitationPage = () => {

  const roomId = useParams().id

  return (
    <div className="room-invite">
      <h1>Room Invitation Page</h1>
      <h2>{roomId}</h2>

      <h4>THIS IS A QR CODE</h4>
      <div className="qr-code">
        <QRCode value={`https://1668118e.ngrok.io/room/${roomId}`}/>
      </div>
      {/* <Link to={`/room/${roomId}`}>
        TEST
      </Link> */}
      <ButtonRedirect
        route={`/room/${roomId}`}
        text={"ENTER ROOM"}
      />

    </div>
  );
};

export default RoomInvitationPage;
