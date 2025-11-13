import React, { use } from "react";
import Product from "../Product/Product";

const LatestProducts = ({ latestProductsPromise }) => {
  const products = use(latestProductsPromise);

  return (
    <section className="my-10 px-4 md:px-0">
      <div className="text-center md:py-10">
        <h1 className="text-4xl font-bold mb-2">
          Latest <span className="text-primary">Products</span>
        </h1>
        <p className="text-gray-600">Discover our newest arrivals</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 grid-cols-1">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default LatestProducts;
