import React from 'react'
import './leftsection.css'
import heroImg from "../../public/Images/heroimg.webp"
import { FaPlus } from "react-icons/fa6";
import { CgMouse } from "react-icons/cg";
import './hero.css'


const LeftSection = () => {
  return (
   <section className=" left-sec z-10 relative h-full w-2/3 flex items-center justify-center bg-[#172229] ">
    <img src={heroImg} alt="" className='relative block object-cover h-full w-full'/> 
        <div className="icons flex items-center justify-center top-50 left-50 z-10">
           <h1 className='p-3 rounded-full bg-[#FFE7D9] absolute top-30 right-80'> <FaPlus /></h1>
           <h2 className='p-3 rounded-full bg-[#FFE7D9] absolute top-70 left-100'> <FaPlus /></h2>
        </div>  

        <div className="content absolute translate-y-40 h-50 w-150 text-[#FFE7D9] z-10 left-20 top-40">
            <h1 className='relative p-4 text-base/5 flex items-center  text-[18px] tracking-tighter font-bold cursor-pointer'><span className='m-2 text-3xl border-2 border-[#FFE7D9] py-2 rounded-full '> <CgMouse /></span>Modern houses<br/> for the few</h1>   
            <p className='line-clamp-3 px-5 w-120 font-semibold '>Discover a haven of refined urban living in our luxurious loft residences. Nestled in the vibrant heart of the city, these contemporary homes offer a seamless blend of modern design and convenience.</p>
        </div>
   </section>
  )
}

export default LeftSection