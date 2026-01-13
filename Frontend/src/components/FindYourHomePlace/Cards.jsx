import React, { useEffect, useRef, useState } from "react";
import { fetchProductsByIds } from "../../Apis/productApi.js";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { TbCurrentLocation } from "react-icons/tb";
import { Link } from "react-router-dom";

const CARD_WIDTH = 340;
const GAP = 24;
const VISIBLE = 2;

const Cards = () => {
  const [products, setProducts] = useState([]);
  const [sliderItems, setSliderItems] = useState([]);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const trackRef = useRef(null);

  useEffect(() => {
    fetchProductsByIds([13, 22, 20, 39, 40, 41, 42, 43, 44]).then((data) => {
      setProducts(data);

      // default variant
      const defaults = {};
      data.forEach((p) => (defaults[p.id] = 0));
      setSelectedVariants(defaults);

      // clone logic
      const clonesStart = data.slice(-VISIBLE);
      const clonesEnd = data.slice(0, VISIBLE);

      setSliderItems([...clonesStart, ...data, ...clonesEnd]);
      setIndex(VISIBLE);
    });
  }, []);

  const slideWidth = CARD_WIDTH + GAP;

  const next = () => {
    setIndex((prev) => prev + 1);
    setAnimate(true);
  };

  const prev = () => {
    setIndex((prev) => prev - 1);
    setAnimate(true);
  };

  // silent reset for infinite effect
  const handleTransitionEnd = () => {
    if (index >= products.length + VISIBLE) {
      setAnimate(false);
      setIndex(VISIBLE);
    }

    if (index < VISIBLE) {
      setAnimate(false);
      setIndex(products.length + VISIBLE - 1);
    }
  };

  // ✅ RIGHT CARD IS ALWAYS ACTIVE
  const activeIndex = index + 1;

  return (
    <section
      className="relative overflow-hidden"
      style={{ width: `${CARD_WIDTH * 2 + GAP}px` }}
    >
      {/* TRACK */}
      <div
        ref={trackRef}
        onTransitionEnd={handleTransitionEnd}
        className={`flex gap-6 ${
          animate ? "transition-transform duration-500 ease-in-out" : ""
        }`}
        style={{
          transform: `translateX(-${index * slideWidth}px)`,
        }}
      >
        {sliderItems.map((product, i) => {
          const variantIndex = selectedVariants[product.id] ?? 0;
          const variant = product.variants?.[variantIndex];

          const isActive = i === activeIndex;

          return (
            <div
              key={`${product.id}-${i}`}
              className={`min-w-[340px] h-[70vh] rounded-2xl border transition-all duration-300
                ${
                  isActive
                    ? "bg-[#172229] text-white"
                    : "bg-[#FFE9DA] text-[#172229]"
                }
              `}
            >
              <img
                src={`http://localhost:4000${variant.image_url}`}
                className="h-[250px] w-full object-cover rounded-xl"
                alt=""
              />

              <h1 className="flex items-center p-2 font-bold text-[14px]">
                <TbCurrentLocation className="m-1 text-[18px]" />
                Home
              </h1>

              <h3
                className={`mt-3 font-medium ml-3 text-[24px]
                  ${isActive ? "text-white" : "text-[#172229]"}
                `}
              >
                <Link to={`/product/${product.id}`} className={`hover:opacity-80 transition-opacity ${isActive ? "text-white" : "text-[#172229]"}`}>
                  {product.title}
                </Link>
              </h3>

              <select
                className={`mt-3 w-40 ml-3 border rounded-lg p-2 text-[#172229] text-[14px] font-bold  ${isActive ? "text-white" : "text-[#172229]"}`}
                
                value={variantIndex}
                onChange={(e) =>
                  setSelectedVariants((prev) => ({
                    ...prev,
                    [product.id]: Number(e.target.value),
                  }))
                }
              >
                {product.variants.map((v, idx) => (
                  <option key={v.id} value={idx}>
                    {v.sqft} sq ft
                  </option>
                ))}
              </select>

              <p className="mt-3 ml-3 text-lg">
                Rs. {variant.price.toLocaleString()}
              </p>

              <button 
                  onClick={() => {
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

                    // 🔔 Navbar ko inform karo
                    window.dispatchEvent(new Event("cartUpdated"));
                    window.dispatchEvent(new Event("cartOpen"));
                  }}
                  className={`mt-4 w-30 py-2 rounded-full ml-3 bg-[#172229] text-white  ${
                  isActive
                    ? "bg-[#172229] text-white"
                    : "bg-[#FFE9DA] text-[#172229]"
                }`}>
                Add to Cart →
              </button>
            </div>
          );
        })}
      </div>

      {/* ARROWS */}
      <div className="buttons flex items-center justify-between p-4">
        <button
          className="text-2xl text-white border border-white px-3 rounded-full"
          onClick={prev}
        >
          <FaArrowLeftLong />
        </button>

        <div className="line h-0.5 w-3xl bg-white"></div>

        <button
          className="text-2xl text-white border border-white px-3 rounded-full"
          onClick={next}
        >
          <FaArrowRightLong />
        </button>
      </div>

     
    </section>
  );
};

export default Cards;
