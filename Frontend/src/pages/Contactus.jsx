import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import Footer from "../components/Footer/Footer";
import '../components/Contactus/contactus.css'

const Contactus = () => {
  return (
    <section className="contact-us h-screen w-full">
      <div className="heading h-[40vh] w-full bg-[#172229] px-30 flex flex-col items-start py-10 justify-start gap-5 text-white">
        <Link to="/">
          <p className="flex items-center justify-center text-[14px] font-medium">
            <span className="text-2xl border p-1 rounded-full m-1">
              <IoIosArrowRoundBack />
            </span>{" "}
            Back to Home
          </p>
        </Link>

        <h2 className="text-3xl font-bold px-2">Contact with us</h2>
        <h3 className="text-3xl font-bold px-2 absolute left-[44%] py-10">
          Contact form
        </h3>
        <p className="para px-2 w-130 -translate-y-2">
          With that in mind, we strive to deliver accurate, trustworthy, and
          engaging
          content to our users. Our team of experts, researchers, and writers
          work
          tirelessly to curate high-quality articles, guides, and resources that
          cover
          various domains such as technology, science, health, business,
          and more.
        </p>
      </div>

      <div className="contact-content flex flex-row items-start justify-start px-8 gap-20 text-[#172229]">
        <div className="contact-details flex flex-row items-start justify-start gap-10 p-25">
          <div className="call-us flex flex-col items-start gap-4">
            <p className="font-semibold text-[14px]">CALL US</p>
            <h1 className="text-xl font-semibold">+480021-32-12</h1>
            <p className="font-semibold text-[14px]">EMIAL :</p>
            <h1 className="text-xl font-semibold">shop@company.com</h1>
          </div>

          <div className="address">
            <h1>ADDRESS:</h1>
            <p className="text-xl font-semibold">
              1093 Marigold Lane,
              <br />
              Coral Way, Miami,
              <br />
              Florida, 33169
            </p>
          </div>
        </div>

        <div className="contact-form flex items-start justify-start px-auto  border-2 border-black -translate-y-30 bg-white relative">
          <form className="p-2 flex flex-col items-start justify-start ">
            <div className="name flex flex-row items-start justify-start gap-5 p-5">
              <div className="first-name flex flex-col">
                <label>First Name <span className="text-red-500">*</span>:</label>
                <input type="text" placeholder="First Name" className="border py-2 px-2 w-90" required />
              </div>

              <div className="first-name flex flex-col">
                <label>Last Name<span className="text-red-500">*</span>:</label>
                <input type="text" placeholder="Last Name" className="border py-2 px-2 w-90" required />
              </div>
            </div>

             <div className="name flex flex-row items-start justify-start gap-5 p-5 ">
              <div className="first-name flex flex-col">
                <label>Email<span className="text-red-500">*</span>:</label>
                <input type="Email" placeholder="Email " className="border py-2 px-2 w-90" required/>
              </div>

              <div className="first-name flex flex-col">
                <label>Phone Number <span className="text-red-500">*</span>:</label>
                <input type="text" placeholder="Phone number" className="border py-2 px-2 w-90" required/>
              </div>
             </div>
          
           <div className="desc flex flex-row items-start justify-start gap-5 p-5 ">
              <div className="first-name flex flex-col">
                <label>Description<span className="text-red-500">*</span>:</label>
                <textarea rows={5} cols={90} className="border"></textarea>
              </div>
           </div>


        <div className="btn p-5">
           <button className="bg-[#172229] px-8 py-3 rounded-full text-white flex items-center justify-center cursor-pointer">Send Message <span className="m-1 text-2xl "><IoIosArrowRoundForward /></span></button>
        </div>
          </form>
        </div>
      </div>

      <div className="map w-full">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d19056.213261541077!2d-6.259279000000001!3d53.342779!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48670e9b9e1777e3%3A0xf0c386e79dfddfc0!2s1-2%20Adam%20Court%2C%20Dublin%2C%20Ireland!5e0!3m2!1sen!2sus!4v1768195712395"
    className="w-full h-[450px]"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  />
</div>
<Footer />
    </section>
  );
};

export default Contactus;
