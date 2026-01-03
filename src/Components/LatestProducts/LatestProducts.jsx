import React, { use } from "react";
import Product from "../Product/Product";

const LatestProducts = ({ latestProductsPromise }) => {
  const products = use(latestProductsPromise);

  return (
    <section className="my-12 px-4">
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h1
          className="
            text-3xl md:text-4xl font-extrabold
            text-gray-800 dark:text-gray-100
          "
        >
          Latest <span className="text-emerald-500">Products</span>
        </h1>

        <p className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-400">
          Discover our newest arrivals
        </p>
      </div>

      <div
        className="
          max-w-7xl mx-auto
          grid gap-6
          grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
        "
      >
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default LatestProducts;
