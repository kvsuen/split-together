import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';

import ItemList from '../../components/ItemList/item-list.component';
import Cart from '../../components/Cart/cart.component'

import Axios from 'axios';
import io from 'socket.io-client';

import roomReducer, {
  SET_BILL_DATA,
  SET_SELECTED,
  SET_CART_ITEMS
} from '../../reducers/room.reducer';
import { isNull } from 'util';

const RoomPage = () => {
  const [state, dispatch] = useReducer(roomReducer, {
    billData: {
      "1": {
        "id": 1, 
        "is_checked": false, 
        "name": "fries", 
        "unit_price": 1.5
      }, 
      "2": {
        "id": 2, 
        "is_checked": false, 
        "name": "junior chicken", 
        "unit_price": 2.2
      },
      "3": {
        "id": 3, 
        "is_checked": false, 
        "name": "hamburger", 
        "unit_price": 3.2
      }
    },
    cartData: []
  });

  const roomId = useParams().id;
  
  // useEffect(() => {
  //   Axios.get(`${process.env.REACT_APP_API_SERVER_URL}/room/${roomId}`)
  //   .then(resp => {
  //     dispatch({ type: SET_BILL_DATA, value: resp.data });
  //     })
  //     .catch(resp => {
  //       console.log(resp);
  //     });
  //   }, [roomId]);
    
  const handleSwipe = id => {

    let bill = { ...state.billData[id], is_checked: true };
    let items = [...state.cartData];
    
    if (state.billData[id].is_checked) {
      bill = { ...state.billData[id], is_checked: false };
      
      //JACKSON - REMOVES ITEM
      items = items.filter(item => item !== id)
      dispatch({ type: SET_CART_ITEMS, value: items})
    } else {
      //JACKSON - ADDS ITEM ID TO CART
      items.push(id)
      dispatch({ type: SET_CART_ITEMS, value: items})

    }
    
    // TODO: FIX EMIT AND ADD EMIT FOR UNCHECK
    // socket.emit('check', 'yolo');
    // console.log('success');
    
    const billData = {
      ...state.billData,
      [id]: bill
    };

    dispatch({ type: SET_SELECTED, value: billData });
  };

  // SOCKET IO
  // useEffect(() => {
  //   const socket = io.connect(process.env.REACT_APP_API_SERVER_URL);
  //   // EVENT LISTENERS
  //   socket.on('connect', () => {
  //     console.log(socket.connected);
  //     socket.emit('check', 'Ive connected');
  //   });
    
  //   // TODO: HANDLE SERVER RESPONSE
  //   socket.on('check', payload => {
  //     console.log(payload);
  //   });
    
  //   socket.on('uncheck', payload => {
  //     console.log(payload);
  //   });
  // }, []);

  return (
    <div>
      <h1>Room</h1>
      <button onClick={() => handleSwipe(2)}>EMIT</button>
      {!isNull(state.billData) ? (
        <ItemList itemsData={state.billData} handleSwipe={handleSwipe}/>
      ) : (
        <h1>LOADING</h1>
      )}
      {state.cartData.length !== 0 && (
        <Cart cartData={state.cartData} billData={state.billData}/>
      )}
    </div>
  );
};

export default RoomPage;
