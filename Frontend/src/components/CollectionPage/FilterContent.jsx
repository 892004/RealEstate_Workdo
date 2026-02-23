import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

const FilterContent = ({ filters, setFilters }) => {
  const [openSection, setOpenSection] = useState({
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

  // Toggle section open/close
  const toggle = (key) => {
    setOpenSection((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Checkbox Handlers
  const updateFilter = (key, value, selected, setSelected) => {
    const updated = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value];

    setSelected(updated);
    setFilters((prev) => ({ ...prev, [key]: updated }));
  };

  // Reset Handler
  const resetFilter = (key, setSelected) => {
    setSelected([]);
    setFilters((prev) => ({ ...prev, [key]: [] }));
  };

  return (
    <section className="filter-content text-black py-6 px-4 flex flex-col gap-6">

      {/* ================= Availability ================= */}
      <div>
        {/* Heading */}
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggle("availability")}
        >
          <h1 className="text-[16px] uppercase font-semibold text-[#172229]">
            Availability
          </h1>

          <span>
            {openSection.availability ? <FaMinus /> : <FaPlus />}
          </span>
        </div>

        {/* Dropdown */}
        {openSection.availability && (
          <div className="mt-3 flex flex-col gap-2">

            {/* Reset Row */}
            <div className="flex justify-between items-center text-sm">
              <p>{selectedAvailability.length} selected</p>

              <button
                onClick={() => resetFilter("availability", setSelectedAvailability)}
                className="px-2 py-1 bg-gray-200 rounded text-xs"
              >
                Reset
              </button>
            </div>

            {/* Checkbox */}
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedAvailability.includes("in-stock")}
                onChange={() =>
                  updateFilter(
                    "availability",
                    "in-stock",
                    selectedAvailability,
                    setSelectedAvailability
                  )
                }
              />
              In Stock <span className="ml-auto">(8)</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedAvailability.includes("out-stock")}
                onChange={() =>
                  updateFilter(
                    "availability",
                    "out-stock",
                    selectedAvailability,
                    setSelectedAvailability
                  )
                }
              />
              Out of Stock <span className="ml-auto">(8)</span>
            </label>
          </div>
        )}
      </div>

      <hr />

      {/* ================= Size ================= */}
      <div>
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggle("size")}
        >
          <h1 className="text-[16px] uppercase font-semibold text-[#172229]">
            Size
          </h1>

          <span>{openSection.size ? <FaMinus /> : <FaPlus />}</span>
        </div>

        {openSection.size && (
          <div className="mt-3 flex flex-col gap-2">

            <div className="flex justify-between items-center text-sm">
              <p>{selectedSizes.length} selected</p>

              <button
                onClick={() => resetFilter("sizes", setSelectedSizes)}
                className="px-2 py-1 bg-gray-200 rounded text-xs"
              >
                Reset
              </button>
            </div>

            {["1100", "1200", "1300", "1400","1500","1600" ,"1700" ,"1800" ].map((size) => (
              <label key={size} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedSizes.includes(size)}
                  onChange={() =>
                    updateFilter("sizes", size, selectedSizes, setSelectedSizes)
                  }
                />
                {size} sq ft <span className="ml-auto">(8)</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <hr />

      {/* ================= Product Type ================= */}
      <div>
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggle("producttype")}
        >
          <h1 className="text-[16px] uppercase font-semibold text-[#172229]">
            Product Type
          </h1>

          <span>
            {openSection.producttype ? <FaMinus /> : <FaPlus />}
          </span>
        </div>

        {openSection.producttype && (
          <div className="mt-3 flex flex-col gap-2">

            <div className="flex justify-between items-center text-sm">
              <p>{selectedProductTypes.length} selected</p>

              <button
                onClick={() =>
                  resetFilter("productTypes", setSelectedProductTypes)
                }
                className="px-2 py-1 bg-gray-200 rounded text-xs"
              >
                Reset
              </button>
            </div>

            {["Home"].map((type) => (
              <label key={type} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedProductTypes.includes(type)}
                  onChange={() =>
                    updateFilter(
                      "productTypes",
                      type,
                      selectedProductTypes,
                      setSelectedProductTypes
                    )
                  }
                />
                {type} <span className="ml-auto">(8)</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <hr />

      {/* ================= Brand ================= */}
      <div>
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggle("brand")}
        >
          <h1 className="text-[16px] uppercase font-semibold text-[#172229]">
            Brand
          </h1>

          <span>{openSection.brand ? <FaMinus /> : <FaPlus />}</span>
        </div>

        {openSection.brand && (
          <div className="mt-3 flex flex-col gap-2">

            <div className="flex justify-between items-center text-sm">
              <p>{selectedBrands.length} selected</p>

              <button
                onClick={() => resetFilter("brands", setSelectedBrands)}
                className="px-2 py-1 bg-gray-200 rounded text-xs"
              >
                Reset
              </button>
            </div>

            {["Real Estate"].map((brand) => (
              <label key={brand} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() =>
                    updateFilter(
                      "brands",
                      brand,
                      selectedBrands,
                      setSelectedBrands
                    )
                  }
                />
                {brand} <span className="ml-auto">(8)</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FilterContent;
