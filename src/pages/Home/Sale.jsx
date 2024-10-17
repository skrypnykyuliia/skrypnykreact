
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { API_URL } from "../../api";
import ProductCard from "../../components/ListCategories/ProductCard"
import styles from "./sale.module.css";
import NavigationButton from "../../components/NavButton/NavigationButton";

function Sale() {
  const { t } = useTranslation();
  const [sales, setSales] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(4);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get(`${API_URL}/products/all`);
        const discountedProducts = response.data.filter(
          (product) => product.discont_price !== null
        );
        setSales(discountedProducts);
      } catch (error) {
        alert("Error fetching the sales!", error);
      }
    };
    fetchSales();
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

  const displayedSales = sales.slice(0, itemsToShow);

  return (
    <div className={styles.sale_container} data-aos="fade-up">
      <div className={styles.sale_cont}>
        <h2 className="title_h2">{t('sale')}</h2>
        <NavigationButton to="/allSales" textKey="allSales" />
      </div>

      <div className={styles.sale_flex}>
        {displayedSales.map((sale) => (
          <ProductCard key={sale.id} product={sale} />
        ))}
      </div>
    </div>
  );
}

export default Sale;
