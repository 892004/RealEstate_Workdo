import React from 'react'
import Left from './Left'
import Right from './Right'

const Bottom = () => {
  return (
    <section className="Bottom h-[50vh] w-full bg-[#172229] flex items-center justify-center gap-5">
         <Left />
         <Right />
    </section>
  )
}

export default Bottom