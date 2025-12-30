import React from 'react'
import { LiaLongArrowAltLeftSolid } from "react-icons/lia";
import { Link } from 'react-router-dom';


const Content = (props , idx) => {
  console.log(props)
  return (
    <section className="content absolute flex flex-col gap-8 top-0 text-white px-27 py-15">
        <Link to ='/' className='flex items-center font-medium text-sm px-3 '> <span  className='m-2 p-1 text-xl border border-white rounded-full text-white '><LiaLongArrowAltLeftSolid /></span>Back to Home</Link>

        <div className="buttons flex flex-row text-sm gap-10  px-3">
            <p className='bg-[#172229] px-3 py-2 rounded-full'>Featured</p>
            <p className='py-2'> <span className='font-bold'>Category:</span> realestate</p>
            <p className='py-2'> <span className='font-bold'>date:</span> May 25,2023</p>
        </div>

        <p className='px-3 text-[33px] text-base/10 font-bold'>{props.title}</p>

        <p className='px-3 w-150 line-clamp-4'>{props.para}
</p>
    </section>       
  )
}

export default Content