import React from 'react';
import styles from './Categories.module.css';

const Categories = () => {
  const categoryData = [
    {
      id: 1,
      title: 'Gaming',
      image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 2,
      title: 'Wearables',
      image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 3,
      title: 'Office & Home',
      image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=600&auto=format&fit=crop',
    },
  ];

  return (
    <section className={styles.categoriesContainer}>
      {/* Կողային ուղղահայաց տեքստը */}
      <div className={styles.sideText}>techgear</div>

      <div className={styles.contentWrapper}>
        <h2 className={styles.sectionTitle}>Which one of gear are you looking for?</h2>
        
        <div className={styles.cardsGrid}>
          {categoryData.map((category) => (
            <div key={category.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img 
                  src={category.image} 
                  alt={category.title} 
                  className={styles.cardImage} 
                />
              </div>
              <div className={styles.cardFooter}>
                <h3 className={styles.cardTitle}>{category.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;