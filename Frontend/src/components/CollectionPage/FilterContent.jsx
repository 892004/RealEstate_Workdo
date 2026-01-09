import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

const FilterContent = ({filter , setFilters}) => {
  const [changegbtn, setchangegbtn] = useState({
    availability: false,
    size: false,
    producttype: false,
    brand: false,
  });

  const toggle = (key) => {
    setchangegbtn((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  return (
    <section className="filter-content py-10 px-3 flex flex-col gap-5">
      {/* Availability */}
      <h1 className="text-[16px] uppercase text-[#172229] font-medium flex items-center relative cursor-pointer">
        Availability
        <span
          className="text-[14px] absolute -right-20 "
          onClick={() => toggle("availability")}
        >
          {changegbtn.availability ? <FaMinus /> : <FaPlus />}
        </span>
      </h1>

      {changegbtn.availability &&(
    <div className="availability-dropdown relative -translate-y-3">
        <div className="count flex items-center justify-between">
            <h1 className="text-[14px] font-medium">O selected</h1>
            <button className="px-2 py-1 bg-gray-300 rounded-full font-semibold text-[12px] absolute -right-23 cursor-pointer">Reset</button>
        </div>
        <label className="text-[15px] font-medium flex items-center px-2 mt-2 gap-2">
        <input type="checkbox" className="scale-150"/> In stock
        <span className="absolute -right-20">(8)</span>
        </label>

         <label className="text-[15px] font-medium flex items-center px-2 gap-2">
        <input type="checkbox" className="scale-150"/>Out of stock
        <span className="absolute -right-20">(8)</span>
        </label>
    </div>  
      )}
      <hr className="w-87 opacity-10" />


      {/* Size */}
      <h1 className="text-[16px] uppercase text-[#172229] font-medium flex items-center relative cursor-pointer">
        Size
        <span
          className="text-[14px] absolute -right-20"
          onClick={() => toggle("size")}
        >
          {changegbtn.size ? <FaMinus /> : <FaPlus />}
        </span>
      </h1>
      {changegbtn.size &&(
         <div className="size-dropdown relative -translate-y-3">
        <div className="count flex items-center justify-between">
            <h1 className="text-[14px] font-medium">O selected</h1>
            <button className="px-2 py-1 bg-gray-300 rounded-full font-semibold text-[12px] absolute -right-23 cursor-pointer">Reset</button>
        </div>
        <label className="text-[15px] font-medium flex items-center px-2 mt-2 gap-2">
        <input type="checkbox" className="scale-150"/> 1100 sq fit
        <span className="absolute -right-20">(8)</span>
        </label>

         <label className="text-[15px] font-medium flex items-center px-2 gap-2">
        <input type="checkbox" className="scale-150"/>1200 sq fit
        <span className="absolute -right-20">(8)</span>
        </label>

         <label className="text-[15px] font-medium flex items-center px-2 gap-2">
        <input type="checkbox" className="scale-150"/>1300 sq fit
        <span className="absolute -right-20">(8)</span>
        </label>

         <label className="text-[15px] font-medium flex items-center px-2 gap-2">
        <input type="checkbox" className="scale-150"/>1400 sq fit
        <span className="absolute -right-20">(8)</span>
        </label>

         <label className="text-[15px] font-medium flex items-center px-2 gap-2">
        <input type="checkbox" className="scale-150"/>1500 sq fit
        <span className="absolute -right-20">(8)</span>
        </label>

         <label className="text-[15px] font-medium flex items-center px-2 gap-2">
        <input type="checkbox" className="scale-150"/>1600 sq fit
        <span className="absolute -right-20">(8)</span>
        </label>

         <label className="text-[15px] font-medium flex items-center px-2 gap-2">
        <input type="checkbox" className="scale-150"/>1700 sq fit
        <span className="absolute -right-20">(8)</span>
        </label>

         <label className="text-[15px] font-medium flex items-center px-2 gap-2">
        <input type="checkbox" className="scale-150"/>1800 sq fit
        <span className="absolute -right-20">(8)</span>
        </label>
    </div> 
      )}
      <hr className="w-87 opacity-10" />

      {/* ProductType */}
      <h1 className="text-[16px] uppercase text-[#172229] font-medium flex items-center relative cursor-pointer">
        Product type
        <span
          className="text-[14px] absolute -right-20"
          onClick={() => toggle("producttype")}
        >
          {changegbtn.producttype ? <FaMinus /> : <FaPlus />}
        </span>
      </h1>
       {changegbtn.producttype &&(
    <div className="producttype-dropdown relative -translate-y-2">
        <div className="count flex items-center justify-between">
            <h1 className="text-[14px] font-medium">O selected</h1>
            <button className="px-2 py-1 bg-gray-300 rounded-full font-semibold text-[12px] absolute -right-23 cursor-pointer">Reset</button>
        </div>
        <label className="text-[15px] font-medium flex items-center px-2 mt-2 gap-2">
        <input type="checkbox" className="scale-150"/> Home
        <span className="absolute -right-20">(8)</span>
        </label>
    </div>  
      )}


      <hr className="w-87 opacity-10" />

      {/* Brand */}
      <h1 className="text-[16px] uppercase text-[#172229] font-medium flex items-center relative cursor-pointer">
        Brand
        <span
          className="text-[14px] absolute -right-20"
          onClick={() => toggle("brand")}
        >
          {changegbtn.brand ? <FaMinus /> : <FaPlus />}
        </span>
      </h1>
       {changegbtn.brand &&(
    <div className="brand-dropdown relative -translate-y-3">
        <div className="count flex items-center justify-between">
            <h1 className="text-[14px] font-medium">O selected</h1>
            <button className="px-2 py-1 bg-gray-300 rounded-full font-semibold text-[12px] absolute -right-23 cursor-pointer">Reset</button>
        </div>
        <label className="text-[15px] font-medium flex items-center px-2 mt-2 gap-2">
        <input type="checkbox" className="scale-150"/> Real Estate
        <span className="absolute -right-20">(8)</span>
        </label>
    </div>  
      )}
    </section>
  );
};

export default FilterContent;
