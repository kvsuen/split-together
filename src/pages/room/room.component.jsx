import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';

import ItemList from '../../components/ItemList/item-list.component';

import Axios from 'axios';

import roomReducer, {
  SET_BILL_DATA,
  SET_SELECTED,
  SET_CART_ITEMS
} from '../../reducers/room.reducer';
import { isNull } from 'util';

const RoomPage = () => {
  const [state, dispatch] = useReducer(roomReducer, {
    billData: null,
    cartData: [
      {
        qty: 1,
        name: 'test',
        price: 10
      }
    ]
  });

  const roomId = useParams().id;

  useEffect(() => {
    Axios.get(`http://fcc75922.ngrok.io/room/${roomId}`)
      .then(resp => {
        dispatch({ type: SET_BILL_DATA, value: resp.data });
      })
      .catch(resp => {
        console.log(resp);
      });
  }, [roomId]);

  const handleSwipe = id => {
    let bill = {...state.billData[id], is_checked: true};

    if (state.billData[id].is_checked) {
      bill = {...state.billData[id], is_checked: false}
    }

    const billData = {
      ...state.billData,
      [id]: bill
    }

    dispatch({ type: SET_SELECTED, value: billData })
  };

  return (
    <div>
      <h1>Room</h1>
      {!isNull(state.billData) ? (
        <ItemList itemsData={state.billData} handleSwipe={handleSwipe}/>
      ) : (
        <h1>LOADING</h1>
      )}
    </div>
  );
};

export default RoomPage;
