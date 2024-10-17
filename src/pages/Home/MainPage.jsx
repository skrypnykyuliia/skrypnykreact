import React, { useContext } from "react";
import ThemeContext from "../../ThemeContext";
import MainPageTitle from "./MainPageTitle";
import MainCategories from "./MainCategories";
import Discount from "./Discount";
import Sale from "./Sale";
import styles from "./mainPage.module.css";

function MainPage() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${styles.mainPage_Img} ${theme === 'dark' ? styles.dark : styles.light}`} >
      <MainPageTitle />
      <div className="mainPageContent">
        <MainCategories />
        <Discount />
        <Sale />
      </div>
    </div>
  );
}
export default MainPage;
