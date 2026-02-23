import React, { useState , useEffect} from "react";
import { Link } from "react-router-dom";
import "../CollectionPage/collectionpage.css";
import { PiSlidersHorizontalLight } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import FilterContent from "./FilterContent";

const Productheading = ({ title , filters , setFilters}) => {
  const [openFilter, setopenFilter] = useState(false);
  const [closing , setclosing] =  useState(false);

  const handleClose = () =>{
    setclosing(true)

    setTimeout(()=>{
      setopenFilter(false)
      setclosing(false)
    },500)
  }

  
  // ✅ Auto Close slider when screen becomes Desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setopenFilter(false); // close slider
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);



  return (
    <div className="heading relative flex justify-center gap-170 ">
      <Link to="/" className="absolute left-0">
        <h1>Home /</h1>
      </Link>
      <p className="cursor-pointer translate-x-10">{title}</p>

      <div className="select">
        <div
          className="slide-icon invisible cursor-pointer "
          onClick={() => setopenFilter(true)}
        >
          <span>
            <PiSlidersHorizontalLight />
          </span>
        </div>
        {openFilter && (
          <div className={`left-slider fixed top-0 left-0 h-full w-80 bg-white shadow-lg p-5 z-9999 ${closing ? "slide-out" : "slide-in"}`}>
            {/* Close Button */}
            <button
              className="bg-[#172229] text-white px-3 py-3 absolute top-0 left-0 flex items-center "
             onClick={handleClose} 
            >
              <RxCross2 className="text-2xl"/>
            </button>
        

<div className="pt-14 h-full overflow-y-auto text-black w-full">
  <FilterContent filters={filters} setFilters={setFilters} />
</div>



          </div>
        )}

        <div className="featured flex items-center justify-center">
          <span className="text-[14px] font-bold text-[#172229] m-2">
            Sort by:
          </span>
          <select
            name=""
            id=""
            className="border py-2 px-2 rounded-xl cursor-pointer outline-0 text-[14px]"
          >
            <option value="Featured">Featured</option>
            <option value="BestSelling">Best selling</option>
            <option value="Alphabetically , A to Z">
              Alphabetically , A to Z
            </option>
            <option value="Alphabetically , Z to A">
              Alphabetically , Z to A
            </option>
            <option value="Price, Low to High">Price , Low to High</option>
            <option value="Price, High to Low">Price, High to Low</option>
            <option value="Date,Old to New">Date, Old to New</option>
            <option value="Date, New to Old">Date, New to Old</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Productheading;
