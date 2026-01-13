import React from 'react'
import Slider from "./Slider";
import blogData from "../../data/data";

const HomeBlog = ({
  bg = "#1F282E",        // background color
  textColor = "#172229" // text color
}) => {
  return (
    <section
      className="h-screen w-full p-20"
      style={{ backgroundColor: bg }}
    >
      <h1
        className="text-3xl font-bold mb-10"
        style={{ color: textColor }}
      >
        Homes speaking for themselves
      </h1>

      <Slider data={blogData} />
    </section>
  );
};

export default HomeBlog;
