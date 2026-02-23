import React from 'react'
import LeftSection from './LeftSection'
import RightSection from './RightSection'
import './hero.css'

const Slide1 = () => {
  return (
    <div className='slide-1 flex h-full w-full '>
     <LeftSection />
     <RightSection />
    </div>
  )
}

export default Slide1