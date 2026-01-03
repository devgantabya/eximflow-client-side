import React from "react";
import { Link } from "react-router";
import { GoPackage } from "react-icons/go";
import { CiLocationOn } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

const Product = ({ product }) => {
  const {
    _id,
    title,
    price,
    image,
    origin_country,
    rating,
    available_quantity,
  } = product;

  return (
    <div
      className="
        card
        bg-white dark:bg-gray-900
        border border-gray-100 dark:border-gray-800
        shadow-sm hover:shadow-md
        transition-all duration-300
        rounded-xl
      "
    >
      {/* Image */}
      <figure className="relative overflow-hidden rounded-t-xl h-[200px] bg-gray-50 dark:bg-gray-800">
        <img
          src={image}
          alt={title}
          className="
            w-full h-full object-contain
            p-4
            transition-transform duration-300
            hover:scale-105
          "
        />

        {/* Rating Badge */}
        <div
          className="
            absolute top-3 right-3
            bg-white dark:bg-gray-900
            shadow px-2 py-1 rounded-md
            text-sm font-semibold
            flex items-center gap-1
          "
        >
          <FaStar size={14} className="text-yellow-500" />
          <span className="text-gray-800 dark:text-gray-200">
            {rating || "N/A"}
          </span>
        </div>
      </figure>

      {/* Content */}
      <div className="card-body px-5 py-4 rounded-b-xl">
        <h2
          className="
            text-lg font-semibold
            text-gray-800 dark:text-gray-100
            line-clamp-1
          "
        >
          {title}
        </h2>

        <div className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
          <p className="text-xl font-bold text-emerald-500">${price}</p>

          <p className="flex items-center gap-1">
            <CiLocationOn size={18} className="text-emerald-500" />
            {origin_country || "Unknown"}
          </p>

          <p className="flex items-center gap-1">
            <GoPackage className="text-emerald-500" />
            {available_quantity || 0} pcs in stock
          </p>
        </div>

        {/* CTA */}
        <div className="card-actions mt-4">
          <Link
            to={`/productDetails/${_id}`}
            className="
              w-full text-center
              bg-emerald-500 hover:bg-emerald-600
              text-white font-semibold
              py-2 rounded-lg
              transition-colors duration-200
            "
          >
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
