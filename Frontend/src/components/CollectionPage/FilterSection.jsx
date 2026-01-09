import FilterContent from "./FilterContent";

const FilterSection = ({ filters, setFilters }) => {
  return (
    <section className="Filter relative h-full w-[30%] px-25 py-5">
      <h1 className="text-2xl font-semibold text-[#172229]">Filters</h1>
      <FilterContent filters={filters} setFilters={setFilters} />
    </section>
  );
};

export default FilterSection;
