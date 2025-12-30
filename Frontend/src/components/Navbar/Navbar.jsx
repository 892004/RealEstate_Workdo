import React, { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import Logo from "../../public/Images/Logo.webp";
import ReactCountryFlag from "react-country-flag";
import { LuUserRound } from "react-icons/lu";
import { BsCart2 } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./Nav.css";
import menuProduct from "../../public/Images/menu-product.webp";
import bestsellerThumbnail from "../../public/Images/bestsellerThumbnail.webp";
import farmvillaThumbnail from "../../public/Images/farmvillaThumbnail.webp";
import propertyThumbnail from "../../public/Images/propertyThumnail.webp";
import royalvillaThumbnail from "../../public/Images/royalvillathumbnail.webp";

const Navbar = () => {
  // ---------------- LANGUAGE DROPDOWN ----------------
  const languages = [
    { code: "GB", label: "English" },
    { code: "DE", label: "Deutsch" },
    { code: "ES", label: "Español" },
    { code: "IN", label: "Hindi" },
  ];

  const [openLang, setOpenLang] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]);

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
                <img
                  src={bestsellerThumbnail}
                  alt=""
                  className="h-75 w-75 rounded-xl relative"
                />
                <span className="text-black absolute left-37 bottom-0 text-[16px] ">
                  Best Seller
                </span>

                <img
                  src={farmvillaThumbnail}
                  alt=""
                  className="h-75 w-75 rounded-xl relative"
                />
                <span className="text-black absolute left-137 bottom-0 text-[16px] ">
                  Farm Villa{" "}
                </span>
                <img
                  src={propertyThumbnail}
                  alt=""
                  className="h-75 w-75 rounded-xl"
                />
                <span className="text-black absolute right-137 bottom-0 text-[16px]">
                  Properties{" "}
                </span>
                <img
                  src={royalvillaThumbnail}
                  alt=""
                  className="h-75 w-75 rounded-xl"
                />
                <span className="text-black absolute right-40 bottom-0 text-[16px] ">
                  Royal House
                </span>
              </div>
            </div>
          </li>

          <li className="flex items-center">
            <button className="menu-btn">
              Pages <FaAngleDown />
            </button>
          </li>

          <li className="flex items-center">
            <button className="menu-btn">
              Blog <FaAngleDown />
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
            <li>Wishlist (0)</li>
          </div>
        </div>

        <button className="border border-[#FFE7D9] px-3 py-1 flex items-center rounded-full cursor-pointer text-[14px] text-[#FFE7D9]">
          My cart: Rs.0.00
          <span className="text-2xl m-1">
            <BsCart2 />
          </span>
        </button>
      </div>
    </section>
  );
};

export default Navbar;
