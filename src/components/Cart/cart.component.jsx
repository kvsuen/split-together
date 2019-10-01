import React from 'react';
import CartItem from './CartItem/cart-item.component';

const Cart = ({ cartData, billData }) => {
  const itemIds = cartData.map(itemid => {
    const { id, name, unit_price } = billData[itemid];
    return (
      <CartItem
        key={id}
        id={id}
        name={name}
        unit_price={unit_price}
      />
    );
  });
  return <div>{itemIds}</div>;
};

export default Cart;