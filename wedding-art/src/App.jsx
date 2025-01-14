import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import WeddingPage from "./pages/wedding/WeddingPage";
import Footer from "./components/Footer";
import GraduationPage from "./pages/graduation/GraduationPage";
import FamilyPage from "./pages/family/FamilyPage";
import BirthdayPage from "./pages/birthday/BirthdayPage";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/wedding" element={<WeddingPage />} />
        <Route path="/graduation" element={<GraduationPage />} />
        <Route path="/family" element={<FamilyPage />} />
        <Route path="/birthday" element={<BirthdayPage />} />
        {/* Add more routes for other categories like Graduation, Family, etc. */}
      </Routes>
      <Footer />
    </Router>
  );
};
export default App;
