import React, { useState, useEffect } from "react";

const HomePackage = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const url = new URL('http://localhost:8000/home/image');
        const params = { pageID: 'premium' };
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        const response = await fetch(url);

        // Check if the response is ok (status code 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response for HomePackages.jsx:', data); // Debug API response
        setPackages(data.packages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPackages();
  }, []);

  return (
    <div className="py-16 bg-gray-100">
      <h2 className="text-4xl font-bold text-center mb-12">Our Packages</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 md:px-16">
        {packages.map((pkg) => (
          <div key={pkg.id} className="relative bg-white shadow-lg rounded-lg overflow-hidden">
            <span
              className={`absolute top-2 left-2 px-3 py-1 text-sm font-bold text-white rounded ${
                pkg.label === "Hot"
                  ? "bg-red-500"
                  : pkg.label === "Exclusive"
                  ? "bg-purple-500"
                  : "bg-blue-500"
              }`}
            >
              {pkg.label}
            </span>
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

export default HomePackage;
