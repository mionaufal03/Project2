import React, { useState } from "react";

const FamilyPage = () => {
  const packages = [
    {
      id: 1,
      title: "Family Package 1",
      price: "RM 150",
      details: "This package includes pre-wedding and wedding day coverage.",
      image: "/images/wedding1.jpg",
    },
    {
      id: 2,
      title: "Family Package 2",
      price: "RM 150",
      details: "This package includes wedding day coverage with a premium album.",
      image: "/images/wedding2.jpg",
    },
    {
      id: 3,
      title: "Family Package 3",
      price: "RM 150",
      details: "This package includes full-day coverage, album, and a video highlight.",
      image: "/images/wedding3.jpg",
    },
  ];

  // Modal state
  const [selectedPackage, setSelectedPackage] = useState(null);

  const closeModal = () => {
    setSelectedPackage(null);
  };

  return (
    <div className="py-16 bg-gray-100">
      <h2 className="text-4xl font-bold text-center mb-12">Graduation Packages</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-16">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="relative bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={() => setSelectedPackage(pkg)}
          >
            <img
              src={pkg.image}
              alt={pkg.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{pkg.title}</h3>
              <p className="text-gray-700 mb-4">{pkg.details.slice(0, 50)}...</p>
              <p className="text-red-500 font-bold">{pkg.price}</p>
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
              src={selectedPackage.image}
              alt={selectedPackage.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h3 className="text-2xl font-bold mb-2">{selectedPackage.title}</h3>
            <p className="text-gray-700 mb-4">{selectedPackage.details}</p>
            <p className="text-red-500 font-bold text-xl mb-4">
              {selectedPackage.price}
            </p>
            <button
              onClick={closeModal}
              className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FamilyPage;
