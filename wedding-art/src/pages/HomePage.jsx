import React, { useState, useEffect } from 'react';
import HomePackage from './HomePackage'; // Assuming HomePackage is a valid component

const HomePage = () => {
  const [imageList, setImageList] = useState([]); // Holds images from API
  const [currentIndex, setCurrentIndex] = useState(0); // Tracks current image

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Construct the URL with query parameters
        const url = new URL('http://localhost:8000/home/image');
        const params = { pageID: 'bg' };
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        // Make the fetch request
        const response = await fetch(url);

        // Check if the response is ok (status code 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the JSON response
        const data = await response.json();
        console.log('API Response for HomePages.jsx:', data); // Debug API response

        // Safeguard for unexpected structure
        setImageList(data.images || []);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  // Get current image or fallback to an empty object
  const currentImage = imageList[currentIndex] || {};

  // Handle next image
  const nextImage = () => {
    if (imageList.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageList.length);
    }
  };

  // Handle previous image
  const prevImage = () => {
    if (imageList.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + imageList.length) % imageList.length);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        {/* Carousel Image */}
        {imageList.length > 0 ? (
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src={currentImage.image} // Use the base64 image data directly here
            alt={`Image ${currentImage.id}`} // Alt text for accessibility
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <p className="text-white text-xl">Loading images...</p>
          </div>
        )}

        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            We Create Memories
          </h1>
          <p className="text-lg md:text-2xl text-white">
            Let us be your wedding photographer. We'll capture the moments to
            make you remember the story of your beautiful day.
          </p>
        </div>

        {/* Left Arrow */}
        <button
          onClick={prevImage}
          disabled={imageList.length === 0}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition duration-300 disabled:opacity-50"
        >
          ❮
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextImage}
          disabled={imageList.length === 0}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition duration-300 disabled:opacity-50"
        >
          ❯
        </button>
      </div>

      {/* Additional Content */}
      <HomePackage />
    </>
  );
};

export default HomePage;
