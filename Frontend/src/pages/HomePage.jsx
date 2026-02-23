import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Hero from '../components/Hero/Hero'
import CategoryProduct from '../components/CategoryProduct/CategoryProduct'
import HomePlace from '../components/FindYourHomePlace/HomePlace'
import ImgWrapper from '../components/ImgContainer/ImgWrapper'
import ProductTab from '../components/LuxuryProperties/ProductTab'
import ModernHouse from '../components/ModernHouseProduct/ModernHouse'
import IdealPlace from '../components/FindIdealPlace/IdealPlace'
import HomeBlog from '../components/HomeBlogSection/HomeBlog'
import Footer from '../components/Footer/Footer'

const HomePage = (props) => {
  console.log()
  return (
    <section className='Homepage h-screen overflow-x-hidden'>
        <Hero />
        <CategoryProduct />
        <HomePlace />
        <ImgWrapper />
        <ProductTab />
        <ModernHouse />
        <IdealPlace />
        <HomeBlog />
        <Footer />

    </section>
  )
}

export default HomePage