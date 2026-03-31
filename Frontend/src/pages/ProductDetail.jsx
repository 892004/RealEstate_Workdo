import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from '../Apis/Api'
import { HiArrowLongRight } from "react-icons/hi2";
import { HiArrowLongLeft } from "react-icons/hi2";
import { CiHeart } from "react-icons/ci";
import { CiStar } from "react-icons/ci";
import { GoPencil } from "react-icons/go";
import { AiOutlineScissor } from "react-icons/ai";
import { CiShare2 } from "react-icons/ci";
import { FiMinus } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";

const ProductInfo = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);


  // 🔥 FETCH SINGLE PRODUCT (SAME AS PRODUCT DETAIL API)
  useEffect(() => {
    setLoading(true);

    api
      .get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data.product);
        setVariants(res.data.variants || []);
        setSelectedVariant(res.data.variants?.[0] || null);
      })
      .catch((err) => {
        console.error(err);
        setProduct(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  // ⏳ LOADING
  if (loading) {
    return <p className="p-6 text-lg">Loading product...</p>;
  }

  // ❌ NOT FOUND
  if (!product || !selectedVariant) {
    return <p className="p-6 text-lg">Product not found</p>;
  }

 const increaseQty = () => {
  setQty((prev) => prev + 1);
};

const decreaseQty = () => {
  if (qty > 1) {
    setQty((prev) => prev - 1);
  }
};

const BASE_URL = "https://realestate-workdo.onrender.com";

  return (
    <section className="min-h-screen bg-[#172229] text-[#FFE7D9] py-10">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center relative ">

        {/* 🔙 BACK */}
        <Link to="/collection/best-seller" className="text-sm  flex items-center font-semibold ">
          <span className="text-xl border p-1 rounded-full m-1">
            <HiArrowLongLeft />
          </span>{" "}
          Back to category
        </Link>

          <button className="absolute right-0">
            <p className="flex items-center ">
                <CiHeart size={22}  className="m-1"/>Add to wishlist
            </p>
          </button>
        </div>

        <div className="ratings flex flex-row items-center font-bold text-2xl py-3">
          <span>
            <CiStar />
          </span>
          <span>
            <CiStar />
          </span>
          <span>
            <CiStar />
          </span>
          <span>
            <CiStar />
          </span>
          <span>
            <CiStar />
          </span>

          <div className="review text-sm font-semibold px-2 cursor-pointer ">
            <p className=" flex items-center">
              <span className="m-1 text-xl">
                <GoPencil />
              </span>
              Write a Review
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-2">
          {/* 📦 DETAILS */}
          <div className="">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p className="py-2 leading-6 tracking-tight">{product.long_desc}</p>

            {/* 📐 SIZE SELECTOR */}
            <div className="mb-2">
              <p className="mb-2 font-semibold">Size :</p>
              <div className="flex gap-3 flex-wrap">
                {variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    className={`px-4 py-1 rounded-xl text-sm border transition ${
                      selectedVariant.id === v.id
                        ? "bg-[#F7E1D5] text-black"
                        : "border-gray-400 hover:border-white"
                    }`}
                  >
                    {v.sqft} sq ft
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-row gap-3 mb-3">
              <div className="sizing-guide">
                <p className="flex items-center text-sm font-semibold">
                  <span className="m-1 text-xl">
                    <AiOutlineScissor />
                  </span>
                  See Sizing Guide
                </p>
              </div>

              <div className="share ">
                <p className="flex items-center text-sm font-semibold">
                  <span className="m-1 text-xl">
                    <CiShare2 />
                  </span>
                  Share
                </p>
              </div>
            </div>
            {/* 💰 PRICE */}
            <p className="flex flex-row items-center  gap-5">
              <div className="flex items-center gap-3 border rounded-full  px-4 py-0.5">
                <span
                  className="cursor-pointer"
                   onClick={decreaseQty}
                >
                  <FiMinus />
                </span>

                <span>{qty}</span>

                <span
                  className="cursor-pointer"
                 onClick={increaseQty}
                >
                  <FiPlus />
                </span>
              </div>
              Rs.{selectedVariant.price.toLocaleString()}
            </p>

            {/* 🛒 ACTION BUTTONS */}
            <div className="flex gap-4 mt-5">
              <button className="bg-[#F7E1D5] text-sm text-black px-20 py-2 rounded-full flex items-center font-medium hover:opacity-90 cursor-pointer">
                Add to Cart <HiArrowLongRight className="ml-2 text-xl " />
              </button>

              <button className=" text-sm border border-white px-20 py-2 rounded-full flex items-center font-medium hover:opacity-90 cursor-pointer">
                Buy it Now
              </button>
            </div>
          </div>

          <div>
            <img
              src={`${BASE_URL}${selectedVariant.image_url}`}
              alt={product.title}
              className="rounded-2xl -translate-y-5 w-full h-[420px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductInfo;
