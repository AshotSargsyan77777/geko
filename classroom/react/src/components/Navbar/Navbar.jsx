import React from 'react';
import Button from '../Button/Button';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>techgear</div>
      
      <div className={styles.navLinks}>
        <a href="#home" className={styles.active}>Home</a>
        <a href="#products">Products</a>
        <a href="#features">Features</a>
        <a href="#specs">Specs</a>
        <a href="#contact">Contact</a>
      </div>
      
      <Button variant="navBtn">Sign In</Button>
    </nav>
  );
};

export default Navbar;