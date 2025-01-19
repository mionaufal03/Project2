import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import WeddingPage from "./pages/wedding/WeddingPage";
import Footer from "./components/Footer";
import PackageDetails from "./pages/PackageDetails";
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
        <Route path="/package/:id" element={<PackageDetails />} /> 
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/wedding" element={<WeddingPage />} />
        <Route path="/wedding/:id" element={<WeddingDetails />} />
        <Route path="/graduation" element={<GraduationPackage />} />
        <Route path="/family" element={<FamilyPackage />} />
        <Route path="/birthday" element={<BirthdayPackage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        {/* Add more routes for other categories like Graduation, Family, etc. */}
      </Routes>
      <Footer />
    </Router>
  );
};
export default App;
