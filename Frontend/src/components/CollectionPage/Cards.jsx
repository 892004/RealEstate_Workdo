import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TbCurrentLocation } from "react-icons/tb";
import { HiArrowLongRight } from "react-icons/hi2";
import { CiHeart } from "react-icons/ci";
import { CgArrowsExchangeAlt } from "react-icons/cg";
import { AiOutlineEye } from "react-icons/ai";


const ProductCard = ({ item }) => {
  if (!item || !item.variants || item.variants.length === 0) return null;

  const [selectedVariant, setSelectedVariant] = useState(item.variants[0]);
  const navigate = useNavigate();

  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const exists = wishlist.find(
      (p) =>
        p.productId === item.product.id &&
        p.variantId === selectedVariant.id
    );

    setIsWishlisted(!!exists);
  }, [selectedVariant, item.product.id]);

  // ✅ WISHLIST FUNCTION
  const addToWishlist = () => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const wishlistItem = {
      productId: item.product.id,
      title: item.product.title,
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

    // ❤️ SECOND CLICK → Wishlist page
    if (exists) {
      navigate("/pages/wishlist");
      return;
    }

    // ❤️ FIRST CLICK → Add wishlist
    wishlist.push(wishlistItem);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    setIsWishlisted(true);

    // 🔔 Navbar wishlist count update
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  return (
    <div className="cards border w-80 h-110 rounded-xl relative overflow-hidden shadow-sm mt-6 cursor-pointer">
      <img
        src={`http://localhost:4000${selectedVariant.image_url}`}
        alt={item.product.title}
        className="w-full h-[220px] object-cover"
      />

      {/* Hover Icons */}
      <div className="hover-icons flex flex-col absolute top-0 p-3 text-2xl text-white gap-1">
        <span
          onClick={addToWishlist}
          className="bg-[#172229] p-1 rounded-sm cursor-pointer transition-colors"
        >
          <CiHeart
            className={`transition-colors ${
              isWishlisted ? "text-red-500" : "text-white"
            }`}
          />
        </span>

        <span className="bg-[#172229] p-1 rounded-sm">
          <CgArrowsExchangeAlt />
        </span>

        <span className="bg-[#172229] p-1 rounded-sm">
          <AiOutlineEye />
        </span>
      </div>

      <h3 className="flex items-center px-3 mt-1 text-[#172229] font-bold text-[12px]">
        <span className="m-1 text-xl">
          <TbCurrentLocation />
        </span>
        Home
      </h3>

      <div className="flex flex-col gap-2 px-4 text-[#172229]">
        <h3 className="font-semibold text-lg">{item.product.title}</h3>

        <select
          className="border text-[14px] px-3 py-2 w-35 rounded-xl"
          value={selectedVariant.id}
          onChange={(e) =>
            setSelectedVariant(
              item.variants.find((v) => v.id === Number(e.target.value))
            )
          }
        >
          {item.variants.map((v) => (
            <option key={v.id} value={v.id}>
              {v.sqft} sq ft
            </option>
          ))}
        </select>

        <p className="text-lg">₹ {selectedVariant.price}</p>

   <button
  onClick={() => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartItem = {
      productId: item.product.id,
      variantId: selectedVariant.id,
      title: item.product.title,
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

    // 🔔 Navbar ko inform karo
    window.dispatchEvent(new Event("cartUpdated"));
    window.dispatchEvent(new Event("cartOpen"));
  }}
  className="text-[#F7E1D5] py-2 w-30 bg-[#172229] rounded-full flex items-center cursor-pointer text-[14px] px-2"
>
  Add to Cart <HiArrowLongRight className="ml-2" />
</button>
      </div>
    </div>
  );
};

export default ProductCard;
