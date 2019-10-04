import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';

import SnapPage from './snap/snap.component';
import DashboardPage from './dashboard/dashboard.component';
import RoomEntryPage from './room-entry/room-entry.component';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import DashboardIcon from '@material-ui/icons/Dashboard';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

import './main.style.css';
const MainPage = () => {
  const [disabled, setDisabled] = useState(false);
  const [index, setIndex] = useState(1);

  const toggleSwipe = () => {
    disabled ? setDisabled(false) : setDisabled(true);
  };

  const handleChangeIndex = ind => {
    setIndex(ind);
  };

  const handleChange = (event, value) => {
    setIndex(value)
  };


  return (
    <div>
      <SwipeableViews
        index={index}
        disabled={disabled}
        onChangeIndex={ind => handleChangeIndex(ind)}
      >
        <div>
          <DashboardPage />
        </div>
        <div>
          <SnapPage toggleSwipe={toggleSwipe} />
        </div>
        <div>
          <RoomEntryPage />
        </div>
      </SwipeableViews>
      {!disabled && (
        <BottomNavigation
          value={index}
          onChange={handleChange}
          showLabels
          className={`footer`}
        >
          <BottomNavigationAction label="Dashboard" icon={<DashboardIcon />} />
          <BottomNavigationAction label="Camera" icon={<CameraAltIcon />} />
          <BottomNavigationAction label="Room Entry" icon={<MeetingRoomIcon />} />
        </BottomNavigation>
      )}
    </div>
  );
};

export default MainPage;
