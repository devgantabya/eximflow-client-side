import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { ProductsContext } from "./../../contexts/ProductsContext/ProductsContext";

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const { addProduct } = useContext(ProductsContext);
  const [loading, setLoading] = useState(false);

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
    <div className="bg-[#f9f9f9] min-h-screen py-10">
      <title>EximFlow - Add Product</title>
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-8">
        <h2 className="text-3xl font-semibold text-center text-[#001931] mb-6">
          Add Product
        </h2>

        <form onSubmit={handleAddProduct} className="space-y-5">
          <div>
            <label className="block font-medium text-[#001931] mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="product_name"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block font-medium text-[#001931] mb-1">
              Product Image URL
            </label>
            <input
              type="text"
              name="product_image"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block font-medium text-[#001931] mb-1">
                Price
              </label>
              <input
                type="number"
                name="price"
                required
                step="0.01"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block font-medium text-[#001931] mb-1">
                Category
              </label>
              <input
                type="text"
                name="product_category"
                required
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block font-medium text-[#001931] mb-1">
                Location
              </label>
              <input
                type="text"
                name="address"
                required
                step="0.01"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block font-medium text-[#001931] mb-1">
                Origin Country
              </label>
              <input
                type="text"
                name="origin_country"
                required
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block font-medium text-[#001931] mb-1">
                Rating
              </label>
              <input
                type="number"
                name="rating"
                required
                step="0.1"
                min="0"
                max="5"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block font-medium text-[#001931] mb-1">
                Available Quantity
              </label>
              <input
                type="number"
                name="available_quantity"
                required
                min="1"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
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
