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
          <h2 className="text-lg font-bold text-gray-800">Have Questions?</h2>
          <p className="text-gray-600 mt-2">
            address
          </p>
          <p className="text-gray-600 mt-2">0123456789 | art-berat@gmail.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
