import React from "react";
import bannerImg from "../../assets/banner-image.jpeg";
import { Link } from "react-router";

const Banner = () => {
  return (
    <div
      className="hero lg:h-screen md:h-[500px] h-[400px]"
      style={{
        backgroundImage: `url(${bannerImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="hero-overlay py-10"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-4xl">
          <h1 className="mb-5 text-3xl md:text-5xl lg:text-6xl font-extrabold uppercase">
            Largest Export-Import Trade Data Platform
          </h1>
          <p className="mb-5 max-w-xl mx-auto text-xl">
            A modern & most trusted web platform where users can manage exports,
            browse global products, and import any product
          </p>
          <div className="flex gap-2 justify-center items-center">
            <Link to={"/allProducts"} className="btn btn-primary px-10">
              All Products
            </Link>
            <Link to={"/addProduct"} className="btn px-10">
              Add Product
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
