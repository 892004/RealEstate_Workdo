import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

const FilterContent = ({ filter, setFilters }) => {
  const [changegbtn, setchangegbtn] = useState({
    availability: false,
    size: false,
    producttype: false,
    brand: false,
  });

  // Filter states
  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedProductTypes, setSelectedProductTypes] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const toggle = (key) => {
    setchangegbtn((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Handle checkbox changes
  const handleAvailabilityChange = (value) => {
    const updated = selectedAvailability.includes(value)
      ? selectedAvailability.filter(item => item !== value)
      : [...selectedAvailability, value];
    
    setSelectedAvailability(updated);
    setFilters(prev => ({ ...prev, availability: updated }));
  };

  const handleSizeChange = (value) => {
    const updated = selectedSizes.includes(value)
      ? selectedSizes.filter(item => item !== value)
      : [...selectedSizes, value];
    
    setSelectedSizes(updated);
    setFilters(prev => ({ ...prev, sizes: updated }));
  };

  const handleProductTypeChange = (value) => {
    const updated = selectedProductTypes.includes(value)
      ? selectedProductTypes.filter(item => item !== value)
      : [...selectedProductTypes, value];
    
    setSelectedProductTypes(updated);
    setFilters(prev => ({ ...prev, productTypes: updated }));
  };

  const handleBrandChange = (value) => {
    const updated = selectedBrands.includes(value)
      ? selectedBrands.filter(item => item !== value)
      : [...selectedBrands, value];
    
    setSelectedBrands(updated);
    setFilters(prev => ({ ...prev, brands: updated }));
  };

  // Reset functions
  const resetAvailability = () => {
    setSelectedAvailability([]);
    setFilters(prev => ({ ...prev, availability: [] }));
  };

  const resetSizes = () => {
    setSelectedSizes([]);
    setFilters(prev => ({ ...prev, sizes: [] }));
  };

  const resetProductTypes = () => {
    setSelectedProductTypes([]);
    setFilters(prev => ({ ...prev, productTypes: [] }));
  };

  const resetBrands = () => {
    setSelectedBrands([]);
    setFilters(prev => ({ ...prev, brands: [] }));
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
            <h1 className="text-[14px] font-medium">{selectedAvailability.length} selected</h1>
            <button 
              onClick={resetAvailability}
              className="px-2 py-1 bg-gray-300 rounded-full font-semibold text-[12px] absolute -right-23 cursor-pointer"
            >
              Reset
            </button>
        </div>
        <label className="text-[15px] font-medium flex items-center px-2 mt-2 gap-2">
          <input 
            type="checkbox" 
            className="scale-150"
            checked={selectedAvailability.includes("in-stock")}
            onChange={() => handleAvailabilityChange("in-stock")}
          /> In stock
          <span className="absolute -right-20">(8)</span>
        </label>

         <label className="text-[15px] font-medium flex items-center px-2 gap-2">
          <input 
            type="checkbox" 
            className="scale-150"
            checked={selectedAvailability.includes("out-stock")}
            onChange={() => handleAvailabilityChange("out-stock")}
          /> Out of stock
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
            <h1 className="text-[14px] font-medium">{selectedSizes.length} selected</h1>
            <button 
              onClick={resetSizes}
              className="px-2 py-1 bg-gray-300 rounded-full font-semibold text-[12px] absolute -right-23 cursor-pointer"
            >
              Reset
            </button>
        </div>
        <label className="text-[15px] font-medium flex items-center px-2 mt-2 gap-2">
          <input 
            type="checkbox" 
            className="scale-150"
            checked={selectedSizes.includes("1100")}
            onChange={() => handleSizeChange("1100")}
          /> 1100 sq ft
          <span className="absolute -right-20">(8)</span>
        </label>

        <label className="text-[15px] font-medium flex items-center px-2 gap-2">
          <input 
            type="checkbox" 
            className="scale-150"
            checked={selectedSizes.includes("1200")}
            onChange={() => handleSizeChange("1200")}
          /> 1200 sq ft
          <span className="absolute -right-20">(8)</span>
        </label>

        <label className="text-[15px] font-medium flex items-center px-2 gap-2">
          <input 
            type="checkbox" 
            className="scale-150"
            checked={selectedSizes.includes("1300")}
            onChange={() => handleSizeChange("1300")}
          /> 1300 sq ft
          <span className="absolute -right-20">(8)</span>
        </label>

        <label className="text-[15px] font-medium flex items-center px-2 gap-2">
          <input 
            type="checkbox" 
            className="scale-150"
            checked={selectedSizes.includes("1400")}
            onChange={() => handleSizeChange("1400")}
          /> 1400 sq ft
          <span className="absolute -right-20">(8)</span>
        </label>

        <label className="text-[15px] font-medium flex items-center px-2 gap-2">
          <input 
            type="checkbox" 
            className="scale-150"
            checked={selectedSizes.includes("1500")}
            onChange={() => handleSizeChange("1500")}
          /> 1500 sq ft
          <span className="absolute -right-20">(8)</span>
        </label>

        <label className="text-[15px] font-medium flex items-center px-2 gap-2">
          <input 
            type="checkbox" 
            className="scale-150"
            checked={selectedSizes.includes("1600")}
            onChange={() => handleSizeChange("1600")}
          /> 1600 sq ft
          <span className="absolute -right-20">(8)</span>
        </label>

        <label className="text-[15px] font-medium flex items-center px-2 gap-2">
          <input 
            type="checkbox" 
            className="scale-150"
            checked={selectedSizes.includes("1700")}
            onChange={() => handleSizeChange("1700")}
          /> 1700 sq ft
          <span className="absolute -right-20">(8)</span>
        </label>

        <label className="text-[15px] font-medium flex items-center px-2 gap-2">
          <input 
            type="checkbox" 
            className="scale-150"
            checked={selectedSizes.includes("1800")}
            onChange={() => handleSizeChange("1800")}
          /> 1800 sq ft
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
            <h1 className="text-[14px] font-medium">{selectedProductTypes.length} selected</h1>
            <button 
              onClick={resetProductTypes}
              className="px-2 py-1 bg-gray-300 rounded-full font-semibold text-[12px] absolute -right-23 cursor-pointer"
            >
              Reset
            </button>
        </div>
        <label className="text-[15px] font-medium flex items-center px-2 mt-2 gap-2">
          <input 
            type="checkbox" 
            className="scale-150"
            checked={selectedProductTypes.includes("home")}
            onChange={() => handleProductTypeChange("home")}
          /> Home
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
            <h1 className="text-[14px] font-medium">{selectedBrands.length} selected</h1>
            <button 
              onClick={resetBrands}
              className="px-2 py-1 bg-gray-300 rounded-full font-semibold text-[12px] absolute -right-23 cursor-pointer"
            >
              Reset
            </button>
        </div>
        <label className="text-[15px] font-medium flex items-center px-2 mt-2 gap-2">
          <input 
            type="checkbox" 
            className="scale-150"
            checked={selectedBrands.includes("real-estate")}
            onChange={() => handleBrandChange("real-estate")}
          /> Real Estate
          <span className="absolute -right-20">(8)</span>
        </label>
    </div>  
      )}
    </section>
  );
};

export default FilterContent;
