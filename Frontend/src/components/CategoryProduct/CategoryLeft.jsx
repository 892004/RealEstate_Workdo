import React, { useState, useEffect, useRef } from "react";
import royalhousethumbnail from "../../public/Images/royalhouseThumbnail.avif";
import propertiesthumbnail from "../../public/Images/propertiesThumbnail.avif";
import { HiArrowLongRight } from "react-icons/hi2";
const CategoryLeft = () => {
  const items = [
    { title: "Royal House", img: royalhousethumbnail },
    { title: "Properties", img: propertiesthumbnail },
    { title: "Farm Villa", img: royalhousethumbnail },
    { title: "Best Seller", img: propertiesthumbnail },
  ];

  // Duplicate items for infinite effect
  const slides = [...items, ...items]; 

  const [index, setIndex] = useState(0);
  const trackRef = useRef(null);

  const next = () => {
    setIndex((prev) => prev + 1);
  };

  const prev = () => {
    if (index === 0) return;
    setIndex((prev) => prev - 1);
  };

  // Smooth infinite reset
  useEffect(() => {
    const track = trackRef.current;

    // When index reaches end of first set → instantly jump back
    if (index === items.length) {
      setTimeout(() => {
        track.style.transition = "none";
        setIndex(0);
        setTimeout(() => {
          track.style.transition = "transform 0.5s ease";
        }, 20);
      }, 500);
    }
  }, [index]);

  return (
    <section className="category-left h-full w-full relative py-10 flex flex-col items-center bg-[#b3876c] ">
      {/* Slider Window */}
      <div className="slide-wrapper overflow-hidden h-full w-1/2 -translate-y-30 box-border -translate-x-70">
        <div
          ref={trackRef}
          className="sliding flex transition-transform duration-500 ease "
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((elem, idx) => (
            <div key={idx} className="images min-w-[50%] min-h-full relative rounded-xl">
              <img
                src={elem.img}
                className="w-80 h-70 object-cover rounded-xl"
              />

              <h3 className="text-white absolute text-2xl mt-3 font-semibold flex items-center">
                {elem.title}  <span className=" px-25 font-bold text-2xl cursor-pointer"><span></span><HiArrowLongRight />
</span>
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="buttons flex items-center justify-center absolute top-70 left-30 gap-120 ">
        <div className="line h-0.5 w-118 opacity-50 bg-white absolute top-50 -translate-y-47"> </div>
        <button
          onClick={prev}
          className="btn-1 px-3 relative flex items-center justify-center text-white rounded-full border border-white text-xl cursor-pointer  "
        >
          ←
        </button>

        <button
          onClick={next}
          className="btn-2 px-3 text-white  rounded-full border border-white text-xl cursor-pointer "
        >
          →
        </button>
      </div>

    </section>
  );
};

export default CategoryLeft;
