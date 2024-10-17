
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import Button2 from "../../components/button/Button2";
import axios from "axios";
import { calculateDiscountPercentage } from "../../util/calculateDiscount";
import QuantitySelector from "../../layout/QuantitySelector1/QuantitySelector";
import BreadcrumbsDetail from "../../layout/Breadcrumbs/BreadcrumbsDetail";
import { handleIncrease, handleDecrease, handleAddToCart, handleLoading } from "../../util/productDetailsUtils";
import { API_URL } from "../../api";
import ThemeContext from "../../ThemeContext";
import styles from "./ProductDetailsPage.module.css";
import "../../css/global.css";

function ProductDetailsPage() {
  const { t } = useTranslation();
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);
  const [product, setProduct] = useState({});
  const [discountPercentage, setDiscountPercentage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const fetchCategoryTitle = async (categoryId) => {
      try {
        const categoryResponse = await axios.get(`${API_URL}/categories/${categoryId}`);
        const categoryData = categoryResponse.data;
      // setCategoryTitle(`categories.${categoryId}`);
        setCategoryTitle(categoryData.category.title);
      } catch (error) {
        alert("Error fetching the category title!", error);
      }
    };

    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/products/${productId}`);
        const productData = Array.isArray(response.data) ? response.data[0] : response.data;

        if (!productData || !productData.title) {
          throw new Error("Product data is invalid or missing title");
        }

        setProduct(productData);

        const discount = calculateDiscountPercentage(productData.price, productData.discont_price);
        setDiscountPercentage(discount);

        if (productData.categoryId) {
          fetchCategoryTitle(productData.categoryId);
        }
      } catch (error) {
        console.error("Error fetching the product details!", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (!product.title) {
    return handleLoading(product, t);
  }

  const handleButtonClick = () => {
    handleAddToCart(product, quantity, dispatch);
    setIsAdded(true);
  };

  return (
    <div className={`categories ${theme === 'dark' ? 'dark' : 'light'}`}>
      <div className={styles.categories_navigation}>
        <BreadcrumbsDetail categoryTitle={categoryTitle} productTitle={product.title} />
      </div>
      <div className={styles.DetailsPage_cont} data-aos="fade-up">
        <div className={styles.DetailsPage_cont_img}>
          <img src={`${API_URL}${product.image}`} alt={product.title} />
        </div>

        <div className={styles.DetailsPage_content}>
          <h3 title={product.title} className={`${styles.allProducts_text1} ${theme}`}>
            {product.title}
          </h3>
          <div className={styles.DetailsPage_price}>
            <p className={`bigPrice ${theme}`}>
              ${product.discont_price ? product.discont_price : product.price}{' '}
              {product.discont_price && <span>${product.price}</span>}
            </p>
            <div>
              {discountPercentage !== null && (
                <div className="discount">-{discountPercentage}%</div>
              )}
            </div>
          </div>

          <div className={styles.DetailsPage_Frame}>
            <div className={styles.DetailsPage_Frame_counter}>
              <QuantitySelector
                quantity={quantity}
                onIncrease={() => handleIncrease(quantity, setQuantity)}
                onDecrease={() => handleDecrease(quantity, setQuantity)}
              />
            </div>
            <div className={styles.DetailsPage_Frame_btn}>
              <Button2 
                onClick={handleButtonClick} 
                isDisabled={isAdded} 
                isActive={isAdded} 
              />
            </div>
          </div>
          <div className={styles.DetailsPage_text}>
            <p className={styles.DetailsPage_text_title}>{t('description')}</p>

            <div className={styles.DetailsPage_text_container}>
            <p>{t(`products.${productId}.description`)}</p>
              {/* <p>{product.description}</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
