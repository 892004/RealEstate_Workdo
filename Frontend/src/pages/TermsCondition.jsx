import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import Footer from "../components/Footer/Footer";

const TermsCondition = () => {
  return (
    <section className="terms-conditon">
      <div className="heading h-[40vh] w-full bg-[#172229] px-30 flex flex-col items-start py-10 justify-start gap-5 text-white">
        <Link to="/">
          <p className="flex items-center justify-center text-[14px] font-medium">
            <span className="text-2xl border p-1 rounded-full m-1">
              <IoIosArrowRoundBack />
            </span>{" "}
            Back to Home
          </p>
        </Link>

        <h2 className="text-3xl font-bold px-2">Terms & Conditions</h2>

        <p className="px-2 -translate-y-2">
          We value the diverse perspectives and experiences of our users, and we
          encourage <br /> collaboration and community engagement. Our platform
          provides opportunities for users <br />
          to contribute their knowledge, share their opinions.
        </p>
      </div>

      <div className="term-content px-32 py-10">
        <h1 className="text-4xl font-bold text-[#172229]">
          Terms & Conditions
        </h1>

        <h3 className="mt-5 text-[#172229] text-xl font-bold">1. GENERAL CONDITIONS</h3>
        <p className="my-2">
          We reserve the right to refuse service to anyone for any reason at any
          time.
          <br />
          You understand that your content (not including credit card
          information), may be transferred unencrypted and involve (a)
          transmissions over various networks; and (b) changes to conform and
          adapt to technical requirements of connecting networks or devices.
          Credit card information is always encrypted during transfer over
          networks. You agree not to reproduce, duplicate, copy, sell, resell or
          exploit any portion of the Service, use of the Service, or access to
          the Service or any contact on the website through which the service is
          provided, without express written permission by us.
          <br />
          The headings used in this agreement are included for convenience only
          and will not limit or otherwise affect these Terms.
        </p>
        <h3 className="mt-5 text-[#172229] text-xl font-bold">2. ACCURACY, COMPLETENESS AND TIMELINESS OF INFORMATION</h3>
        <p className="my-2">
         We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete or more timely sources of information. Any reliance on the material on this site is at your own risk.<br/>
This site may contain certain historical information. Historical information, necessarily, is not current and is provided for your reference only. We reserve the right to modify the contents of this site at any time, but we have no obligation to update any information on our site. You agree that it is your responsibility to monitor changes to our site.
        </p>
        <h3 className="mt-5 text-[#172229] text-xl font-bold">3. MODIFICATIONS TO THE SERVICE AND PRICES</h3>
        <p className="my-2">
         Prices for our products are subject to change without notice.<br />
We reserve the right at any time to modify or discontinue the Service (or any part or content there of) without notice at any time.<br />
We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.
        </p>
        <h3 className="mt-5 text-[#172229] text-xl font-bold">4. PRODUCTS OR SERVICES (if applicable)</h3>
        <p className="my-2">
         Certain products or services may be available exclusively online through the website. These products or services may have limited quantities and are subject to return or exchange only according to our Return Policy.<br />
We have made every effort to display as accurately as possible the colors and images of our products that appear at the store. We cannot guarantee that your computer monitor's display of any color will be accurate.<br />
We reserve the right, but are not obligated, to limit the sales of our products or Services to any person, geographic region or jurisdiction. We may exercise this right on a case-by-case <br />basis. We reserve the right to limit the quantities of any products or services that we offer. All descriptions of products or product pricing are subject to change at anytime without<br /> notice, at the sole discretion of us. We reserve the right to discontinue any product at any time. Any offer for any product or service made on this site is void where prohibited.
        </p>
      </div>
      <Footer />
    </section>
  );
};

export default TermsCondition;
