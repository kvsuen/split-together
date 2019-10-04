import React, { useReducer, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../../firebase/auth.context';
import { CSSTransitionGroup } from 'react-transition-group';
import Camera, { IMAGE_TYPES } from 'react-html5-camera-photo';

import LoadingScreen from '../../../components/LoadingScreen/loading-screen.component';

import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';

import './react-camera.css';
import './snap.style.css';

import reducer, {
  SET_PHOTO,
  SET_REDIRECT_BOOLEAN,
  SET_ROOM_ID,
  TOGGLE_ERROR
} from '../../../reducers/snap.reducer';

import useVisualMode from '../../../hooks/useVisualMode';

import Axios from 'axios';

const SnapPage = ({ toggleSwipe }) => {
  const CAMERA = 'CAMERA';
  const PREVIEW = 'PREVIEW';
  const LOADING = 'LOADING';

  const [state, dispatch] = useReducer(reducer, {
    photo: null,
    redirect: false,
    roomId: null,
    error: false
  });

  const { mode, transition } = useVisualMode(CAMERA);

  const { currentUser } = useContext(AuthContext);

  const onTakePhoto = dataUri => {
    dispatch({ type: SET_PHOTO, value: dataUri });
    transition(PREVIEW);
    toggleSwipe();
  };

  const sendImage = () => {
    const base64Image = state.photo.split(',');
    const data = new FormData();
    data.append('image_data', base64Image[1]);
    data.append('u_id', currentUser.uid);

    transition(LOADING);

    Axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_SERVER_URL}/snap`,
      data: data,
      config: { headers: { 'Content-Type': 'multipart/form-data' } }
    })
      .then(resp => {
        console.log('success');
        console.log(resp.data);
        if (resp.data.type === 'REDIRECT') {
          dispatch({ type: SET_ROOM_ID, value: resp.data.payload });
          dispatch({ type: SET_REDIRECT_BOOLEAN, value: true });
        } else if (resp.data.type === 'ERROR') {
          transition(CAMERA);
          toggleSwipe();
          dispatch({ type: TOGGLE_ERROR, value: true });
          setTimeout(dispatch({ type: TOGGLE_ERROR, value: false }), 2500);
        }
      })
      .catch(resp => {
        console.log(resp.data);
        transition(CAMERA);
        toggleSwipe();
        dispatch({ type: TOGGLE_ERROR, value: true });
        setTimeout(dispatch({ type: TOGGLE_ERROR, value: false }), 2500);
      });
  };

  const takeAnother = () => {
    toggleSwipe();
    transition(CAMERA);
  };

  return (
    <div className={'camera'}>
      {mode === CAMERA && (
        <div>
          <Camera
            onTakePhoto={dataUri => {
              onTakePhoto(dataUri);
            }}
            idealFacingMode="environment"
            isImageMirror={false}
            imageType={IMAGE_TYPES.JPG}
            isDisplayStartCameraError={false}
          />
        </div>
      )}

      {mode === PREVIEW && (
        <div className={'react-html5-camera-photo '}>
          <header className={'header'}>
            <ArrowBackRoundedIcon
              className={'header__take_another'}
              onClick={() => takeAnother()}
            />
          </header>

          <img className={'camera__preview'} src={state.photo} alt="Preview" />
          <Fab
            id="send_button"
            color="primary"
            aria-label="add"
            onClick={() => sendImage()}
          >
            <SendIcon />
          </Fab>
        </div>
      )}

      {mode === LOADING && (
        <LoadingScreen>Image Recognition Magic..</LoadingScreen>
      )}

      <CSSTransitionGroup transitionName="error" transitionEnterTimeout={2500}>
        {state.error && (
          <div className={'error'}>
            <h5 className={'error__text'}>
              Something went wrong. Please try again.
            </h5>
          </div>
        )}
      </CSSTransitionGroup>

      {state.redirect && <Redirect to={`/roominvitation/${state.roomId}`} />}
    </div>
  );
};

export default SnapPage;
