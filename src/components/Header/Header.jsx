import React, { useState, useContext, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import ThemeContext from "../../ThemeContext";
import logo from "../../assets/svg/logo.svg";
import icon from "../../assets/svg/icon.svg";
import iconNigth from "../../assets/svg/icon-nigth.svg";
import sunIcon from "../../assets/svg/sun.svg";
import moonIcon from "../../assets/svg/moon.svg";
import burgerIcon from "../../assets/svg/list.svg";
import burgerNigth from "../../assets/svg/list-nigth.svg";
import styles from "./header.module.css";

function SuperNavLink({ children, to, onClick }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        const className = isActive ? styles.activeLink : styles.inactiveLink;
        return className;
      }}
      onClick={onClick}
    >
      {children}
    </NavLink>
  );
}

function Header() {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const cartCount = useSelector((state) => state.cart.count);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const Sale = theme === 'dark' ? iconNigth : icon;
  const BurgerMenu = theme === 'dark' ? burgerNigth : burgerIcon;

  const toggleMenu = () => {
    if (window.innerWidth < 768) {
      setMenuOpen(!menuOpen);
    }
  };

  const closeMenu = () => {
    if (window.innerWidth < 768) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [menuOpen]);

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  return (
    <header className={styles.header}>
      <div className={styles.header_logo1}>
        <Link to="/">
          <img src={logo} alt="img" />
        </Link>
      </div>
      <nav className={`${styles.header_nav} ${menuOpen ? styles.nav_open : ""}`}>
        <SuperNavLink to="/" t={t} onClick={closeMenu}>
          {t("mainPage")}
        </SuperNavLink>
        <SuperNavLink to="/categories" t={t} onClick={closeMenu}>
          {t("categories")}
        </SuperNavLink>
        <SuperNavLink to="/allProducts" t={t} onClick={closeMenu}>
          {t("allProducts")}
        </SuperNavLink>
        <SuperNavLink to="/allSales" t={t} onClick={closeMenu}>
          {t("allSales")}
        </SuperNavLink>
      </nav>
      <div className={styles.burger_menu} onClick={toggleMenu}>
        <img src={BurgerMenu} alt="Menu" />
      </div>
      <div className={styles.header_right}>
        <select
          className={styles.header_select}
          value={language}
          onChange={handleLanguageChange}
        >
          <option value="en">En</option>
          <option value="ru">Ru</option>
          <option value="ua">Ua</option>
          <option value="de">De</option>
          <option value="pl">Pl</option>
        </select>

        <div className={styles.toggleTheme}>
          <button className={styles.toggle_theme_button} onClick={toggleTheme}>
            <img
              src={theme === "light" ? sunIcon : moonIcon}
              alt="Toggle Theme" className={styles.theme_icon}
            />
          </button>
        </div>

        <Link to="/cart">
          <div className={styles.header_logo}>
            <div className={styles.cart_icon}>
              <img src={Sale} alt="img" />
              {cartCount > 0 && (
                <div className={styles.cart_count}>{cartCount}</div>
              )}
            </div>
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
