import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiArrowLongLeft } from "react-icons/hi2";
import { RiDeleteBin6Line } from "react-icons/ri";
import '../components/Compare/compare.css'

const Compare = () => {
  const [compare, setCompare] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("compare")) || [];
    setCompare(data);
  }, []);

  const removeItem = (productId, variantId) => {
    const updatedCompare = compare.filter(
      (item) => !(item.productId === productId && item.variantId === variantId)
    );
    setCompare(updatedCompare);
    localStorage.setItem("compare", JSON.stringify(updatedCompare));
  };

  const clearAll = () => {
    setCompare([]);
    localStorage.removeItem("compare");
  };

  const addToCart = (item) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartItem = {
      productId: item.productId,
      variantId: item.variantId,
      title: item.title,
      sqft: item.sqft,
      price: item.price,
      image: item.image,
      qty: 1,
    };

    const existing = cart.find(
      (p) =>
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

  return (
    <section className="compare min-h-screen w-full">
      <div className="top-content h-[40vh] w-full bg-[#172229] flex flex-col items-start justify-start text-white px-20 py-15 gap-2">
        <Link to="/">
          <h3 className="flex items-center justify-center text-sm font-semibold">
            <span className="m-1 text-xl border px-1 py-1 rounded-full">
              <HiArrowLongLeft />
            </span>
            Back to Home
          </h3>
        </Link>
        <h1 className="text-3xl font-semibold m-1">Compare Products</h1>
        <p className="w-3xl text-[16px] font-medium m-1">
          Compare your favorite properties side by side to make the best choice for your dream home.
        </p>
      </div>

      <div className="flex items-center justify-center flex-col">
        <h1 className="text-3xl text-[#172229] font-bold mt-10 flex items-center gap-2">
          Compare
          <span className="text-[#172229] text-2xl">
            ({compare.length})
          </span>
        </h1>

        {/* Compare Navbar */}
        <div className="compare-nav h-10 w-7xl bg-[#c2c8d2] mt-5 rounded-xl">
          <ul className="flex items-center justify-around mt-1.5 gap-20 font-medium">
            <li className="px-30">Product</li>
            <li>Details</li>
            <li>Price</li>
            <li>Size</li>
            <li>Action</li>
          </ul>
        </div>
      </div>

      {/* ❤️ COMPARE ITEMS */}
      <div className="compare-items">
        {compare.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 mt-20">
            <h2 className="text-2xl text-gray-500 mb-4">No products to compare</h2>
            <Link to="/" className="bg-[#172229] text-white px-6 py-2 rounded-full">
              Browse Products
            </Link>
          </div>
        ) : (
          compare.map((item, index) => {
            return (
              <div
                key={index}
                className="items p-4 relative flex flex-row items-center justify-evenly border-b"
              >
                <img src={item.image} alt="product-img" className="h-40 w-40 object-cover rounded" />
                
                <div className="details flex flex-col items-center justify-center text-center">
                  <h1 className="font-semibold text-lg">{item.title}</h1>
                  <p className="text-sm text-gray-600">Real Estate</p>
                  <p className="text-sm text-gray-600">East Side Living</p>
                </div>

                <div className="price flex flex-col items-center justify-center text-center">
                  <h1 className="text-xl font-bold">₹{item.price.toLocaleString()}</h1>
                </div>

                <div className="size flex flex-col items-center justify-center text-center">
                  <h1 className="text-lg">{item.sqft} sq ft</h1>
                </div>

                <div className="actions flex flex-col items-center justify-center text-center gap-2">
                  <button 
                    onClick={() => addToCart(item)}
                    className="text-[#F7E1D5] py-2 text-[14px] w-30 bg-[#172229] rounded-full flex items-center px-2 cursor-pointer hover:opacity-90"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeItem(item.productId, item.variantId)}
                    className="text-red-500 text-2xl cursor-pointer hover:text-red-700"
                  >
                    <RiDeleteBin6Line />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 🧹 CLEAR ALL BUTTON */}
      {compare.length > 0 && (
        <button
          onClick={clearAll}
          className="clear-all bg-[#172229] text-[#F7E1D5] text-[14px] font-semibold px-10 py-2 mt-4 rounded-full flex items-center justify-center absolute left-[50%] cursor-pointer hover:opacity-90"
        >
          Clear All
        </button>
      )}
    </section>
  );
};

export default Compare;
