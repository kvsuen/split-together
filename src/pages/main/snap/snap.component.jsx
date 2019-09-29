import React, { useState } from 'react';
import Camera, { IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

import Axios from 'axios';

import useVisualMode from '../../../hooks/useVisualMode';

const SnapPage = () => {
  const CAMERA = 'CAMERA';
  const PREVIEW = 'PREVIEW';
  const LOADING = 'LOADING';

  const [photo, setPhoto] = useState(null);
  const { mode, transition } = useVisualMode(CAMERA);

  const onTakePhoto = dataUri => {
    setPhoto(dataUri);
    transition(PREVIEW);
  };

  const sendImage = () => {
    const base64Image = photo.split(',');
    const data = new FormData();
    data.append('image_data', base64Image[1]);

    transition(LOADING);

    Axios({
      method: 'post',
      url: '',
      data: data,
      config: { headers: { 'Content-Type': 'multipart/form-data' } }
    })
      .then(resp => {
        console.log('success');
        console.log(resp.data);
      })
      .catch(resp => {
        console.log(resp.data);
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
          <img src={photo} alt="Preview" />
          <button onClick={() => transition(CAMERA)}>Take Another</button>
          <button onClick={() => sendImage()}>Send</button>
        </div>
      )}
      {mode === LOADING && <h2>DOING SOME MAGIC...</h2>}
    </div>
  );
};

export default SnapPage;
