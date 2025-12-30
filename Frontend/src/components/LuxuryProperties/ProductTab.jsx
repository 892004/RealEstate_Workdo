import React, { useState } from "react";
import ProductNavigateBtn from "./ProductNavigateBtn";
import ProductsSlider from "./ProductsSlider";

const ProductTab = () => {
  const [collection, setCollection] = useState("best-seller");

  return (
    <section className="Product-tab h-screen w-screen bg-[#172229]">
      <h1 className="text-[#FFE9DA] text-4xl font-bold px-15 -translate-y-15">
        Luxurious properties
      </h1>

      <ProductNavigateBtn
        active={collection}
        setCollection={setCollection}
      />

      <hr className="text-white ml-15 w-7xl -translate-y-12" />

      <ProductsSlider collection={collection} />
    </section>
  );
};

export default ProductTab;
