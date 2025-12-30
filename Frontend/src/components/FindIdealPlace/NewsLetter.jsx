import React from 'react'
import { MdArrowOutward } from "react-icons/md";

const NewsLetter = () => {
  return (
   <section className="NewsLetter absolute bg-[#1F282E] h-70 w-3xl flex flex-col p-10 gap-5 rounded-xl right-0 bottom-0">
        <h1 className='text-3xl text-[#FFE7D9] font-bold'>Subscribe newsletter and get -20% off</h1>
        <p className='text-[#FFE7D9] '>Control your home's lighting, temperature, and entertainment systems with a simple touch or <br/>voice command. Embrace the future of living as you experience the effortless integration of <br/> technology into every aspect of your daily life.</p>
        <input type="text" className='border border-white py-3 px-5 rounded-xl text-white opacity-100' placeholder='Enter email address..'  /> <span className='absolute bottom-11  right-10 rounded-r-xl bg-[#FFE7D9] px-3 py-3 flex items-center cursor-pointer text-[14px] font-medium'>Subscription<MdArrowOutward className='m-1'/></span>
   </section>
  )
}

export default NewsLetter