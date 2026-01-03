import React from "react";

const Statistics = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800 text-center">
      <div className="container mx-auto px-4 md:px-0">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          <div>
            <h2 className="text-3xl font-extrabold text-emerald-500">5000+</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Products</p>
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-emerald-500">2000+</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Happy Users</p>
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-emerald-500">99%</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              On-time Delivery
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-emerald-500">150+</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Countries Served
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
