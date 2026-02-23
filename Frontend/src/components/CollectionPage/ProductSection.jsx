import { useState } from "react";
import Card from "../CollectionPage/Cards";
import Productheading from "../CollectionPage/Productheading";

const ProductSection = ({ products, title , filters , setFilters}) => {
  const PRODUCTS_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(1);


  // 🔹 Filter products first
  const filteredProducts = products.filter(item => {
    // ---------------- AVAILABILITY FILTER ----------------
    if (filters?.availability && filters.availability.length > 0) {
      const hasInStock = item.variants.some(v => v.stock > 0);

      // only "in-stock" selected
      if (
        filters.availability.includes("in-stock") &&
        !filters.availability.includes("out-stock") &&
        !hasInStock
      ) {
        return false;
      }

      // only "out-stock" selected
      if (
        filters.availability.includes("out-stock") &&
        !filters.availability.includes("in-stock") &&
        hasInStock
      ) {
        return false;
      }
    }

    // ---------------- SIZE FILTER ----------------
    if (filters?.sizes && filters.sizes.length > 0) {
      const hasMatchingSize = item.variants.some(v => 
        filters.sizes.includes(v.sqft.toString())
      );
      if (!hasMatchingSize) {
        return false;
      }
    }

    // ---------------- PRODUCT TYPE FILTER ----------------
    if (filters?.productTypes && filters.productTypes.length > 0) {
      const hasMatchingType = filters.productTypes.some(type => 
        item.product.title.toLowerCase().includes(type.toLowerCase()) ||
        item.product.category?.toLowerCase().includes(type.toLowerCase())
      );
      if (!hasMatchingType) {
        return false;
      }
    }

    // ---------------- BRAND FILTER ----------------
    if (filters?.brands && filters.brands.length > 0) {
      const hasMatchingBrand = filters.brands.some(brand => 
        item.product.title.toLowerCase().includes(brand.toLowerCase()) ||
        item.product.brand?.toLowerCase().includes(brand.toLowerCase())
      );
      if (!hasMatchingBrand) {
        return false;
      }
    }

    return true;
  });

  // 🔹 Pagination calculation
  const indexOfLast = currentPage * PRODUCTS_PER_PAGE;
  const indexOfFirst = indexOfLast - PRODUCTS_PER_PAGE;
  const currentProducts = [...filteredProducts]
    .reverse()
    .slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const changePage = page => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  return (
  <section className="product-section w-[70%] p-6 flex flex-col">
  <Productheading title={title}  filters={filters} setFilters={setFilters}/>


  {/* 🔥 FIXED HEIGHT GRID */}
  <div className="cards grid grid-cols-3  gap-6 mt-6 min-h-[900px]">
    {currentProducts.map(item => (
      <Card key={item.product.id} item={item} />
    ))}
  </div>

  {/* Pagination */}
  {totalPages > 1 && (
    <div className="flex justify-center gap-2 mt-10">
      {Array.from({ length: totalPages }).map((_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            onClick={() => changePage(page)}
            className={`px-4 py-2 border rounded ${
              currentPage === page
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
          >
            {page}
          </button>
        );
      })}
    </div>
  )}
</section>

  );
};

export default ProductSection;
