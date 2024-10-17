import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ThemeContext from "../../ThemeContext";
import { useTranslation } from "react-i18next";
import styles from "../../pages/Home/mainCategories.module.css";

function NavigationButton({ to, textKey }) {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);

  return (
    <Link to={to} className={styles.mainCategories_contLink}>
      <button className={styles.mainCategories_contLine}>
        <div className={`${styles.mainCategories_line} ${theme === "dark" ? "dark" : "light"}`}></div>
        <p className={`textButtonValue ${theme === "dark" ? "dark" : "light"}`}>{t(textKey)}</p>
      </button>
    </Link>
  );
}

export default NavigationButton;
