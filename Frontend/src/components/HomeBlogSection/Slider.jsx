import React, { useEffect, useState } from "react";
import Card from "./Card";
import { LiaLongArrowAltLeftSolid } from "react-icons/lia";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";


const CARD_WIDTH = 200;

const Slider = ({ data }) => {
  const slides = [
    data[data.length - 1],
    ...data,
    data[0],
  ];

  const [index, setIndex] = useState(1);
  const [transition, setTransition] = useState(true);

  const next = () => {
    setIndex((prev) => prev + 1);
  };

  const prev = () => {
    setIndex((prev) => prev - 1);
  };

  // 🔥 RESET LOGIC (MAGIC PART)
  useEffect(() => {
    if (index === slides.length - 1) {
      setTimeout(() => {
        setTransition(false);
        setIndex(1);
      }, 1000);
    }

    if (index === 0) {
      setTimeout(() => {
        setTransition(false);
        setIndex(slides.length - 2);
      }, 1000);
    }
  }, [index]);

  // enable transition back
  useEffect(() => {
    if (!transition) {
      requestAnimationFrame(() => {
        setTransition(true);
      });
    }
  }, [transition]);

  return (
    <section className="relative h-full w-full overflow-x-hidden mt-5">
      
      {/* TRACK */}
      <div
        className={`flex gap-10 ${
          transition ? "transition-transform duration-500" : ""
        }`}
        style={{
          transform: `translateX(-${index * CARD_WIDTH}px)`,
        }}
      >
        {slides.map((item, i) => (
          <Card key={i} item={item} />
        ))}
      </div>

      {/* LEFT */}


      <div className="buttons translate-y-10">
            <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-transparent border border-white text-white cursor-pointer px-4 py-1 rounded-full"
      >
       <LiaLongArrowAltLeftSolid />
      </button>

        <div className="line border border-white  w-[90%] bg-white opacity-50 absolute right-17">

        </div>
      {/* RIGHT */}
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-transparent  border border-white text-white cursor-pointer px-4 py-1 rounded-full"
      >
       <LiaLongArrowAltRightSolid />

      </button>

      </div>
    
    </section>
  );
};

export default Slider;
