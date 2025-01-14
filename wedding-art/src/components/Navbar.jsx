import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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

        {/* Navigation Links */}
        <ul className="flex space-x-6 text-gray-700">
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
            <a href="/blog" className="hover:text-red-500">
              Blog
            </a>
          </li>
          <li>
            <a href="/about" className="hover:text-red-500">
              About Me
            </a>
          </li>
          <li>
            <a href="/checkout" className="hover:text-red-500">
              Check Out
            </a>
          </li>
        </ul>

        {/* Login */}
        <a href="/login" className="hover:text-red-500">
          <i className="fas fa-user"></i> Login
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
