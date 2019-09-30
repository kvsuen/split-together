import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase/firebase.utils'

import { AuthContext } from '../../firebase/auth.context';

const HomePage = () => {

  const { currentUser } = useContext(AuthContext);

  return (
    <div>
      <h1>HomePage</h1>
      <Link to="/login">Login</Link>
      <Link to="/signup">Sign up</Link>

      { currentUser && (
        <div>
          <h1>Logged in</h1>
          <button onClick={() => firebase.auth().signOut()}>Sign out</button>
        </div>
      )} 

    </div>
  );
};

export default HomePage;
