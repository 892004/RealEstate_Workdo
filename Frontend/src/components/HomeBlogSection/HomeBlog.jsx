import React from 'react'
import Slider from "./Slider";
import blogData from "../../data/data";
import '../Hero/hero.css'

const HomeBlog = ({
  bg = "#1F282E",
  textColor = "#FFE7D9"
}) => {
  return (
    <section
      className="home-blog-main min-h-screen w-full p-20"
      style={{ backgroundColor: bg }}
    >
      {/* FIXED */}
      <p style={{ color: textColor }}>ALL BLOGS</p>

      <h1
        className="text-3xl font-bold mb-10"
        style={{ color: textColor }}
      >
        RealEstate
      </h1>

      <Slider data={blogData} />
    </section>
  );
};

export default HomeBlog;
