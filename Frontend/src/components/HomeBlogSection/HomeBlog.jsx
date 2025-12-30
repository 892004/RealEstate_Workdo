import React from 'react'
import Slider from './Slider'
import blogData from '../../data/data'

const HomeBlog = () => {
  return (
    <section className="Home-blog h-screen w-full bg-[#1F282E] relative p-20 mt-25">
        <h1 className='text-white text-3xl font-bold'>Homes speaking for themselves</h1>
        <Slider data={blogData}/>
    </section>
  )
}

export default HomeBlog