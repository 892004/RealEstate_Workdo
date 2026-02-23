import React from 'react'
import Para from './Para'
import '../Hero/hero.css'

const Heading = () => {
  return (
   <section className="heading px-5 flex flex-col md:flex-row md:justify-between">
        <h1 className='text-white text-3xl font-extrabold'>Find your ideal <br/>space</h1>
        <Para />
    </section>
  )
}

export default Heading