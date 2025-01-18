import React, { useState, useEffect } from "react";

const HomePackage = () => {
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");

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

  const handleBooking = () => {
    if (!selectedDate) {
      alert("Please select a date before booking.");
      return;
    }
    addToCart({ ...selectedPackage, date: selectedDate });
    setSelectedPackage(null);
    setSelectedDate("");
    alert("Package added to cart successfully!");
  };

  // Close the modal
  const closeModal = () => {
    setSelectedPackage(null);
  };

  return (
    <div className="py-16 bg-gray-100">
      <h2 className="text-4xl font-bold text-center mb-12">Our Packages</h2>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 px-6 md:px-16">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="relative bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={() => setSelectedPackage(pkg)} // Open modal on click
          >
            {/* Package Label */}
            <span
              className={`absolute top-2 left-2 px-3 py-1 text-sm font-bold text-white rounded ${
                pkg.label === "Hot"
                  ? "bg-red-500"
                  : pkg.label === "Exclusive"
                  ? "bg-purple-500"
                  : pkg.label === "New"
                  ? "bg-green-500"
                  : "bg-blue-500"
              }`}
            >
              {pkg.label}
            </span>

            {/* Package Image */}
            <img
              src={pkg.image} // Directly use the base64 image data
              alt={pkg.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl text-center font-bold mb-2">{pkg.title}</h3>
              <p className="text-gray-700 text-center mb-4">
                {pkg.details.slice(0, 50)}...
              </p>
              <p className="text-red-500 text-right font-bold">{pkg.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedPackage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/2 lg:w-1/3 relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-black transition duration-200 text-2xl"
            >
              &times;
            </button>
            <img
              src={selectedPackage.image} // Directly use the base64 image data
              alt={selectedPackage.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h3 className="text-2xl font-bold mb-2">{selectedPackage.title}</h3>
            <p className="text-gray-700 mb-4">{selectedPackage.details}</p>
            <p className="text-red-500 font-bold text-xl mb-4">
              {selectedPackage.price}
            </p>
            <button
              onClick={handleBooking}
              className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition duration-300"
            >
              Booking
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePackage;
