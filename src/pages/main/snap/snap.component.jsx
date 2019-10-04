import React, { useReducer, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../../firebase/auth.context';
import Camera, { IMAGE_TYPES } from 'react-html5-camera-photo';

import LoadingScreen from '../../../components/LoadingScreen/loading-screen.component';

import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';

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
        if (resp.data.type === 'REDIRECT') {
          dispatch({ type: SET_ROOM_ID, value: resp.data.payload });
          dispatch({ type: SET_REDIRECT_BOOLEAN, value: true });
        } else if (resp.data.type === 'ERROR') {
          handleError(resp.data)
        }
      })
      .catch(resp => {
        handleError(resp.data)
      });
  };

  const takeAnother = () => {
    toggleSwipe();
    transition(CAMERA);
  };

  const handleError = (msg) => {
    console.log(msg);
    transition(CAMERA);
    toggleSwipe();
    dispatch({ type: TOGGLE_ERROR, value: true });
  }

  const handleCloseError = () => {
    dispatch({ type: TOGGLE_ERROR, value: false });
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

      {/* ERROR MESSAGE */}
      <Dialog
        open={state.error}
        onClose={handleCloseError}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Something went wrong. Please try again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseError} color="primary" autoFocus>
              OK
          </Button>
        </DialogActions>
      </Dialog>

      {state.redirect && <Redirect to={`/roominvitation/${state.roomId}`} />}
    </div>
  );
};

export default SnapPage;
