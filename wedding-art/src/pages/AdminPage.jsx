import React, { useState, useEffect } from "react";

const AdminPage = () => {
  const [bookings, setBookings] = useState([]); // Store bookings

  // Fetch bookings from the API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("http://localhost:8000/admin/bookings");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBookings(data.bookings || []);
      } catch (error) {
        console.error("Error fetching bookings:", error.message);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
        Admin Dashboard: Manage Bookings
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* If no bookings are available */}
        {bookings.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center bg-white p-8 shadow-md rounded-lg">
            <p className="text-gray-600 text-lg">No bookings available.</p>
          </div>
        )}

        {/* Render bookings */}
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Booking #{booking.id}
            </h2>
            <p className="text-gray-600">
              <span className="font-semibold">Customer Name:</span>{" "}
              {booking.customerName}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Date:</span> {booking.date}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Status:</span> {booking.status}
            </p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
              Edit Booking
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
