import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import WeddingPage from "./pages/wedding/WeddingPage";
import Footer from "./components/Footer";
import GraduationPackage from "./pages/graduation/GraduationPackage";
import FamilyPackage from "./pages/family/FamilyPackage";
import BirthdayPackage from "./pages/birthday/BirthdayPackage";
import WeddingDetails from "./pages/wedding/WeddingDetails";
import CheckoutPage from "./pages/CheckoutPage";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/category/wedding" element={<WeddingPage />} />
        <Route path="/category/wedding/:id" element={<WeddingDetails />} />
        <Route path="/category/graduation" element={<GraduationPackage />} />
        <Route path="/category/family" element={<FamilyPackage />} />
        <Route path="/category/birthday" element={<BirthdayPackage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        {/* Add more routes for other categories like Graduation, Family, etc. */}
      </Routes>
      <Footer />
    </Router>
  );
};
export default App;
