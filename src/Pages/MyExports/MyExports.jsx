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
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );

  if (exports.length === 0)
    return (
      <div className="text-center text-2xl text-gray-500 h-screen flex justify-center items-center">
        <div>
          <title>EximFlow - Not Found Exports</title>
          <h2 className="text-center text-gray-500 mb-6 text-3xl">
            You have not exported any products yet.
          </h2>
          <Link className="btn btn-primary" to={"/addProduct"}>
            Add Export
          </Link>
        </div>
      </div>
    );

  return (
    <div className="container mx-auto px-4 md:px-0 min-h-screen">
      <div className="grid grid-cols-1 gap-6">
        <div className="text-center py-10">
          <title>EximFlow - My Exports</title>
          <h1 className="text-4xl font-bold mb-2">
            My <span className="text-primary">Exports</span>
          </h1>
          <p className="text-gray-600">All exported products</p>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className=" text-sm sm:text-base">
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
                  className="border-b border-gray-100 text-sm sm:text-base"
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
                        <div className="font-semibold">{exp.product_name}</div>
                        <div className="text-xs sm:text-sm gap-2 flex flex-wrap">
                          <p className="md:opacity-50">${exp.price}</p>
                          <div className="md:hidden">
                            <p className="flex items-center gap-1">
                              <span className="text-yellow-500">
                                <FaStar />
                              </span>
                              {exp.rating || "N/A"}
                            </p>
                          </div>
                          <div className="md:hidden">
                            <p className="flex items-center gap-1">
                              <span className="text-green-500">
                                <IoBagCheck />
                              </span>
                              {exp.available_quantity}
                            </p>
                          </div>
                          <div className="md:hidden">
                            <p className="flex items-center gap-1">
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

                  <td className="hidden sm:table-cell whitespace-nowrap">
                    {exp.origin_country || "N/A"}
                  </td>
                  <td className="hidden md:table-cell whitespace-nowrap">
                    <div className="">
                      <p className="flex items-center gap-1">
                        <span className="text-yellow-500">
                          <FaStar />
                        </span>
                        {exp.rating || "N/A"}
                      </p>
                    </div>
                  </td>
                  <td className="hidden md:table-cell whitespace-nowrap">
                    {exp.available_quantity}
                  </td>

                  <th className="flex flex-col lg:flex-row gap-2 mt-2 sm:mt-0">
                    <button
                      onClick={() => handleEdit(exp)}
                      className="bg-primary/90 text-white px-3 py-1 rounded hover:bg-primary w-full sm:w-auto"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(exp._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 w-full sm:w-auto"
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
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">
            Update Product - {selectedExport?.product_name}
          </h3>

          {selectedExport && (
            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                type="text"
                name="product_name"
                defaultValue={selectedExport.product_name}
                className="border border-gray-300 rounded-lg w-full p-2"
                required
              />
              <input
                type="text"
                name="product_image"
                defaultValue={selectedExport.product_image}
                className="border border-gray-300 rounded-lg w-full p-2"
                required
              />
              <input
                type="number"
                name="price"
                defaultValue={selectedExport.price}
                className="border border-gray-300 rounded-lg w-full p-2"
                required
              />
              <input
                type="text"
                name="product_category"
                defaultValue={selectedExport.product_category}
                className="border border-gray-300 rounded-lg w-full p-2"
                required
              />
              <input
                type="text"
                name="address"
                defaultValue={selectedExport.address}
                className="border border-gray-300 rounded-lg w-full p-2"
                required
              />
              <input
                type="text"
                name="origin_country"
                defaultValue={selectedExport.origin_country}
                className="border border-gray-300 rounded-lg w-full p-2"
                required
              />
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                name="rating"
                defaultValue={selectedExport.rating}
                className="border border-gray-300 rounded-lg w-full p-2"
                required
              />
              <input
                type="number"
                name="available_quantity"
                defaultValue={selectedExport.available_quantity}
                className="border border-gray-300 rounded-lg w-full p-2"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
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
