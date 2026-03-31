import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../Apis/Api";

const BASE_URL = "https://realestate-workdo.onrender.com";

const ManageVariants = () => {
  const { id } = useParams(); // product id from URL
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    collection_id: "",
    sqft: "",
    price: "",
    stock: "",
    sku: "",
    imageFile: null, // sirf file
  });

  // ----------------- FETCH PRODUCT + VARIANTS -----------------
  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/products/${id}`);
      setProduct(res.data.product);
      setVariants(res.data.variants || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load product variants");
      if (err.response?.status === 401) {
        navigate("/admin/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // ----------------- FORM HANDLERS -----------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, imageFile: file }));
  };

  const resetForm = () => {
    setForm({
      collection_id: "",
      sqft: "",
      price: "",
      stock: "",
      sku: "",
      imageFile: null,
    });
    setError("");
  };

  // ----------------- SUBMIT (CREATE VARIANT) -----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.collection_id) {
      setError("Collection ID is required.");
      return;
    }

    // ✅ Image compulsory
    if (!form.imageFile) {
      setError("Please upload an image for this variant.");
      return;
    }

    try {
      setSaving(true);

      const fd = new FormData();
      fd.append("collection_id", form.collection_id);
      fd.append("sqft", form.sqft || "");
      fd.append("price", form.price || 0);
      fd.append("stock", form.stock || 0);
      fd.append("sku", form.sku || "");
      fd.append("image", form.imageFile); // multer field name = "image"

      const res = await api.post(`/variants/${id}`, fd);
      console.log("CREATE VARIANT RES >>>", res.data);

      resetForm();
      // list refresh
      fetchProduct();
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error || "Failed to create variant. Try again."
      );
      if (err.response?.status === 401) {
        navigate("/admin/login");
      }
    } finally {
      setSaving(false);
    }
  };

  // ----------------- UI RENDER -----------------
  if (loading && !product) {
    return <div className="p-6">Loading product variants...</div>;
  }

  if (!product) {
    return (
      <div className="p-6">
        <p className="text-red-500">Product not found.</p>
        <Link to="/admin" className="underline text-sm">
          ← Back to products
        </Link>
      </div>
    );
  }

  return (
    <section className="p-6 max-w-5xl mx-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Manage Variants</h1>
          <p className="text-sm text-gray-600 mt-1">
            Product #{product.id} –{" "}
            <span className="font-medium">{product.title}</span>
          </p>
        </div>

        <Link
          to="/admin"
          className="px-4 py-2 border rounded-full text-sm hover:bg-gray-100"
        >
          ← Back to Products
        </Link>
      </div>

      {/* Product summary */}
      <div className="mb-6 border rounded-xl p-4 bg-gray-50">
        <h2 className="text-lg font-semibold mb-2">Product Details</h2>
        <p className="text-sm">
          <span className="font-medium">Title:</span> {product.title}
        </p>
        <p className="text-sm">
          <span className="font-medium">Short desc:</span>{" "}
          {product.short_desc || "-"}
        </p>
        <p className="text-sm">
          <span className="font-medium">Long desc:</span>{" "}
          {product.long_desc || "-"}
        </p>
      </div>

      {error && (
        <div className="mb-4 text-sm text-red-600 border border-red-200 rounded-lg px-3 py-2 bg-red-50">
          {error}
        </div>
      )}

      {/* Variants list */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Existing Variants</h2>

        {variants.length === 0 ? (
          <p className="text-sm text-gray-500">No variants added yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-3 py-2 text-left">ID</th>
                  <th className="border px-3 py-2 text-left">Collection</th>
                  <th className="border px-3 py-2 text-left">Sq/Ft</th>
                  <th className="border px-3 py-2 text-left">Price</th>
                  <th className="border px-3 py-2 text-left">Stock</th>
                  <th className="border px-3 py-2 text-left">SKU</th>
                  <th className="border px-3 py-2 text-left">Image</th>
                </tr>
              </thead>
              <tbody>
                {variants.map((v) => (
                  <tr key={v.id}>
                    <td className="border px-3 py-2">{v.id}</td>
                    <td className="border px-3 py-2">{v.collection_id}</td>
                    <td className="border px-3 py-2">{v.sqft || "-"}</td>
                    <td className="border px-3 py-2">
                      {v.price ? `₹ ${v.price}` : "-"}
                    </td>
                    <td className="border px-3 py-2">{v.stock}</td>
                    <td className="border px-3 py-2">{v.sku || "-"}</td>
                    <td className="border px-3 py-2">
                      {v.image_url ? (
                        <img
                          src={BASE_URL + v.image_url}
                          alt={v.sku || "variant"}
                          className="w-16 h-16 object-cover rounded border"
                        />
                      ) : (
                        <span className="text-xs text-gray-400">No image</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add new variant form */}
      <div className="border rounded-xl p-4 bg-white shadow-sm">
        <h2 className="text-lg font-semibold mb-3">Add New Variant</h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Collection ID */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Collection ID <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="collection_id"
              value={form.collection_id}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/70"
              placeholder="e.g. 1"
            />
          </div>

          {/* Sqft */}
          <div>
            <label className="block text-sm font-medium mb-1">Sq/Ft</label>
            <input
              type="number"
              name="sqft"
              value={form.sqft}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/70"
              placeholder="e.g. 1200"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium mb-1">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/70"
              placeholder="e.g. 93400"
            />
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-medium mb-1">Stock</label>
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/70"
              placeholder="e.g. 5"
            />
          </div>

          {/* SKU */}
          <div>
            <label className="block text-sm font-medium mb-1">SKU</label>
            <input
              type="text"
              name="sku"
              value={form.sku}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/70"
              placeholder="e.g. FLAT-1200-2A"
            />
          </div>

          {/* Image (file only) */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Upload Image <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm"
            />
            <p className="text-[11px] text-gray-500 mt-1">
              Image is required. Choose an image (jpeg, jpg, png, webp, avif).
            </p>
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex items-center gap-3 mt-2">
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 rounded-full bg-[#172229] text-white text-sm disabled:opacity-60"
            >
              {saving ? "Saving..." : "Add Variant"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 border rounded-full text-sm"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ManageVariants;
  