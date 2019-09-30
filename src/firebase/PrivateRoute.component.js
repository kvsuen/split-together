import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./auth.context";
import { isNull } from "util";

const PrivateRoute = ({ component: Component, exact, path }) => {
  const {currentUser} = useContext(AuthContext);
  return (
    <div>
      {isNull(currentUser) && <Redirect to={"/login"} />}
      
      {currentUser ? (
        <Route exact={exact} path={path} render={props => <Component {...props}/>} />
      ) : (
        <h1>LOADING</h1>
      )}
    </div>

  );
};


export default PrivateRoute