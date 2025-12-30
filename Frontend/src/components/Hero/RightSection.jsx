import React from 'react'
import { TbCurrentLocation } from "react-icons/tb";
import { HiArrowLongRight } from "react-icons/hi2";
import { HiArrowLongLeft } from "react-icons/hi2";



const RightSection = () => {
  return (
    <section className="right-sec h-full w-1/3 flex flex-col items-start justify-center pb-30 p-5 gap-5 ">
        <h4 className='flex items-center text-[16px] text-[#FFE7D9] font-semibold'><TbCurrentLocation className='m-2' />Utica,Pensylvania 57867</h4>

        <h1 className='ml-2 text-[30px] text-base/9 text-[#FFE7D9] font-bold'>A modern home in the comfort of <br/>San Francisco</h1>

        <p className='ml-2 text-[#FFE7D9] line-clamp-4 tracking-wide  '>Enjoy the breathtaking views of the city skyline, indulge in the finest amenities, and experience the unparalleled convenience of living within walking distance of trendy boutiques, gourmet dining, and cultural attractions.</p>

        <button className='ml-1 bg-[#FFE7D9] py-1.5 px-3 text-[14px] font-medium rounded-full flex items-center cursor-pointer '>Show full details <span className='m-1 text-2xl'><HiArrowLongRight />
</span></button>

<div className="slider border relative  border-white w-80 bg-white flex items-center ml-10 mt-10 opacity-80">
        <span className="left absolute -left-10 text-2xl  text-white border border-white px-2 py-1 rounded-full -m-2 cursor-pointer">
                <HiArrowLongLeft />
        </span>
        <span className="right absolute -right-10 text-2xl text-white  border border-white px-2 py-1 rounded-full -m-2 cursor-pointer">
                <HiArrowLongRight />
        </span>
</div>
    </section>  
  )
}

export default RightSection