import React, { useEffect, useState } from "react";
import Card from "./Card";
import { LiaLongArrowAltLeftSolid, LiaLongArrowAltRightSolid } from "react-icons/lia";


const isMobile = window.innerWidth < 768;


const Slider = ({ data }) => {

  const slides = [data[data.length - 1], ...data, data[0]];

  const [index, setIndex] = useState(1);
  const [transition, setTransition] = useState(true);

  // ✅ Responsive CARD WIDTH state
  const [cardWidth, setCardWidth] = useState(290);

  // ✅ Update card width on resize
  useEffect(() => {
    const updateWidth = () => {
      if (window.innerWidth < 768) {
        setCardWidth(300  ); // Mobile width
      } else {
        setCardWidth(290); // Desktop width
      }
    };

    updateWidth(); // run first time
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const next = () => setIndex((prev) => prev + 1);
  const prev = () => setIndex((prev) => prev - 1);

  // 🔥 Reset loop logic
  useEffect(() => {
    if (index === slides.length - 1) {
      setTimeout(() => {
        setTransition(false);
        setIndex(1);
      }, 500);
    }

    if (index === 0) {
      setTimeout(() => {
        setTransition(false);
        setIndex(slides.length - 2);
      }, 500);
    }
  }, [index]);

  useEffect(() => {
    if (!transition) {
      requestAnimationFrame(() => setTransition(true));
    }
  }, [transition]);

  return (
    <section className="slider-main relative w-full overflow-hidden mt-5">

    {/* TRACK */}
    <div
      className={`animation flex gap-10 ${
        transition ? "transition-transform duration-500" : ""
      }`}
      style={{
        transform:
          window.innerWidth < 768
            ? "translateX(0px)"
            : `translateX(-${index * cardWidth}px)`,
      }}
    >
      {slides.map((item, i) => (
        <Card key={i} item={item} />
      ))}
    </div>

    {/* Buttons only on Desktop */}



        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 border border-white text-white px-3 py-1 rounded-full bg-[#172229]"
          >
          <LiaLongArrowAltLeftSolid />
        </button>

        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 border border-white text-white px-3 py-1 rounded-full bg-[#172229]"
          >
          <LiaLongArrowAltRightSolid />
        </button>
     
  </section>
  );
};

export default Slider;
