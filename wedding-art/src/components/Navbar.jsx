import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage dropdown visibility
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [username, setUsername] = useState(""); // Store the username

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    // Check if the user is logged in by checking the presence of 'authKey' in localStorage
    const authKey = localStorage.getItem('authKey');
    const storedUsername = localStorage.getItem('userName'); // Get the stored username
    setIsLoggedIn(!!authKey); // Set logged-in status based on authKey presence
    setUsername(storedUsername || ""); // Set username if logged in

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    // Remove username and authKey from localStorage
    localStorage.removeItem("authKey");
    localStorage.removeItem("userName");

    // Update state
    setIsLoggedIn(false);
    setUsername(""); // Clear the username from state

    // Optionally redirect the user after logout
    window.location.href = "/login"; // Redirect to login page or home page
  };

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
          {/* Conditionally render the user dropdown if logged in */}
          {isLoggedIn ? (
            <li className="relative">
              <button
                className="flex items-center space-x-2 text-gray-700 hover:text-red-500"
                onClick={handleMenuToggle}
              >
                <span>{username}</span> {/* Display the username */}
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              {/* Dropdown with more options */}
              {isMenuOpen && (
                <ul className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
                  <li>
                    <a
                      href="/bookinglist"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Booking List
                    </a>
                  </li>
                  <li>
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={handleLogout}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                      Log Out
                    </a>
                  </li>
                </ul>
              )}
            </li>
          ) : (
            <li>
              <a href="/login" className="hover:text-red-500 text-lg">
                Log In
              </a>
            </li>
          )}
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
            {isLoggedIn && (
              <li>
                <a href="/bookinglist" className="hover:text-red-500 text-lg">
                  Booking List
                </a>
              </li>
            )}
            {isLoggedIn ? (
              <li>
                <a href="/profile" className="hover:text-red-500 text-lg">
                  Profile
                </a>
              </li>
            ) : (
              <li>
                <a href="/login" className="hover:text-red-500 text-lg">
                  Log In
                </a>
              </li>
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
