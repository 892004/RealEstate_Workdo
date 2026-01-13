import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import Footer from "../components/Footer/Footer";

const ShippingDelivery = () => {
  return (
    <section className="Shipping">
      <div className="heading h-[40vh] w-full bg-[#172229] px-30 flex flex-col items-start py-10 justify-start gap-5 text-white">
        <Link to="/">
          <p className="flex items-center justify-center text-[14px] font-medium">
            <span className="text-2xl border p-1 rounded-full m-1">
              <IoIosArrowRoundBack />
            </span>{" "}
            Back to Home
          </p>
        </Link>

        <h2 className="text-3xl font-bold px-2">Shipping & Delivery</h2>

        <p className="px-2 -translate-y-2">
          We value the diverse perspectives and experiences of our users, and we
          encourage <br />
          collaboration and community engagement. Our platform provides
          opportunities for users
          <br /> to contribute their knowledge, share their opinions.
        </p>
      </div>

      <div className="shipping-content px-32 py-10 ">
        <h1 className="text-4xl text-[#172229] font-bold">
          Shipping & Delivery
        </h1>
        <br />
        <p>
          Our policy lasts 30 days. If 30 days have gone by since your purchase,
          unfortunately we can’t offer you a refund or exchange.
          <br />
          To be eligible for a return, your item must be unused and in the same
          condition that you received it. It must also be in the original
          packaging.
          <br />
          Several types of goods are exempt from being returned. Perishable
          goods such as food, flowers, newspapers or magazines cannot be
          returned. We also do not accept products that
          <br /> are hazardous materials, or flammable liquids or gases.
        </p>{" "}
        <br />
        <h4>Additional non-returnable items: </h4>
        <p>Gift cards</p>
        <p>Downloadable software products </p>
        <p>Some health and personal care items</p>
        <p>
          To complete your return, we require a receipt or proof of purchase.
        </p>
        <p>Please do not send your purchase back to the manufacturer.</p>
        <p>
          There are certain situations where only partial refunds are granted
          (if applicable) <br />
          Book with obvious signs of use{" "}
        </p>
        <p>
          CD, DVD, VHS tape, software, video game, cassette tape, or vinyl
          record that has been opened <br />
          Any item not in its original condition, is damaged or missing parts
          for reasons not due to our error <br />
          Any item that is returned more than 30 days after delivery
        </p>{" "}
        <br />
        <h1 className="text-2xl text-[#172229] font-bold">
          Refunds (if applicable)
        </h1>
        <p>
          Once your return is received and inspected, we will send you an email
          to notify you that we have received your returned item. We will also
          notify you of the approval or rejection of your <br />
          refund.{" "}
        </p>
        <p>
          If you are approved, then your refund will be processed, and a credit
          will automatically be applied to your credit card or original method
          of payment, within a certain amount of days.
          <br />
          Late or missing refunds (if applicable){" "}
        </p>
        <p>
          If you haven’t received a refund yet, first check your bank account
          again.{" "}
        </p>
        <p>
          Then contact your credit card company, it may take some time before
          your refund is officially posted.{" "}
        </p>
        <p>
          Next contact your bank. There is often some processing time before a
          refund is posted.
        </p>
        <p>
          If you’ve done all of this and you still have not received your refund
          yet, please contact us at themesupport@shopify.com.
          <br />
          Sale items (if applicable){" "}
        </p>
        <p>
          Only regular priced items may be refunded, unfortunately sale items
          cannot be refunded.
        </p>{" "}
        <br />
        <h1 className="text-2xl text-[#172229] font-bold">
          Exchanges (if applicable)
        </h1>
        <p>
          We only replace items if they are defective or damaged. If you need to
          exchange it for the same item, send us an email at
          themesupport@shopify.com and send your item to: 150 Elgin <br />
          Street, Ottawa ON K2P1L4, Canada.
        </p> <br />
        <h1 className="text-2xl text-[#172229] font-bold">Gifts</h1>
        <p>
          If the item was marked as a gift when purchased and shipped directly
          to you, you’ll receive a gift credit for the value of your return.
          Once the returned item is received, a gift certificate <br />
          will be mailed to you.
        </p>
        <p>
          If the item wasn’t marked as a gift when purchased, or the gift giver
          had the order shipped to themselves to give to you later, we will send
          a refund to the gift giver and he will find out
          <br /> about your return.
        </p> <br />
        <h1 className="text-2xl text-[#172229] font-bold">Shipping</h1>
        <p>
          To return your product, you should mail your product to: 150 Elgin
          Street, Ottawa ON K2P1L4, Canada
        </p>
        <p>
          You will be responsible for paying for your own shipping costs for
          returning your item. Shipping costs are non-refundable. If you receive
          a refund, the cost of return shipping will be <br />
          deducted from your refund.
        </p>
        <p>
          Depending on where you live, the time it may take for your exchanged
          product to reach you, may vary.
          <br />
          If you are shipping an item over $75, you should consider using a
          trackable shipping service or purchasing shipping insurance. We don’t
          guarantee that we will receive your returned
          <br /> item.
        </p>
      </div>
      <Footer />
    </section>
  );
};

export default ShippingDelivery;
