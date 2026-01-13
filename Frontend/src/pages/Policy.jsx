import React from 'react'
import { Link } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import Footer from '../components/Footer/Footer';

const Policy = () => {
  return (
   <section className="policy">
        <div className="heading h-[40vh] w-full bg-[#172229] px-30 flex flex-col items-start py-10 justify-start gap-5 text-white">
          <Link to="/">
            <p className="flex items-center justify-center text-[14px] font-medium">
              <span className="text-2xl border p-1 rounded-full m-1">
                <IoIosArrowRoundBack />
              </span>{" "}
              Back to Home
            </p>
          </Link>

          <h2 className="text-3xl font-bold px-2">Privacy Policy</h2>

          <p className="px-2 -translate-y-2">
            We value the diverse perspectives and experiences of our users, and we encourage <br />collaboration and community engagement. Our platform provides opportunities for users <br />to contribute their knowledge, share their opinions.
          </p>
        </div>

        <div className="privacy-content px-32 py-10">
           <h1 className='text-3xl text-[#172229] font-bold'>Privacy Policy</h1> <br/>

           <p className='font-semibold text-[#172229]'>When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the <br />cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or <br />search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as “Device Information”.</p><br />

           <p>Additionally when you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping<br />payment information, email address, and phone number. We refer to this information as “Order Information”.When we talk about “Personal Information” in this Privacy Policy, we are<br /> talking both about Device Information and Order Information.</p> <br/>


           <h1 className='text-3xl text-[#172229] font-bold'>How do we use your personal information?</h1><br/>

           <p>We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations). Additionally, we use this Order Information to:</p> <br/>

           <ul className='list-disc px-5 flex flex-col gap-3'>
            <li>Communicate with you.</li>
            <li>Screen our orders for potential risk or fraud.</li>
            <li>When in line with the preferences you have shared with us.</li>
            <li>provide you with information or advertising relating to our products or services.</li>
           </ul> <br />

           <p>We use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our Site (for <br/> example, by generating analytics about how our customers browse and interact with the Site, and to assess the success of our marketing and advertising campaigns).</p>
        </div>
        <Footer />
   </section>
  )
}

export default Policy