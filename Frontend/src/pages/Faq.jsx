import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import Footer from "../components/Footer/Footer";
import { FaAngleDown } from "react-icons/fa6";

const Faq = () => {

  const [openId, setOpenId] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "How to setup a page with custom fields?",
      answer:
        "By creating an account you will be able to shop faster, be up to date on an orders status, and keep track of the orders you have previously made.By creating an account you will be able to shop faster, be up to date on an orders status, and keep track of the orders you have previously made.",
    },
    {
      id: 2,
      question: "What payment methods do you accept?",
      answer:
        "By creating an account you will be able to shop faster, be up to date on an orders status, and keep track of the orders you have previously made.By creating an account you will be able to shop faster, be up to date on an orders status, and keep track of the orders you have previously made.",
    },
    {
      id: 3,
      question: "How long does shipping take?",
      answer:
        "By creating an account you will be able to shop faster, be up to date on an orders status, and keep track of the orders you have previously made.By creating an account you will be able to shop faster, be up to date on an orders status, and keep track of the orders you have previously made.",
    },
    {
      id: 4,
      question: "Can I return or exchange items?",
      answer:
        "By creating an account you will be able to shop faster, be up to date on an orders status, and keep track of the orders you have previously made.By creating an account you will be able to shop faster, be up to date on an orders status, and keep track of the orders you have previously made.",
    },
    {
      id: 5,
      question: "How do I track my order?",
      answer:
        "By creating an account you will be able to shop faster, be up to date on an orders status, and keep track of the orders you have previously made.By creating an account you will be able to shop faster, be up to date on an orders status, and keep track of the orders you have previously made.",
    },
    {
      id: 6,
      question: "Do you offer international shipping?",
      answer:
        "By creating an account you will be able to shop faster, be up to date on an orders status, and keep track of the orders you have previously made.By creating an account you will be able to shop faster, be up to date on an orders status, and keep track of the orders you have previously made.",
    },
    {
      id: 7,
      question: "How can I contact customer support?",
      answer:
        "By creating an account you will be able to shop faster, be up to date on an orders status, and keep track of the orders you have previously made.By creating an account you will be able to shop faster, be up to date on an orders status, and keep track of the orders you have previously made.",
    },
    {
      id: 8,
      question: "What is your privacy policy?",
      answer:
        "By creating an account you will be able to shop faster, be up to date on an orders status, and keep track of the orders you have previously made.By creating an account you will be able to shop faster, be up to date on an orders status, and keep track of the orders you have previously made.",
    },
    {
      id: 9,
      question: "Do you offer discounts for bulk orders?",
      answer:
        "By creating an account you will be able to shop faster, be up to date on an orders status, and keep track of the orders you have previously made.By creating an account you will be able to shop faster, be up to date on an orders status, and keep track of the orders you have previously made.",
    },
    {
      id: 10,
      question: "How do I create an account?",
      answer:
        "By creating an account you will be able to shop faster, be up to date on an orders status, and keep track of the orders you have previously made.By creating an account you will be able to shop faster, be up to date on an orders status, and keep track of the orders you have previously made.",
    },
    {
      id: 11,
      question: "What if I forget my password?",
      answer:
        "By creating an account you will be able to shop faster, be up to date on an orders status, and keep track of the orders you have previously made.By creating an account you will be able to shop faster, be up to date on an orders status, and keep track of the orders you have previously made.",
    },
    {
      id: 12,
      question: "Do you have a mobile app?",
      answer:
        "By creating an account you will be able to shop faster, be up to date on an orders status, and keep track of the orders you have previously made.By creating an account you will be able to shop faster, be up to date on an orders status, and keep track of the orders you have previously made.",
    },
  ];

 const toggleFaq = (id) => {
  setOpenId(openId === id ? null : id);
};

  return (
    <>
      <section className="Faqs">
        <div className="heading h-[40vh] w-full bg-[#172229] px-30 flex flex-col items-start py-10 justify-start gap-5 text-white">
          <Link to="/">
            <p className="flex items-center justify-center text-[14px] font-medium">
              <span className="text-2xl border p-1 rounded-full m-1">
                <IoIosArrowRoundBack />
              </span>{" "}
              Back to Home
            </p>
          </Link>

          <h2 className="text-3xl font-bold px-2">Faq</h2>

          <p className="px-2 -translate-y-2">
            People will always seek help and advice. They are unwilling to pick
            up the phone, walk into a <br /> store, or wait hours (even minutes)
            for that information or insight to become accessible.
          </p>
        </div>

        <div className="faq-content bg-white py-20 px-30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold  text-[#172229] mb-6">About shop </h2> 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">  
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="border border-black  rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex justify-between items-center p-4 text-left bg-white"
                  >
                    <span className="text-sm font-bold text-[#172229]">
                      {faq.question}
                    </span>

                    <span
                      className={`transition-transform ${
                        openId === faq.id ? "rotate-180" : ""
                      }`}
                    >
                      <FaAngleDown />
                    </span>
                  </button>

                  {openId === faq.id && (
                    <div className="p-4 text-sm text-gray-600 bg-gray-50 border-t">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Faq;
