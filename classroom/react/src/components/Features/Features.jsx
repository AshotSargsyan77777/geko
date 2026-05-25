import React from 'react';
import styles from './Features.module.css';

const Features = () => {
  const featuresData = [
    {
      id: 1,
      title: 'HERO 25K Sensor',
      description: 'Next-gen optical sensor with industry-leading precision, zero smoothing, and 1:1 tracking at sub-micron levels',
      // Lightning bolt icon SVG
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 2,
      title: 'LIGHTSPEED Wireless',
      description: 'Professional-grade wireless technology delivers ultra-fast 1ms report rate for competition-level performance',
      // Wifi/Wireless icon SVG
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12.55a11 11 0 0 1 14 0M8.55 16a6 6 0 0 1 6.9 0M11.5 19.5a1.5 1.5 0 1 1 1 0" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 3,
      title: '11 Programmable Buttons',
      description: 'Customize your gameplay with 11 programmable buttons and onboard memory for taking settings anywhere',
      // Target/Button icon SVG
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      )
    },
    {
      id: 4,
      title: '60hr Battery',
      description: 'Extended battery life delivers up to 60 hours of continuous play with default lighting on a single charge',
      // Battery icon SVG
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="7" width="16" height="10" rx="2" ry="2" />
          <line x1="22" y1="11" x2="22" y2="13" strokeLinecap="round"/>
        </svg>
      )
    }
  ];

  return (
    <section className={styles.featuresContainer}>
      {/* Աջ կողմի բաց գույնի էսթետիկ ֆոնային նկարը */}
      <div className={styles.rightBgOverlay}></div>
      
      {/* Կողային ուղղահայաց տեքստը */}
      <div className={styles.sideText}>techgear</div>

      <div className={styles.contentWrapper}>
        <h2 className={styles.sectionTitle}>We provide brands built with high-tech specialized</h2>
        
        <div className={styles.featuresGrid}>
          {featuresData.map((feature) => (
            <div key={feature.id} className={styles.featureCard}>
              <div className={styles.iconWrapper}>
                {feature.icon}
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;