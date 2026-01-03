import React, { useContext, useEffect, useState, useCallback } from "react";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { Link, useNavigate } from "react-router";
import Loader from "../../Components/Loader/Loader";
import { toast } from "react-toastify";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { LuImport } from "react-icons/lu";

const MyImports = () => {
  const { user } = useContext(AuthContext);
  const [imports, setImports] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchImports = useCallback(async () => {
    if (!user?.email || !user.accessToken) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://eximflow-api-server.vercel.app/myImports?email=${user.email}`,
        {
          headers: { authorization: `Bearer ${user.accessToken}` },
        }
      );
      const data = await res.json();
      setImports(data);
    } catch {
      toast.error("Failed to load your imports");
    } finally {
      setLoading(false);
    }
  }, [user?.email, user?.accessToken]);

  useEffect(() => {
    fetchImports();
  }, [fetchImports]);

  const handleRemove = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to remove this import?"
    );
    if (!confirm) return;

    const originalImports = [...imports];
    setImports((prev) => prev.filter((item) => item._id !== id)); // Optimistic UI

    try {
      const res = await fetch(
        `https://eximflow-api-server.vercel.app/myImports/${id}`,
        { method: "DELETE" }
      );
      const data = await res.json();
      if (!data.deletedCount) throw new Error();
      toast.success("Import removed successfully!");
    } catch {
      toast.error("Failed to remove import!");
      setImports(originalImports);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-900">
        <Loader />
      </div>
    );

  if (imports.length === 0)
    return (
      <div className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-900 px-4">
        <div className="text-center">
          <title>EximFlow - No Imports</title>
          <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-300 mb-6">
            You have not imported any products yet
          </h2>
          <Link
            to="/allProducts"
            className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600 transition"
          >
            Back To All Products
          </Link>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-0 ">
        <title>EximFlow - My Imports</title>

        <div className="text-center py-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-gray-800 dark:text-gray-200">
            My <span className="text-emerald-500">Imports</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mb-4">
            All imported products
          </p>
        </div>

        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="table-auto w-full border border-gray-200 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr className="text-sm sm:text-base">
                <th className="px-3 py-2 border-b dark:border-gray-700">
                  SL No.
                </th>
                <th className="px-3 py-2 text-left border-b dark:border-gray-700">
                  Products
                </th>
                <th className="px-3 py-2 border-b hidden sm:table-cell dark:border-gray-700">
                  Origin Country
                </th>
                <th className="px-3 py-2 border-b hidden md:table-cell dark:border-gray-700">
                  Rating
                </th>
                <th className="px-3 py-2 border-b hidden md:table-cell dark:border-gray-700">
                  Qty Imported
                </th>
                <th className="px-3 py-2 border-b dark:border-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {imports.map((item, index) => (
                <tr
                  key={item._id}
                  className="border-b border-gray-100 dark:border-gray-700"
                >
                  <td className="px-3 py-2 whitespace-nowrap">{index + 1}</td>

                  <td className="px-3 py-2">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 sm:h-12 sm:w-12 overflow-hidden rounded-lg">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex flex-col">
                        <div className="font-semibold text-gray-800 dark:text-gray-200">
                          {item.title}
                        </div>
                        <div className="text-xs sm:text-sm flex flex-wrap gap-2 text-gray-600 dark:text-gray-400">
                          <span>${item.price}</span>
                          <span className="md:hidden flex items-center gap-1">
                            <FaStar className="text-yellow-500" />{" "}
                            {item.rating || "N/A"}
                          </span>
                          <span className="md:hidden flex items-center gap-1">
                            <LuImport className="text-green-500" />{" "}
                            {item.imported_quantity}
                          </span>
                          <span className="md:hidden flex items-center gap-1">
                            <FaMapMarkerAlt className="text-red-500" />{" "}
                            {item.origin_country || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="hidden sm:table-cell px-3 text-center py-2">
                    {item.origin_country || "N/A"}
                  </td>
                  <td className="hidden md:table-cell px-3 py-2">
                    <div className="flex items-center justify-center gap-1 text-gray-800 dark:text-gray-200">
                      <FaStar className="text-yellow-500" />{" "}
                      {item.rating || "N/A"}
                    </div>
                  </td>
                  <td className="hidden md:table-cell text-center px-3 py-2">
                    {item.imported_quantity}
                  </td>

                  <td className="px-3 py-2 flex flex-col md:flex-row md:justify-center md:items-center gap-2 mt-2 sm:mt-0">
                    <button
                      onClick={() =>
                        navigate(`/productDetails/${item.product_id}`)
                      }
                      className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1 rounded transition w-full sm:w-auto"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition w-full sm:w-auto"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyImports;
