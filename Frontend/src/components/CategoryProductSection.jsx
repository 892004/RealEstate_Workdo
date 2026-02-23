import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiArrowLongRight } from "react-icons/hi2";
import { TbCurrentLocation } from "react-icons/tb";
import axios from "axios";

const CategoryProductSection = () => {
  const navigate = useNavigate();
  const [farmVilaProduct, setFarmVilaProduct] = useState(null);
  const [bestsellerProduct, setBestsellerProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch Farm Vila products
    axios.get('http://localhost:4000/api/products/by-collection/farm-villa')
      .then(res => {
        if (res.data && res.data.length > 0) {
          setFarmVilaProduct(res.data[0]);
        }
        return axios.get('http://localhost:4000/api/products/by-collection/best-seller');
      })
      .then(res => {
        if (res.data && res.data.length > 0) {
          setBestsellerProduct(res.data[0]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);

  const addToCart = (item, variant) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

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

  const ProductCard = ({ item, label, labelColor }) => {
    if (!item || !item.variants || item.variants.length === 0) return null;

    const [selectedVariant, setSelectedVariant] = useState(item.variants[0]);

    return (
      <div className="bg-[#8B4513] rounded-xl p-6 text-white relative overflow-hidden">
        {/* Label */}
        <div className="flex items-center justify-between mb-4">
          <span className={`px-4 py-2 rounded-full text-sm font-semibold ${labelColor} flex items-center gap-2`}>
            {label}
            <HiArrowLongRight />
          </span>
        </div>

        {/* Product Image */}
        <div className="mb-4">
          <img
            src={`http://localhost:4000${selectedVariant.image_url}`}
            alt={item.product.title}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-3">
          <div className="flex items-center text-sm opacity-90">
            <TbCurrentLocation className="mr-2" />
            Home
          </div>

          <h3 className="text-xl font-bold">{item.product.title}</h3>

          {/* Size Selector */}
          <select
            className="w-full bg-white/20 border border-white/30 text-white px-3 py-2 rounded-lg backdrop-blur-sm"
            value={selectedVariant.id}
            onChange={(e) =>
              setSelectedVariant(
                item.variants.find((v) => v.id === Number(e.target.value))
              )
            }
          >
            {item.variants.map((v) => (
              <option key={v.id} value={v.id} className="text-gray-900">
                {v.sqft} sq ft
              </option>
            ))}
          </select>

          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold">₹ {selectedVariant.price}</p>
            
            <button
              onClick={() => addToCart(item, selectedVariant)}
              className="bg-white text-[#8B4513] px-4 py-2 rounded-full font-semibold flex items-center gap-2 hover:bg-gray-100 transition-colors"
            >
              Add to Cart
              <HiArrowLongRight />
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Content */}
          <div className="space-y-8">
            {/* Title */}
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
              Contemporary 
              <br />
              Beachfront 
              <br />
              Properties
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-300 leading-relaxed">
              Discover our exclusive collection of contemporary beachfront properties that redefine luxury living. 
              Each property is meticulously designed to offer breathtaking ocean views, modern amenities, 
              and unparalleled comfort. From stunning villas to elegant beach houses, our curated selection 
              showcases the finest coastal real estate available today.
            </p>

            {/* Product Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {farmVilaProduct && (
                <ProductCard 
                  item={farmVilaProduct} 
                  label="Farm Vila" 
                  labelColor="bg-white/20 backdrop-blur-sm"
                />
              )}
              
              {bestsellerProduct && (
                <ProductCard 
                  item={bestsellerProduct} 
                  label="Bestseller" 
                  labelColor="bg-yellow-500/80 backdrop-blur-sm"
                />
              )}
            </div>
          </div>

          {/* Right Side - Large Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Contemporary Beachfront Property"
                className="w-full h-[600px] object-cover"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              
              {/* Floating Badge */}
              <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="text-gray-900 font-semibold">Premium Collection</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryProductSection;
