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

  const fetchImports = useCallback(async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/myImports?email=${user.email}`
      );
      const data = await res.json();
      setImports(data);
    } catch {
      toast.error("Failed to load your imports");
    } finally {
      setLoading(false);
    }
  }, [user?.email]);

  useEffect(() => {
    fetchImports();
  }, [fetchImports]);

  const handleRemove = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to remove this import?"
    );
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:5000/myImports/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.deletedCount > 0) {
        toast.success("Import removed successfully!");
        fetchImports();
      } else {
        toast.error("Failed to remove import!");
      }
    } catch {
      toast.error("Something went wrong!");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );

  if (imports.length === 0)
    return (
      <div className="text-center text-2xl text-gray-500 h-screen flex justify-center items-center">
        <div>
          <title>EximFlow - Not Found Imports</title>
          <h2 className="text-center text-gray-500 mb-6 text-3xl">
            You have not imported any products yet.
          </h2>
          <Link className="btn btn-primary" to={"/allProducts"}>
            Back To All Products
          </Link>
        </div>
      </div>
    );

  return (
    <div className="container mx-auto px-4 md:px-0 py-5 md:my-10">
      <title>EximFlow - My Imports</title>

      <div className="text-center py-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          My <span className="text-primary">Imports</span>
        </h1>
        <p className="text-gray-600 text-sm sm:text-base mb-4">
          All Imported products
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className=" text-sm sm:text-base">
              <th>SL No.</th>
              <th>Products</th>
              <th className="hidden sm:table-cell">Origin Country</th>
              <th className="hidden md:table-cell">Rating</th>
              <th className="hidden md:table-cell">Imported Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {imports.map((item, index) => (
              <tr
                key={item._id}
                className="border-b border-gray-100 text-sm sm:text-base"
              >
                <th className="whitespace-nowrap">{index + 1}</th>

                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-10 w-10 sm:h-12 sm:w-12">
                        <img src={item.image} alt={item.title} />
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold">{item.title}</div>
                      <div className="text-xs sm:text-sm gap-2 flex flex-wrap">
                        <p className="md:opacity-50">${item.price}</p>
                        <div className="md:hidden">
                          <p className="flex items-center gap-1">
                            <span className="text-yellow-500">
                              <FaStar />
                            </span>
                            {item.rating || "N/A"}
                          </p>
                        </div>
                        <div className="md:hidden">
                          <p className="flex items-center gap-1">
                            <span className="text-green-500">
                              <LuImport />
                            </span>
                            {item.imported_quantity}
                          </p>
                        </div>
                        <div className="md:hidden">
                          <p className="flex items-center gap-1">
                            <span className="text-red-500">
                              <FaMapMarkerAlt />
                            </span>
                            {item.origin_country || "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>

                <td className="hidden sm:table-cell whitespace-nowrap">
                  {item.origin_country || "N/A"}
                </td>
                <td className="hidden md:table-cell whitespace-nowrap">
                  <div className="">
                    <p className="flex items-center gap-1">
                      <span className="text-yellow-500">
                        <FaStar />
                      </span>
                      {item.rating || "N/A"}
                    </p>
                  </div>
                </td>
                <td className="hidden md:table-cell whitespace-nowrap">
                  {item.imported_quantity}
                </td>

                <th className="flex flex-col sm:flex-row gap-2 mt-2 sm:mt-0">
                  <button
                    onClick={() =>
                      navigate(`/productDetails/${item.product_id}`)
                    }
                    className="bg-primary/90 text-white px-3 py-1 rounded hover:bg-primary w-full sm:w-auto"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 w-full sm:w-auto"
                  >
                    Remove
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyImports;
