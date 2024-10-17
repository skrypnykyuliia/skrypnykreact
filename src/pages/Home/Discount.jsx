
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from "./discount.module.css";
import dogs from "../../assets/images/dogs.png";
import FormHomePage from "../../layout/Form/FormHomePage";

function Discount() {
  const { t } = useTranslation();

  return (
    <div className={styles.discount} data-aos="fade-up">
      <h2>{t('firstOrderDiscount')}</h2>
      <div className={styles.discount_content}>
        <div className={styles.discount_contentIMG}>
          <img src={dogs} alt="img" />
        </div>
        <div className={styles.discount_content_Form}>
          <FormHomePage />
        </div>
      </div>
    </div>
  );
}

export default Discount;
