import React from "react";
import QuantitySelector from "../../layout/QuantitySelector1/QuantitySelector1";
import imgX from "../../assets/svg/x.svg";
import styles from "./CartProductList.module.css";

import { API_URL } from "../../api";

const CartProductList = ({
  products,
  quantities,
  handleIncrease,
  handleDecrease,
  handleRemoveProduct,
  t,
}) => {
  return (
    <div className={styles.CartPage_left}>
      {products.map((product) => (
        <div className={styles.CartProduct} key={product.id}>
          <div className={styles.CartProduct_img}>
            <img src={`${API_URL}${product.image}`} alt={product.title} />
          </div>
          <div className={styles.CartProduct_content}>
            <div className={styles.CartProduct_title}>
              <h4>{product.title}</h4>
              <div
                className={styles.CartProduct_close}
                onClick={() => handleRemoveProduct(product.id)}
              >
                <img src={imgX} alt={t("remove")} />
              </div>
            </div>

            <div className={styles.CartProduct_counter}>
              <div className={styles.CartProduct_counter_quant}>
                <QuantitySelector
                  quantity={quantities[product.id]}
                  onIncrease={() => handleIncrease(product.id)}
                  onDecrease={() => handleDecrease(product.id)}
                />
              </div>
              <div className={styles.CartProduct_counter_price}>
                <p className={styles.allProducts_textP}>
                  $
                  {product.discont_price
                    ? product.discont_price * quantities[product.id]
                    : product.price * quantities[product.id]}{" "}
                  {product.discont_price && (
                    <span>${product.price * quantities[product.id]}</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartProductList;
