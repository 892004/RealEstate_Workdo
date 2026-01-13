import React, { useEffect, useRef, useState } from "react";
import { fetchProductsByIds } from "../../Apis/productApi.js";
import { FaHeart, FaExchangeAlt, FaEye, FaHome,} from "react-icons/fa";
import { LiaLongArrowAltLeftSolid } from "react-icons/lia";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import { Link } from "react-router-dom";


const CARD_WIDTH = 700;
const GAP = 30;

const Cards = () => {
  const [products, setProducts] = useState([]);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);

  const trackRef = useRef(null);

  /* FETCH PRODUCTS */
  useEffect(() => {
    fetchProductsByIds([22, 29, 30, 31, 32, 33, 34, 35])
      .then((data) => {
        setProducts(data);

        const defaults = {};
        data.forEach((p) => {
          if (p.variants?.length) {
            defaults[p.id] = p.variants[0];
          }
        });
        setSelectedVariants(defaults);
      })
      .catch(console.error);
  }, []);

  /* START FROM MIDDLE */
  useEffect(() => {
    if (products.length) {
      setIndex(products.length);
    }
  }, [products]);

  const slides = [...products, ...products];

  /* NEXT / PREV */
  const next = () => setIndex((prev) => prev + 1);
  const prev = () => setIndex((prev) => prev - 1);

  /* HANDLE INFINITE RESET */
  useEffect(() => {
    if (!products.length) return;

    if (index === products.length * 2) {
      setTimeout(() => {
        setAnimate(false);
        setIndex(products.length);
      }, 500);
    }

    if (index === 0) {
      setTimeout(() => {
        setAnimate(false);
        setIndex(products.length);
      }, 500);
    }
  }, [index, products.length]);

  /* RE-ENABLE ANIMATION */
  useEffect(() => {
    if (!animate) {
      requestAnimationFrame(() => setAnimate(true));
    }
  }, [animate]);

  return (
    <section className="relative overflow-hidden -translate-y-30">
      {/* SLIDER */}
      <div
        ref={trackRef}
        className={`flex ${
          animate ? "transition-transform duration-1000 ease-in-out" : ""
        }`}
        style={{
          transform: `translateX(-${index * (CARD_WIDTH + GAP)}px)`,
          gap: `${GAP}px`,
        }}
      >
        {slides.map((product, i) => {
          const variant = selectedVariants[product.id];
          if (!variant) return null;

          return (
            <div
              key={i}
              style={{ width: CARD_WIDTH }}
              className="flex shrink-0 h-70 rounded-2xl overflow-hidden bg-[#0f1f25]"
            >
              {/* LEFT IMAGE */}
              <div className="relative w-1/2">
                <img
                  src={`http://localhost:4000${variant.image_url}`}
                  className="h-full w-full object-cover"
                  alt={product.title}
                />

                <div className="absolute top-4 left-4 flex flex-col gap-3">
                  <IconBox><FaHeart /></IconBox>
                  <IconBox><FaExchangeAlt /></IconBox>
                  <IconBox><FaEye /></IconBox>
                </div>

                <span className="absolute top-4 right-4 bg-[#c08a63] text-white px-4 py-1 rounded-full text-sm">
                  New
                </span>
              </div>

              {/* RIGHT CONTENT */}
              <div className="w-1/2 bg-[#fde9d9] p-2 flex flex-col justify-center">
                <span className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                  <FaHome /> Home
                </span>

                <h2 className="text-2xl font-bold mb-5">
                  <Link to={`/product/${product.id}`} className="hover:text-[#fde9d9] transition-colors">
                    {product.title}
                  </Link>
                </h2>

                {/* SQFT */}
                <select
                  value={variant.id}
                  onChange={(e) => {
                    const v = product.variants.find(
                      (x) => x.id === Number(e.target.value)
                    );
                    setSelectedVariants((prev) => ({
                      ...prev,
                      [product.id]: v,
                    }));
                  }}
                  className="border rounded-xl px-4 py-2 mb-5 w-44"
                >
                  {product.variants.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.sqft} sq ft
                    </option>
                  ))}
                </select>

                {/* PRICE */}
                <div className="mb-6">
                  <span className="text-xl font-bold">
                    Rs. {variant.price.toLocaleString()}
                  </span>
                  <span className="line-through text-gray-400 ml-3">
                    Rs. 645,200.00
                  </span>
                </div>

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
                  className="bg-[#0f1f25] text-white px-7 py-3 rounded-full w-fit hover:opacity-90"
                >
                  Add to Cart →
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ARROWS */}
      <div className="flex justify-between absolute bottom-2  w-full px-15 ">
        <ArrowButton onClick={prev}>
          <LiaLongArrowAltLeftSolid />
        </ArrowButton>
        <div className="line h-0.5 w-3xl mt-4 bg-white opacity-50"></div>
        <ArrowButton onClick={next}>
         <LiaLongArrowAltRightSolid />
        </ArrowButton>
      </div>
    </section>
  );
};

/* REUSABLE */
const IconBox = ({ children }) => (
  <div className="bg-white p-3 rounded-full shadow cursor-pointer">
    {children}
  </div>
);

const ArrowButton = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="border text-2xl border-white text-white px-4 py-1 rounded-full hover:bg-white hover:text-black transition cursor-pointer "
  >
    {children}
  </button>
);

export default Cards;
