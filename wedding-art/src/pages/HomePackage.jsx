import React from "react";
import { useNavigate } from "react-router-dom";

const HomePackage = () => {
  const packages = [
    {
      id: 1,
      title: "Premium Package 1",
      price: "RM 1400",
      details:
        "Relive every smile, laugh, and heartfelt vow with cinematic videography that beautifully tells the story of your wedding. Our professional videographers use advanced equipment to ensure high-quality footage. From pre-wedding preparation to the grand reception, we’ll document every precious moment with creativity and care.",
      image: "/images/wedding10.JPG",
      label: "Hot",
    },
    {
      id: 2,
      title: "Premium Package 2",
      price: "RM 900",
      details:
        "Capture your love story in stunning photographs that you’ll treasure forever. Our expert photographers specialize in creative poses, candid shots, and capturing the smallest details that make your wedding unique.",
      image: "/images/premium3.jpg",
      label: "Regular",
    },
    {
      id: 3,
      title: "Premium Package 3",
      price: "RM 1900",
      details:
        "With this all-inclusive package, you’ll get stunning photographs and cinematic videos that perfectly capture the essence of your special day. Let us handle the visuals while you enjoy every moment.",
      image: "/images/wedding6.JPG",
      label: "Exclusive",
    },
    {
      id: 4,
      title: "Premium Package 4",
      price: "RM 500",
      details:
      "Celebrate your graduation in style with our exclusive package, designed to make your special day unforgettable.",
      image: "/images/bg-2.JPG",
      label: "Season",
    },
    // Add more packages here...
  ];

  const navigate = useNavigate();

  const handlePackageClick = (id) => {
    navigate(`/package/${id}`);
  };

  return (
    <div className="py-16 bg-gray-100">
      <h2 className="text-4xl font-bold text-center mb-12">Our Packages</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 md:px-16">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="relative bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={() => handlePackageClick(pkg.id)}
          >
            <span
              className={`absolute top-2 left-2 px-3 py-1 text-sm font-bold text-white rounded ${
                pkg.label === "Hot"
                  ? "bg-red-500"
                  : pkg.label === "Exclusive"
                  ? "bg-purple-500"
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
    </div>
  );
};

export default HomePackage;
