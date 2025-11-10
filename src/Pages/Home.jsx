import React from "react";
import LatestProducts from "../Components/LatestProducts/LatestProducts";

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
      </div>
    </div>
  );
};

export default Home;
