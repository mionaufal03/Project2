import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage dropdown visibility

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-white shadow-md"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold text-red-500">
          Wedding Art
        </a>

        {/* Mobile menu button */}
        <button
          className="lg:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>

        {/* Navigation Links */}
        <ul className="hidden lg:flex space-x-20 text-gray-700">
          <li>
            <a href="/" className="hover:text-red-500">
              Home
            </a>
          </li>
          <li>
            <a href="/category" className="hover:text-red-500">
              Category
            </a>
          </li>
          <li>
            <a href="/about" className="hover:text-red-500">
              About Us
            </a>
          </li>
          <li>
            <a href="/checkout" className="hover:text-red-500">
              Check Out
            </a>
          </li>
        </ul>

        {/* Dropdown for mobile */}
        {isMenuOpen && (
          <ul className="lg:hidden absolute top-16 left-0 w-full bg-white shadow-md space-y-4 py-4 px-6 flex flex-col items-center justify-center">
            <li>
              <a href="/" className="hover:text-red-500 text-lg">
                Home
              </a>
            </li>
            <li>
              <a href="/category" className="hover:text-red-500 text-lg">
                Category
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-red-500 text-lg">
                About Us
              </a>
            </li>
            <li>
              <a href="/checkout" className="hover:text-red-500 text-lg">
                Check Out
              </a>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
