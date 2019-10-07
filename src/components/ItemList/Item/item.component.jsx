import React from 'react';

import { useGesture } from 'react-with-gesture';
import { useSpring, animated } from 'react-spring';

import classnames from 'classnames';
import './item.style.css';

const Item = ({ id, is_checked, name, unit_price, handleSwipe, cartData }) => {
  const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }));
  const bind = useGesture(({ down, delta, velocity }) =>
    set({
      xy: down
        ? delta[0] > 0
          ? delta
          : gestureLogic(delta, velocity)
        : gestureLogic(delta, velocity)
    })
  );

  const gestureLogic = (delta, velocity) => {
    if (delta[0] > 0 && velocity > 0.5) {
      document.getElementById(`item${id}`).click();
    }
    return [0, 0];
  };

  const itemClass = classnames("item", {
    "item--checked": is_checked,
    "item--taken": is_checked && !cartData.includes(id)
  });

  return (
    <div>
      {is_checked && !cartData.includes(id) ? (
        <div className={itemClass} id={`item${id}`}>
          <div className='room__item__name'>
            {name}
          </div>
          <div className='room__item__price'>
            {unit_price}
          </div>
        </div>
      ) : (
        <animated.div
          id={`item${id}`}
          className={itemClass}
          {...bind()}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: xy.interpolate((x, y) => `translate3d(${x}px,0,0)`)
          }}
          onClick={() => handleSwipe(id)}
        >
          <div className="item__wrapper">
            <div className='room__item__name'>
              {name}
            </div>
            <div className='room__item__price'>
              {unit_price}
            </div>
            <div className='room__item__bottom'>
              <br></br>
            </div>
          </div>
          {/* <input type="checkbox" checked={is_checked}></input> */}
        </animated.div>
      )}
    </div>
  );
};

export default Item;
