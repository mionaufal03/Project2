import React, { useState, useEffect } from "react";

const BirthdayPackage = () => {
   const [showBookingModal, setShowBookingModal] = useState(false);
   const [selectedDate, setSelectedDate] = useState("");
   const [selectedTime, setSelectedTime] = useState("");
   const [zoomImage, setZoomImage] = useState(null);
 
   const [imageList, setImageList] = useState([]); // Holds images from API
   const [packageDetails, setPackageDetails] = useState({}); // Holds package details
 
   useEffect(() => {
     const fetchData = async () => {
       try {
         const url = new URL("http://localhost:8000/category/birthday")
         const params = { pageID: 'birthday' };
         Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
 
 
         const response = await fetch(url);
 
         if (!response.ok) {
           throw new Error(`HTTP error! status: ${response.status}`);
         }
 
         const data = await response.json();
         console.log("API Response for FamilyPackage.jsx:", data);
 
         // Extract image URLs and set the package details
         setImageList(data.images.map((img) => img.image || ""));
         setPackageDetails({
           title: data.title || "Family Package",
           details: data.details || "No details available.",
           price: data.price || "Price not available",
         });
       } catch (error) {
         console.error("Error fetching data:", error.message);
       }
     };
 
     fetchData();
   }, []);
 
   const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select both date and time before confirming the booking.");
      return;
    }

    // Retrieve the existing CART from localStorage or initialize an empty array if it doesn't exist
    const storedCart = JSON.parse(localStorage.getItem("CART")) || [];

    // Check if the item already exists in the cart (by comparing package title, date, and time)
    const exists = storedCart.some(
      (item) =>
        item.title === packageDetails.title &&
        item.date === selectedDate &&
        item.time === selectedTime
    );

    if (exists) {
      alert("This package is already in the cart.");
      return;
    } else {
      alert(
        `Package "${packageDetails.title}" booked on ${selectedDate} at ${selectedTime}!`
      );
    }

    // Add the new package to the "package" array
    storedCart.push({
      title: packageDetails.title,
      price: packageDetails.price,
      date: selectedDate,
      time: selectedTime,
    });

    // Save the updated CART array back to localStorage
    localStorage.setItem("CART", JSON.stringify(storedCart));
    setShowBookingModal(false);
   };
 
   const handleImageClick = (img) => {
     setZoomImage(img);
   };
 
   const closeModal = () => {
     setZoomImage(null);
   };
 
  return (
    <div className="py-16 px-6 md:px-16 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="mb-6">
          {/* Image Gallery */}
          <h3 className="text-xl font-bold mb-4">Gallery</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {imageList.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Gallery ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg shadow cursor-pointer hover:scale-105 transition-transform"
                onClick={() => handleImageClick(img.image)}
              />
            ))}
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-4">Birthday Package</h2>
        <p className="text-gray-700 mb-4">Make birthdays special with our tailored packages!</p>
        <p className="text-red-500 font-bold text-xl mb-6">RM {packageDetails.price}</p>
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
