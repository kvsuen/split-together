import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './auth.context';
import { isNull } from 'util';

import './private-route.style.css';

const PrivateRoute = ({ component: Component, exact, path }) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div>
      {isNull(currentUser) && <Redirect to={'/login'} />}

      {currentUser ? (
        <Route
          exact={exact}
          path={path}
          render={props => <Component {...props} />}
        />
      ) : (
        <div className={'loading_screen'}>
          <div
            className={
              'loading_screen__spinner loading_screen__spinner--circle'
            }
          >
          </div>
          <h5 className={'loading_screen__text'}>Loading..</h5>
        </div>
      )}
    </div>
  );
};

export default PrivateRoute;
