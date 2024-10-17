import React from "react";
import { Link } from "react-router-dom";
import Button1 from "../../components/button/Button1";
import { API_URL } from "../../api";
import styles from "./ProductCard.module.css";

function ProductCardAll({ product }) {
  const discountPercentage = product.discont_price
    ? Math.round(
        ((product.price - product.discont_price) / product.price) * 100
      )
    : null;

  return (
    <Link
      to={`/product/${product.id}`}
      className={styles.sale_flexBox}
    >
      <div className={styles.sale_flexBoxImg}>
        {product.discont_price && (
          <div className={styles.discountTag}>-{discountPercentage}%</div>
        )}
        <img src={`${API_URL}${product.image}`} alt={product.title} />
        <div className={styles.button_cont}>
          <Button1 product={product} />
        </div>
      </div>

      <div className={styles.sale_text}>
        <p className={styles.sale_text1}>{product.title}</p>
        <p className={styles.sale_textP}>
          ${product.discont_price ? product.discont_price : product.price}{" "}
          {product.discont_price && <span>${product.price}</span>}
        </p>
      </div>
    </Link>
  );
}

export default ProductCardAll;
