import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from "./ButtonCard.module.css";

function ButtonCart({ onClick }) {
  const { t } = useTranslation();

  return (
    <div className={styles.button_cont}>
      <button className={styles.button_Add} onClick={onClick}>
        {t('continueShopping')}
      </button>
    </div>
  );
}

export default ButtonCart;
