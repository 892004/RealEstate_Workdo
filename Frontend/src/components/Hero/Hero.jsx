import React from 'react'
import './hero.css'
import LeftSection from './LeftSection'
import RightSection from './RightSection'
import Slide1 from './Slide1'
import Slide2 from './Slide2'
const Hero = (props) => {
  console.log(props)
  return (
    <section className="hero h-[86vh] w-full flex bg-[#172229] overflow-x-hidden ">
       <Slide1 />
    </section>
  )
}

export default Hero