import React, { useContext } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import firebase, { signInWithGoogle } from '../../firebase/firebase.utils';
import { AuthContext } from '../../firebase/auth.context';

import Button from '../../components/Button/button.component';
import TextField from '@material-ui/core/TextField';

import googleSignIn from './btn_google_signin_light_normal_web@2x.png';
import './login.style.css';

const LoginPage = ({ history }) => {
  const [values, setValues] = React.useState({
    email: '',
    password: ''
  });

  const { currentUser } = useContext(AuthContext);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleLogin = async event => {
    event.preventDefault();
    const { email, password } = values;
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      history.push('/main');
    } catch (error) {
      alert(error);
    }
  };

  if (currentUser) {
    return <Redirect to="/main" />;
  }

  return (
    <div>
      <h1>Sign In</h1>

      <form className="login__form" onSubmit={handleLogin}>
        <TextField
          id="outlined-email-input"
          label="Email Address"
          type="email"
          name="email"
          autoComplete="email"
          margin="normal"
          variant="outlined"
          value={values.email}
          onChange={handleChange('email')}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
          value={values.password}
          onChange={handleChange('password')}
        />
        <div className="form_submit_button">
          <Button type="submit">Log in</Button>
        </div>
        <h4> OR </h4>
        <div className="form_google_button">
          <img
            src={googleSignIn}
            alt="Google Sign In"
            onClick={() => signInWithGoogle()}
          />
        </div>
      </form>
    </div>
  );
};

export default withRouter(LoginPage);
