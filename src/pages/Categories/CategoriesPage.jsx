
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import Breadcrumbs from '../../layout/Breadcrumbs/Breadcrumbs';
import CategoryCard from '../../components/ListCategories/CategoryCard';
import ThemeContext from '../../ThemeContext';
import styles from './categoriesPage.module.css';
import { API_URL } from '../../api';

function CategoriesPage() {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const [categories, setCategories] = useState([]);
  // const [itemsToShow, setItemsToShow] = useState(4);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/categories/all`);
        setCategories(response.data);
      } catch (error) {
        alert("Error fetching categories", error);
      }
    };
    fetchCategories();
  }, []);

  

  return (
    <div className={`categories ${theme === 'dark' ? 'dark' : 'light'}`} data-aos="fade-up">
      <div className={styles.categories_navigation}>
        <Breadcrumbs />
      </div>
      <div className={styles.categories_container}>
        <div className={styles.categories_flex}>
          <h2 className="title_h2">{t('categories')}</h2>
          <div className={styles.categories_flexBox}>
            {categories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoriesPage;


// useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth <= 480) {
  //       setItemsToShow(8);
  //     } else if (window.innerWidth <= 576) {
  //       setItemsToShow(8);
  //     } else if (window.innerWidth <= 768) {
  //       setItemsToShow(8);
  //     } else if (window.innerWidth <= 922) {
  //       setItemsToShow(8);
  //     } else {
  //       setItemsToShow(8);
  //     }
  //   };
    
  //   window.addEventListener('resize', handleResize);
  //   handleResize();

  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);

  // const displayedCategories = categories.slice(0, itemsToShow);