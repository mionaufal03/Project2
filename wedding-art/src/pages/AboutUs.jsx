import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 py-16 px-6">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-8">About Us</h1>
        <p className="text-lg text-gray-700 mb-4">
          Welcome to Wedding Art, a photography service provider dedicated to
          capturing the most precious moments of your life. Whether you're looking
          for a simple photoshoot or a professional-grade photo session, we offer
          packages to fit all your needs.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          We specialize in various photography styles, including weddings,
          portraits, events, and more. Our team of passionate photographers ensures
          that every shot tells a beautiful story, giving you memories that last a
          lifetime.
        </p>
        <p className="text-lg text-gray-700">
          Our mission is to provide top-notch photography services with a personal
          touch, ensuring that every client feels special and well taken care of.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
