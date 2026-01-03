import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { ProductsContext } from "../../contexts/ProductsContext/ProductsContext";
import { useLocation, useNavigate } from "react-router";

const AddProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { addProduct } = useContext(ProductsContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    const newProduct = {
      product_name: form.product_name.value,
      product_image: form.product_image.value,
      product_category: form.product_category.value,
      price: parseFloat(form.price.value),
      address: form.address.value,
      origin_country: form.origin_country.value,
      rating: parseFloat(form.rating.value),
      available_quantity: parseInt(form.available_quantity.value),
      exporter_email: user?.email,
    };

    try {
      const res = await fetch(
        "https://eximflow-api-server.vercel.app/exports",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProduct),
        }
      );

      const data = await res.json();

      if (data?.success && data?.productResult?.insertedId) {
        toast.success("Product added successfully!");
        form.reset();

        addProduct({
          _id: data.productResult.insertedId,
          title: newProduct.product_name,
          image: newProduct.product_image,
          category: newProduct.product_category,
          price: newProduct.price,
          email: newProduct.exporter_email,
          created_at: new Date(),
          origin_country: newProduct.origin_country,
          rating: newProduct.rating,
          available_quantity: newProduct.available_quantity,
          location: newProduct.address,
        });

        navigate("/myExports");
      } else {
        toast.error("Failed to add product");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-10 px-4">
      <title>EximFlow - Add Product</title>

      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 sm:p-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-2 text-gray-800 dark:text-gray-100">
          Add <span className="text-emerald-500">Product</span>
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          Fill out the form below to add a new export product
        </p>

        <form onSubmit={handleAddProduct} className="space-y-5">
          <Input
            label="Product Name"
            name="product_name"
            placeholder="Havit HD Webcam"
          />

          <Input
            label="Product Image URL"
            name="product_image"
            placeholder="https://image-url.com"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input type="number" step="0.01" label="Price ($)" name="price" />
            <Input label="Category" name="product_category" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              type="number"
              step="0.1"
              min="0"
              max="5"
              label="Rating (0-5)"
              name="rating"
            />
            <Input
              type="number"
              min="1"
              label="Available Quantity"
              name="available_quantity"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input label="Location" name="address" placeholder="City" />
            <Input label="Origin Country" name="origin_country" />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3 rounded-lg font-semibold text-white 
            bg-emerald-500 hover:bg-emerald-600 transition 
            disabled:opacity-60"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

/* 🔹 Reusable Input Component */
const Input = ({ label, ...props }) => (
  <div>
    <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
      {label}
    </label>
    <input
      {...props}
      required
      className="w-full rounded-lg p-3 
      border border-gray-300 dark:border-gray-700
      bg-white dark:bg-gray-900 
      text-gray-800 dark:text-gray-200
      focus:outline-none focus:ring-2 focus:ring-emerald-500"
    />
  </div>
);

export default AddProduct;
