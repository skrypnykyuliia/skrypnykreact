import React, { useState, useEffect } from "react";
import ProductCardAll from "../../../components/ListCategories/ProductCardAll";
import ProductFilter from "../../../layout/ProductFilter/ProductFilter";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "../../../layout/Breadcrumbs/Breadcrumbs";
import {
  filterProducts,
  sortProducts,
} from "../../../util/FilterAllProductsPage";

import axios from "axios";
import { API_URL } from "../../../api";

import styles from "./allProductsPage.module.css";

function AllProducts() {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    priceFrom: "",
    priceTo: "",
    discounted: false,
    sort: "default",
  });

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/products/all`);
        setProducts(response.data);
      } catch (error) {
        alert("Ошибка при получении продуктов!", error);
      }
    };
    fetchAllProducts();
  }, []);

  const filteredProducts = filterProducts(products, filters);
  const sortedProducts = sortProducts(filteredProducts, filters.sort);

  // const displayedProducts = sortedProducts.slice(0, 12);

  return (
    <div className="categories" data-aos="fade-up">
      <div className={styles.categories_navigation}>
        <Breadcrumbs />
      </div>

      <div className={styles.allProducts_container}>
        <h2 className="title_h2">{t("allProducts")}</h2>

        <ProductFilter filters={filters} onFilterChange={setFilters} />

        <div className={styles.allProducts_Flex}>
          {sortedProducts.map((product) => (
            <ProductCardAll key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllProducts;
