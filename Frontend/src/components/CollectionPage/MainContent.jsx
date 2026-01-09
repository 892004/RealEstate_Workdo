import { useState } from "react";
import FilterSection from "./FilterSection";
import ProductSection from "./ProductSection";

const MainContent = ({ products, title }) => {
  const [filters, setFilters] = useState({
    availability: [],
    size: [],
    productType: [],
    brand: [],
  });

  return (
    <div className="main-content flex min-h-screen w-full">
      <FilterSection filters={filters} setFilters={setFilters} />
      <ProductSection
        products={products}
        title={title}
        filters={filters}
        setFilters={setFilters}
      />
    </div>
  );
};

export default MainContent;
