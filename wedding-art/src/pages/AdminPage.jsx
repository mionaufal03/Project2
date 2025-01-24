import React, { useState, useEffect } from "react";

const AdminPage = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("http://localhost:8000/booking");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error.message);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();

    // Set a timeout to refresh the page if it stays in the "loading" state for too long
    const timeout = setTimeout(() => {
      if (isLoading) {
        console.warn("Reloading page due to prolonged loading state...");
        window.location.reload();
      }
    }, 500); // Refresh after 5 seconds of loading

    // Cleanup timeout on unmount
    return () => clearTimeout(timeout);
  }, [isLoading]);

  const handleMarkAsFinished = async (bookingId) => {
    try {
      const response = await fetch(`http://localhost:8000/booking/${bookingId}/finish`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mode: "edit",
          status: "Finished",
          bookingId: bookingId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Reload the page to fetch updated bookings
      window.location.reload();
    } catch (error) {
      console.error("Error marking booking as finished:", error.message);
      setError(error.message);
    }
  };

  return (
    <div className="pt-28 p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
        Admin Dashboard: Manage Bookings
      </h1>

      {isLoading && <p>Loading bookings...</p>}

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.length === 0 && !isLoading && <p>No bookings available.</p>}

        {bookings.map((booking) => (
          <div key={booking.booking_id} className="bg-white p-4 shadow rounded">
            <h2>Booking #{booking.booking_id}</h2>
            <p>Customer: {booking.customer_name}</p>
            <p>Date: {booking.date}</p>
            <p>Status: {booking.status}</p>
            {booking.status === "Pending" && (
              <button
                onClick={() => handleMarkAsFinished(booking.booking_id)}
                className="bg-green-500 text-white px-4 py-2 mt-2 rounded"
              >
                Mark as Finished
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
