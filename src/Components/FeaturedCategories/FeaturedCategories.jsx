import React from "react";

const FeaturedCategories = () => {
  return (
    <section className="py-16 px-4 md:px-0 container mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Browse by <span className="text-emerald-500">Categories</span>
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {["Electronics", "Apparel", "Food", "Accessories"].map((cat) => (
          <div
            key={cat}
            className="flex flex-col items-center justify-center p-6 rounded-xl bg-white dark:bg-gray-800 shadow hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mb-3 text-emerald-500 text-2xl font-bold">
              {cat[0]}
            </div>
            <h3 className="text-lg font-semibold">{cat}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;
