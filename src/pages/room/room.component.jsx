import React, { useEffect, useReducer, useContext, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { AuthContext } from '../../firebase/auth.context';
import { isNull } from 'util';

import ItemList from '../../components/ItemList/item-list.component';
import Cart from '../../components/Cart/cart.component';

import Axios from 'axios';
import io from 'socket.io-client';

import classnames from 'classnames';
import './room.style.css'

import roomReducer, {
  SET_BILL_DATA,
  SET_INITIAL_CART_ITEM,
  SET_ITEM_CHECKED,
  SET_ITEM_UNCHECKED,
  SET_CART_ITEMS,
  SET_IS_HOST,
  ON_ITEM_UNCHECK,
  ON_ITEM_CHECK,
  ON_REDIRECT
} from '../../reducers/room.reducer';
import ButtonRedirect from '../../components/RedirectButton/button-redirect.component';

const socket = io.connect(process.env.REACT_APP_API_SERVER_URL);

const RoomPage = () => {
  const [state, dispatch] = useReducer(roomReducer, {
    billData: null,
    cartData: [],
    hostId: null,
    redirect: false,
    isHost: null,
  });

  const [btnStatus, setStatus] = useState(false);
  
  const roomId = useParams().id;
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    // GET CART DATA FROM API SERVER
    if (currentUser) {
      Axios.get(
        `${process.env.REACT_APP_API_SERVER_URL}/users/${currentUser.uid}/room/${roomId}`
      )
        .then(resp => {
          dispatch({ type: SET_INITIAL_CART_ITEM, value: resp.data });
          dispatch({ type: SET_IS_HOST, value: currentUser.uid })
        })
        .catch(resp => {
          console.log(resp);
        });
    }
  }, [currentUser, roomId]);

  useEffect(() => {
    // GET BILL DATA FROM API SERVER
    Axios.get(`${process.env.REACT_APP_API_SERVER_URL}/room/${roomId}`)
      .then(resp => {
        dispatch({ type: SET_BILL_DATA, value: resp.data });
      })
      .catch(resp => {
        console.log(resp);
      });

    socket.emit('join', `room${roomId}`);

    return () => {
      socket.emit('leave', `room${roomId}`);
      // socket.close();
    };
  }, [roomId]);

  useEffect(() => {
    // SOCKET EVENT LISTENERS, CREATED ONCE
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
    let items = [...state.cartData];

    if (state.billData[id].is_checked) {
      dispatch({ type: SET_ITEM_UNCHECKED, value: id });
      // REMOVES ITEM FROM CART
      items = items.filter(item => item !== id);
      dispatch({ type: SET_CART_ITEMS, value: items });

      // EMIT UNCHECK
      socket.emit('uncheck', {
        item_id: id,
        user_email: currentUser.email,
        room_id: `room${roomId}`
      });
    } else {
      // ADDS ITEM ID TO CART
      dispatch({ type: SET_ITEM_CHECKED, value: id });
      items.push(id);
      dispatch({ type: SET_CART_ITEMS, value: items });

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
    return false
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
    <div className="body">
      <h1>Room {roomId}</h1>
      {isComplete() && 
        <div className='redirectWrap'>
          <ButtonRedirect route={`/room/${roomId}/summary`}>
            See Summary
          </ButtonRedirect>
        </div>}
      {lengthLogic() && <h2>Please Select Item(s)</h2>}
      {isCompleteNotHost() && <h2>Waiting On Host</h2>}
      {!isNull(state.billData) ? (
        <ItemList
          itemsData={state.billData}
          handleSwipe={handleSwipe}
          cartData={state.cartData}
        />
      ) : (
        <h1>LOADING</h1>
      )}
      
      <div className='cart__button' onClick={() => toggleButtonStatus()}>
        SELECTED {state.cartData.length}
      </div>

      {btnStatus && (
        <div className='cart'>
          <Cart 
            cartData={state.cartData} 
            billData={state.billData}
            handleSwipe={handleSwipe} 
          />
        </div>
      )}

      {state.redirect && <Redirect to={'/main'} />}
    </div>
    </>
  );
};

export default RoomPage;
