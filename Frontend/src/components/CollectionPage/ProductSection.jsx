import { useState } from "react";
import Card from "../CollectionPage/Cards";
import Productheading from "../CollectionPage/Productheading";

const ProductSection = ({ products, title , filters , setFilters}) => {
  const PRODUCTS_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(1);

  // 🔹 Pagination calculation
  const indexOfLast = currentPage * PRODUCTS_PER_PAGE;
  const indexOfFirst = indexOfLast - PRODUCTS_PER_PAGE;
  const currentProducts = [...products]
    .reverse()
    .slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const changePage = page => {
  setCurrentPage(page);
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};


const filteredProducts = products.filter(item => {

  // ---------------- AVAILABILITY FILTER ----------------
  if (filters.availability.length > 0) {
    const hasInStock = item.variants.some(v => v.stock > 0);

    // only "in stock" selected
    if (
      filters.availability.includes("in") &&
      !filters.availability.includes("out") &&
      !hasInStock
    ) {
      return false;
    }

    // only "out of stock" selected
    if (
      filters.availability.includes("out") &&
      !filters.availability.includes("in") &&
      hasInStock
    ) {
      return false;
    }
  }

  return true;
});


  return (
  <section className="w-[70%] p-6 flex flex-col">
  <Productheading title={title} />


  {/* 🔥 FIXED HEIGHT GRID */}
  <div className="grid grid-cols-3  gap-6 mt-6 min-h-[900px]">
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
