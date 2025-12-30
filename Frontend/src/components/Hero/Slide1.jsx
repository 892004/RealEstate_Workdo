import React from 'react'
import LeftSection from './LeftSection'
import RightSection from './RightSection'

const Slide1 = () => {
  return (
    <div className='flex  w-full overflow-x-hidden'>
     <LeftSection />
     <RightSection />
    </div>
  )
}

export default Slide1