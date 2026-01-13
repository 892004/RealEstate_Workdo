import React from 'react'
import {Link} from 'react-router-dom'
import { IoIosArrowRoundBack } from "react-icons/io";
import About1 from '../public/Images/About-1.webp'
import About2 from '../public/Images/About-2.webp'
import Footer from '../components/Footer/Footer'
import { FaTruck, FaTags, FaHeadset } from 'react-icons/fa'

const Aboutus = () => {
  return (
    <>
    <section className="About-us h-full w-full text-white">
        <div className="heading h-[40vh] w-full bg-[#172229] px-30 flex flex-col items-start py-15 justify-start gap-5">
            <Link to = '/'>
                <p className='flex items-center justify-center text-[14px] font-medium'><span className='text-2xl border p-1 rounded-full m-1'><IoIosArrowRoundBack /></span> Back to Home</p>
            </Link>

            <h2 className='text-3xl font-bold px-2'>About us</h2>
            <p className='px-2 -translate-y-2'>At AboutUs, we are a dynamic and innovative company committed to providing <br />comprehensive information and valuable insights on a wide range of topics.</p>
        </div>

        {/* Be clear and concise section */}
        <div className="clear-concise bg-white py-20 px-30">
            <h2 className='text-4xl font-bold text-black mb-12'>Be clear and concise</h2>
            <div className="flex gap-12">
                <div className="flex-1">
                    <p className='text-gray-700 leading-relaxed'>
                        At Modern Real Estate, we are dedicated to redefining the real estate experience by combining cutting-edge technology, exceptional service, and a forward-thinking approach. Our team of seasoned professionals is passionate about helping clients find their dream homes or investment properties.
                    </p>
                </div>
                <div className="flex-1">
                    <p className='text-gray-700 leading-relaxed'>
                        With years of industry experience and a deep understanding of the modern real estate landscape, our team of experts is well-equipped to guide you through the complexities of buying, selling, or investing in properties. From market analysis and property valuation to negotiating deals and navigating legal processes.
                    </p>
                </div>
            </div>
        </div>

        {/* Climate change section */}
        <div className="climate-change  py-20 px-30">
            <div className="text-center">
                <h2 className='text-4xl font-bold text-[#172229]  max-w-7xl mx-auto'>
                    The world needs to move fast to make a meaning against climate change.
                </h2>
            </div>
        </div>

        {/* Make it inviting and engaging section */}
        <div className="inviting-engaging bg-white py-10 px-30">
            <h2 className='text-3xl font-bold text-[#172229]'>Make it inviting and engaging</h2>
            <div className="flex gap-12 items-center ">
                <div className="flex-1">
                    <p className='text-gray-700 leading-relaxed mb-6'>
                        We understand that real estate decisions are among the most significant financial and emotional investments you'll make. That's why we're committed to providing personalized support, local market expertise, and a client-centric approach that puts your needs first.
                    </p>
                    <p className='text-gray-700 leading-relaxed'>
                        Whether you're a first-time homebuyer, seasoned investor, or looking to sell your property, our comprehensive suite of services is designed to make your real estate journey smooth, successful, and rewarding.
                    </p>
                </div>
                <div className="flex-1">
                    <img src={About1} alt="Modern House" className='w-full h-120  object-cover rounded-lg shadow-lg -translate-y-20 ' />
                </div>
            </div>
        </div>

        {/* Keep it short and sweet section */}
        <div className="short-sweet bg-white py-20 px-30">
            <div className="flex gap-12 items-center">
                <div className="flex-1">
                    <img src={About2} alt="Modern House with Pool" className='w-full h-96 object-cover rounded-lg shadow-lg' />
                </div>
                <div className="flex-1">
                    <h2 className='text-4xl font-bold text-black mb-8'>Keep it short and sweet</h2>
                    <p className='text-gray-700 leading-relaxed mb-6'>
                        Buying or selling a home should be an exciting journey, not a stressful ordeal. We've streamlined the process to make it as efficient and enjoyable as possible, leveraging technology and market insights to deliver exceptional results.
                    </p>
                    <p className='text-gray-700 leading-relaxed'>
                        Our innovative approach combines traditional real estate expertise with modern digital tools, giving you the best of both worlds. From virtual tours to instant property alerts, we're revolutionizing how people buy and sell real estate.
                    </p>
                </div>
            </div>
        </div>

        {/* About our services section */}
        <div className="services bg-white py-20 px-30 flex items-center justify-center flex-col">
            <h2 className='text-4xl font-bold text-black mb-8'>About our services</h2>
            <p className='text-gray-700 leading-relaxed mb-12 max-w-4xl text-center '>
              Our mission is to empower individuals with knowledge and facilitate meaningful connections through our platform. We <br/>understand the importance of reliable and up-to-date information in today's fast-paced world.
            </p>
            
            <div className="grid grid-cols-3 gap-8">
                <div className="text-center p-8 bg-gray-50 rounded-lg">
                    <div className="flex justify-center mb-4">
                        <FaTruck className='text-4xl text-blue-600' />
                    </div>
                    <h3 className='text-xl font-bold text-black mb-3'>Fast delivery</h3>
                    <p className='text-gray-600'>
                        Experience swift and efficient property transactions with our streamlined delivery process, ensuring your real estate needs are met promptly.
                    </p>
                </div>
                
                <div className="text-center p-8 bg-gray-50 rounded-lg">
                    <div className="flex justify-center mb-4">
                        <FaTags className='text-4xl text-green-600' />
                    </div>
                    <h3 className='text-xl font-bold text-black mb-3'>Many offers</h3>
                    <p className='text-gray-600'>
                        Access exclusive deals and competitive offers through our comprehensive CMS platform, providing you with the best value opportunities.
                    </p>
                </div>
                
                <div className="text-center p-8 bg-gray-50 rounded-lg">
                    <div className="flex justify-center mb-4">
                        <FaHeadset className='text-4xl text-purple-600' />
                    </div>
                    <h3 className='text-xl font-bold text-black mb-3'>24/7 support</h3>
                    <p className='text-gray-600'>
                        Get round-the-clock assistance from our dedicated CMS support team, ensuring help is always available whenever you need it.
                    </p>
                </div>
            </div>
        </div>

    </section>
    
    <Footer />
    </>
  )
}

export default Aboutus