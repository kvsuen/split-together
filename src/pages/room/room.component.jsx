import React, { useEffect, useReducer, useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../firebase/auth.context';
import { isNull } from 'util';

import ItemList from '../../components/ItemList/item-list.component';
import Cart from '../../components/Cart/cart.component';

import Axios from 'axios';
import io from 'socket.io-client';

import roomReducer, {
  SET_BILL_DATA,
  SET_SELECTED,
  SET_CART_ITEMS
} from '../../reducers/room.reducer';

const RoomPage = () => {
  const [state, dispatch] = useReducer(roomReducer, {
    billData: null,
    cartData: []
  });

  const roomId = useParams().id;
  const { currentUser } = useContext(AuthContext);

  // GET INITIAL STATE FROM API SERVER
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_API_SERVER_URL}/room/${roomId}`)
      .then(resp => {
        dispatch({ type: SET_BILL_DATA, value: resp.data });
      })
      .catch(resp => {
        console.log(resp);
      });
  }, [roomId]);


  // SOCKET IO
  const socket = io.connect(process.env.REACT_APP_API_SERVER_URL);
  useEffect(() => {
    const handlePayload = ({type, item_id}) => {
      let bill = { ...state.billData[item_id], is_checked: true };

      if (type === "uncheck") {
        bill = { ...state.billData[item_id], is_checked: false };
      } 
  
      const billData = {
        ...state.billData,
        [item_id]: bill
      };

      console.log('dispatched')
  
      dispatch({ type: SET_SELECTED, value: billData });
    }

    // EVENT LISTENERS
    socket.on('connect', () => {
      console.log(socket.connected);
    });

    socket.on('disconnect', () => {
      console.log('disc');
    });

    // TODO: HANDLE SERVER RESPONSE
    socket.on('check', payload => {
      handlePayload(payload);
    });
    
    socket.on('uncheck', payload => {
      handlePayload(payload);
    });

    return () => {
      socket.close();
    };
  }, [socket, state]);

  const handleSwipe = useCallback(id => {
    let bill = { ...state.billData[id], is_checked: true };
    let items = [...state.cartData];

    if (state.billData[id].is_checked) {
      bill = { ...state.billData[id], is_checked: false };

      // REMOVES ITEM FROM CART
      items = items.filter(item => item !== id);
      dispatch({ type: SET_CART_ITEMS, value: items });

      // EMIT UNCHECK
      socket.emit('uncheck', {
        item_id: id,
        user_email: currentUser.email
      });
    } else {
      // ADDS ITEM ID TO CART
      items.push(id);
      dispatch({ type: SET_CART_ITEMS, value: items });

      // EMIT CHECK
      socket.emit('check', {
        item_id: id,
        user_email: currentUser.email
      });
    }

    const billData = {
      ...state.billData,
      [id]: bill
    };

    dispatch({ type: SET_SELECTED, value: billData });
  }, [state, socket, currentUser]);

  return (
    <div>
      <h1>Room</h1>
      {!isNull(state.billData) ? (
        <ItemList itemsData={state.billData} handleSwipe={handleSwipe} />
      ) : (
        <h1>LOADING</h1>
      )}

      {state.cartData.length !== 0 && (
        <div>
          <h2>CART</h2>
          <Cart cartData={state.cartData} billData={state.billData} />
        </div>
      )}
    </div>
  );
};

export default RoomPage;
