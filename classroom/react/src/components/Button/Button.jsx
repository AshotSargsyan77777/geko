import React from 'react';
import styles from './Button.module.css';

const Button = ({ children, variant = 'primary', onClick }) => {
  const buttonClass = `${styles.btn} ${styles[variant]}`;
  
  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;