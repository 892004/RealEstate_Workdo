import React from 'react'
import { FaRegCopyright } from "react-icons/fa6";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import visa from '../../public/Images/visa.jpg'
import mastercard from '../../public/Images/mastercard.jpg'
import amex from '../../public/Images/amex.jpg'
import paypal from '../../public/Images/paypal.jpg'
import dinersclub from '../../public/Images/dinersclub.jpg'
import discover from '../../public/Images/discover.jpg'


const Footer = () => {
  return (
    <section className="Footer relative  h-[60vh] bg-[#1F282E] flex flex-row justify-center gap-35">
            {/* subscribe */}
            <div className="subscribe flex flex-col gap-5 p-4">
                <h1 className='text-2xl text-white font-bold '>Subscribe newsletter and get -20% off</h1>
                <p className='text-white'>Discover the perfect family haven in our spacious suburban <br/>residences. These thoughtfully designed homes provide ample <br/>room for your growing family to thrive.</p>
               
            </div>


            {/* Shop */}
            <div className="shop flex flex-col p-4 text-white list-none gap-3 ">
                    <h1 className='text-white text-2xl font-bold'>Shop:</h1>
                    <li className ='cursor-pointer'>Search</li>
                    <li className ='cursor-pointer'>All collection</li>
                    <li className ='cursor-pointer'>All product</li>
                    <li className ='cursor-pointer'>My Cart</li>
            </div>

            {/* account */}
            <div className="Account flex flex-col p-4 text-white list-none gap-3">
                    <h1 className='text-white text-2xl font-bold'>Account:</h1>
                    <li className ='cursor-pointer'>About us</li>
                    <li className ='cursor-pointer'>Contact with us</li>
                    <li className ='cursor-pointer'>Faq</li>
                    <li className ='cursor-pointer'>Privacy Policy</li>
                    <li className ='cursor-pointer'>Shipping & Delivery</li>
                    <li className ='cursor-pointer'>Terms & Conditions</li>
                    <li className ='cursor-pointer'>Wishlist</li>
            </div>


            {/* share */}
             <div className="Account flex flex-col p-4 text-white list-none gap-3  className ='cursor-pointer'">
                 <h1 className='text-white text-2xl font-bold'>Share:</h1>
                 <li className ='cursor-pointer'>Youtube</li>
                 <li className ='cursor-pointer'>Facebook</li>
                 <li className ='cursor-pointer'>Instagram</li>
                 <li className ='cursor-pointer'>Twitter</li>
             </div>


             <div className="copy-right  absolute bottom-5 flex flex-row items-center gap-140  ">
                     <p className='text-white flex items-center cursor-pointer'><FaRegCopyright />,2025 Modernrealestate Workdo, Powered by WorkDo.io</p>

                     <div className="payments flex flex-row gap-2">
                        <img src={visa} alt=""  className='h-8 w-12 rounded-sm'/>
                        <img src={mastercard} alt="" className='h-8 w-12 rounded-sm'  />
                        <img src={amex} alt="" className='h-8 w-12 rounded-sm'/>
                        <img src={paypal} alt="" className='h-8 w-12 rounded-sm'/>
                        <img src={dinersclub} alt="" className='h-8 w-12 rounded-sm'/>
                        <img src={discover} alt="" className='h-8 w-12 rounded-sm'/>
                     </div>
             </div>
    </section>
  )
}

export default Footer