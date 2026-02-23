const tabs = [
  { label: "BestSeller", value: "best-seller" },
  { label: "Farm Villa", value: "farm-villa" },
  { label: "Luxury Properties", value: "properties" },
  { label: "Royal House" , value:"royal-house"}
];

const ProductNavigateBtn = ({ active, setCollection }) => {
  return (
    <section className="navigate-btn px-15 py-5 flex flex-wrap  gap-5 -translate-y-15">
      {tabs.map(tab => (
        <button
          key={tab.value}
          onClick={() => setCollection(tab.value)}
          className={`px-4 py-2 rounded-xl border cursor-pointer
            ${
              active === tab.value
                ? "bg-[#FFE9DA] text-black"
                : "text-white border-white"
            }`}
        >
          {tab.label}
        </button>
      ))}
    </section>
  );
};

export default ProductNavigateBtn;
