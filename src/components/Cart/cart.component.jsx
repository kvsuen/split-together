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
      {cartData.length > 0 ? 
      (<div className="cart__items__container">
        {itemIds}
      </div>
      ) : (
      <div className="subtotal">
        No items selected!
      </div>
      )}
      <div className="cart__footer"> 
        <div className="linebreak">
          <br></br>
        </div>
        <div className="subtotal">
          SUBTOTAL: 
          <div>{x.toFixed(2)}</div>
        </div>
        <div className="subtotal">
          TAX:
          <div>{(x * .13).toFixed(2)}</div>
        </div>
        <div className="total">
          TOTAL:
          <div>{Number((x * 1.13)).toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};

export default Cart;