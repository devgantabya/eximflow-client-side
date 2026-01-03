import React from "react";

const Testimonials = () => {
  return (
    <section className="py-16 px-4 md:px-0 container mx-auto bg-white dark:bg-gray-900">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        What Our <span className="text-emerald-500">Customers Say</span>
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {[
          { name: "John D.", rating: 5, comment: "Excellent platform!" },
          { name: "Sara K.", rating: 4, comment: "Very easy to use." },
          { name: "Ali M.", rating: 5, comment: "Fast and reliable." },
        ].map((item, idx) => (
          <div
            key={idx}
            className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800 shadow hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center mb-2">
              <div className="flex gap-1 text-yellow-400">
                {Array(item.rating)
                  .fill(0)
                  .map((_, i) => (
                    <span key={i}>★</span>
                  ))}
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              {item.comment}
            </p>
            <h4 className="font-semibold">{item.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
