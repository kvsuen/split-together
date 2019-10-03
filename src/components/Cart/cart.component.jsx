import React from 'react';
import CartItem from './CartItem/cart-item.component';
import './cart.style.css';

const Cart = ({ cartData, billData, handleSwipe }) => {
  let x = 0;
  const itemIds = cartData.map(itemid => {
    const { id, name, unit_price } = billData[itemid];
    x += unit_price
    return (
      <CartItem
        key={id}
        id={id}
        name={name}
        unit_price={unit_price}
        handleSwipe={handleSwipe}
      />
    );
  });
  return (
    <div>
      <div>
        {itemIds}
      </div>
      <div className="cart__footer"> 
        <div className="linebreak">
          <br></br>
        </div>
        <div className="subtotal">
          Subtotal: 
          <div>{x}</div>
        </div>
        <div className="subtotal">
          Tax:
          <div>{(x * .13).toFixed(2)}</div>
        </div>
        <div className="subtotal">
          Total:
          <div>{x + Number((x * .13).toFixed(2))}</div>
        </div>
      </div>
    </div>
  );
};

export default Cart;