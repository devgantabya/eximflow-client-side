import React from "react";
import AllProductsList from "../../Components/AllProductsList/AllProductsList";

const allProductsPromise = fetch("http://localhost:5000/products").then((res) =>
  res.json()
);

const AllProducts = () => {
  return (
    <div className="container mx-auto my-10">
      <title>Eximflow - All Products</title>
      <AllProductsList allProductsPromise={allProductsPromise} />
    </div>
  );
};

export default AllProducts;
