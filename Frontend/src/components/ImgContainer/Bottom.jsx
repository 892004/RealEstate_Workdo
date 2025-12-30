import React from 'react'
import BottomLeftSlider from './BottomLeftSlider'
import BottomRightPara from './BottomRightPara'

const Bottom = () => {
  return (
    <section className="bottom h-[50vh] w-full flex justify-center gap-10">
        <BottomLeftSlider />
        <BottomRightPara />
    </section>
  )
}

export default Bottom