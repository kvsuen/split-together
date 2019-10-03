import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';

import SnapPage from './snap/snap.component';
import DashboardPage from './dashboard/dashboard.component';
import RoomEntryPage from './room-entry/room-entry.component';

import userLogo from './icons/analysis.png';
import enterLogo from './icons/receipt.png';
import cameraLogo from './icons/camera.png';

import './main.style.css';

const MainPage = () => {
  const [disabled, setDisabled] = useState(false);
  const [index, setIndex] = useState(1);

  const toggleSwipe = () => {
    disabled ? setDisabled(false) : setDisabled(true);
  };

  const setPageTo = num => {
    setIndex(num);
  };

  const handleChangeIndex = ind => {
    setIndex(ind)
  }

  return (
    <div>
      <SwipeableViews index={index} disabled={disabled} onChangeIndex={ind => handleChangeIndex(ind)}>
        <div>
          <DashboardPage />
        </div>
        <div>
          <SnapPage toggleSwipe={toggleSwipe} setPageTo={setPageTo} />
        </div>
        <div>
          <RoomEntryPage />
        </div>
      </SwipeableViews>
      {!disabled && (
        <footer className={'footer'}>
          <img
            className={'footer__logo footer__logo--left'}
            src={userLogo}
            alt="Profile Dashboard"
            onClick={() => setPageTo(0)}
          />
          {index !== 1 && (
            <img
              className={'footer__logo footer__logo--center'}
              src={cameraLogo}
              alt="Profile Dashboard"
              onClick={() => setPageTo(1)}
            />
          )}
          <img
            className={'footer__logo footer__logo--right'}
            src={enterLogo}
            alt="Split Bill"
            onClick={() => setPageTo(2)}
          />
        </footer>
      )}
    </div>
  );
};

export default MainPage;
