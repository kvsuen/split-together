import React from 'react';
import Item from './Item/item.component';

const ItemList = ({ itemsData, handleSwipe, cartData }) => {
  const itemKeys = Object.keys(itemsData);
  const items = itemKeys.map(key => {
    const { id, is_checked, name, unit_price } = itemsData[key];
    return (
      <Item
        key={id}
        id={id}
        is_checked={is_checked}
        name={name}
        unit_price={unit_price}
        handleSwipe={handleSwipe}
        cartData={cartData}
      />
    );
  });
  return <div>{items}</div>;
};

export default ItemList;
