import React, { useContext, useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "./../../contexts/AuthContext/AuthContext";
import { Link } from "react-router";
import Loader from "../../Components/Loader/Loader";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { IoBagCheck } from "react-icons/io5";

const MyExports = () => {
  const { user } = useContext(AuthContext);
  const [exports, setExports] = useState([]);
  const [selectedExport, setSelectedExport] = useState(null);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchExports = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://eximflow-api-server.vercel.app/exports?email=${user?.email}`,
          {
            headers: {
              authorization: `Bearer ${user.accessToken}`,
            },
          }
        );
        const data = await res.json();
        setExports(data);
      } catch (err) {
        console.dir(err);
        toast.error("Failed to load exports");
      } finally {
        setLoading(false);
      }
    };
    fetchExports();
  }, [user?.email, user.accessToken]);

  const handleDelete = async (exportId) => {
    const confirm = window.confirm("Are you sure you want to delete this?");
    if (!confirm) return;

    try {
      const res = await fetch(
        `https://eximflow-api-server.vercel.app/myExports/${exportId}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();

      if (data.deletedCount > 0) {
        toast.success("Deleted successfully");
        setExports((prev) => prev.filter((item) => item._id !== exportId));
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove export");
    }
  };

  const handleEdit = (item) => {
    setSelectedExport(item);
    modalRef.current.showModal();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const updatedExport = {
      product_name: form.product_name.value,
      product_image: form.product_image.value,
      product_category: form.product_category.value,
      price: parseFloat(form.price.value),
      address: form.address.value,
      origin_country: form.origin_country.value,
      rating: parseFloat(form.rating.value),
      available_quantity: parseInt(form.available_quantity.value),
    };

    try {
      const res = await fetch(
        `https://eximflow-api-server.vercel.app/myExports/${selectedExport._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedExport),
        }
      );
      const data = await res.json();

      if (data.modifiedCount > 0) {
        toast.success("Export updated successfully");
        setExports((prev) =>
          prev.map((exp) =>
            exp._id === selectedExport._id ? { ...exp, ...updatedExport } : exp
          )
        );
        modalRef.current.close();
      } else {
        toast.info("No changes detected");
      }
    } catch (err) {
      console.log(err);
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-white dark:bg-gray-900">
        <Loader />
      </div>
    );

  if (exports.length === 0)
    return (
      <div className="text-center text-2xl text-gray-500 h-screen flex justify-center items-center bg-white dark:bg-gray-900 px-4">
        <div>
          <title>EximFlow - Not Found Exports</title>
          <h2 className="text-center text-gray-800 dark:text-gray-200 mb-6 text-2xl">
            You have not exported any products yet.
          </h2>

          <Link
            to="/addProduct"
            className="
                          px-8 py-3 rounded-full
                          bg-emerald-500 text-white font-semibold
                          hover:bg-emerald-600
                          transition transform hover:scale-105
                          shadow-lg text-lg
                        "
          >
            Add Export
          </Link>
        </div>
      </div>
    );

  return (
    <div className="container mx-auto px-4 md:px-0 min-h-screen bg-white dark:bg-gray-900">
      <div className="grid grid-cols-1 gap-6 py-10">
        <div className="text-center">
          <title>EximFlow - My Exports</title>
          <h1 className="text-4xl font-bold mb-2 text-gray-800 dark:text-gray-200">
            My <span className="text-emerald-500">Exports</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            All exported products
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="text-sm sm:text-base">
                <th>SL No.</th>
                <th>Products</th>
                <th className="hidden sm:table-cell">Origin Country</th>
                <th className="hidden md:table-cell">Rating</th>
                <th className="hidden md:table-cell">Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {exports.map((exp, index) => (
                <tr
                  key={exp._id}
                  className="border-b border-gray-200 dark:border-gray-700 text-sm sm:text-base"
                >
                  <th className="whitespace-nowrap">{index + 1}</th>

                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-10 w-10 sm:h-12 sm:w-12">
                          <img src={exp.product_image} alt={exp.product_name} />
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800 dark:text-gray-200">
                          {exp.product_name}
                        </div>
                        <div className="text-xs sm:text-sm gap-2 flex flex-wrap">
                          <p className="md:opacity-50 text-gray-600 dark:text-gray-400">
                            ${exp.price}
                          </p>
                          <div className="md:hidden">
                            <p className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                              <span className="text-yellow-500">
                                <FaStar />
                              </span>
                              {exp.rating || "N/A"}
                            </p>
                          </div>
                          <div className="md:hidden">
                            <p className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                              <span className="text-emerald-500">
                                <IoBagCheck />
                              </span>
                              {exp.available_quantity}
                            </p>
                          </div>
                          <div className="md:hidden">
                            <p className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                              <span className="text-red-500">
                                <FaMapMarkerAlt />
                              </span>
                              {exp.origin_country || "N/A"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="hidden sm:table-cell whitespace-nowrap text-gray-600 dark:text-gray-400">
                    {exp.origin_country || "N/A"}
                  </td>
                  <td className="hidden md:table-cell whitespace-nowrap text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">
                        <FaStar />
                      </span>
                      {exp.rating || "N/A"}
                    </div>
                  </td>
                  <td className="hidden md:table-cell whitespace-nowrap text-gray-600 dark:text-gray-400">
                    {exp.available_quantity}
                  </td>

                  <th className="flex flex-col lg:flex-row gap-2 mt-2 sm:mt-0">
                    <button
                      onClick={() => handleEdit(exp)}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1 rounded w-full sm:w-auto transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(exp._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded w-full sm:w-auto transition"
                    >
                      Delete
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white dark:bg-gray-800">
          <h3 className="font-bold text-lg mb-4 text-gray-800 dark:text-gray-200">
            Update Product - {selectedExport?.product_name}
          </h3>

          {selectedExport && (
            <form onSubmit={handleUpdate} className="space-y-3">
              {[
                { name: "product_name", type: "text" },
                { name: "product_image", type: "text" },
                { name: "product_category", type: "text" },
                { name: "price", type: "number" },
                { name: "address", type: "text" },
                { name: "origin_country", type: "text" },
                { name: "rating", type: "number", step: 0.1, min: 0, max: 5 },
                { name: "available_quantity", type: "number" },
              ].map((field) => (
                <input
                  key={field.name}
                  type={field.type}
                  name={field.name}
                  step={field.step}
                  min={field.min}
                  max={field.max}
                  defaultValue={selectedExport[field.name]}
                  className="border border-gray-300 dark:border-gray-700 rounded-lg w-full p-2 
bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 
focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              ))}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg font-semibold transition"
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </form>
          )}

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyExports;
