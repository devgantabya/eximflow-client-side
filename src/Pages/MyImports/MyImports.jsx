import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { useNavigate } from "react-router";
import Loader from "../../Components/Loader/Loader";
import { toast } from "react-toastify";

const MyImports = () => {
  const { user } = useContext(AuthContext);
  const [imports, setImports] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchImports = async () => {
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
  };

  useEffect(() => {
    fetchImports();
  }, [user]);

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
      <div className="flex justify-center mt-20">
        <Loader />
      </div>
    );

  if (imports.length === 0)
    return (
      <div className="text-center text-2xl text-gray-500 h-screen flex justify-center items-center">
        You have not imported any products yet.
      </div>
    );

  return (
    <div className="container mx-auto px-4 md:px-0 my-10">
      <title>EximFlow - My Imports</title>
      <div className="text-center py-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          My <span className="text-primary">Imports</span>
        </h1>
        <p className="text-gray-600">Your Imported products</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {imports.map((item) => (
          <div
            key={item._id}
            className="border rounded-xl shadow-md p-4 flex flex-col justify-between"
          >
            <img
              src={item.image}
              alt={item.title}
              className="rounded-lg h-48 w-full object-cover mb-4"
            />
            <h2 className="text-xl font-semibold mb-1">{item.title}</h2>
            <p className="text-gray-600 mb-1">
              Price: ${item.price_min} - ${item.price_max}
            </p>
            <p className="text-gray-600 mb-1">
              Rating: ⭐ {item.rating || "N/A"}
            </p>
            <p className="text-gray-600 mb-1">
              Origin: {item.origin_country || "N/A"}
            </p>
            <p className="text-gray-600 mb-2">
              Quantity Imported: {item.imported_quantity}
            </p>

            <div className="flex justify-between mt-auto gap-2">
              <button
                onClick={() => navigate(`/productDetails/${item.product_id}`)}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 flex-1"
              >
                See Details
              </button>
              <button
                onClick={() => handleRemove(item._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 flex-1"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyImports;
