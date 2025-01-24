import React, { useState, useEffect } from "react";
import HomePackage from "./HomePackage";

const HomePage = () => {
  const images = [
    "/images/bg-1.JPG",
    "/images/bg-2.JPG",
    "/images/bg-3.JPG",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false); // State to track animation

  // Handle next image
  const nextImage = () => {
    setIsAnimating(true); // Trigger animation
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setIsAnimating(false); // End animation
    }, 300); // Match with animation duration
  };

  // Handle previous image
  const prevImage = () => {
    setIsAnimating(true); // Trigger animation
    setTimeout(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + images.length) % images.length
      );
      setIsAnimating(false); // End animation
    }, 300); // Match with animation duration
  };

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(nextImage, 5000); // Change the image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        {/* Carousel Image with animation */}
        <div
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-300 ${
            isAnimating ? "transform scale-105 opacity-75" : "transform scale-100 opacity-100"
          }`}
          style={{
            backgroundImage: `url(${images[currentIndex]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

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
