import React from "react";
import HomeBlog from "../components/HomeBlogSection/HomeBlog";
import { Link } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import Footer from "../components/Footer/Footer";

const Blog = () => {
  return (
    <section className="blog h-screen w-full">

       <div className="heading h-[40vh] w-full bg-[#172229] px-30 flex flex-col items-start py-10 justify-start gap-5 text-white">
        <Link to="/">
          <p className="flex items-center justify-center text-[14px] font-medium">
            <span className="text-2xl border p-1 rounded-full m-1">
              <IoIosArrowRoundBack />
            </span>{" "}
            Back to Home
          </p>
        </Link>

        <h2 className="text-3xl font-bold px-2">realestate</h2>

        <p className="px-2 -translate-y-2">
         Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum<br /> has been the industry's standard dummy text ever since the 1500s, when an unknown.
        </p>
      </div>
      <HomeBlog
        bg="#ffffff"
        textColor="#172229"
      />
      <Footer />
    </section>
  );
};

export default Blog;
