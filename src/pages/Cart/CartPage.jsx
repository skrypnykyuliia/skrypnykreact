import React, { useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ButtonCart from "../../components/button/ButtonCart";
import OrderSummary from "./OrderSummary";
import CartProductList from "./CartProductList";
import ThemeContext from "../../ThemeContext";
import NavigationButton from "../../components/NavButton/NavigationButton";
import { handleIncrease, handleDecrease, handleRemoveProduct, calculateTotalItemsAndSum } from "../../util/cartUtils";

import styles from "./CartPage.module.css";

function CartPage() {
  const { t } = useTranslation();
  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);

  const [quantities, setQuantities] = useState(
    products.reduce((acc, product) => {
      acc[product.id] = product.quantity || 1;
      return acc;
    }, {})
  );

  const { totalItems, totalSum } = calculateTotalItemsAndSum(products, quantities);

  return (
    <div className="categories" data-aos="fade-up">
      <div className={styles.mainCategories_cont}>
        <h2 className="title_h2">{t('shoppingCart')}</h2>
        <NavigationButton to="/allProducts" textKey="backStore" />
      </div>

      {totalItems === 0 ? (
        <div className={styles.CannotData}>
          <p className={`${styles.CardText} ${theme === 'dark' ? 'dark' : 'light'}`}>{t('emptyCartMessage')}</p>
          <Link to="/allProducts">
            <div className={styles.CannotData_btn}>
              <ButtonCart />
            </div>
          </Link>
        </div>
      ) : (
        <div className={styles.CartPage_container}>
          <CartProductList
            products={products}
            quantities={quantities}
            handleIncrease={(productId) => handleIncrease(productId, quantities, setQuantities)}
            handleDecrease={(productId) => handleDecrease(productId, quantities, setQuantities)}
            handleRemoveProduct={(productId) => handleRemoveProduct(productId, dispatch, setQuantities)}
            t={t}
          />
          <OrderSummary totalItems={totalItems} totalSum={totalSum} />
        </div>
      )}
    </div>
  );
}

export default CartPage;
