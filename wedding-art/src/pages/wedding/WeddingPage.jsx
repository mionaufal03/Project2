import React from "react";
import { useNavigate } from "react-router-dom";

//Wedding packages
const WeddingPage = () => {
  const packages = [
    {
      id: 1,
      title: "Videography Package",
      price: "RM 1400",
      details: "Relive every smile, laugh, and heartfelt vow with cinematic videography that beautifully tells the story of your wedding. Our professional videographers use advanced equipment to ensure high-quality footage. From pre-wedding preparation to the grand reception, we’ll document every precious moment with creativity and care.",
      image: "/images/wedding.jpg",
    },
    {
      id: 2,
      title: "Photography Package",
      price: "RM 900",
      details: "Capture your love story in stunning photographs that you’ll treasure forever. Our expert photographers specialize in creative poses, candid shots, and capturing the smallest details that make your wedding unique.",
      image: "/images/wedding12.jpg",
    },
    {
      id: 3,
      title: "Combo Package",
      price: "RM 1900",
      details: "With this all-inclusive package, you’ll get stunning photographs and cinematic videos that perfectly capture the essence of your special day. Let us handle the visuals while you enjoy every moment.",
      image: "/images/wedding13.jpg",
    },
  ];

  // Modal state
  const navigate = useNavigate();

  const handlePackageClick = (id) => {
    navigate(`/package/${id}`);
  };

  return (
    <div className="py-16 bg-gray-100">
      <h2 className="text-4xl font-bold text-center mb-12"> WEDDING PACKAGES </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-16">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="relative bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={() => handlePackageClick(pkg.id)}
          >
            <span
              className={`absolute top-2 left-2 px-3 py-1 text-sm font-bold text-white rounded`}
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
    </div>
  );
};

export default WeddingPage;