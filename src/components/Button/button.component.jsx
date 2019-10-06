import React from 'react';
import './button.style.css';

const Button = ({ onClick, children, className }) => {
  return (
    <button className={`${className} button__component`} onClick={onClick}>
      {children}
    </button>
  );
}
 
export default Button;