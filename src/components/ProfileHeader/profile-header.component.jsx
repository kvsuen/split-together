import React from 'react';
import firebase from '../../firebase/firebase.utils';
import Button from '../Button/button.component';

import Avatar from '@material-ui/core/Avatar';

import './profile-header.style.css';

const ProfileHeader = ({ currentUser }) => {
  return (
    <>
      <div className={'profile_header'}>
        <Avatar className={'profile_header__badge'}>
          {currentUser.displayName[0]}
        </Avatar>
        <p className={'profile_header__username'}>{currentUser.displayName}</p>
        <p className={'profile_header__email'}>{currentUser.email}</p>
        <Button
          className={'profile_header__signout'}
          onClick={() => firebase.auth().signOut()}
        >
          Sign out
        </Button>
      </div>
    </>
  );
};

export default ProfileHeader;
