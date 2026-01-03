import React from "react";
import bannerImg from "../../assets/banner-image.jpeg";
import { Link } from "react-router";
import { FaArrowDown } from "react-icons/fa";

const Banner = () => {
  return (
    <section
      className="
        relative w-full overflow-hidden
        h-[60vh] md:h-[65vh]
        flex items-center
      "
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bannerImg})` }}
      />

      <div
        className="
          absolute inset-0
          bg-gradient-to-b
          from-black/70 via-black/60 to-black/80
          dark:from-black/80 dark:via-black/70 dark:to-black/90
        "
      />

      <div className="relative z-10 w-full px-4">
        <div className="max-w-5xl mx-auto text-center text-white">
          <h1
            className="
              text-3xl md:text-5xl lg:text-6xl
              font-extrabold tracking-tight
              leading-tight
            "
          >
            Largest Export-Import <br />
            <span className="text-emerald-500">Trade Data Platform</span>
          </h1>

          <p
            className="
              mt-4 max-w-2xl mx-auto
              text-base md:text-lg
              text-gray-200
            "
          >
            A modern & trusted platform to manage exports, discover global
            products, and handle imports seamlessly.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/allProducts"
              className="
                px-8 py-3 rounded-full
                bg-emerald-500 text-white font-semibold
                hover:bg-emerald-600
                transition transform hover:scale-105
                shadow-lg
              "
            >
              Explore Products
            </Link>

            <Link
              to="/addProduct"
              className="
                px-8 py-3 rounded-full
                border border-white/70
                text-white font-semibold
                hover:bg-white hover:text-gray-900
                transition transform hover:scale-105
              "
            >
              Add Product
            </Link>
          </div>
        </div>
      </div>

      <div
        className="
          absolute bottom-6 left-1/2 -translate-x-1/2
          text-white/80
          animate-bounce
        "
      >
        <FaArrowDown size={20} />
      </div>
    </section>
  );
};

export default Banner;
