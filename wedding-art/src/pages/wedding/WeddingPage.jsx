import React from "react";
import { useNavigate } from "react-router-dom";
const WeddingPage = () => {
  const packages = [
    {
      id: 1,
      title: "Photoshoot Package",
      price: "RM 900",
      details: "This package includes pre-wedding and wedding day coverage.",
      image: "/images/wedding.jpg",
    },
    {
      id: 2,
      title: "Videography Package",
      price: "RM 1400",
      details: "This package includes wedding day coverage with a premium album.",
      image: "/images/premium1.jpg",
    },
    {
      id: 3,
      title: "Combo Package",
      price: "RM 2000",
      details: "This package includes full-day coverage, album, and a video highlight.",
      image: "/images/wedding3.jpg",
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 md:px-16">
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