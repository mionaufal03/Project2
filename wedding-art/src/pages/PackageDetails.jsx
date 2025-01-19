import React, { useState } from "react";
import { useParams } from "react-router-dom";

const PackageDetails = () => {
  const packages = [
    {
      id: 1,
      title: "Wedding Videography",
      price: 120,
      details:
        "Escape the ordinary of every day and discover the magic of destination weddings. A destination wedding is so much more than just one day.",
      images: [
        "/images/premium1.jpg",
        "/images/premium1-1.jpg",
        "/images/premium1-2.jpg",
      ],
      label: "Hot",
    },
    {
      id: 2,
      title: "Wedding Photoshoot",
      price: 900,
      details:
        "Experience an exclusive destination wedding package, crafted to create the perfect celebration of your love.",
      images: [
        "/images/wedding1.JPG",
        "/images/wedding2.JPG",
        "/images/wedding3.JPG",
      ],
      label: "Exclusive",
    },
    {
        id: 3,
        title: "Premium Package 3",
        price: 150,
        details:
          "Experience an exclusive destination wedding package, crafted to create the perfect celebration of your love.",
        images: [
          "/images/premium3.jpg",
          "/images/premium2-1.jpg",
          "/images/premium2-2.jpg",
        ],
        label: "Exclusive",
      },
      {
        id: 4,
        title: "Premium Package 4",
        price: 110,
        details:
          "Experience an exclusive destination wedding package, crafted to create the perfect celebration of your love.",
        images: [
          "/images/premium4.jpg",
          "/images/premium2-1.jpg",
          "/images/premium2-2.jpg",
        ],
        label: "Exclusive",
      },
  ];

  const { id } = useParams(); // Get the package ID from the URL
  const [showBookingModal, setShowBookingModal] = useState(false); // State to toggle booking modal
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [zoomImage, setZoomImage] = useState(null); // State for the zoomed-in image

  const selectedPackage = packages.find((pkg) => pkg.id === parseInt(id)); // Find the package by ID

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select both date and time before confirming the booking.");
      return;
    }

    // Retrieve the existing CART from localStorage or initialize an empty array if it doesn't exist
    const storedCart = JSON.parse(localStorage.getItem('CART')) || [];

    // Check if the item already exists in the cart (by comparing package title, date, and time)
    const exists = storedCart.some(item =>
      item.title === selectedPackage.title &&
      item.date === selectedDate &&
      item.time === selectedTime
    );

    if (exists) {
      alert("This package is already in the cart.");
      return;
    } else {
      alert(
        `Package "${selectedPackage.title}" booked on ${selectedDate} at ${selectedTime}!`
      );
    }

    // Add a new package to the "package" array
    storedCart.push({
      title: selectedPackage.title,
      price: selectedPackage.price,
      date: selectedDate,
      time: selectedTime
    });



    // Save the updated CART array back to localStorage
    localStorage.setItem('CART', JSON.stringify(storedCart));

    // Close the modal after booking
    setShowBookingModal(false);
  };

  const handleImageClick = (img) => {
    setZoomImage(img); // Open the modal with the selected image
  };

  const closeModal = () => {
    setZoomImage(null); // Close the modal
  };

  if (!selectedPackage) {
    return <div>Package not found!</div>;
  }

  return (
    <div className="py-16 px-6 md:px-16 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="mb-6">
          {/* Image Gallery */}
          <h3 className="text-xl font-bold mb-4">Gallery</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selectedPackage.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Gallery ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg shadow cursor-pointer hover:scale-105 transition-transform"
                onClick={() => handleImageClick(img)}
              />
            ))}
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-4">{selectedPackage.title}</h2>
        <p className="text-gray-700 mb-4">{selectedPackage.details}</p>
        <p className="text-red-500 font-bold text-xl mb-6">
          {selectedPackage.price}
        </p>
        <div>
          <button
            onClick={() => setShowBookingModal(true)} // Open the booking modal
            className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition duration-300 w-full"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/2">
            <h3 className="text-xl font-bold mb-4">Select Date and Time</h3>
            <label className="block text-sm font-medium mb-2">Select Date:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full"
            />
            <label className="block text-sm font-medium mb-2">Select Time:</label>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 mb-6 w-full"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setShowBookingModal(false)} // Close the modal
                className="bg-gray-500 text-white px-6 py-2 rounded-full hover:bg-gray-600 transition duration-300 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleBooking}
                className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition duration-300"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Zoom Modal */}
      {zoomImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative">
            <img
              src={zoomImage}
              alt="Zoomed"
              className="max-w-screen-lg max-h-screen rounded-lg"
            />
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackageDetails;
