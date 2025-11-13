import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { ProductsContext } from "./../../contexts/ProductsContext/ProductsContext";
import { useNavigate } from "react-router";

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const { addProduct } = useContext(ProductsContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const product_name = form.product_name.value;
    const product_image = form.product_image.value;
    const product_category = form.product_category.value;
    const price = parseFloat(form.price.value);
    const address = form.address.value;
    const origin_country = form.origin_country.value;
    const rating = parseFloat(form.rating.value);
    const available_quantity = parseInt(form.available_quantity.value);

    const newProduct = {
      product_name,
      product_image,
      price,
      origin_country,
      rating,
      available_quantity,
      exporter_email: user?.email,
      product_category,
      address,
    };

    try {
      const res = await fetch("http://localhost:5000/exports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      const data = await res.json();

      if (data.success && data.productResult.insertedId) {
        toast.success("Product added successfully!");
        form.reset();

        const productForUI = {
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
        };

        addProduct(productForUI);
        navigate("/myExports");
      } else {
        toast.error("Failed to add product. Try again!");
      }
    } catch (err) {
      toast.error("Something went wrong!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-10">
      <title>EximFlow - Add Product</title>
      <div className="max-w-3xl mx-auto shadow-lg rounded-2xl p-8">
        <h2 className="text-4xl font-bold text-center mb-2">
          Add <span className="text-primary">Product</span>
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Fill out the form below to add a new product to your store.
        </p>

        <form onSubmit={handleAddProduct} className="space-y-5">
          <div>
            <label className="block font-medium mb-1">Product Name</label>
            <input
              type="text"
              name="product_name"
              placeholder="Havit N5086 HD webcam for sale"
              required
              className="w-full input border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Product Image URL</label>
            <input
              type="text"
              name="product_image"
              placeholder="https://..."
              required
              className="w-full input border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block font-medium mb-1">Price</label>
              <input
                type="number"
                name="price"
                placeholder="$50"
                required
                step="0.01"
                className="w-full border input border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Category</label>
              <input
                type="text"
                name="product_category"
                placeholder="Type your product category"
                required
                className="w-full border input border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block font-medium mb-1">Rating</label>
              <input
                type="number"
                name="rating"
                placeholder="Range: 0 - 5"
                required
                step="0.1"
                min="0"
                max="5"
                className="w-full input border  border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">
                Available Quantity
              </label>
              <input
                type="number"
                name="available_quantity"
                placeholder="100"
                required
                min="1"
                className="w-full input border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block font-medium mb-1">Location</label>
              <input
                type="text"
                name="address"
                placeholder="City"
                required
                step="0.01"
                className="w-full input border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Origin Country</label>
              <input
                type="text"
                name="origin_country"
                placeholder="Country"
                required
                className="w-full input border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
