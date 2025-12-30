import React from "react";
import blogbg from "../../public/Images/RealEstateblog-bg.webp";
import Content from "./Content";

const Img = ({ data }) => {
  return (
    <section className="img-content relative h-[70vh] w-full">
      <img src={blogbg} alt="" className="h-full w-full object-cover" />

      <Content
        title={data.title}
        para={data.para}
      />
    </section>
  );
};

export default Img;
