import React from 'react';

const CartItem = ({ id, name, unit_price }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <h4>
        name: {name}, price: {unit_price}
      </h4>
    </div>
  );
};

export default CartItem;
