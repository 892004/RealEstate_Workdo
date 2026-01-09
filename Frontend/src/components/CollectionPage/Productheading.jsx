import React from 'react'
import { Link } from 'react-router-dom'

const Productheading = ({title}) => {
  return (
    <div className="heading relative flex justify-center gap-170 ">
      <Link to = '/' className='absolute left-0'><h1>Home /</h1></Link>
      <span className='cursor-pointer translate-x-10'>{title}</span>       
        <div className="select">
          <span className="text-[14px] font-bold text-[#172229] m-2">Sort by:</span>
          <select name="" id="" className="border py-2 px-2 rounded-xl cursor-pointer outline-0 text-[14px]">
            <option value="Featured">Featured</option>
            <option value="BestSelling">Best selling</option>
            <option value="Alphabetically , A to Z">
              Alphabetically , A to Z
            </option>
            <option value="Alphabetically , Z to A">
              Alphabetically , Z to A
            </option>
            <option value="Price, Low to High">Price , Low to High</option>
            <option value="Price, High to Low">Price, High to Low</option>
            <option value="Date,Old to New">Date, Old to New</option>
            <option value="Date, New to Old">Date,  New to Old</option>
          </select>
        </div>
      </div>
  )
}

export default Productheading