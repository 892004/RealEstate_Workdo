import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { TbCurrentLocation } from "react-icons/tb";
import { HiArrowLongRight } from "react-icons/hi2";
import { CiHeart } from "react-icons/ci";
import { CgArrowsExchangeAlt } from "react-icons/cg";
import { AiOutlineEye } from "react-icons/ai";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/products/${id}`);
        setProduct(res.data.product);
        setSelectedVariant(res.data.variants[0]);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!selectedVariant || !product) return;

    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const exists = wishlist.find(
      (p) =>
        p.productId === product.id &&
        p.variantId === selectedVariant.id
    );
    setIsWishlisted(!!exists);
  }, [selectedVariant, product]);

  const addToWishlist = () => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const wishlistItem = {
      productId: product.id,
      title: product.title,
      price: selectedVariant.price,
      image: `http://localhost:4000${selectedVariant.image_url}`,
      variantId: selectedVariant.id,
      sqft: selectedVariant.sqft,
    };

    const exists = wishlist.find(
      (p) =>
        p.productId === wishlistItem.productId &&
        p.variantId === wishlistItem.variantId
    );

    if (exists) {
      return;
    }

    wishlist.push(wishlistItem);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    setIsWishlisted(true);
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartItem = {
      productId: product.id,
      variantId: selectedVariant.id,
      title: product.title,
      sqft: selectedVariant.sqft,
      price: selectedVariant.price,
      image: `http://localhost:4000${selectedVariant.image_url}`,
      qty: 1,
    };

    const existing = cart.find(
      p =>
        p.productId === cartItem.productId &&
        p.variantId === cartItem.variantId
    );

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    window.dispatchEvent(new Event("cartOpen"));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-2xl">Loading...</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-2xl">Product not found</h2>
      </div>
    );
  }

  return (
    <section className="product-detail min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <Link to="/" className="text-blue-600 hover:underline mb-6 inline-block">
          ← Back to Home
        </Link>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* LEFT - IMAGE */}
            <div className="relative">
              <img
                src={`http://localhost:4000${selectedVariant.image_url}`}
                alt={product.title}
                className="w-full h-[400px] object-cover rounded-xl"
              />

              {/* Hover Icons */}
              <div className="hover-icons flex flex-col absolute top-4 right-4 text-2xl text-white gap-2">
                <span
                  onClick={addToWishlist}
                  className="bg-[#172229] p-2 rounded-sm cursor-pointer transition-colors"
                >
                  <CiHeart
                    className={`transition-colors ${
                      isWishlisted ? "text-red-500" : "text-white"
                    }`}
                  />
                </span>

                <span className="bg-[#172229] p-2 rounded-sm">
                  <CgArrowsExchangeAlt />
                </span>

                <span className="bg-[#172229] p-2 rounded-sm">
                  <AiOutlineEye />
                </span>
              </div>
            </div>

            {/* RIGHT - DETAILS */}
            <div className="flex flex-col gap-4">
              <h3 className="flex items-center text-[#172229] font-bold text-[12px]">
                <span className="mr-2 text-xl">
                  <TbCurrentLocation />
                </span>
                Home
              </h3>

              <h1 className="text-3xl font-bold text-[#172229]">
                {product.title}
              </h1>

              {/* VARIANT SELECTOR */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Size:
                </label>
                <select
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                  value={selectedVariant.id}
                  onChange={(e) =>
                    setSelectedVariant(
                      product.variants.find((v) => v.id === Number(e.target.value))
                    )
                  }
                >
                  {product.variants.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.sqft} sq ft
                    </option>
                  ))}
                </select>
              </div>

              {/* PRICE */}
              <div className="text-3xl font-bold text-[#172229]">
                ₹ {selectedVariant.price.toLocaleString()}
              </div>

              {/* STOCK INFO */}
              <div className="text-sm text-gray-600">
                {selectedVariant.stock > 0 ? (
                  <span className="text-green-600">In Stock ({selectedVariant.stock} available)</span>
                ) : (
                  <span className="text-red-600">Out of Stock</span>
                )}
              </div>

              {/* ADD TO CART BUTTON */}
              <button
                onClick={addToCart}
                disabled={selectedVariant.stock === 0}
                className={`text-[#F7E1D5] py-3 w-full bg-[#172229] rounded-full flex items-center justify-center cursor-pointer text-[16px] font-medium ${
                  selectedVariant.stock === 0 
                    ? "opacity-50 cursor-not-allowed" 
                    : "hover:opacity-90"
                }`}
              >
                {selectedVariant.stock === 0 ? "Out of Stock" : "Add to Cart"} 
                <HiArrowLongRight className="ml-2" />
              </button>

              {/* PRODUCT DESCRIPTION */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-600">
                  {product.description || "Experience luxury living with this beautiful property. Featuring modern amenities and prime location, this home offers the perfect blend of comfort and style."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
