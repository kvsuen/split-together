import React, { useReducer } from 'react';
import { Redirect } from 'react-router-dom';
import Camera, { IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

import Axios from 'axios';

import reducer, {
  SET_PHOTO,
  SET_REDIRECT_BOOLEAN,
  SET_ROOM_ID
} from '../../../reducers/snap';

import useVisualMode from '../../../hooks/useVisualMode';

const SnapPage = () => {
  const CAMERA = 'CAMERA';
  const PREVIEW = 'PREVIEW';
  const LOADING = 'LOADING';
  const ERROR = 'ERROR';

  const [state, dispatch] = useReducer(reducer, {
    photo: null,
    redirect: false,
    roomId: null
  });

  const { mode, transition } = useVisualMode(CAMERA);

  const onTakePhoto = dataUri => {
    dispatch({ type: SET_PHOTO, value: dataUri });
    transition(PREVIEW);
  };

  const sendImage = () => {
    const base64Image = state.photo.split(',');
    const data = new FormData();
    data.append('image_data', base64Image[1]);

    transition(LOADING);

    Axios({
      method: 'post',
      url: 'http://6e87abab.ngrok.io/snap',
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
          transition(ERROR);
        }
      })
      .catch(resp => {
        console.log(resp.data);
        transition(ERROR);
      });
  };

  return (
    <div>
      <h1>Snap Page</h1>

      {mode === CAMERA && (
        <Camera
          onTakePhoto={dataUri => {
            onTakePhoto(dataUri);
          }}
          idealFacingMode="environment"
          isImageMirror={false}
          imageType={IMAGE_TYPES.JPG}
        />
      )}

      {mode === PREVIEW && (
        <div>
          <img src={state.photo} alt="Preview" />
          <button onClick={() => transition(CAMERA)}>Take Another</button>
          <button onClick={() => sendImage()}>Send</button>
        </div>
      )}

      {mode === LOADING && <h2>DOING SOME MAGIC...</h2>}

      {mode === ERROR && (
        <div>
          <h2>There was an error, try again!</h2>
          <button onClick={() => transition(CAMERA)}>Take Another</button>
        </div>
      )}

      {state.redirect && <Redirect to={`/roominvitation/${state.roomId}`} />}
    </div>
  );
};

export default SnapPage;
