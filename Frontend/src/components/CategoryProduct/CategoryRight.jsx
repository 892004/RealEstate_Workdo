import React from 'react'
import rightThumbnail from '../../public/Images/rightThumbnail.webp'

const CategoryRight = () => {
  return (
    <section className="category-right">
        <img src={rightThumbnail} className='box-border absolute top-0 right-10 h-120 -translate-y-55' />
        <p className='box-border absolute top-70 right-20 text-white font-medium  '>
Immerse yourself in a welcoming community with top-rated schools, parks, and <br/>recreational facilities just moments away. Create lasting memories as you enjoy the<br/>comfort, convenience, and tranquility that these modern family homes offer.</p>
    </section>
  )
}

export default CategoryRight