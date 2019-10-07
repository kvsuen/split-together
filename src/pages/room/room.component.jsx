import React, { useEffect, useReducer, useState } from 'react';
import { useParams, Redirect, Route } from 'react-router-dom';
import { isNull } from 'util';

import LoadingScreen from '../../components/LoadingScreen/loading-screen.component';
import ItemList from '../../components/ItemList/item-list.component';
import Cart from '../../components/Cart/cart.component';
import ButtonRedirect from '../../components/RedirectButton/button-redirect.component';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Slide from '@material-ui/core/Slide';
import Fade from '@material-ui/core/Fade';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

import Axios from 'axios';
import io from 'socket.io-client';

import classnames from 'classnames';
import './room.style.css';

import roomReducer, {
  SET_BILL_DATA,
  SET_INITIAL_CART_ITEM,
  SET_ITEM_CHECKED,
  SET_ITEM_UNCHECKED,
  SET_IS_HOST,
  ON_ITEM_UNCHECK,
  ON_ITEM_CHECK,
  ON_REDIRECT,
  REMOVE_CART_ITEM,
  ADD_CART_ITEM
} from '../../reducers/room.reducer';

const socket = io.connect(process.env.REACT_APP_API_SERVER_URL);

const RoomPage = ({ currentUser }) => {
  const [state, dispatch] = useReducer(roomReducer, {
    billData: null,
    cartData: [],
    hostId: null,
    redirect: false,
    isHost: null,
  });

  const [btnStatus, setStatus] = useState(false);
  
  const roomId = useParams().id;

  useEffect(() => {
    // GET BILL DATA FROM API SERVER
    Axios.get(`${process.env.REACT_APP_API_SERVER_URL}/room/${roomId}`)
      .then(resp => {
        dispatch({ type: SET_BILL_DATA, value: resp.data });
        dispatch({ type: SET_IS_HOST, value: currentUser.uid })
      })
      .catch(resp => {
        console.log(resp);
      });

    // GET CART DATA FROM API SERVER
    Axios.get(
      `${process.env.REACT_APP_API_SERVER_URL}/users/${currentUser.uid}/room/${roomId}`
    )
      .then(resp => {
        dispatch({ type: SET_INITIAL_CART_ITEM, value: resp.data });
      })
      .catch(resp => {
        console.log(resp);
      });

    // JOIN WEB SOCKET ROOM
    socket.emit('join', `room${roomId}`);

    return () => {
      socket.emit('leave', `room${roomId}`);
      // socket.close();
    };
  }, [roomId, currentUser]);

  useEffect(() => {
    // SOCKET EVENT LISTENERS; CREATED ONCE
    if (socket._callbacks.$check === undefined) {
      socket.on('connect', () => {
        console.log(socket.connected);
      });
  
      socket.on('disconnect', () => {
        console.log('disc');
      });
  
      socket.on('check', payload => {
        handlePayload(payload);
      });
  
      socket.on('uncheck', payload => {
        handlePayload(payload);
      });
  
      socket.on('redirect', payload => {
        handlePayload(payload);
      });
    }
  }, [])

  function handlePayload({ type, item_id }) {
    if (type === 'uncheck') {
      dispatch({ type: ON_ITEM_UNCHECK, value: item_id });
    } else if (type === 'check') {
      dispatch({ type: ON_ITEM_CHECK, value: item_id });
    } else if (type === 'redirect') {
      dispatch({ type: ON_REDIRECT, value: item_id });
    }
  }

  function handleSwipe(id) {
    if (state.billData[id].is_checked) {
      dispatch({ type: SET_ITEM_UNCHECKED, value: id });
      dispatch({ type: REMOVE_CART_ITEM, value: id });
      
      // EMIT UNCHECK
      socket.emit('uncheck', {
        item_id: id,
        user_email: currentUser.email,
        room_id: `room${roomId}`
      });
    } else {
      dispatch({ type: SET_ITEM_CHECKED, value: id });
      dispatch({ type: ADD_CART_ITEM, value: id });

      // EMIT CHECK
      socket.emit('check', {
        item_id: id,
        user_email: currentUser.email,
        room_id: `room${roomId}`
      });
    }
  }

  const isComplete = () => {
    let keys = [];
    let uncheckedItems = [];

    if (state.billData && state.isHost) {
      keys = Object.keys(state.billData);
      uncheckedItems = keys.filter(
        key => state.billData[key].is_checked === false
      );
      return uncheckedItems.length === 0;
    }
    return false;
  };

  const toggleButtonStatus = () => {
    btnStatus ? setStatus(false) : setStatus(true);
  }

  const bodyClass = classnames("body", {
    "body--cartOpen": btnStatus 
  });

  const isCompleteNotHost = () => {
    if (!isNull(state.billData) && !state.isHost) {
      const arrObj = Object.values(state.billData)  
      return arrObj.every(obj => {
        return obj['is_checked']
      })
    }
    return false;
  };

  const lengthLogic = () => {
    if (!isNull(state.billData) && state.cartData.length >= 0) {
      let keys = []
      let uncheckedItems = []
      
      keys = Object.keys(state.billData);
      uncheckedItems = keys.filter(
        key => state.billData[key].is_checked === false
      );
      return uncheckedItems.length !== 0;
    }
    return false;
  }

  return (
    <>
    <div className={bodyClass} onClick={() => toggleButtonStatus()}></div>
    
    <div className="body--main">
      <header id="room__header">
        <div id="room__header__container">
          <h1>Room {roomId}</h1>
          <Route render={({ history }) => (
            <CloseIcon onClick={() => { history.push('/main')}}/>
          )} />
        </div>
        {isComplete() && 
          <Fade in={isComplete()}>
          <div className='redirectWrap'>
            <ButtonRedirect route={`/room/${roomId}/summary`}>
              <div className="redirect__arrow"><ArrowForwardIcon/></div> 
              <div className="redirect__text">Finalize</div>
            </ButtonRedirect>
          </div>
          </Fade>}
        {lengthLogic() && 
          <Fade in={lengthLogic()}>
            <h2>Please Select Item(s)</h2>
          </Fade>
        }
        {isCompleteNotHost() && 
          <Fade in={isCompleteNotHost()}>
            <h2>Waiting On Host</h2>
          </Fade>
        }
      </header>

      {!isNull(state.billData) ? (
        <ItemList
          itemsData={state.billData}
          handleSwipe={handleSwipe}
          cartData={state.cartData}
        />
      ) : (
        <LoadingScreen />
      )}
      
      <div className='cart__button' onClick={() => toggleButtonStatus()}>
        <div id="cart__button__text">
          Selected Items {state.cartData.length}
          <ShoppingBasketIcon />
        </div>
      </div>

      {btnStatus && (
        <Slide direction="up" in={btnStatus}>
          <div className='cart'>
            <Cart 
              cartData={state.cartData} 
              billData={state.billData}
              handleSwipe={handleSwipe} 
            />
          </div>
        </Slide>
      )}

      {state.redirect && <Redirect to={`/room/${roomId}/summary`} />}
    </div>
    </>
  );
};

export default RoomPage;
