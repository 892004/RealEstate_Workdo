import React from 'react'
import ImgContainer from '../../public/Images/imgWrapper.webp'
import TopLeftPara from './TopLeftPara'
import Bottom from './Bottom'
import '../Hero/hero.css'

const ImgWrapper = () => {
  return (
   <section className="img-container relative h-auto  bg-[#172229]">
    <TopLeftPara/>
    <img src={ImgContainer} className='main-img object-cover h-full w-full overflow-auto' /> 
    <Bottom />
   </section>
  )
}

export default ImgWrapper