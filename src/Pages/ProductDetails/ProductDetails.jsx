import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import productNotFoundImg from "../../assets/item-not-found.webp";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const loadedProduct = useLoaderData();
  const [product, setProduct] = useState(loadedProduct || null);
  const { user } = useContext(AuthContext);
  const importModalRef = useRef(null);
  const [importQty, setImportQty] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const handleImportModalOpen = () => {
    importModalRef.current.showModal();
  };

  const handleImportSubmit = async (e) => {
    e.preventDefault();

    const qty = parseInt(importQty);
    if (!qty || qty <= 0) return toast.error("Please enter a valid quantity");
    if (qty > product.available_quantity)
      return toast.warning("Cannot import more than available quantity");

    setLoading(true);

    try {
      const checkRes = await fetch(
        `https://eximflow-api-server.vercel.app/myImports?email=${user.email}`,
        {
          headers: {
            authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      const userImports = await checkRes.json();
      const existingImport = userImports.find(
        (imp) => imp.product_id === product._id
      );

      if (existingImport) {
        const updateRes = await fetch(
          `https://eximflow-api-server.vercel.app/myImports/${existingImport._id}`,
          {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              imported_quantity: existingImport.imported_quantity + qty,
            }),
          }
        );
        const updateData = await updateRes.json();
        if (!updateData.modifiedCount)
          throw new Error("Failed to update import quantity");
      } else {
        const newImport = {
          product_id: product._id,
          title: product.title,
          image: product.image,
          price: product.price,
          rating: product.rating,
          origin_country: product.origin_country,
          imported_quantity: qty,
          importer_email: user?.email,
          importer_name: user?.displayName,
          imported_at: new Date(),
        };
        const res = await fetch(
          "https://eximflow-api-server.vercel.app/myImports",
          {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(newImport),
          }
        );
        const data = await res.json();
        if (!data.insertedId) throw new Error("Failed to save import");
      }

      const reduceRes = await fetch(
        `https://eximflow-api-server.vercel.app/products/${product._id}/reduce`,
        {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ reduceBy: qty }),
        }
      );
      const reduceData = await reduceRes.json();
      if (reduceData.modifiedCount === 0)
        throw new Error("Failed to update quantity");

      setProduct((prev) => ({
        ...prev,
        available_quantity: prev.available_quantity - qty,
      }));

      toast.success("Product imported successfully!");
      setImportQty("");
      importModalRef.current.close();

      navigate("/myImports");
    } catch (error) {
      toast.error(error.message || "Import failed!");
    } finally {
      setLoading(false);
    }
  };

  if (!product)
    return (
      <main className="grow flex justify-center items-center bg-linear-to-r from-blue-100 to-blue-50 px-4 py-12 md:py-20">
        <title>EximFlow - Not found this product</title>
        <div className="text-center">
          <img
            src={productNotFoundImg}
            alt="404 - Product Not Found"
            className="mx-auto max-w-sm w-full"
          />
          <div className="text-center py-10">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Oops, product <span className="text-primary">not found!</span>
            </h1>
            <p className="text-gray-600">
              We could not find the product you requested.
            </p>
          </div>
          <Link to="/allProducts" className="btn btn-primary btn-sm md:btn-md">
            Back To Store
          </Link>
        </div>
      </main>
    );

  return (
    <div className="container mx-auto my-10 px-4 md:px-0">
      <title>{`EximFlow - ${product.title}`}</title>
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="">
          <img
            src={product.image}
            alt={product.title}
            className="rounded-2xl h-[500px] w-full mx-auto shadow-md object-contain"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-600 mb-3">
            <span className="font-semibold">Category:</span> {product.category}
          </p>
          <p className="text-gray-600 mb-3">
            <span className="font-semibold">Seller Email:</span> {product.email}
          </p>
          <p className="text-gray-600 mb-3">
            <span className="font-semibold">Origin Country:</span>{" "}
            {product.origin_country}
          </p>
          <p className="text-gray-600 mb-3">
            <span className="font-semibold">Location:</span> {product.location}
          </p>
          <p className="text-gray-600 mb-3">
            <span className="font-semibold">Rating:</span> ⭐{" "}
            {product.rating || "N/A"}
          </p>
          <p className="text-gray-600 mb-3">
            <span className="font-semibold">Available Quantity:</span>{" "}
            {product.available_quantity}
          </p>
          <p className="text-gray-800 text-lg font-semibold mb-4">
            Price: ${product.price}
          </p>

          <button
            onClick={handleImportModalOpen}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/80"
            disabled={product.available_quantity === 0}
          >
            {product.available_quantity === 0 ? "Out of Stock" : "Import Now"}
          </button>
        </div>
      </div>

      <dialog
        ref={importModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">
            Import Product - {product.title}
          </h3>
          <form onSubmit={handleImportSubmit}>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Importer Name</label>
              <input
                type="text"
                defaultValue={user.displayName}
                readOnly
                disabled
                className="border border-gray-300 rounded-lg w-full p-2 bg-gray-300 focus:outline-0 mb-4"
              />
              <label className="block font-semibold mb-2">Importer Email</label>
              <input
                type="email"
                defaultValue={user.email}
                readOnly
                disabled
                className="border border-gray-300 rounded-lg w-full p-2 bg-gray-300 focus:outline-0 mb-4"
              />
              <label className="block font-semibold mb-2">Quantity</label>
              <input
                type="number"
                value={importQty}
                onChange={(e) => setImportQty(e.target.value)}
                className="border border-gray-300 rounded-lg w-full p-2 focus:outline-2 focus:outline-primary"
                placeholder="Enter quantity"
                min={1}
                max={product.available_quantity}
              />
              <p className="text-sm text-gray-500 mt-1">
                Available: {product.available_quantity}
              </p>
            </div>
            <button
              type="submit"
              disabled={
                importQty > product.available_quantity || loading || !importQty
              }
              className={`w-full py-2 rounded-lg text-white ${
                importQty > product.available_quantity || loading || !importQty
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-primary/80"
              }`}
            >
              {loading ? "Importing..." : "Import"}
            </button>
          </form>

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

export default ProductDetails;
