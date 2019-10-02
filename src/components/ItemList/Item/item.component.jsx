import React from 'react';

import { useGesture } from 'react-with-gesture';
import { useSpring, animated } from 'react-spring';

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

  return (
    <div>
      {is_checked && !cartData.includes(id) ? (
        <h4>
          name: {name}, price: {unit_price}
        </h4>
      ) : (
        <animated.div
          id={`item${id}`}
          {...bind()}
          style={{
            display: 'flex',
            alignItems: 'center',
            transform: xy.interpolate((x, y) => `translate3d(${x}px,0,0)`)
          }}
          onClick={() => handleSwipe(id)}
        >
          <h4>
            name: {name}, price: {unit_price}
          </h4>
          <input type="checkbox" checked={is_checked}></input>
        </animated.div>
      )}
    </div>
  );
};

export default Item;
