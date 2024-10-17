import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { addProduct } from "../../redux/cartSlice";
import styles from "./Button1.module.css";

function Button1({ product }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isClicked, setIsClicked] = React.useState(false);

  useEffect(() => {
    if (product && product.id) {
      const clickedProducts =
        JSON.parse(localStorage.getItem("clickedProducts")) || {};
      if (clickedProducts[product.id]) {
        setIsClicked(true);
      }
    }
  }, [product]);

  const handleClick = (event) => {
    event.stopPropagation();
    event.preventDefault();

    if (product && product.id) {
      setIsClicked(true);

      const clickedProducts =
        JSON.parse(localStorage.getItem("clickedProducts")) || {};
      clickedProducts[product.id] = true;
      localStorage.setItem("clickedProducts", JSON.stringify(clickedProducts));

      dispatch(addProduct(product));
    }
  };

  return (
    <div className={styles.button_cont}>
      <button
        className={`${styles.button_Add} ${isClicked ? styles.active : ""}`}
        onClick={handleClick}
        disabled={isClicked}
      >
        {isClicked ? t("added") : t("addToCart")}
      </button>
    </div>
  );
}

export default Button1;
