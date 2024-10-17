import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import styles from "./breadcrumbs.module.css";

function BreadcrumbsByCategory({ categoryTitle }) {
  const { t } = useTranslation();
  // const location = useLocation();
  const { categoryId } = useParams();

  // const getCurrentPage = () => {
  //   const path = location.pathname;
  //   if (path === "/") return t("mainPage");
  //   if (path.startsWith("/categories")) return categoryTitle || t("categories");
  //   return t("page");
  // };

  // const currentPage = getCurrentPage();

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
        <p className={`${styles.categories_navP} ${styles.activeBreadcrumb}`}>
          {t(`categories.${categoryId}`)}
          {/* {currentPage} */}
        </p>
      </div>
    </div>
  );
}

export default BreadcrumbsByCategory;
