import React, { useEffect, useState } from "react";
import axios from "axios";
import { TbCurrentLocation } from "react-icons/tb";
import { HiMiniArrowLongRight, HiMiniArrowLongLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";
import QuickViewModal from "../QuickViewModal.jsx"; // ✅ THIS WAS MISSING
const API =
  "http://localhost:4000/api/products/by-collection/properties";

const CARD_WIDTH = 420;
const GAP = 70;

const Card = () => {
  const [products, setProducts] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [quickViewModal, setQuickViewModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);

  // ✅ COMPARE FUNCTION
  const addToCompare = (item, variant) => {
    let compare = JSON.parse(localStorage.getItem("compare")) || [];

    const compareItem = {
      productId: item.product.id,
      title: item.product.title,
      price: variant.price,
      image: `http://localhost:4000${variant.image_url}`,
      variantId: variant.id,
      sqft: variant.sqft,
    };

    const exists = compare.find(
      (p) =>
        p.productId === compareItem.productId &&
        p.variantId === compareItem.variantId
    );

    if (exists) return;

    if (compare.length >= 4) {
      alert("You can compare maximum 4 products at a time!");
      return;
    }

    compare.push(compareItem);
    localStorage.setItem("compare", JSON.stringify(compare));
    window.location.href = "/pages/compare";
  };

  // ✅ QUICK VIEW HANDLERS
  const openQuickView = (item, variant) => {
    setSelectedProduct(item.product);
    setSelectedVariant(variant);
    setQuickViewModal(true);
  };

  const handleQuickViewAddToCart = (product, variant) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartItem = {
      productId: product.id,
      variantId: variant.id,
      title: product.title,
      sqft: variant.sqft,
      price: variant.price,
      image: `http://localhost:4000${variant.image_url}`,
      qty: 1,
    };

    const existing = cart.find(
      (p) =>
        p.productId === cartItem.productId &&
        p.variantId === cartItem.variantId
    );

    if (existing) existing.qty += 1;
    else cart.push(cartItem);

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    window.dispatchEvent(new Event("cartOpen"));
  };

  const handleQuickViewAddToWishlist = (product, variant) => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const wishlistItem = {
      productId: product.id,
      title: product.title,
      price: variant.price,
      image: `http://localhost:4000${variant.image_url}`,
      variantId: variant.id,
      sqft: variant.sqft,
    };

    const exists = wishlist.find(
      (p) =>
        p.productId === wishlistItem.productId &&
        p.variantId === wishlistItem.variantId
    );

    if (!exists) {
      wishlist.push(wishlistItem);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      window.dispatchEvent(new Event("wishlistUpdated"));
    }
  };

  const handleQuickViewAddToCompare = (product, variant) => {
    let compare = JSON.parse(localStorage.getItem("compare")) || [];

    const compareItem = {
      productId: product.id,
      title: product.title,
      price: variant.price,
      image: `http://localhost:4000${variant.image_url}`,
      variantId: variant.id,
      sqft: variant.sqft,
    };

    const exists = compare.find(
      (p) =>
        p.productId === compareItem.productId &&
        p.variantId === compareItem.variantId
    );

    if (exists) return;

    if (compare.length >= 4) {
      alert("You can compare maximum 4 products at a time!");
      return;
    }

    compare.push(compareItem);
    localStorage.setItem("compare", JSON.stringify(compare));
  };

  const handleQuickViewVariantChange = (sqft) => {
    if (!selectedProduct) return;
    
    const newVariant = selectedProduct.variants?.find((v) => v.sqft === Number(sqft));
    if (newVariant) {
      setSelectedVariant(newVariant);
    }
  };

  /* 🔹 FETCH DATA */
  useEffect(() => {
    axios.get(API).then((res) => {
      setProducts(res.data);

      const defaults = {};
      res.data.forEach((item) => {
        if (item.variants && item.variants.length > 0) {
          defaults[item.product.id] = item.variants[0];
        }
      });
      setSelectedVariants(defaults);
    });
  }, []);

  if (!products.length) return null;

  /* 🔹 HANDLERS */
  const next = () => setActiveIndex((p) => p + 1);
  const prev = () => setActiveIndex((p) => Math.max(p - 1, 0));

  const handleSqftChange = (productId, sqft) => {
    const product = products.find((p) => p.product.id === productId);
    if (!product) return;

    const variant = product.variants.find(
      (v) => v.sqft === Number(sqft)
    );

    if (!variant) return;

    setSelectedVariants((prev) => ({
      ...prev,
      [productId]: variant,
    }));
  };

  return (
    <section className="relative h-full overflow-x-hidden flex items-center justify-center -translate-y-20">
      {/* TRACK */}
      <div
        className="flex"
        style={{
          gap: GAP,
          transform: `translateX(-${activeIndex * (CARD_WIDTH + GAP)}px)`,
          transition: "0.4s ease",
        }}
      >
        {products.map((item) => {
          const variant = selectedVariants[item.product.id];
          if (!variant) return null; // 🔴 MAIN CRASH FIX

          return (
            <div
              key={item.product.id}
              style={{ minWidth: CARD_WIDTH }}
              className="bg-[#b48a6f] rounded-xl text-white border border-white h-[76vh]"
            >
              {/* IMAGE */}
              <div className="relative rounded-xl overflow-hidden">
                <img
                  src={`http://localhost:4000${variant.image_url}`}
                  className="h-70 w-full object-cover"
                  alt={item.product.title}
                />
                <span className="absolute top-3 right-3 bg-[#cfa07e] px-3 py-1 rounded-full text-sm">
                  New
                </span>
              </div>

              {/* CONTENT */}
              <div className="mt-4">
                <p className="text-sm opacity-80 flex px-1 items-center font-bold">
                  <span className="m-2 text-[20px]">
                    <TbCurrentLocation />
                  </span>
                  Home
                </p>

                <h2 className="text-[22px] font-semibold px-3">
                  <button
                    onClick={() => openQuickView(item, variant)}
                    className="hover:text-[#f6e7da] transition-colors text-left"
                  >
                    {item.product.title}
                  </button>
                </h2>

                {/* SQFT SELECT */}
                <select
                  value={variant.sqft}
                  onChange={(e) =>
                    handleSqftChange(item.product.id, e.target.value)
                  }
                  className="mt-4 w-50 bg-transparent border border-white/50 rounded-xl px-3 py-2 ml-3 text-[14px] font-medium"
                >
                  {item.variants.map((v) => (
                    <option
                      key={v.id}
                      value={v.sqft}
                      className="text-black"
                    >
                      {v.sqft} sq ft
                    </option>
                  ))}
                </select>

                {/* PRICE */}
                <p className="mt-4 text-lg ml-5">
                  Rs. {Number(variant.price).toLocaleString()}
                </p>

                {/* BUTTONS */}
                <div className="flex gap-2">
                  <button
                    onClick={() => addToCompare(item, variant)}
                    className="mt-4 bg-[#f6e7da] ml-4 cursor-pointer text-black px-3 py-2 rounded-full font-medium flex items-center text-sm"
                  >
                    Compare →
                  </button>

                  <button
                    onClick={() => {
                      let cart =
                        JSON.parse(localStorage.getItem("cart")) || [];

                      const cartItem = {
                        productId: item.product.id,
                        variantId: variant.id,
                        title: item.product.title,
                        sqft: variant.sqft,
                        price: variant.price,
                        image: `http://localhost:4000${variant.image_url}`,
                        qty: 1,
                      };

                      const existing = cart.find(
                        (p) =>
                          p.productId === cartItem.productId &&
                          p.variantId === cartItem.variantId
                      );

                      if (existing) existing.qty += 1;
                      else cart.push(cartItem);

                      localStorage.setItem("cart", JSON.stringify(cart));
                      window.dispatchEvent(new Event("cartUpdated"));
                      window.dispatchEvent(new Event("cartOpen"));
                    }}
                    className="mt-4 bg-[#f6e7da] cursor-pointer text-black px-4 py-2 rounded-full font-medium flex items-center gap-2"
                  >
                    Add to Cart →
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ARROWS */}
      <div className="buttons flex items-center justify-center absolute left-50 right-50 bottom-0 gap-80">
        <button
          className="text-2xl border border-white px-3 py-0.5 text-white bg-[#172229] cursor-pointer rounded-full pb-1"
          onClick={prev}
        >
          <HiMiniArrowLongLeft />
        </button>

        <div className="line flex items-center justify-center absolute bg-white h-0.5 w-80"></div>

        <button
          className="text-2xl border border-white px-3 py-0.5 text-white bg-[#172229] cursor-pointer rounded-full pb-1"
          onClick={next}
        >
          <HiMiniArrowLongRight />
        </button>
      </div>
      
      {/* Quick View Modal */}
      <QuickViewModal
        isOpen={quickViewModal}
        onClose={() => setQuickViewModal(false)}
        product={selectedProduct}
        variant={selectedVariant}
        onVariantChange={handleQuickViewVariantChange}
        onAddToCart={handleQuickViewAddToCart}
        onAddToWishlist={handleQuickViewAddToWishlist}
        onAddToCompare={handleQuickViewAddToCompare}
      />
    </section>
  );
};

export default Card;
