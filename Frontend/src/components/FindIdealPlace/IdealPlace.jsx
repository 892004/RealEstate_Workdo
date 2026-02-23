import React from 'react'
import Heading from './Heading'
import Img from './Img'
import '../Hero/hero.css'
import NewsLetter from './NewsLetter'

const IdealPlace = () => {
  return (
    <section className="IdealPlace h-auto min-h-screen w-full bg-[#1F282E] pt-20 relative ">
        <Heading />
        <Img />  
               <NewsLetter />
    </section>
  )
}

export default IdealPlace