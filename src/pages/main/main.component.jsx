import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';

import SnapPage from './snap/snap.component';
import DashboardPage from './dashboard/dashboard.component';
import RoomEntryPage from './room-entry/room-entry.component';

const MainPage = () => {
  const [disabled, setDisabled] = useState(false);
  const [index, setIndex] = useState(1);

  const toggleSwipe = () => {
    disabled ? setDisabled(false) : setDisabled(true);
  }

  const setPageTo = (num) => {
    setIndex(num);
  }

  return (
    <SwipeableViews index={index} disabled={disabled}>
      <div>
        <DashboardPage />
      </div>
      <div>
        <SnapPage toggleSwipe={toggleSwipe} setPageTo={setPageTo}/>
      </div>
      <div>
        <RoomEntryPage />
      </div>
    </SwipeableViews>
  );
};

export default MainPage;
