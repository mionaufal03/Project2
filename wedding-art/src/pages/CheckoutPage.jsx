import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const [cart, setCart] = useState([]);
  const [username, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPostcode, setUserPostcode] = useState("");
  const [userTown, setUserTown] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isBookingComplete, setIsBookingComplete] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("CART")) || [];
    setCart(storedCart);
  }, []);

  const packages = JSON.parse(localStorage.getItem("CART"));

  const bookingData = {
    username,
    userPhone,
    userEmail,
    userPostcode,
    userTown,
    userAddress,
    paymentMethod,
    packages,
  };

  const PostBooking = async () => {
    try {
      const url = "http://localhost:8000/booking";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        localStorage.clear();
        setIsBookingComplete(true);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  // Remove item from the cart
  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("CART", JSON.stringify(updatedCart));
  };

  const subtotal = cart.reduce((total, item) => total + parseFloat(item.package.price), 0);
  const total = subtotal;

  const isCartEmpty = cart.length === 0;

  if (isBookingComplete) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-md shadow-md text-center">
          <h1 className="text-3xl font-bold text-green-600 mb-4">Thank You!</h1>
          <p className="text-gray-700 mb-6">Your booking has been successfully submitted.</p>
          <button
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            onClick={() => navigate("/")}
          >
            Go Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      {/* Floating Window for Empty Cart */}
      {isCartEmpty && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-full shadow-md text-center z-50">
          <span>Please add at least one item to your cart before proceeding.</span>
        </div>
      )}

      <div
        className={`max-w-4xl mx-auto bg-white shadow-md rounded-md overflow-hidden ${isCartEmpty ? 'opacity-50 pointer-events-none' : ''}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Billing Details */}
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Billing Details</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-600 font-medium mb-2" htmlFor="fullName">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  className="w-full border-gray-300 rounded-md focus:ring focus:ring-indigo-300"
                  placeholder="Enter your full name"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  disabled={isCartEmpty}
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-2" htmlFor="phone">
                  Phone Number *
                </label>
                <input
                  type="text"
                  id="phone"
                  className="w-full border-gray-300 rounded-md focus:ring focus:ring-indigo-300"
                  placeholder="Enter your phone number"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  disabled={isCartEmpty}
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-2" htmlFor="email">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full border-gray-300 rounded-md focus:ring focus:ring-indigo-300"
                  placeholder="Enter your email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  disabled={isCartEmpty}
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-2" htmlFor="postcode">
                  Postcode/ZIP *
                </label>
                <input
                  type="text"
                  id="postcode"
                  className="w-full border-gray-300 rounded-md focus:ring focus:ring-indigo-300"
                  placeholder="Enter your postcode/ZIP"
                  value={userPostcode}
                  onChange={(e) => setUserPostcode(e.target.value)}
                  disabled={isCartEmpty}
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-2" htmlFor="city">
                  Town/City *
                </label>
                <input
                  type="text"
                  id="city"
                  className="w-full border-gray-300 rounded-md focus:ring focus:ring-indigo-300"
                  placeholder="Enter your town/city"
                  value={userTown}
                  onChange={(e) => setUserTown(e.target.value)}
                  disabled={isCartEmpty}
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-2" htmlFor="address">
                  Address *
                </label>
                <textarea
                  id="address"
                  className="w-full border-gray-300 rounded-md focus:ring focus:ring-indigo-300"
                  rows="3"
                  placeholder="Enter your address"
                  value={userAddress}
                  onChange={(e) => setUserAddress(e.target.value)}
                  disabled={isCartEmpty}
                ></textarea>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 p-6">
            <h2 className="text-2xl font-semibold mb-6">Your Order</h2>
            <div className="space-y-4">
              {cart.map((pkg, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{pkg.package.title}</span>
                  <span>RM {pkg.package.price}</span>
                  <button
                    onClick={() => removeFromCart(index)}
                    className="ml-4 text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <hr className="my-4" />
              <div className="flex justify-between font-semibold">
                <span>Subtotal</span>
                <span>RM {subtotal}</span>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>RM {total}</span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Payment Method</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="bkash"
                    name="paymentMethod"
                    className="h-4 w-4 text-indigo-600 focus:ring focus:ring-indigo-300"
                    value="Paypal"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    disabled={isCartEmpty}
                  />
                  <label htmlFor="bkash" className="ml-3 text-gray-700">
                    <img src="/bkash-logo.png" alt="" className="inline h-5" />{" "}
                    PayPal
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="nagad"
                    name="paymentMethod"
                    className="h-4 w-4 text-indigo-600 focus:ring focus:ring-indigo-300"
                    value="Debit/Credit Card"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    disabled={isCartEmpty}
                  />
                  <label htmlFor="nagad" className="ml-3 text-gray-700">
                    <img src="/nagad-logo.png" alt="" className="inline h-5" />{" "}
                    Debit/Credit Card
                  </label>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              className="mt-6 w-full bg-red-600 text-white font-bold py-3 rounded-md hover:bg-red-700"
              onClick={PostBooking}
              disabled={isCartEmpty}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
