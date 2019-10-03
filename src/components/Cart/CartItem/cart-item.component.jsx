import React from 'react';
import './cart-item.style.css'

const CartItem = ({ id, name, unit_price }) => {
  return (
    <div className='cart__item'>
      <h4>
        <div className='cart__item__name'>
          {name}
        </div>
        <div className='cart__item__price'>
          {unit_price}
        </div>
      </h4>
    </div>
  );
};

export default CartItem;
