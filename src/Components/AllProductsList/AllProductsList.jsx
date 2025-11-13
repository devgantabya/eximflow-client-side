import React, { use, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import Product from "../Product/Product";
import Loader from "../../Components/Loader/Loader";
import { ProductsContext } from "../../contexts/ProductsContext/ProductsContext";

const AllProductsList = ({ allProductsPromise }) => {
  const { products } = use(ProductsContext);
  const productsData = use(allProductsPromise);

  const [searchInputValue, setSearchInputValue] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchInputValue.trim()) {
      setFilteredProducts(productsData);
      return;
    }
    setLoading(true);
    const timer = setTimeout(() => {
      const result = productsData.filter((product) =>
        product.title.toLowerCase().includes(searchInputValue.toLowerCase())
      );
      setFilteredProducts(result);
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInputValue, products, productsData]);

  return (
    <section className="my-10 px-4 md:px-0">
      <div className="text-center py-10">
        <h1 className="text-4xl font-bold mb-2">
          All <span className="text-primary">Products</span>
        </h1>
        <p className="text-gray-600">
          Browse all products available in our store
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center px-4 md:px-0 pb-5 md:pb-2">
        <div className="py-5">
          <h3 className="text-2xl font-semibold">
            ({filteredProducts.length}) Products Found
          </h3>
        </div>
        <div className="relative w-full md:w-64">
          <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-2xl" />
          <input
            type="text"
            placeholder="Search products"
            value={searchInputValue}
            onChange={(e) => setSearchInputValue(e.target.value)}
            className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 "
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <Loader />
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-1">
          {filteredProducts.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 text-2xl mt-10">
          No Products Found
        </div>
      )}
    </section>
  );
};

export default AllProductsList;
