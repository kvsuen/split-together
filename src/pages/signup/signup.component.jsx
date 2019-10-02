import React, { useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from '../../firebase/firebase.utils';
import Axios from 'axios';

const SignupPage = ({ history }) => {
  const handleSignUp = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        const { user } = await firebase
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);
        await Axios.post(`${process.env.REACT_APP_API_SERVER_URL}/signup`, {
          user_email: user.email,
          u_id: user.uid
        });
        history.push('/main');
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  return (
    <div>
      <h1>Sign up Page</h1>

      <form onSubmit={handleSignUp}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default withRouter(SignupPage);
