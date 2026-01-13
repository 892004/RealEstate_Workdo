import React, { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import Logo from "../../public/Images/Logo.webp";
import ReactCountryFlag from "react-country-flag";
import { LuUserRound } from "react-icons/lu";
import { BsCart2 } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import "./Nav.css";
import menuProduct from "../../public/Images/menu-product.webp";
import bestsellerThumbnail from "../../public/Images/bestsellerThumbnail.webp";
import farmvillaThumbnail from "../../public/Images/farmvillaThumbnail.webp";
import propertyThumbnail from "../../public/Images/propertyThumnail.webp";
import royalvillaThumbnail from "../../public/Images/royalvillathumbnail.webp";
import { FiMinus } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { fetchProductsByIds } from "../../Apis/productApi";
import { IoTicketOutline } from "react-icons/io5";
import { GoGift } from "react-icons/go";
import { BsCartX } from "react-icons/bs";

const Navbar = ({ slug }) => {
  const navigate = useNavigate();
  // remove items from cart
  const removeItem = (productId, variantId) => {
    const updatedCart = cart.filter(
      (item) => !(item.productId === productId && item.variantId === variantId)
    );

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // ---------------- LANGUAGE DROPDOWN ----------------
  const languages = [
    { code: "GB", label: "English" },
    { code: "DE", label: "Deutsch" },
    { code: "ES", label: "Español" },
    { code: "IN", label: "Hindi" },
  ];

  const [openLang, setOpenLang] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productIds = [29, 17, 47];

    console.log("Sending IDs:", productIds.join(",")); // 29,17,47

    const getProducts = async () => {
      const data = await fetchProductsByIds(productIds);
      console.log("API Response:", data);
      setProducts(data);
    };

    getProducts();
  }, []);

  useEffect(() => {
    const getWishlist = () => {
      const data = JSON.parse(localStorage.getItem("wishlist")) || [];
      setWishlist(data);
      window.addEventListener("wishlistUpdated", getWishlist);
      window.removeEventListener("wishlistUpdated", getWishlist);
    };

    // initial load
    getWishlist();

    // jab dusre component se wishlist change ho
    window.addEventListener("storage", getWishlist);

    return () => {
      window.removeEventListener("storage", getWishlist);
    };
  }, []);

  const handleLangSelect = (lang) => {
    setSelectedLang(lang);
    setOpenLang(false);
  };

  // ---------------- CURRENCY DROPDOWN ----------------
  const Currancy = [
    { code: "AU", label: "AUD $" },
    { code: "CA", label: "CAD $" },
    { code: "IN", label: "INR ₹" },
    { code: "US", label: "USD $" },
  ];

  const [openCurr, setOpenCurr] = useState(false);
  const [selectedCurr, setSelectedCurr] = useState(Currancy[2]);
  const [openUser, setOpenUser] = useState(false);

  const handleCurrSelect = (curr) => {
    setSelectedCurr(curr);
    setOpenCurr(false);
  };

  // dropData show using api
  const [menuData, setMenuData] = useState(null);
  const [FarmVilla, setFarmVilla] = useState([]);
  const [Properties, setProperties] = useState([]);
  const [RoyalHouse, setRoyalHouse] = useState([]);

  const [slideIndex, setSlideIndex] = useState(0);
  const ITEMS_PER_SLIDE = 3;
  const DOTS = 3;

  const total = products.length;

  const visibleProducts = Array.from(
    { length: ITEMS_PER_SLIDE },
    (_, i) => products[(slideIndex + i) % products.length]
  );

  useEffect(() => {
    if (products.length === 0) return;

    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % DOTS);
    }, 3000);

    return () => clearInterval(timer);
  }, [products]);

  useEffect(() => {
    getFarmVillaProduct();
    getPropertyProduct();
    getRoyalHouseProduct();
  }, []);

  // fetch api data farmvilla
  async function getFarmVillaProduct() {
    const url = "http://localhost:4000/api/products/by-collection/farm-villa";
    let response = await fetch(url);
    response = await response.json();
    setFarmVilla(response);
  }

  console.log(FarmVilla);

  // fetch api data property
  async function getPropertyProduct() {
    const url = "http://localhost:4000/api/products/by-collection/properties";
    let response = await fetch(url);
    response = await response.json();
    setProperties(response);
  }
  console.log(Properties);

  // fetch api data royalhouse
  async function getRoyalHouseProduct() {
    const url = " http://localhost:4000/api/products/by-collection/royal-house";
    let response = await fetch(url);
    response = await response.json();
    setRoyalHouse(response);
  }
  console.log(RoyalHouse);

  useEffect(() => {
    const openCart = () => setIsCartOpen(true);

    window.addEventListener("cartOpen", openCart);

    return () => {
      window.removeEventListener("cartOpen", openCart);
    };
  }, []);

  const [cart, setCart] = useState([]);
  useEffect(() => {
    const getCart = () => {
      const data = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(data);
    };

    getCart();

    window.addEventListener("cartUpdated", getCart);

    return () => {
      window.removeEventListener("cartUpdated", getCart);
    };
  }, []);

  const updateQty = (productId, variantId, type) => {
    let updatedCart = [...cart];

    const index = updatedCart.findIndex(
      (item) => item.productId === productId && item.variantId === variantId
    );

    if (index === -1) return;

    if (type === "inc") {
      updatedCart[index].qty += 1;
    }

    if (type === "dec") {
      if (updatedCart[index].qty > 1) {
        updatedCart[index].qty -= 1;
      }
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const subTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <section className="Navbar sticky h-25 w-screen bg-[#172229] flex flex-row items-center justify-around border-b border-white">
      {/* ---------------- LEFT MENU ---------------- */}
      <div className="list-items flex items-center justify-center">
        <ul className="flex items-center justify-center gap-5 text-[#FFE7D9] text-[15px] cursor-pointer">
          <li className="menu-item">
            <button className="menu-btn">
              Apartment <FaAngleDown />
            </button>

            <div className="mega-menu">
              <div className="mega-content flex items-start justify-around gap-10">
                {/* FarmVilla */}
                <div>
                  <h4 className="text-black">FarmVilla</h4>
                  {FarmVilla.map((item) => (
                    <Link
                      key={item.product.id}
                      to={`/FarmVilla/${item.product.id}`}
                      className="menu-link"
                    >
                      {item.product.title}
                    </Link>
                  ))}
                </div>

                {/* Luxury Property */}
                <div>
                  <h4 className="text-black">Luxury Property</h4>
                  {Properties.map((item) => (
                    <Link
                      key={item.product.id}
                      to={`/Property/${item.product.id}`}
                      className="menu-link"
                    >
                      {item.product.title}
                    </Link>
                  ))}
                </div>

                {/* Royal House */}
                <div>
                  <h4 className="text-black">Royal House</h4>
                  {RoyalHouse.map((item) => (
                    <Link
                      key={item.product.id}
                      to={`/RoyalHouse/${item.product.id}`}
                      className="menu-link"
                    >
                      {item.product.title}
                    </Link>
                  ))}
                </div>

                {/* Image */}
                <div className="image">
                  <img
                    src={menuProduct}
                    alt="menu-product"
                    className="h-60 object-cover"
                  />
                </div>
              </div>
            </div>
          </li>

          <li className="menu-item">
            <button className="menu-btn">
              Collection <FaAngleDown />
            </button>

            <div className="mega-menu">
              <div className="mega-content flex items-start justify-center gap-20 p-2 ">
                <Link
                  to="/collection/best-seller"
                  className="relative cursor-pointer"
                >
                  <img
                    src={bestsellerThumbnail}
                    alt=""
                    className="h-60 w-80 rounded-xl relative"
                  />
                  <span className="text-black absolute left-22 -bottom-8 text-[16px] ">
                    Best Seller
                  </span>
                </Link>
                <Link
                  to="/collection/farm-villa"
                  className="relative cursor-pointer"
                >
                  <img
                    src={farmvillaThumbnail}
                    className="h-60 w-80 rounded-xl"
                  />
                  <span className="absolute -bottom-8 left-20 text-black">
                    Farm Villa
                  </span>
                </Link>

                <Link
                  to="/collection/properties"
                  className="relative cursor-pointer"
                >
                  <img
                    src={propertyThumbnail}
                    className="h-60 w-80 rounded-xl"
                  />
                  <span className="absolute -bottom-8 left-22 text-black">
                    Properties
                  </span>
                </Link>

                <Link
                  to="/collection/royal-house"
                  className="relative cursor-pointer"
                >
                  <img
                    src={royalvillaThumbnail}
                    className="h-60 w-80 rounded-xl"
                  />
                  <span className="absolute -bottom-8 left-20 text-black">
                    Royal House
                  </span>
                </Link>
              </div>
            </div>
          </li>

          <li className="flex items-center">
            <button className="menu-btn-page flex items-center justify-center cursor-pointer py-10">
              Pages <FaAngleDown className="m-2"/>
              <div className="mega-content-page  block p-1 absolute bg-white top-25 text-black text-left rounded-b-xl invisible">
                <ul className="text-[16px] p-3 flex flex-col items-start gap-2 cursor-pointer">
                    <Link to = "/pages/Aboutus">About us</Link>
                    <Link to = "/pages/Contactus">Contact with us </Link>
                    <Link to = "/pages/Faq">Faq</Link>
                    <Link to = "/pages/Policy">Privacy Policy</Link>
                    <Link to = "/pages/Shipping-Delivery">Shipping & Delivery</Link>
                    <Link to = "/pages/terms-condition">Terms & Conditions</Link>
                    <Link to = "/pages/wishlist">Wishlist</Link>
                </ul>
              </div>
            </button>
          </li>

          <li className="flex items-center">
            <button className="menu-btn-blog flex items-center justify-center py-10">
              Blog <FaAngleDown className="m-2"/>
              <div className="mega-content-blog block p-2 absolute bg-white top-25 text-black text-left rounded-b-xl invisible">
                    <ul className="text-[16px] px-5 flex flex-col items-start gap-2 cursor-pointer">
                    <Link to = '/pages/blog'>Blog Page</Link>
                    <Link to = '/pages/Article'>Artical Page</Link>
                </ul>
              </div>
            </button>
          </li>
        </ul>
      </div>

      {/* ---------------- LOGO ---------------- */}
      <div className="logo">
        <img src={Logo} alt="logo" className="h-7 object-cover" />
      </div>

      {/* ---------------- RIGHT MENU ---------------- */}
      <div className="menu-right flex items-center justify-center text-white gap-2">
        {/* ---------- LANGUAGE DROPDOWN ---------- */}
        <div className="relative inline-block">
          <button
            onClick={() => setOpenLang(!openLang)}
            className="border border-[#FFE7D9] px-3 py-1 flex items-center rounded-full cursor-pointer text-[14px] text-[#FFE7D9]"
          >
            <ReactCountryFlag
              countryCode={selectedLang.code}
              svg
              style={{ width: "22px", height: "22px" }}
              className="mr-2"
            />
            {selectedLang.label}
            <FaAngleDown className="m-2 font-extralight" />
          </button>

          {openLang && (
            <div className="absolute right-0 top-10 w-35 bg-white text-black rounded-md shadow-md z-50">
              {languages.map((lang) => (
                <div
                  key={lang.code}
                  onClick={() => handleLangSelect(lang)}
                  className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-200"
                >
                  <ReactCountryFlag
                    countryCode={lang.code}
                    svg
                    style={{ width: "20px", height: "20px" }}
                  />
                  {lang.label}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ---------- CURRENCY DROPDOWN ---------- */}
        <div className="relative inline-block">
          <button
            onClick={() => setOpenCurr(!openCurr)}
            className="border border-[#FFE7D9] px-3 py-1 flex items-center rounded-full cursor-pointer text-[14px] text-[#FFE7D9]"
          >
            <ReactCountryFlag
              countryCode={selectedCurr.code}
              svg
              style={{ width: "22px", height: "22px" }}
              className="mr-2"
            />
            {selectedCurr.label}
            <FaAngleDown className="m-2 font-extralight" />
          </button>

          {openCurr && (
            <div className="absolute right-0 top-10 w-30 bg-white text-black rounded-md shadow-md z-50">
              {Currancy.map((curr) => (
                <div
                  key={curr.code}
                  onClick={() => handleCurrSelect(curr)}
                  className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-200"
                >
                  <ReactCountryFlag
                    countryCode={curr.code}
                    svg
                    style={{ width: "20px", height: "20px" }}
                  />
                  {curr.label}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ---------- USER & CART ---------- */}
        <div className="relative block user mt-2">
          <button className="cursor-pointer">
            <LuUserRound className="border border-[#FFE7D9] rounded-full text-[40px] p-2" />
          </button>

          <div className="drop absolute h-25 w-30 text-[14px] bg-[#FFE7D9] top-10 right-0 rounded-b-xl text-black flex flex-col items-start justify-center gap-1 list-none px-2">
            <Link to="/admin/login">Login</Link>
            <Link to="/admin/signup">Create Account</Link>
            <Link to="/pages/wishlist">Wishlist({wishlist.length})</Link>
          </div>
        </div>

        <button
          onClick={() => setIsCartOpen(true)}
          className="border border-[#FFE7D9] px-3 py-1 flex items-center rounded-full cursor-pointer text-[14px] text-[#FFE7D9]"
        >
          <p className="absolute right-24 bg-white text-black px-2 top-8 rounded-full text-[10px] font-bold">
            {cart.length}
          </p>
          My cart: Rs.0.00
          <span className="text-2xl m-1">
            <BsCart2 />
          </span>
        </button>

        {/* ---------- CART DRAWER ---------- */}
        {isCartOpen && (
          <div>
            {/* Drawer */}
            <div
              className={`fixed top-0 right-0 h-full w-[400px] bg-white z-50 shadow-xl flex flex-col
  transform transition-transform duration-300 ease-in-out
  ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
            >
              {/* ================= HEADER (STICKY) ================= */}
              <div className="cart-heading sticky top-0 z-10 h-20 w-full bg-[#172229] flex items-center justify-between px-5">
                <h1 className="text-2xl font-medium text-white">My Cart</h1>

                <p className="uppercase font-semibold tracking-wider text-[14px] text-white">
                  {cart.length} ITEMS
                </p>

                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-2xl text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* ================= CART ITEMS (SCROLL AREA) ================= */}
              <div className="flex-1 overflow-y-auto p-4">
                {cart.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <span className="text-[#172229] text-5xl">
                      <BsCartX />
                    </span>
                    <h2 className="text-xl font-semibold mb-2">
                      Your cart is empty
                    </h2>

                    <Link to="/collection/best-seller">
                      <button
                        onClick={() => setIsCartOpen(false)}
                        className="mt-4 bg-[#172229] text-[#f4ece7] text-[14px] font-bold  px-6 py-3 rounded-full cursor-pointer"
                      >
                        ← Continue shopping
                      </button>
                    </Link>
                  </div>
                )}
                {cart.length > 0 && (
                  <>
                    {cart.map((item, index) => (
                      <div
                        key={index}
                        className="relative flex items-center gap-4 border border-black p-4 mb-4 rounded-xl"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-20 w-20 object-cover rounded"
                        />

                        <div className="flex-1 text-black">
                          <h4 className="font-semibold">{item.title}</h4>
                          <p className="text-sm">
                            <b>Size:</b> {item.sqft} sqft
                          </p>

                          <div className="flex items-center gap-3 border rounded-full w-fit px-3 py-1 mt-2">
                            <span
                              className="cursor-pointer"
                              onClick={() =>
                                updateQty(item.productId, item.variantId, "dec")
                              }
                            >
                              <FiMinus />
                            </span>

                            <span>{item.qty}</span>

                            <span
                              className="cursor-pointer"
                              onClick={() =>
                                updateQty(item.productId, item.variantId, "inc")
                              }
                            >
                              <FiPlus />
                            </span>
                          </div>

                          <p className="mt-2 font-semibold">Rs. {item.price}</p>
                        </div>

                        <button
                          onClick={() =>
                            removeItem(item.productId, item.variantId)
                          }
                          className="absolute bottom-4 right-4 text-red-500 text-xl"
                        >
                          <RiDeleteBin6Line />
                        </button>
                      </div>
                    ))}
                  </>
                )}

                {/* img slider */}
                {cart.length > 0 && (
                  <div className="like-products mt-6">
                    <h1 className="text-black text-2xl font-bold mb-4">
                      You may also like
                    </h1>

                    {/* SLIDER */}
                    <div className="flex gap-4 overflow-hidden">
                      {visibleProducts.map((item) => (
                        <div
                          key={item.id}
                          className="min-w-[360px] border border-black rounded-xl p-4 flex items-center gap-4 bg-white"
                        >
                          <img
                            src={`http://localhost:4000${item.variants?.[0]?.image_url}`}
                            alt={item.title}
                            className="h-20 w-20 object-cover rounded-lg"
                          />

                          <div className="flex flex-col text-black">
                            <h3 className="font-semibold">{item.title}</h3>

                            <p className="mt-1">
                              Rs. {item.variants?.[0]?.price}
                            </p>

                            <Link
                              to={`/product/${item.id}`}
                              className="text-sm underline mt-2"
                            >
                              Details
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* DOTS */}
                {cart.length > 0 && (
                  <div className="flex justify-center gap-2 mt-4">
                    {Array.from({ length: DOTS }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setSlideIndex(i)}
                        className={`h-2 w-2 rounded-full transition-all duration-300 ${
                          slideIndex === i ? "bg-black w-4" : "bg-gray-400"
                        }`}
                      />
                    ))}
                  </div>
                )}

                <div className="cart-footer h-[35vh] w-full shadow-2xl flex flex-col">
                  <div className="discount-gift flex flex-row items-center justify-center gap-5 mt-5">
                    <button className="bg-[#172229] py-3 px-18 rounded-xl cursor-pointer">
                      <span className="text-3xl ">
                        <IoTicketOutline />
                      </span>
                    </button>
                    <button className="bg-[#172229] py-3 px-18 rounded-xl cursor-pointer">
                      <span className="text-3xl">
                        <GoGift />
                      </span>
                    </button>
                  </div>
                  <hr className="w-90 translate-x-5  bg-black h-0.5 mt-5" />
                  <div className="item-price flex flex-row items-center justify-between text-[#172229] mt-2">
                    <div className="items flex flex-col px-5">
                      <h1 className="text-2xl font-medium">Total Items</h1>
                      <h1 className="text-2xl font-medium">{totalItems}</h1>
                    </div>

                    <div className="sub-total flex flex-col mr-5">
                      <h1 className="text-2xl font-medium text-right">
                        Sub total
                      </h1>
                      <h1 className="text-[26px] font-light">
                        Rs. {subTotal.toLocaleString()}
                      </h1>
                    </div>
                  </div>

                  <div className="btn text-white flex flex-row items-center justify-between absolute bottom-0 ">
                    <button 
                      onClick={() => navigate("/pages/cart")}
                      className="bg-[#172229] px-12 py-3 cursor-pointer "
                    >
                      View Cart
                    </button>
                    <button className="bg-black py-3 px-8 cursor-pointer">
                      Proceed to checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Navbar;
