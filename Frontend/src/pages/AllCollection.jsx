import React from "react";
import Bestseller from "../public/Images/all-collection -1.webp";
import Farmvilla from "../public/Images/all-collection -2.webp";
import Properties from "../public/Images/all-collection -3.webp";
import RoyalHouse from "../public/Images/all-collection -4.webp";
import { Link } from "react-router-dom";
import Footer from "../components/Footer/Footer";
const AllCollection = () => {
  return (
    <section className="w-full flex flex-col items-center p-10">
      <h1 className="text-2xl font-bold text-[#172229] mb-10">Collections</h1>

      <div
        className="
          w-full
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          place-items-start
          gap-3
        "
      >
        {/* Bestseller */}
        <Link to="/collection/best-seller">
          <div className="flex flex-col items-center">
            <img
              src={Bestseller}
              alt="Bestseller"
              className="h-[280px] w-full object-cover  rounded-xl"
            />
            <h1 className="mt-4 text-lg font-bold text-[#172229]">
              Bestseller
            </h1>

            <button className="mt-2 px-4 py-1 bg-[#172229] text-white rounded-full text-sm cursor-pointer ">
              8 - Items
            </button>
          </div>
        </Link>

        {/* Farm Villa */}
        <Link to="/collection/farm-villa">
          <div className="flex flex-col items-center">
            <img
              src={Farmvilla}
              alt="Farm Villa"
              className="h-[280px] w-full object-cover rounded-xl"
            />
            <h1 className="mt-4 text-lg font-bold text-[#172229]">
              Farm Villa
            </h1>
            <button className="mt-2 px-4 py-1 bg-[#172229] text-white rounded-full text-sm cursor-pointer ">
              8 - Items
            </button>
          </div>
        </Link>

        {/* Properties */}
        <Link to="/collection/properties">
          <div className="flex flex-col items-center">
            <img
              src={Properties}
              alt="Properties"
              className="h-[280px] w-full object-cover  rounded-xl"
            />
            <h1 className="mt-4 text-lg font-bold text-[#172229]">
              Properties
            </h1>
            <button className="mt-2 px-4 py-1 bg-[#172229] text-white rounded-full text-sm cursor-pointer ">
              9 - Items
            </button>
          </div>
        </Link>

        {/* Royal House (under first image on desktop) */}
        <Link to="/collection/royal-house">
          <div className="flex flex-col items-center lg:col-start-1">
            <img
              src={RoyalHouse}
              alt="Royal House"
              className="h-[280px] w-full object-cover  rounded-xl"
            />
            <h1 className="mt-4 text-lg font-bold text-[#172229]">
              Royal House
            </h1>
            <button className="mt-2 px-4 py-1 bg-[#172229] text-white rounded-full text-sm cursor-pointer ">
              9 - Items
            </button>
          </div>
        </Link>
      </div>
    </section>
    );
  };

export default AllCollection;
