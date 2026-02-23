import React, { useEffect, useRef, useState } from "react";
import { TbCurrentLocation } from "react-icons/tb";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { HiMiniArrowLongLeft } from "react-icons/hi2";
import { HiMiniArrowLongRight } from "react-icons/hi2";
import { Link } from "react-router-dom";

import axios from "axios";

const CARD_WIDTH = 300;
const GAP = 24;

const ProductsSlider = ({ collection }) => {
  const [products, setProducts] = useState([]);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [index, setIndex] = useState(1); // 👈 start from 1
  const [enableTransition, setEnableTransition] = useState(true);
  const trackRef = useRef(null);

  // 🔹 FETCH PRODUCTS
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/products/by-collection/${collection}`)
      .then(res => {
        setProducts(res.data);

        const defaults = {};
        res.data.forEach(item => {
          defaults[item.product.id] = item.variants[0];
        });

        setSelectedVariants(defaults);
        setIndex(1);
      }); 
  }, [collection]);

  // 🔁 CREATE CAROUSEL ITEMS (CLONES)
  const carouselItems =
    products.length > 0
      ? [
          products[products.length - 1], // last clone
          ...products,
          products[0], // first clone
        ]
      : [];

  // 🔁 HANDLE LOOP WITHOUT JUMP
  useEffect(() => {
    if (!enableTransition) return;

    if (index === carouselItems.length - 1) {
      // reached fake last (clone of first)
      setTimeout(() => {
        setEnableTransition(false);
        setIndex(1);
      }, 500);
    }

    if (index === 0) {
      // reached fake first (clone of last)
      setTimeout(() => {
        setEnableTransition(false);
        setIndex(carouselItems.length - 2);
      }, 500);
    }
  }, [index, carouselItems.length, enableTransition]);

  // 🔁 RE-ENABLE TRANSITION
  useEffect(() => {
    if (!enableTransition) {
      requestAnimationFrame(() => {
        setEnableTransition(true);
      });
    }
  }, [enableTransition]);

  const next = () => setIndex(prev => prev + 1);
  const prev = () => setIndex(prev => prev - 1);

  // ✅ COMPARE FUNCTION
  const addToCompare = (product, variant) => {
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

    if (exists) {
      return; // Already in compare
    }

    // Limit to 4 items max
    if (compare.length >= 4) {
      alert("You can compare maximum 4 products at a time!");
      return;
    }

    compare.push(compareItem);
    localStorage.setItem("compare", JSON.stringify(compare));

    // 🔔 Navigate to compare page
    window.location.href = "/pages/compare";
  };

  return (  
    <section className="product-slider relative px-15 ">
      <div
        ref={trackRef}
        className="flex"
        style={{
          transform: `translateX(-${index * (CARD_WIDTH + GAP)}px)`,
          gap: `${GAP}px`,
          transition: enableTransition ? "transform 0.5s ease" : "none",
        }}
      >
        {carouselItems.map((item, i) => {
          const product = item.product;
          const variants = item.variants;
          const variant = selectedVariants[product.id];

          return (
            <div
              key={`${product.id}-${i}`}
              style={{ width: CARD_WIDTH }}
              className="flex flex-col items-start   gap-2 bg-[#0f1a20] rounded-2xl overflow-hidden h-[65vh] border border-white  text-white shrink-0"
            >
              <div className="relative h-[220px] ">
                <img
                  src={`http://localhost:4000${variant?.image_url}`}
                  alt={product.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <h1 className="home flex items-center font-bold text-[#FFE9DA] text-[14px] px-4 "><span className="text-[16px] p-2"><TbCurrentLocation /></span>Home</h1>

              <div className="px-6 ">
                <h3 className="font-semibold text-[18px] text-[#FFE9DA]  tracking-tight ">
                  <Link to={`/product/${product.id}`} className="hover:text-[#ffffff] transition-colors">
                    {product.title}
                  </Link>
                </h3>

                <select
                  className="mt-3 w-full text-[#FFE9DA]  border border-[#FFE9DA] rounded-lg px-3 py-2 cursor-pointer "
                  value={variant?.sqft}
                  onChange={e => {
                    const v = variants.find(
                      x => x.sqft === Number(e.target.value)
                    );

                    setSelectedVariants(prev => ({
                      ...prev,
                      [product.id]: v,
                    }));
                  }}
                >
                  {variants.map(v => (
                    <option key={v.id} value={v.sqft}>
                      {v.sqft} sq ft
                    </option>
                  ))}
                </select>

                <div className="mt-3 px-1 font-bold text-[#FFE9DA]">
                  Rs. {Number(variant?.price).toLocaleString()}
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => addToCompare(product, variant)}
                    className="border border-white px-3 py-2 mt-3 rounded-full bg-[#FFE9DA] text-[#172229] font-bold text-[12px] flex items-center cursor-pointer"
                  >
                    Compare
                  </button>
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
                    className="border border-white px-3 py-2 mt-3 rounded-full bg-[#FFE9DA] text-[#172229] font-bold text-[14px] flex items-center cursor-pointer"
                  >
                    Add to Cart <span className="px-3 text-2xl"><HiOutlineArrowLongRight /></span>
                  </button>
                </div>
              </div>

             
            </div>
            
          );
        })}
           
          
           
      </div>
          <div className="buttons absolute top-20 left-50 right-50 flex items-center justify-between  text-4xl translate-y-100 ">
            <button onClick={prev} className="border border-white px-3 rounded-full cursor-pointer"><span className="text-white text-[30px] "><HiMiniArrowLongLeft /></span></button>
            <div className="line h-0.5 w-5xl bg-white opacity-50"></div>
            <button onClick={next}  className="border border-white px-3 rounded-full cursor-pointer"><span className="text-white text-[30px] "><HiMiniArrowLongRight /></span></button>
           </div>
    </section>
  );
};

export default ProductsSlider;
