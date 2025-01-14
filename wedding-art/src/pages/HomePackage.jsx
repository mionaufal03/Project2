import React, { useState } from "react";

const HomePackage = () => {
  const packages = [
    {
      id: 1,
      title: "Premium Package 1",
      price: "RM 120",
      details:
        "Escape the ordinary of every day and discover the magic of destination weddings. A destination wedding is so much more than just one day.",
      image: "/images/premium1.jpg",
      label: "Hot", // Label for this package
    },
    {
      id: 2,
      title: "Premium Package 2",
      price: "RM 170",
      details:
        "Experience an exclusive destination wedding package, crafted to create the perfect celebration of your love.",
      image: "/images/premium3.jpg",
      label: "Exclusive", // Label for this package
    },
    {
      id: 3,
      title: "Premium Package 3",
      price: "RM 200",
      details:
        "Celebrate your love story with this new package designed to capture every memorable moment in a stunning destination.",
      image: "/images/premium2.jpg",
      label: "New", // Label for this package
    },
    {
      id: 4,
      title: "Basic Package",
      price: "RM 70",
      details:
        "A budget-friendly package for weddings that captures the most essential moments of your special day.",
      image: "/images/premium4.jpg",
      label: "Regular", // Label for this package
    },
  ];

  // Modal state
  const [selectedPackage, setSelectedPackage] = useState(null);

  const [selectedDate, setSelectedDate] = useState("");

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
              Booking
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePackage;
