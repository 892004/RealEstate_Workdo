import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../Apis/Api";

const BASE_URL = "http://localhost:4000";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [product, setProduct] = useState(null);

  // form states
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [longDesc, setLongDesc] = useState("");
  const [imageFile, setImageFile] = useState(null);

  // ------------------- FETCH EXISTING PRODUCT -------------------
  const fetchProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);

      const p = res.data.product;
      setProduct(p);

      // fill form
      setTitle(p.title);
      setShortDesc(p.short_desc || "");
      setLongDesc(p.long_desc || "");

    } catch (err) {
      console.error(err);
      setError("Failed to load product");
      if (err.response?.status === 401) navigate("/admin/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line
  }, [id]);

  // ------------------- HANDLE UPDATE -------------------
  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    try {
      setSaving(true);

      const fd = new FormData();
      fd.append("title", title);
      fd.append("short_desc", shortDesc || "");
      fd.append("long_desc", longDesc || "");

      // only send image if user selected
      if (imageFile) {
        fd.append("image", imageFile);
      }

      const res = await api.put(`/products/${id}`, fd);

      console.log("UPDATE PRODUCT RES >>>", res.data);

      setSuccessMsg("Product updated successfully!");

      // refresh data
      fetchProduct();
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error || "Failed to update product. Try again."
      );
      if (err.response?.status === 401) navigate("/admin/login");
    } finally {
      setSaving(false);
    }
  };

  // ------------------- UI -------------------
  if (loading) {
    return <div className="p-6">Loading product...</div>;
  }

  if (!product) {
    return (
      <div className="p-6">
        <p className="text-red-600">Product not found.</p>
        <Link to="/admin" className="underline text-sm">
          ← Back to products
        </Link>
      </div>
    );
  }

  return (
    <section className="p-6 max-w-3xl mx-auto">

      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Edit Product</h1>

        <Link
          to="/admin"
          className="px-4 py-2 border rounded-full text-sm hover:bg-gray-100"
        >
          ← Back to Products
        </Link>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 text-sm text-red-600 border border-red-200 rounded-lg px-3 py-2 bg-red-50">
          {error}
        </div>
      )}

      {/* Success Message */}
      {successMsg && (
        <div className="mb-4 text-sm text-green-700 border border-green-200 rounded-lg px-3 py-2 bg-green-50">
          {successMsg}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleUpdate} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Product Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/70"
          />
        </div>

        {/* Short Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Short Description</label>
          <textarea
            value={shortDesc}
            onChange={(e) => setShortDesc(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm h-20 resize-none focus:outline-none focus:ring-2 focus:ring-black/70"
          />
        </div>

        {/* Long Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Long Description</label>
          <textarea
            value={longDesc}
            onChange={(e) => setLongDesc(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm h-32 resize-none focus:outline-none focus:ring-2 focus:ring-black/70"
          />
        </div>

        {/* Existing Image */}
        <div>
          <label className="block text-sm font-medium mb-1">Current Image</label>
          {product.image ? (
            <img
              src={BASE_URL + product.image}
              alt="product"
              className="w-40 h-40 object-cover rounded border mb-2"
            />
          ) : (
            <p className="text-xs text-gray-500">No image uploaded</p>
          )}
        </div>

        {/* Upload New Image */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Upload New Image (optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="w-full text-sm"
          />
          <p className="text-[11px] text-gray-500 mt-1">
            If you upload a new image, it will replace the old one.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2 rounded-full bg-[#172229] text-white text-sm disabled:opacity-60"
          >
            {saving ? "Saving..." : "Update Product"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="px-4 py-2 border rounded-full text-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditProduct;
