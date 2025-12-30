import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../Apis/Api";

const CreateProduct = () => {
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [longDesc, setLongDesc] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/products", {
        title,
        short_desc: shortDesc || null,
        long_desc: longDesc || null,
      });

      console.log("CREATE PRODUCT RESPONSE >>>", res.data);

      // backend se aa raha hai: { ok, status: productId, message }
      const productId =
        res.data.status || res.data.product_id || res.data.id;

      setSuccessMsg("Product created successfully!");

      // thoda sa delay ya direct navigate
      if (productId) {
        // direct variants manage page pe le jao
        navigate(`/admin/products/${productId}/variants`);
      } else {
        // fallback: list pe le jao
        navigate("/admin");
      }
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        navigate("/admin/login");
      } else {
        setError(
          err.response?.data?.error || "Failed to create product. Try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Create New Product</h1>
        <Link
          to="/admin"
          className="px-4 py-2 border rounded-full text-sm hover:bg-gray-100"
        >
          ← Back to Products
        </Link>
      </div>

      {error && (
        <div className="mb-4 text-sm text-red-600 border border-red-200 rounded-lg px-3 py-2 bg-red-50">
          {error}
        </div>
      )}

      {successMsg && (
        <div className="mb-4 text-sm text-green-700 border border-green-200 rounded-lg px-3 py-2 bg-green-50">
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Product Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/70"
            placeholder="e.g. East Side Living"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Short Description */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Short Description
          </label>
          <textarea
            className="w-full border rounded-lg px-3 py-2 text-sm h-20 resize-none focus:outline-none focus:ring-2 focus:ring-black/70"
            placeholder="Short marketing tagline or summary..."
            value={shortDesc}
            onChange={(e) => setShortDesc(e.target.value)}
          />
        </div>

        {/* Long Description */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Long Description
          </label>
          <textarea
            className="w-full border rounded-lg px-3 py-2 text-sm h-32 resize-none focus:outline-none focus:ring-2 focus:ring-black/70"
            placeholder="Detailed information about this property, features, location, etc."
            value={longDesc}
            onChange={(e) => setLongDesc(e.target.value)}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 rounded-full bg-[#172229] text-white text-sm disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Product"}
          </button>

          <button
            type="button"
            onClick={() => {
              setTitle("");
              setShortDesc("");
              setLongDesc("");
              setError("");
              setSuccessMsg("");
            }}
            className="px-4 py-2 border rounded-full text-sm"
          >
            Clear
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreateProduct;
