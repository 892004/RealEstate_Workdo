import { useEffect, useState } from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { HiArrowLongRight } from "react-icons/hi2";
import { RiDeleteBin6Line } from "react-icons/ri";
import '../components/wishlist/wishlist.css'

const Wishlist = () => {
  // 1️⃣ Wishlist state
  const [wishlist, setWishlist] = useState([]);

  // 2️⃣ Page load pe localStorage se data uthao
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(data);
  }, []);

  // ❌ DELETE SINGLE ITEM
  const removeItem = (productId, variantId) => {
    // 3️⃣ Filter se selected item hata do
    const updatedWishlist = wishlist.filter(
      (item) => !(item.productId === productId && item.variantId === variantId)
    );

    // 4️⃣ State update
    setWishlist(updatedWishlist);

    // 5️⃣ localStorage update
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };  

  // 🧹 CLEAR ALL WISHLIST
  const clearAll = () => {
    // 6️⃣ State empty
    setWishlist([]);

    // 7️⃣ localStorage clear
    localStorage.removeItem("wishlist");
  };

  return (
    <section className="wishlist min-h-screen w-full">
      <div className="top-content h-[40vh] w-full bg-[#172229] flex flex-col items-start justify-start text-white px-20 py-15 gap-2">
        <Link to="/">
          <h3 className="flex items-center justify-center text-sm font-semibold">
            <span className="m-1 text-xl border px-1 py-1 rounded-full">
              <HiArrowLongLeft />
            </span>
            Back to Home
          </h3>
        </Link>
        <h1 className="text-3xl font-semibold m-1">Wishlist</h1>
        <p className="w-3xl text-[16px] font-medium m-1">
          we are driven by a passion for learning, discovery, and connection. We
          constantly strive to <br />
          enhance our platform, incorporate emerging technologies, and adapt to
          the evolving needs
          <br /> of our users.
        </p>
      </div>
      <div className="flex items-center justify-center flex-col">
        <h1 className="text-3xl text-[#172229] font-bold mt-10 flex items-center gap-2">
  Wishlist
  <span className="text-[#172229] text-2xl">
    ({wishlist.length})
  </span>
</h1>

        {/* Wishlist Navbar */}
        <div className="wishlist-nav h-10 w-7xl bg-[#c2c8d2] mt-5 rounded-xl">
          <ul className="flex  items-center justify-around mt-1.5 gap-20 font-medium">
            <li className="px-30">Product</li>
            <li>Details</li>
            <button>Cart Button</button>
            <button>Delete</button>
          </ul>
        </div>

      
      </div>

      {/* ❤️ WISHLIST ITEMS */}

      <div className="wishlist-items relative">
        {wishlist.map((item, index) => {
          return (
            <div
              key={index}
              className="items p-4 relative flex flex-row items-center justify-evenly border-b"
            >
              <img src={item.image} alt="product-img h-40 w-40 " />
              <div className="details flex flex-col items-center justify-center text-center">
                <h1>{item.title}</h1>
                <h1>{item.sqft}</h1>
                <h1>{item.price}</h1>
              </div>

              <button 
                  onClick={() => {
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
                  className="text-[#F7E1D5] py-2 text-[14px] w-30 bg-[#172229] rounded-full flex items-center px-2 cursor-pointer "
                >
                  Add to Cart <HiArrowLongRight className="ml-1 " />
                </button>

              <button
                onClick={() => removeItem(item.productId, item.variantId)}
                className="text-red-500 text-2xl cursor-pointer"
              >
                <RiDeleteBin6Line />
              </button>

            </div>
            
          );
        })}
      </div>
      
                {/* 🧹 CLEAR ALL BUTTON */}
        {wishlist.length > 0 && (
          <div className="btn">

         <button
  onClick={clearAll}
  className="bg-[#172229] text-[#F7E1D5] 
  text-[14px] font-semibold px-10 py-2 mt-6 
  rounded-full flex items-center justify-center mx-auto"
>
  Clear All
</button>
  </div>

        )}
    </section>
  );
};

export default Wishlist;  
