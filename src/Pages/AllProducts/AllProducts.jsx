import React, { useEffect, useState } from "react";
import Loader from "../../Components/Loader/Loader";
import { useLocation } from "react-router";
import { toast } from "react-toastify";

const PAGE_SIZE = 12;

const AllProducts = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://eximflow-api-server.vercel.app/products"
      );
      const data = await res.json();
      setProducts(data);
    } catch {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalFilteredPages = Math.ceil(filteredProducts.length / PAGE_SIZE);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handlePageChange = (page) => {
    if (page < 1 || page > totalFilteredPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-900">
        <Loader />
      </div>
    );

  if (products.length === 0)
    return (
      <div className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-900 px-4">
        <div className="text-center">
          <title>Eximflow - No Products</title>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">
            No products available
          </h2>
        </div>
      </div>
    );

  return (
    <div className="container mx-auto px-4 md:px-0 my-10 bg-white dark:bg-gray-900 min-h-screen">
      <title>Eximflow - All Products</title>

      <div className="text-center my-5 md:my-12">
        <h1 className="text-3xl sm:text-4xl font-bold my-5 md:my-10 text-gray-800 dark:text-gray-200">
          All <span className="text-emerald-500">Products</span>
        </h1>

        <div className="flex justify-center md:mb-2">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedProducts.map((product) => (
          <div
            key={product._id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow hover:shadow-lg transition bg-white dark:bg-gray-800"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                {product.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                ${product.price}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {product.origin_country || "Unknown Origin"}
              </p>
              <button
                onClick={() =>
                  window.location.assign(`/productDetails/${product._id}`)
                }
                className="mt-2 w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg transition"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center mt-10 gap-2 flex-wrap">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white disabled:opacity-50 transition"
        >
          Prev
        </button>

        {Array.from({ length: totalFilteredPages }, (_, i) => i + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 rounded-lg transition ${
                page === currentPage
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-emerald-500 hover:text-white"
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalFilteredPages}
          className="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white disabled:opacity-50 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllProducts;
