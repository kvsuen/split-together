import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import './loading-screen.style.css';

const LoadingScreen = ({ children }) => {
  return (
    <div className={'loading_screen'}>
      <CircularProgress />
      <h5 className={'loading_screen__text'}>{children}</h5>
    </div>
  );
};

export default LoadingScreen;
