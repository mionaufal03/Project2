import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CategoryPage = () => {
  const navigate = useNavigate();

  const [imageList, setImageList] = useState([]); // Holds images from API

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Construct the URL with query parameters
        const url = new URL('http://localhost:8000/category/image');
        const params = { pageID: 'category' };
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
  }, []); // Only run once on mount

  return (
    <div className="py-16 bg-gray-100">
      <h2 className="text-4xl font-bold text-center mb-12">Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 md:px-16">
        {imageList.map((image, index) => (
          <div
            key={index}
            className="relative bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={() => navigate(`/category/${encodeURIComponent(image.title)}`)} // Adjust the path based on your needs
          >
            <img
              src={image.image} // Assuming `image.url` holds the image URL
              alt={image.title} // Assuming `image.title` holds the category name
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold text-center">{image.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
