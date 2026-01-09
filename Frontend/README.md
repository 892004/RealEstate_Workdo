# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.




import React, { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import Logo from "../../public/Images/Logo.webp";
import ReactCountryFlag from "react-country-flag";
import { LuUserRound } from "react-icons/lu";
import { BsCart2, BsCartX } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./Nav.css";
import menuProduct from "../../public/Images/menu-product.webp";
import bestsellerThumbnail from "../../public/Images/bestsellerThumbnail.webp";
import farmvillaThumbnail from "../../public/Images/farmvillaThumbnail.webp";
import propertyThumbnail from "../../public/Images/propertyThumnail.webp";
import royalvillaThumbnail from "../../public/Images/royalvillathumbnail.webp";
import { FiMinus, FiPlus } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { fetchProductsByIds } from "../../Apis/productApi";
import { IoTicketOutline } from "react-icons/io5";
import { GoGift } from "react-icons/go";

const Navbar = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [products, setProducts] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);

  /* ================= CART ================= */
  useEffect(() => {
    const loadCart = () =>
      setCart(JSON.parse(localStorage.getItem("cart")) || []);
    loadCart();
    window.addEventListener("cartUpdated", loadCart);
    return () => window.removeEventListener("cartUpdated", loadCart);
  }, []);

  const removeItem = (pid, vid) => {
    const updated = cart.filter(
      (i) => !(i.productId === pid && i.variantId === vid)
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const updateQty = (pid, vid, type) => {
    const updated = [...cart];
    const i = updated.findIndex(
      (x) => x.productId === pid && x.variantId === vid
    );
    if (i === -1) return;
    if (type === "inc") updated[i].qty += 1;
    if (type === "dec" && updated[i].qty > 1) updated[i].qty -= 1;
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const subTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  /* ================= SLIDER ================= */
  useEffect(() => {
    fetchProductsByIds([29, 17, 47]).then(setProducts);
  }, []);

  useEffect(() => {
    if (!products.length) return;
    const t = setInterval(
      () => setSlideIndex((p) => (p + 1) % products.length),
      3000
    );
    return () => clearInterval(t);
  }, [products]);

  const visibleProducts = products.slice(slideIndex, slideIndex + 3);

  /* ================= RETURN ================= */
  return (
    <section className="Navbar w-screen bg-[#172229] flex justify-around items-center border-b">
      <img src={Logo} className="h-7" />

      <button
        onClick={() => setIsCartOpen(true)}
        className="border px-4 py-2 rounded-full text-white"
      >
        <BsCart2 /> ({cart.length})
      </button>

      {/* ================= CART DRAWER ================= */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50">
          <div className="fixed right-0 top-0 h-full w-[400px] bg-white shadow-xl flex flex-col">
            {/* HEADER */}
            <div className="h-20 bg-[#172229] text-white flex items-center justify-between px-5">
              <h2 className="text-xl">My Cart</h2>
              <button onClick={() => setIsCartOpen(false)}>✕</button>
            </div>

            {/* ITEMS */}
            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 && (
                <div className="text-center mt-20">
                  <BsCartX className="text-5xl mx-auto" />
                  <p>Your cart is empty</p>
                </div>
              )}

              {cart.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 border p-4 mb-4 rounded-xl relative"
                >
                  <img src={item.image} className="h-20 w-20 rounded" />
                  <div className="flex-1">
                    <h4>{item.title}</h4>
                    <p>{item.sqft} sqft</p>
                    <div className="flex gap-3 mt-2">
                      <span onClick={() => updateQty(item.productId, item.variantId, "dec")}><FiMinus /></span>
                      {item.qty}
                      <span onClick={() => updateQty(item.productId, item.variantId, "inc")}><FiPlus /></span>
                    </div>
                    <p>Rs. {item.price}</p>
                  </div>
                  <button
                    className="absolute bottom-3 right-3 text-red-500"
                    onClick={() => removeItem(item.productId, item.variantId)}
                  >
                    <RiDeleteBin6Line />
                  </button>
                </div>
              ))}

              {/* SLIDER */}
              <h3 className="text-xl font-bold mt-6">You may also like</h3>
              {visibleProducts.map((p) => (
                <div key={p.id} className="border p-3 mt-3 rounded">
                  <p>{p.title}</p>
                  <Link to={`/product/${p.id}`} className="underline">
                    Details
                  </Link>
                </div>
              ))}
            </div>

            {/* FOOTER */}
            {cart.length > 0 && (
              <div className="p-4 border-t">
                <div className="flex justify-between">
                  <span>Total Items</span>
                  <span>{totalItems}</span>
                </div>
                <div className="flex justify-between text-xl mt-2">
                  <span>Subtotal</span>
                  <span>Rs. {subTotal}</span>
                </div>

                <div className="flex mt-4">
                  <button className="flex-1 bg-[#172229] text-white py-3">
                    View Cart
                  </button>
                  <button className="flex-1 bg-black text-white py-3">
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Navbar;
