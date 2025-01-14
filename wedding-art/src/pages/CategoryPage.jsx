import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryPage = () => {
  const navigate = useNavigate();

  const categories = [
    { id: 1, title: "Wedding", image: "/images/wedding-category.jpg", link: "/wedding" },
    { id: 2, title: "Graduation", image: "/images/graduation-category.jpg", link: "/graduation" },
    { id: 3, title: "Family", image: "/images/family-category.jpg", link: "/family" },
    { id: 4, title: "Birthday", image: "/images/birthday-category.jpg", link: "/birthday" },
  ];

  return (
    <div className="py-16 bg-gray-100">
      <h2 className="text-4xl font-bold text-center mb-12">Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 md:px-16">
        {categories.map((category) => (
          <div
            key={category.id}
            className="relative bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={() => navigate(category.link)}
          >
            <img
              src={category.image}
              alt={category.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold text-center">{category.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
