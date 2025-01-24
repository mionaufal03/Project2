import React, { useState } from "react";
import { useParams } from "react-router-dom";

const PackageDetails = () => {
  const { id } = useParams(); // Get the package ID from the URL
  const [showBookingModal, setShowBookingModal] = useState(false); // State to toggle booking modal
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [zoomMedia, setZoomMedia] = useState(null); // State for zoomed media (image or video)

  const packages = [
    {
      id: 1,
      title: "Videography Package",
      price: "1400", // Price as a string
      details:
        "Relive every smile, laugh, and heartfelt vow with cinematic videography that beautifully tells the story of your wedding. Our professional videographers use advanced equipment to ensure high-quality footage. From pre-wedding preparation to the grand reception, we’ll document every precious moment with creativity and care.",
      videos: [
        "/images/video1.mp4",
        "/images/video2.mp4",
        "/images/video3.MP4",
      ],
      label: "Hot",
    },
    {
      id: 2,
      title: "Photography Package",
      price: "900", // Price as a string
      details:
        "Capture your love story in stunning photographs that you’ll treasure forever. Our expert photographers specialize in creative poses, candid shots, and capturing the smallest details that make your wedding unique.",
      images: [
        "/images/wedding1.JPG",
        "/images/wedding2.JPG",
        "/images/wedding3.JPG",
        "/images/wedding4.JPG",
        "/images/wedding5.JPG",
        "/images/wedding6.JPG",
      ],
      label: "Regular",
    },
    {
      id: 3,
      title: "Premium Package 3",
      price: "1900", // Price as a string
      details:
        "With this all-inclusive package, you’ll get stunning photographs and cinematic videos that perfectly capture the essence of your special day. Let us handle the visuals while you enjoy every moment.",
      images: [
        "/images/wedding2.JPG",
        "/images/wedding4.JPG",
      ],
      videos: [
        "/images/video4.MP4",
      ],
      label: "Exclusive",
    },
    {
      id: 4,
      title: "Graduation Package",
      price: "500", // Price as a string
      details:
        "Celebrate your graduation in style with our exclusive package, designed to make your special day unforgettable.",
      images: [
        "/images/convo1.JPG",
        "/images/convo2.JPG",
        "/images/convo3.JPG",
        "/images/convo4.JPG",
        "/images/convo5.JPG",
      ],
      label: "Season",
    },
  ];

  const selectedPackage = packages.find((pkg) => pkg.id === parseInt(id)); // Find the package by ID

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select both date and time before confirming the booking.");
      return;
    }

    // Create booking details
    const bookingDetails = {
      package: selectedPackage,
      date: selectedDate,
      time: selectedTime,
    };

    // Get the current cart from localStorage, or initialize it as an empty array
    const currentCart = JSON.parse(localStorage.getItem("CART")) || [];

    // Add the new booking to the cart
    currentCart.push(bookingDetails);

    // Save the updated cart back to localStorage
    localStorage.setItem("CART", JSON.stringify(currentCart));

    alert(
      `Package "${selectedPackage.title}" booked on ${selectedDate} at ${selectedTime}!`
    );
    setShowBookingModal(false); // Close the modal after booking
  };

  const handleMediaClick = (media) => {
    setZoomMedia(media); // Open the modal with the selected media
  };

  const closeModal = () => {
    setZoomMedia(null); // Close the modal
  };

  if (!selectedPackage) {
    return <div>Package not found!</div>;
  }

  // Convert the price string to a number
  const price = parseFloat(selectedPackage.price);

  return (
    <div className="py-16 px-6 md:px-16 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="mb-6">
          {/* Gallery (Images or Videos) */}
          <h3 className="text-xl font-bold mb-4">Gallery</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selectedPackage.images &&
              selectedPackage.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg shadow cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => handleMediaClick(img)}
                />
              ))}
            {selectedPackage.videos &&
              selectedPackage.videos.map((video, index) => (
                <video
                  key={index}
                  src={video}
                  controls
                  className="w-full h-48 object-cover rounded-lg shadow cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => handleMediaClick(video)}
                />
              ))}
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-4">{selectedPackage.title}</h2>
        <p className="text-gray-700 mb-4">{selectedPackage.details}</p>
        <p className="text-red-500 font-bold text-xl mb-6">
          RM {price.toFixed(2)} {/* Display price with currency */}
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
      {zoomMedia && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative">
            {zoomMedia.endsWith(".MOV") ? (
              <video
                src={zoomMedia}
                controls
                className="max-w-screen-lg max-h-screen rounded-lg"
              />
            ) : (
              <img
                src={zoomMedia}
                alt="Zoomed"
                className="max-w-screen-lg max-h-screen rounded-lg"
              />
            )}
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
