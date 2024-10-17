import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ProductFilter from "../../../layout/ProductFilter/ProductFilter";
import Breadcrumbs from "../../../layout/Breadcrumbs/Breadcrumbs";
import ProductCardAll from "../../../components/ListCategories/ProductCardAll";

import { API_URL } from "../../../api"
import axios from "axios";

import styles from "../All/allProductsPage.module.css";

function AllSales() {
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
        alert("Error fetching the products!", error);
      }
    };
    fetchAllProducts();
  }, []);

  const filteredProducts = products
    .filter((product) => {
      if (!product.discont_price) return false;

      const priceFrom = parseFloat(filters.priceFrom);
      const priceTo = parseFloat(filters.priceTo);

      let matchesPrice = true;
      if (!isNaN(priceFrom)) {
        matchesPrice = product.discont_price >= priceFrom;
      }
      if (matchesPrice && !isNaN(priceTo)) {
        matchesPrice = product.discont_price <= priceTo;
      }

      return matchesPrice;
    })
    .sort((a, b) => {
      if (filters.sort === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (filters.sort === "price-high-low") {
        return (b.discont_price || b.price) - (a.discont_price || a.price);
      }
      if (filters.sort === "price-low-high") {
        return (a.discont_price || a.price) - (b.discont_price || b.price);
      }
      return 0;
    });

  const displayedProducts = filteredProducts.slice(0, 8);

  return (
    <div className="categories" data-aos="fade-up">
      <div className={styles.categories_navigation}>
        <Breadcrumbs />
      </div>

      <div className={styles.allProducts_container}>
        
          <h2 className="title_h2">{t("discountedItems")}</h2>
          <ProductFilter
            filters={filters}
            onFilterChange={setFilters}
            hideDiscountFilter={true}
          />

          <div className={styles.allProducts_Flex}>
            {displayedProducts.map((product) => (
                <ProductCardAll key={product.id} product={product} />
            ))}
          </div>
        
      </div>
    </div>
  );
}

export default AllSales;


// {/* <div className="categories" data-aos="fade-up">
//       <div className={styles.categories_navigation}>
//         <Breadcrumbs />
//       </div>

//       <div className={styles.allProducts_container}>
//         <div className={styles.allProducts_flex}>
//           <h2 className="title_h2">{t("discountedItems")}</h2>
//           <ProductFilter
//             filters={filters}
//             onFilterChange={setFilters}
//             hideDiscountFilter={true}
//           />

//           <div className={styles.allProducts_Flex}>
//             {displayedProducts.map((product) => (
//                 <ProductCardAll key={product.id} product={product} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div> */}