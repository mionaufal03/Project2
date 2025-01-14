import React, { useState } from "react";
import HomePackage from "./HomePackage";

const HomePage = () => {
  // Image carousel state
  const images = [
    '/images/family_raya.jpg',
    '/images/wedding.jpg',
    '/images/graduation.jpg',
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle next image
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Handle previous image
  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        {/* Carousel Image */}
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src={images[currentIndex]}
          alt="Wedding Art"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            We Create Memories
          </h1>
          <p className="text-lg md:text-2xl text-white">
            Let us be your wedding photographer. We’ll capture the moments to
            make you remember the story of your beautiful day.
          </p>
        </div>

        {/* Left Arrow */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition duration-300"
        >
          ❮
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition duration-300"
        >
          ❯
        </button>
      </div>

      <HomePackage />
    </>
  );
};

export default HomePage;
