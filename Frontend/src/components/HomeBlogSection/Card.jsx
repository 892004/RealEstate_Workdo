import React from 'react';
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import { Link } from 'react-router-dom';

const Card = ({ item }) => {

   
  return (
   <section className="card-main h-auto min-h-[60vh] min-w-[20%] bg-[#172229] relative border border-white rounded-xl flex flex-col gap-5 p-1"  >

      <img
        src={item.img}
        alt={item.title}
        className="h-[200px] w-full rounded-xl object-cover"
      />

      <span className="bg-[#FFE7D9] px-3 py-2 rounded-full absolute top-2 left-2">
        {item.tag}
      </span>

      <p className="text-[#FFE7D9] ml-3">
        25 May 2023 | Workdo
      </p>

      <p className="text-[#FFE7D9] truncate text-[20px] font-bold ml-3">
        {item.title}
      </p>

      <p className="line-clamp-4 text-[#FFE7D9] ml-3 font-medium">
        {item.para}
      </p>

      <Link to ={`/blog/${item.slug}`}className=" py-2 bg-[#FFE7D9] rounded-full w-40 text-left px-5 ml-2 text-[14px] font-medium flex flex-row items-center cursor-pointer ">
        {item.button}
        {/* Show details  */}
        <span className="ml-3 text-xl">
          <LiaLongArrowAltRightSolid />
        </span>
      </Link>
    </section>
  );
};


export default Card;
