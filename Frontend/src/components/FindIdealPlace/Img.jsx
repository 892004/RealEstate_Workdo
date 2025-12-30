import React from 'react'
import IdealPlaceImg from '../../public/Images/IdealPlace.webp'
import NewsLetter from './NewsLetter'

const Img = () => {
  return (
    <section className="img relative flex items-center justify-center object-cover ">
        <img src={IdealPlaceImg} alt=""/>
       <NewsLetter />
    </section>
  )
}

export default Img