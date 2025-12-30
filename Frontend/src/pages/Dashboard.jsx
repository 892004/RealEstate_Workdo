import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../Apis/Api";

const BASE_URL = "http://localhost:4000";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");
  const [selectedImages, setSelectedImages] = useState({}); // productId -> image_url

  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/products/admin-list");

      console.log("ADMIN PRODUCTS RESPONSE >>>", res.data);

      const data = res.data.products || [];
      setProducts(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load products");
      if (err.response?.status === 401) {
        navigate("/admin/login");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this product?");
    if (!ok) return;

    try {
      await api.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed. Please try again.");
    }
  };

  if (loading) {
    return <div className="p-6">Loading products...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <section className="p-6">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Products List (Admin)</h1>

        <div className="flex gap-3">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              navigate("/admin/login");
            }}
            className="px-4 py-2 border rounded-full text-sm"
          >
            Logout
          </button>

          <Link
            to="/admin/products/create"
            className="px-4 py-2 rounded-full bg-[#172229] text-white text-sm"
          >
            + Create Product
          </Link>
        </div>
      </div>

      {/* Main table */}
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2 text-left">ID</th>
                <th className="border px-3 py-2 text-left">Product Name</th>
                <th className="border px-3 py-2 text-left">Image</th>
                <th className="border px-3 py-2 text-left">Base Price</th>
                <th className="border px-3 py-2 text-left">Description</th>
                <th className="border px-3 py-2 text-left">Sq/Ft + Images</th>
                <th className="border px-3 py-2 text-left">In Stock</th>
                <th className="border px-3 py-2 text-left">Collection</th>
                <th className="border px-3 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => {
                const id = p.id;

                const name        = p.title;
                const price       = p.price;
                const description = p.short_desc || p.long_desc;
                const defaultImg  = p.image;               // backend se aane wala main image
                const inStock     = p.in_stock;
                const collection  = p.collection_name || "-";
                const variants    = p.variants || [];

                // 👉 agar user ne koi variant select kiya hai to uska image use karo,
                // warna backend ka default image hi dikhao
                const mainImage = selectedImages[id] || defaultImg;

                return (
                  <tr key={id}>
                    {/* ID */}
                    <td className="border px-3 py-2 align-top">{id}</td>

                    {/* Name */}
                    <td className="border px-3 py-2 align-top font-medium">
                      {name}
                    </td>

                    {/* Main Image (changes on variant click) */}
                    <td className="border px-3 py-2 align-top">
                      {mainImage ? (
                        <img
                          src={BASE_URL + mainImage}
                          alt={name}
                          className=" object-cover rounded-md border"
                        />
                      ) : (
                        <span className="text-xs text-gray-400">No image</span>
                      )}
                    </td>

                    {/* Base Price */}
                    <td className="border px-3 py-2 align-top">
                      {price ? `₹ ${price}` : "-"}
                    </td>

                    {/* Description */}
                    <td className="border px-3 py-2 align-top max-w-xs">
                      <p className="line-clamp-3 text-xs text-gray-700">
                        {description || "-"}
                      </p>
                    </td>

                    {/* Sq/Ft + Variants Images */}
                    <td className="border px-3 py-2 align-top">
                      {variants.length === 0 ? (
                        <span className="text-xs text-gray-400">
                          No variants
                        </span>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {variants.map((v) => {
                            const isSelected =
                              selectedImages[id] === v.image_url ||
                              (!selectedImages[id] &&
                                defaultImg === v.image_url);

                            return (
                              <button
                                type="button"
                                key={v.id}
                                onClick={() => {
                                  if (v.image_url) {
                                    setSelectedImages((prev) => ({
                                      ...prev,
                                      [id]: v.image_url,
                                    }));
                                  }
                                }}
                                className={`border rounded-md p-1 flex flex-col items-center w-24 cursor-pointer transition ${
                                  isSelected
                                    ? "ring-2 ring-black/70"
                                    : "hover:border-black/60"
                                }`}
                              >
                                <span className="text-[11px] font-medium">
                                  {v.sqft || "-"} sq/ft
                                </span>
                                {v.image_url ? (
                                  <img
                                    src={BASE_URL + v.image_url}
                                    alt={name}
                                    className="w-16 h-16 object-cover rounded mt-1"
                                  />
                                ) : (
                                  <span className="text-[10px] text-gray-400 mt-1">
                                    No img
                                  </span>
                                )}
                                {v.price && (
                                  <span className="text-[11px] text-gray-700 mt-1">
                                    ₹ {v.price}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </td>

                    {/* In Stock */}
                    <td className="border px-3 py-2 align-top">
                      <span
                        className={`px-2 py-1 rounded-full text-[11px] ${
                          inStock
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>

                    {/* Collection */}
                    <td className="border px-3 py-2 align-top">
                      {collection}
                    </td>

                    {/* Actions */}
                    <td className="border px-3 py-2 align-top space-y-1">
                      <button
                        onClick={() => navigate(`/admin/products/${id}/edit`)}
                        className="block text-blue-600 underline text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/admin/products/${id}/variants`)
                        }
                        className="block text-green-600 underline text-xs"
                      >
                        Manage Variants
                      </button>
                      <button
                        onClick={() => handleDelete(id)}
                        className="block text-red-600 underline text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default ProductsList;
