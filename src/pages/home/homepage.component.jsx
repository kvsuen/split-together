import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../firebase/auth.context';

import ButtonRedirect from '../../components/RedirectButton/button-redirect.component';
import Logo from './892e85ee-758f-4ab6-bcc2-1994579887ea_200x200.png';

import './homepage.style.css';

const HomePage = () => {
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/main" />;
  }

  return (
    <div className={'home__background'}>
      <div className={'home__layout'}>
        <img src={Logo} alt="Logo" />
        <ButtonRedirect className={'home__button'} route={`/login`}>
          Log in
        </ButtonRedirect>
        <ButtonRedirect
          className={'home__button home__button--bot'}
          route={`/signup`}
        >
          Sign up
        </ButtonRedirect>
      </div>
    </div>
  );
};

export default HomePage;
