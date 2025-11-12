import React from "react";
import LatestProducts from "../Components/LatestProducts/LatestProducts";
import { Link } from "react-router";

const latestProductsPromise = fetch(
  "http://localhost:5000/latest-products"
).then((res) => res.json());
const Home = () => {
  return (
    <div>
      <div className="container mx-auto">
        <LatestProducts
          latestProductsPromise={latestProductsPromise}
        ></LatestProducts>
        <div className="flex justify-center items-center mb-10">
          <Link className="btn btn-primary btn-outline" to={"/AllProducts"}>
            Show All Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
