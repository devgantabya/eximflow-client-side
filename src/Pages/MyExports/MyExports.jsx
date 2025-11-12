import React, { useContext, useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "./../../contexts/AuthContext/AuthContext";
import { Link } from "react-router";

const MyExports = () => {
  const { user } = useContext(AuthContext);
  const [exports, setExports] = useState([]);
  const [selectedExport, setSelectedExport] = useState(null);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const fetchExports = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/exports?email=${user?.email}`
        );
        const data = await res.json();
        setExports(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load exports");
      }
    };
    fetchExports();
  }, [user?.email]);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this?");
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:5000/exports/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.deletedCount > 0) {
        toast.success("Deleted successfully");
        setExports((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete export");
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
      price: parseFloat(form.price.value),
      origin_country: form.origin_country.value,
      rating: parseFloat(form.rating.value),
      available_quantity: parseInt(form.available_quantity.value),
    };

    try {
      const res = await fetch(
        `http://localhost:5000/exports/${selectedExport._id}`,
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
      toast.error("Update failed");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-0">
      {exports.length === 0 ? (
        <div className="text-center h-screen flex justify-center items-center">
          <div>
            <title>EximFlow - Not Found Exports</title>
            <h2 className="text-center text-gray-500 mb-6 text-3xl">
              No exports found.
            </h2>
            <Link className="btn btn-primary" to={"/addProduct"}>
              Add Product
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center py-10">
            <title>EximFlow - My Exports</title>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              My <span className="text-primary">Exports</span>
            </h1>
            <p className="text-gray-600">All exported products</p>
          </div>
          {exports.map((exp) => (
            <div
              key={exp._id}
              className="bg-white shadow-md rounded-2xl overflow-hidden border"
            >
              <img
                src={exp.product_image}
                alt={exp.product_name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-lg">{exp.product_name}</h3>
                <p className="text-gray-600">Price: ${exp.price}</p>
                <p className="text-gray-600">Country: {exp.origin_country}</p>
                <p className="text-gray-600">Rating: ⭐ {exp.rating}</p>
                <p className="text-gray-600">
                  Quantity: {exp.available_quantity}
                </p>

                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleEdit(exp)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(exp._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">
            Update Export - {selectedExport?.product_name}
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
                className="w-full bg-gradient-to-br from-[#632EE3] to-[#9F62F2] text-white py-2 rounded-lg"
              >
                {loading ? "Updating..." : "Submit"}
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
