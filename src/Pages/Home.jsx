import React, { useEffect } from "react";
import LatestProducts from "../Components/LatestProducts/LatestProducts";
import { Link, useLocation } from "react-router";
import Banner from "../Components/Banner/Banner";
import WhyChooseUs from "../Components/WhyChooseUs/WhyChooseUs";
import FAQ from "../Components/FAQ/FAQ";
import Statistics from "../Components/Product/Statistics/Statistics";
import FeaturedCategories from "../Components/FeaturedCategories/FeaturedCategories";
import HowItWorks from "../Components/HowItWorks/HowItWorks";
import Testimonials from "../Components/Testimonials/Testimonials";
import JoinNow from "../Components/JoinNow/JoinNow";
import Newsletter from "../Components/Newsletter/Newsletter";

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
      <Banner />

      <div className="container mx-auto">
        <LatestProducts
          latestProductsPromise={latestProductsPromise}
        ></LatestProducts>
        <div className="flex justify-center items-center mb-10">
          <Link
            to="/AllProducts"
            className="
      inline-flex items-center justify-center
      px-8 py-2
      rounded-lg font-semibold
      border border-emerald-500
      text-emerald-600 dark:text-emerald-400
      hover:bg-emerald-500 hover:text-white
      dark:hover:bg-emerald-600
      transition-all duration-200
    "
          >
            Show All Products
          </Link>
        </div>
      </div>

      <WhyChooseUs />
      <Statistics />
      <FeaturedCategories />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <JoinNow />
      <Newsletter />
    </div>
  );
};

export default Home;
