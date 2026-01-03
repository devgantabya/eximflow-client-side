import React from "react";

const HowItWorks = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800 text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          How <span className="text-emerald-500">It Works</span>
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {[
            { step: 1, title: "Register" },
            { step: 2, title: "Browse Products" },
            { step: 3, title: "Import" },
            { step: 4, title: "Track Orders" },
          ].map((item) => (
            <div
              key={item.step}
              className="flex flex-col items-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-emerald-500 text-white font-bold mb-3">
                {item.step}
              </div>
              <h3 className="font-semibold text-lg">{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
