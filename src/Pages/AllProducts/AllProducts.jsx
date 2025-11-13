import React, { Suspense, useEffect } from "react";
import AllProductsList from "../../Components/AllProductsList/AllProductsList";
import Loader from "../../Components/Loader/Loader";
import { useLocation } from "react-router";

const allProductsPromise = fetch(
  "https://eximflow-api-server.vercel.app/products"
).then((res) => res.json());

const AllProducts = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

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
