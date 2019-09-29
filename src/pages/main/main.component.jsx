import React from 'react';
import SwipeableViews from 'react-swipeable-views';

import SnapPage from './snap/snap.component';
import DashboardPage from './dashboard/dashboard.component';
import RoomEntryPage from './room-entry/room-entry.component';

const MainPage = () => {
  return (
    <SwipeableViews index={1}>
      <div>
        <DashboardPage />
      </div>
      <div>
        <SnapPage />
      </div>
      <div>
        <RoomEntryPage />
      </div>
    </SwipeableViews>
  );
};

export default MainPage;
