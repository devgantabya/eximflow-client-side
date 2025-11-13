import React, { Suspense } from "react";
import AllProductsList from "../../Components/AllProductsList/AllProductsList";
import Loader from "../../Components/Loader/Loader";

const allProductsPromise = fetch("http://localhost:5000/products").then((res) =>
  res.json()
);

const AllProducts = () => {
  return (
    <div className="container mx-auto my-10">
      <title>Eximflow - All Products</title>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            <Loader />
          </div>
        }
      >
        <AllProductsList allProductsPromise={allProductsPromise} />
      </Suspense>
    </div>
  );
};

export default AllProducts;
