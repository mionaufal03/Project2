import React, { useState } from "react";

const BirthdayPackage = () => {
  const [showBookingModal, setShowBookingModal] = useState(false); // State to toggle booking modal
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [zoomImage, setZoomImage] = useState(null); // State for the zoomed-in image

  const packageDetails = {
    title: "Birthday Package",
    price: "RM 120",
    details:
      "Celebrate your graduation in style with our exclusive package, designed to make your special day unforgettable.",
    images: [
      "/images/family1.jpg",
      "/images/family2.jpg",
      "/images/family3.jpg",
    ],
    label: "Hot",
  };

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select both date and time before confirming the booking.");
      return;
    }
    alert(
      `Package "${packageDetails.title}" booked on ${selectedDate} at ${selectedTime}!`
    );
    setShowBookingModal(false); // Close the modal after booking
  };

  const handleImageClick = (img) => {
    setZoomImage(img); // Open the modal with the selected image
  };

  const closeModal = () => {
    setZoomImage(null); // Close the image zoom modal
  };

  return (
    <div className="py-16 px-6 md:px-16 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="mb-6">
          {/* Image Gallery */}
          <h3 className="text-xl font-bold mb-4">Gallery</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {packageDetails.images.map((img, index) => (
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
        <h2 className="text-3xl font-bold mb-4">{packageDetails.title}</h2>
        <p className="text-gray-700 mb-4">{packageDetails.details}</p>
        <p className="text-red-500 font-bold text-xl mb-6">
          {packageDetails.price}
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

export default BirthdayPackage;
