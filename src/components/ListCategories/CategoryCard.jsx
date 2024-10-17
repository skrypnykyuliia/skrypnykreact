
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { API_URL } from "../../api";
import styles from "./CategoryCard.module.css";

function CategoryCard({ category }) {
  const { t } = useTranslation();

  return (
    <Link
      to={`/categories/${category.id}`}
      className={styles.categories_flex_box}
      key={category.id}
    >
      <img src={`${API_URL}${category.image}`} alt={category.title} />
      <p>{t(`categories.${category.id}`)}</p>
      {/* <p>{category.title}</p> */}
    </Link>
  );
}

export default CategoryCard;

