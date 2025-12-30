import React from 'react'
import ImgContainer from '../../public/Images/imgWrapper.webp'
import TopLeftPara from './TopLeftPara'
import Bottom from './Bottom'

const ImgWrapper = () => {
  return (
   <section className="img-container relative h-auto  bg-[#172229]">
    <TopLeftPara/>
    <img src={ImgContainer} className='object-cover h-full w-full overflow-auto' /> 
    <Bottom />
   </section>
  )
}

export default ImgWrapper