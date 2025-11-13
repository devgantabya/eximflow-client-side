import React, { useEffect } from "react";
import LatestProducts from "../Components/LatestProducts/LatestProducts";
import { Link, useLocation } from "react-router";
import Banner from "../Components/Banner/Banner";
import WhyChooseUs from "../Components/WhyChooseUs/WhyChooseUs";
import FAQ from "../Components/FAQ/FAQ";

const latestProductsPromise = fetch(
  "https://eximflow-api-server.vercel.app/latest-products"
).then((res) => res.json());
const Home = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div>
      <section>
        <Banner></Banner>
      </section>
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
      <div>
        <WhyChooseUs></WhyChooseUs>
      </div>
      <div>
        <FAQ></FAQ>
      </div>
    </div>
  );
};

export default Home;
