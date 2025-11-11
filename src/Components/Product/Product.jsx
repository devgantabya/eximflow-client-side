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
    <div className="card bg-white shadow-sm transition-all duration-300 border border-gray-100">
      <figure className="relative overflow-hidden rounded-t-lg h-[200px]">
        <div className="w-full transform transition-transform duration-60  hover:scale-110">
          <img
            src={image}
            alt={title}
            className="w-1/2 h-full object-cover rounded-t-lg mx-auto p-2"
          />
        </div>
        <div className="absolute top-3 right-3 bg-teal-50 shadow px-2 py-1 rounded-md text-base font-semibold flex items-center gap-1">
          <span className="text-yellow-500">
            <FaStar size={16} />
          </span>
          <span className="text-gray-900">{rating || "N/A"}</span>
        </div>
      </figure>

      <div className="card-body px-5 py-4 bg-teal-50 rounded-b-lg">
        <h2 className="card-title text-xl font-semibold dark:text-gray-200 text-gray-800 line-clamp-1">
          {title}
        </h2>

        <div className="text-sm text-gray-600 space-y-1">
          <p className="text-xl font-semibold text-gray-700 mb-2">${price}</p>
          <p title="Origin Country" className="flex gap-1 items-center">
            <span className="font-medium text-gray-700">
              <CiLocationOn size={18} />
            </span>
            {origin_country || "Unknown"}
          </p>
          <p className="flex gap-1 items-center">
            <span className="font-medium text-gray-700">
              <GoPackage />
            </span>
            {available_quantity || 0} pcs in stock
          </p>
        </div>

        <div className="card-actions mt-4">
          <Link
            to={`/productDetails/${_id}`}
            className="btn btn-primary w-full rounded-lg font-semibold"
          >
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
