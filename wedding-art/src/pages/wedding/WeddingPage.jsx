import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WeddingPage = () => {
  const [imageList, setImageList] = useState([]); // Holds images from API

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Construct the URL with query parameters
        const url = new URL('http://localhost:8000/category/wedding');
        const params = { pageID: 'wedding' };
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        // Make the fetch request
        const response = await fetch(url);

        // Check if the response is ok (status code 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the JSON response
        const data = await response.json();
        console.log('API Response for WeddingPage.jsx:', data); // Debug API response

        // Safeguard for unexpected structure and set image list
        setImageList(data.wedding || []); // Corrected here
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []); // Only run once on mount

  // Modal state
  const navigate = useNavigate();

  const handlePackageClick = (id) => {
    navigate(`/category/wedding/${id}`);
  };

  return (
    <div className="py-16 bg-gray-100">
      <h2 className="text-4xl font-bold text-center mb-12"> WEDDING PACKAGES </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 md:px-16">
        {imageList.map((pkg) => (
          <div
            key={pkg.id}
            className="relative bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={() => handlePackageClick(pkg.id)}
          >
            <img
              src={pkg.image}
              alt={pkg.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl text-center font-bold mb-2">{pkg.title}</h3>
              <p className="text-gray-700 text-center mb-4">{pkg.details.slice(0, 50)}...</p>
              <p className="text-red-500 text-right font-bold">{pkg.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeddingPage;
