import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./breadcrumbs.module.css";

function BreadcrumbsDetail({ categoryTitle, productTitle }) {
  const { t } = useTranslation();

  return (
    <div className={styles.categories_cont_nav}>
      <div className={styles.categories_nav}>
        <Link to="/" className={styles.breadcrumbLink}>
          {t("mainPage")}
        </Link>
      </div>
      <div className={styles.categories_line}></div>
      <div className={styles.categories_nav}>
        <Link to="/categories" className={styles.breadcrumbLink}>
          {t("categories")}
        </Link>
      </div>
      <div className={styles.categories_line}></div>
      <div className={styles.categories_nav}>
        <Link to="/categories" className={styles.breadcrumbLink}>
          {/* {t(categoryTitle) || t('categoryTitle')} */}
          {categoryTitle || t("categoryTitle")}
        </Link>
      </div>
      <div className={styles.categories_line}></div>
      <div className={styles.categories_nav}>
        <p
          title={productTitle}
          className={`${styles.categories_navP} ${styles.activeBreadcrumb}`}
        >
          {productTitle || t("productTitle")}
        </p>
      </div>
    </div>
  );
}

export default BreadcrumbsDetail;
