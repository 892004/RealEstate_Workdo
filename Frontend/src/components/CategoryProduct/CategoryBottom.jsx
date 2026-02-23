import React from 'react'
import CategoryLeft from './CategoryLeft'
import CategoryRight from './CategoryRight'

const CategoryBottom = () => {
  return (
    <section className="category-bottom relative h-full w-full flex  bg-[#AC7E66]">
        <CategoryLeft />
        <CategoryRight />
    </section>
  )
}

export default CategoryBottom