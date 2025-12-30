import React from 'react'
import modernhouse from '../../public/Images/modernhouses.webp'

const Left = () => {
  return (
    <section className="left h-[90vh] w-[60%] bg-red-500 rounded-r-xl">
        <img src={modernhouse} alt="" className='h-full object-cover rounded-r-xl'/>
    </section>
  )
}

export default Left