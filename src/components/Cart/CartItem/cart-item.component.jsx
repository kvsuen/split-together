import React from 'react';
import './cart-item.style.css'

const CartItem = ({ id, name, unit_price, handleSwipe }) => {
  return (
    <div className='cart__item'>
      <div className='cart__item__name'>
        {name}
      </div>
      <div className='cart__item__price'>
        ${unit_price.toFixed(2)}
      </div>
      <div className='cart__item--remove' onClick={() => handleSwipe(id)}>
        x
      </div>
    </div>
  );
};

export default CartItem;
