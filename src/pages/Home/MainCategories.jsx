import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import CategoryCard from "../../components/ListCategories/CategoryCard";
import NavigationButton from "../../components/NavButton/NavigationButton";

import {API_URL} from "../../api"

import styles from "./mainCategories.module.css";



function MainCategories() {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(4);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/categories/all`
        );
        setCategories(response.data);
      } catch (error) {
        alert("Error fetching the categories!", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setItemsToShow(2);
      } else if (window.innerWidth <= 576) {
        setItemsToShow(2);
      } else if (window.innerWidth <= 768) {
        setItemsToShow(3);
      } else if (window.innerWidth <= 922) {
        setItemsToShow(3);
      } else {
        setItemsToShow(4);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const displayedCategories = categories.slice(0, itemsToShow);

  

  return (
    <div className={styles.mainCategories_container} data-aos="fade-up">
      <div className={styles.mainCategories_cont}>
        <h2 className="title_h2">{t('categoriesHome')}</h2>
        <NavigationButton to="/categories" textKey="allCategories" />
      </div>
      <div className={styles.mainCategories_flex}>
        {displayedCategories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}

export default MainCategories;
