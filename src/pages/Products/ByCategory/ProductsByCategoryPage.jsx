import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ProductFilter from "../../../layout/ProductFilter/ProductFilter";
import BreadcrumbsByCategory from "../../../layout/Breadcrumbs/BreadcrumbsByCategory";
import ProductCardAll from "../../../components/ListCategories/ProductCardAll";
import {
  filterProducts,
  sortProducts,
} from "../../../util/FilterProdByCategory";

import axios from "axios";
import { API_URL } from "../../../api";

import styles from "../All/allProductsPage.module.css";

function ProductsByCategoryPage() {
  const { t } = useTranslation();
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [filters, setFilters] = useState({
    priceFrom: "",
    priceTo: "",
    discounted: false,
    sort: "default",
  });

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const categoryResponse = await axios.get(
          `${API_URL}/categories/${categoryId}`
        );
        const categoryData = categoryResponse.data;

        if (categoryData.category) {
          setCategoryTitle(categoryData.category.title);
        } else {
          alert("Category data is missing 'category' field");
        }

        if (Array.isArray(categoryData.data)) {
          setProducts(categoryData.data);
        } else {
          console.error(
            "Category data is missing 'data' field or it's not an array"
          );
        }
      } catch (error) {
        alert("Error fetching the products or category!", error);
      }
    };
    fetchProductsByCategory();
  }, [categoryId]);

  const filteredProducts = filterProducts(products, filters);
  const sortedProducts = sortProducts(filteredProducts, filters.sort);

  const displayedProducts = sortedProducts.slice(0, 8);

  return (
    <div className="categories" data-aos="fade-up">
      <div className={styles.categories_navigation}>
        <BreadcrumbsByCategory categoryTitle={categoryTitle} />
      </div>

      <div className={styles.allProducts_container}>
        <h2 className="title_h2">{t(`categories.${categoryId}`)}</h2>
        <ProductFilter filters={filters} onFilterChange={setFilters} />

        <div className={styles.allProducts_Flex}>
          {displayedProducts.map((product) => (
            <ProductCardAll key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductsByCategoryPage;





// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import ProductFilter from "../../../layout/ProductFilter/ProductFilter";
// import BreadcrumbsByCategory from "../../../layout/Breadcrumbs/BreadcrumbsByCategory";
// import ProductCardAll from "../../../components/ListCategories/ProductCardAll";
// import {
//   filterProducts,
//   sortProducts,
// } from "../../../util/FilterProdByCategory";

// import axios from "axios";
// import { API_URL } from "../../../api";

// import styles from "../All/allProductsPage.module.css";

// function ProductsByCategoryPage() {
//   const { categoryId } = useParams();
//   const [products, setProducts] = useState([]);
//   const [categoryTitle, setCategoryTitle] = useState("");
//   const [filters, setFilters] = useState({
//     priceFrom: "",
//     priceTo: "",
//     discounted: false,
//     sort: "default",
//   });

//   useEffect(() => {
//     const fetchProductsByCategory = async () => {
//       try {
//         const categoryResponse = await axios.get(
//           `${API_URL}/categories/${categoryId}`
//         );
//         const categoryData = categoryResponse.data;

//         if (categoryData.category) {
//           setCategoryTitle(categoryData.category.title);
//         } else {
//           alert("Category data is missing 'category' field");
//         }

//         if (Array.isArray(categoryData.data)) {
//           setProducts(categoryData.data);
//         } else {
//           console.error(
//             "Category data is missing 'data' field or it's not an array"
//           );
//         }
//       } catch (error) {
//         alert("Error fetching the products or category!", error);
//       }
//     };
//     fetchProductsByCategory();
//   }, [categoryId]);

//   const filteredProducts = filterProducts(products, filters);
//   const sortedProducts = sortProducts(filteredProducts, filters.sort);

//   const displayedProducts = sortedProducts.slice(0, 8);

//   return (
//     <div className="categories" data-aos="fade-up">
//       <div className={styles.categories_navigation}>
//         <BreadcrumbsByCategory categoryTitle={categoryTitle} />
//       </div>

//       <div className={styles.allProducts_container}>
//         <h2 className="title_h2">{categoryTitle}</h2>
//         <ProductFilter filters={filters} onFilterChange={setFilters} />

//         <div className={styles.allProducts_Flex}>
//           {displayedProducts.map((product) => (
//             <ProductCardAll key={product.id} product={product} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductsByCategoryPage;
