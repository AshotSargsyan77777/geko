import React from 'react';
import Button from '../Button/Button';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.heroContainer}>
      <div className={styles.bgNumber}>5</div>
      <div className={styles.sideText}>techgear</div>
      
      <div className={styles.heroContent}>
        <div className={styles.textSide}>
          <h1 className={styles.title}>
            G502 HERO <br /> WIRELESS
          </h1>
          <p className={styles.description}>
            Logitech's most advanced gaming mouse with HERO 25K sensor, 
            LIGHTSPEED wireless, and POWERPLAY compatibility.
          </p>
          <div className={styles.buttonGroup}>
            <Button variant="primary">Buy Now</Button>
            <Button variant="secondary">Learn More</Button>
          </div>
        </div>

        <div className={styles.imageSide}>
          <div className={styles.imageWrapper}>
            <img 
              src="https://images.unsplash.com/photo-1625805510672-cf603a1fc6c2?q=80&w=1000&auto=format&fit=crop" 
              alt="G502 Gaming Mouse" 
              className={styles.productImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;