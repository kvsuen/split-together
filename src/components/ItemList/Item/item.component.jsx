import React from 'react';

const Item = ({ id, is_checked, name, unit_price, handleSwipe }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <h4>
        name: {name}, price: {unit_price}
      </h4>
      <input
        type="checkbox"
        checked={is_checked}
        onClick={() => handleSwipe(id)}
      ></input>
    </div>
  );
};

export default Item;
