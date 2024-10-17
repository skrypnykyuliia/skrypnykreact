import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import titleImg from "../../assets/images/titleHeader.png";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import styles from "./mainPage.module.css";

function MainPageTitle() {
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      const imgElement = document.querySelector(`.${styles.mainPageTitle_img} img`);
      if (imgElement) {
        const offset = window.scrollY * 0.5;
        imgElement.style.transform = `translateY(${offset}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles.mainPageTitle}>
      <div className={styles.mainPageTitle_img}>
        <img src={titleImg} alt="img" />
      </div>
      <div className={styles.mainPageTitle_text}>
        <h1>
          {t('amazingDiscounts')}
          <br />
          {t('onPetsProducts')}
        </h1>
        <Link to="/allSales">
          <Button
            variant="contained"
            sx={{
              bgcolor: "#0D50FF",
              color: "white",
              fontFamily: "Montserrat",
              fontSize: "20px",
              fontWeight: 600,
              lineHeight: "26px",
              textAlign: "center",
              textTransform: "none",
              "&:hover": {
                bgcolor: "#282828",
              },
            }}
          >
            {t('checkOut')}
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default MainPageTitle;
