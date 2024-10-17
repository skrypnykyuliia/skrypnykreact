import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./breadcrumbs.module.css";

function Breadcrumbs() {
  const { t } = useTranslation();
  const location = useLocation();

  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === "/") return t("mainPage");
    if (path.startsWith("/categories")) return t("categories");
    if (path.startsWith("/allProducts")) return t("allProducts");
    if (path.startsWith("/allSales")) return t("allSales");
    if (path.startsWith("/product")) return t("productDetails");
    if (path.startsWith("/cart")) return t("shoppingCart");
    return t("page");
  };

  const currentPage = getCurrentPage();

  return (
    <div className={styles.categories_cont_nav}>
      <div className={styles.categories_nav}>
        <Link to="/" className={styles.breadcrumbLink}>
          {t('mainPage')}
        </Link>
      </div>
      <div className={styles.categories_line}></div>
      <div className={styles.categories_nav}>
        <p className={`${styles.categories_navP} ${styles.activeBreadcrumb}`}>
          {currentPage}
        </p>
      </div>
    </div>
  );
}

export default Breadcrumbs;
