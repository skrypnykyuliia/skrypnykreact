
export const filterProducts = (products, filters) => {
    return products.filter((product) => {
      const { priceFrom, priceTo, discounted } = filters;
      const price = product.discont_price !== null ? product.discont_price : product.price;
  
      let isMatch = true;
  
      if (priceFrom && price < priceFrom) {
        isMatch = false;
      }
      if (priceTo && price > priceTo) {
        isMatch = false;
      }
      if (discounted && product.discont_price == null) {
        isMatch = false;
      }
  
      return isMatch;
    });
  };
  
  export const sortProducts = (products, sortOption) => {
    return products.sort((a, b) => {
      if (sortOption === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (sortOption === "price-high-low") {
        return (b.discont_price !== null ? b.discont_price : b.price) - (a.discont_price !== null ? a.discont_price : a.price);
      }
      if (sortOption === "price-low-high") {
        return (a.discont_price !== null ? a.discont_price : a.price) - (b.discont_price !== null ? b.discont_price : b.price);
      }
      return 0;
    });
  };
  