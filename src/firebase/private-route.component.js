import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './auth.context';
import { isNull } from 'util';

import LoadingScreen from '../components/LoadingScreen/loading-screen.component';

import './private-route.style.css';

const PrivateRoute = ({ component: Component, exact, path }) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div>
      {isNull(currentUser) && <Redirect to={'/'} />}

      {currentUser ? (
        <Route
          exact={exact}
          path={path}
          render={props => <Component {...props} currentUser={currentUser} />}
        />
      ) : (
        <LoadingScreen>Loading..</LoadingScreen>
      )}
    </div>
  );
};

export default PrivateRoute;
