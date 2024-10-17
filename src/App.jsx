import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import { ThemeProvider } from "./ThemeContext";

import Header from "./components/Header/Header";
import Footer from "./components/footer/Footer";
import MainPage from "../src/pages/Home/MainPage";
import CategoriesPage from "./pages/Categories/CategoriesPage";
import AllProductsPage from "./pages/Products/All/AllProductsPage";
import ProductsByCategoryPage from "../src/pages/Products/ByCategory/ProductsByCategoryPage";
import AllSales from "./pages/Products/Discounted/AllSales";
import ProductDetailsPage from "./pages/ProductDetails/ProductDetailsPage";
import CartPage from "./pages/Cart/CartPage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import ConnectedModal from "./layout/Modal/ConnectedModal";
import CookieModal from "./layout/Modal/CookieModal";



import "./index.css";

export default function App() {
  const [isCookieConsentOpen, setCookieConsentOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 500,
    });
  }, []);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      const timer = setTimeout(() => {
        setCookieConsentOpen(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setCookieConsentOpen(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setCookieConsentOpen(false);
  };

  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route
              path="/categories/:categoryId"
              element={<ProductsByCategoryPage />}
            />
            <Route path="/allProducts" element={<AllProductsPage />} />
            <Route path="/allSales" element={<AllSales />} />
            <Route
              path="/product/:productId"
              element={<ProductDetailsPage />}
            />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
          <ConnectedModal />
          <CookieModal
            isOpen={isCookieConsentOpen}
            onAccept={handleAccept}
            onDecline={handleDecline}
          />
        </div>
      </Router>
    </ThemeProvider>
  );
}
