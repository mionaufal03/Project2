import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8 mt-10">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between text-center lg:text-left">
        <div className="mb-6 lg:mb-0">
          <h2 className="text-xl font-bold text-gray-800">Weeding Art by ZEON-X</h2>
          <p className="text-gray-600 mt-2">We have experienced makeover artists who are experts in making a bride look beautiful!</p>
          <div className="flex justify-center lg:justify-start space-x-4 mt-4">
            <a href="#" className="text-gray-600 hover:text-red-500"><i className="fab fa-facebook"></i></a>
            <a href="#" className="text-gray-600 hover:text-red-500"><i className="fab fa-instagram"></i></a>
            <a href="#" className="text-gray-600 hover:text-red-500"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-gray-600 hover:text-red-500"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
        <div className="mb-6 lg:mb-0">
          <h2 className="text-lg font-bold text-gray-800">Links</h2>
          <ul className="text-gray-600 space-y-2 mt-4">
            <li><a href="/" className="hover:text-red-500">Home</a></li>
            <li><a href="/service" className="hover:text-red-500">Service</a></li>
            <li><a href="/blog" className="hover:text-red-500">Blog</a></li>
            <li><a href="/contact" className="hover:text-red-500">Contact</a></li>
          </ul>
        </div>
        <div className="mb-6 lg:mb-0">
          <h2 className="text-lg font-bold text-gray-800">Have Questions?</h2>
          <p className="text-gray-600 mt-2">
            Bazar Road, Bhuiyapur-bus-stand, Tangail, Dhaka, Bangladesh
          </p>
          <p className="text-gray-600 mt-2">01402919906 | weeding-art@gmail.com</p>
        </div>
      </div>
      <div className="text-center text-gray-500 mt-8">
        © 2025 All rights reserved | Wedding Art by ZEON-X
      </div>
    </footer>
  );
};

export default Footer;
