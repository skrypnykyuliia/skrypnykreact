import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { API_URL } from "../../api";
import styles from "./ProductCard.module.css";

function ProductCard({ product }) {
  const { t } = useTranslation();
  const discountPercentage = Math.round(
    ((product.price - product.discont_price) / product.price) * 100
  );

  return (
    <Link to={`/product/${product.id}`} className={styles.sale_flexBox}>
      <div className={styles.sale_flexBoxImg}>
        <img src={`${API_URL}${product.image}`} alt={product.title} />
        {product.discont_price && (
          <div className={styles.discountTag}>
            {t("discount", { percentage: discountPercentage })}
          </div>
        )}
      </div>
      <div className={styles.sale_text}>
        <p className={styles.sale_text1}>{product.title}</p>
        <p className={styles.sale_textP}>
          ${product.discont_price} <span>${product.price}</span>
        </p>
      </div>
    </Link>
  );
}

export default ProductCard;
