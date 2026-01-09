import React from 'react'
import { HiArrowLongLeft } from "react-icons/hi2";
import { Link } from 'react-router-dom';


const Topcontect = ({data}) => {
    if(!data) return null
   console.log(data)
  return (
    <section className="top-content h-[50vh] w-full bg-[#172229] flex flex-col items-start justify-start text-white px-20 py-15 gap-2">
        <Link to = '/'>
            <h3 className='flex items-center justify-center text-sm font-semibold'><span className='m-1 text-xl border px-1 py-1 rounded-full'><HiArrowLongLeft /></span>Back to Home</h3>
        </Link>
        <h1 className='text-4xl font-semibold m-1'>{data.title}</h1>
        <p className='w-3xl text-[16px] font-medium m-1'>{data.desc}</p>

    </section>  
  )
}

export default Topcontect