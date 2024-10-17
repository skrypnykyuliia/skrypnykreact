
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import ThemeContext from '../../ThemeContext';
import styles from './ProductFilter.module.css';

function ProductFilter({ filters, onFilterChange, hideDiscountFilter }) {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);

  const handlePriceChange = (e) => {
    onFilterChange({ ...filters, [e.target.name]: e.target.value });
  };

  const handleDiscountChange = (e) => {
    onFilterChange({ ...filters, discounted: e.target.checked });
  };

  const handleSortChange = (e) => {
    onFilterChange({ ...filters, sort: e.target.value });
  };

  return (
    <div className={styles.allProducts_title}>
      <div className={styles.allProducts_titlePrice}>
        <label className={`${styles.allProducts_titleP} ${theme === 'dark' ? styles.dark : styles.light}`}>
          {t('price')}
        </label>
        <input
          type="text"
          name="priceFrom"
          className={styles.allProducts_titleP1}
          value={filters.priceFrom || ''}
          placeholder={t('from')}
          onChange={handlePriceChange}
        />
        <input
          type="text"
          name="priceTo"
          className={styles.allProducts_titleP1}
          value={filters.priceTo || ''}
          placeholder={t('to')}
          onChange={handlePriceChange}
        />
      </div>

      {!hideDiscountFilter && (
        <div className={styles.allProducts_titlePrice}>
          <label className={`${styles.allProducts_titleP} ${theme === 'dark' ? styles.dark : styles.light}`}>
            {t('discountedItems')}
          </label>
          <input
            type="checkbox"
            className={styles.allProducts_title_input}
            checked={filters.discounted || false}
            onChange={handleDiscountChange}
          />
        </div>
      )}

      <div className={styles.allProducts_titlePrice}>
        <label className={`${styles.allProducts_titleP} ${theme === 'dark' ? styles.dark : styles.light}`}>
          {t('sorted')}
        </label>
        <select value={filters.sort || 'default'} onChange={handleSortChange} className={styles.allProducts_titleSelect}>
          <option value="default">{t('byDefault')}</option>
          <option value="newest">{t('newest')}</option>
          <option value="price-high-low">{t('priceHighToLow')}</option>
          <option value="price-low-high">{t('priceLowToHigh')}</option>
        </select>
      </div>
    </div>
  );
}

export default ProductFilter;
