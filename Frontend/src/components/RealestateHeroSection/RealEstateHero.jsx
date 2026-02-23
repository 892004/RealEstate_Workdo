import React from "react";
import { useParams } from "react-router-dom";
import ImgContent from "./Img";
import Article from "./Article";
import blogData from "../../data/data";
import Navbar from "../Navbar/Navbar";
import '../Artical/artical.css'

const RealEstateHero = () => {
 const { slug } = useParams();

  console.log("URL slug:", slug);
  console.log("Available slugs:", blogData.map(b => b.slug));

  const blog = blogData.find(
    item => item.slug === slug
  );

  if (!blog) {
    return <h1>Blog not found</h1>;
  }


  return (
    <section className="Artical-hero w-full">
      {/* <Navbar /> */}
      <ImgContent data={blog} />
      <Article data={blog} />
    </section>
  );
};

export default RealEstateHero;
