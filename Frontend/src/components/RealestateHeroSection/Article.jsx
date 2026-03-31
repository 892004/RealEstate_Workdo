import React, {useState }from 'react'
import { TbShare2 } from "react-icons/tb";
import blog1 from '../../public/Images/Blog1.webp'
import blog2 from '../../public/Images/Blog2.webp'
import { RiDoubleQuotesL } from "react-icons/ri";
import { HiMiniArrowLongRight } from "react-icons/hi2";
import { FaUserLarge } from "react-icons/fa6";
import '../../components/Article/article.css'



const   Article = (props) => {
  console.log(props.data)
  const [comments, setComments] = useState(() => {
  const savedComments = localStorage.getItem("comments");
  return savedComments ? JSON.parse(savedComments) : [];
});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  if (!formData.name || !formData.email || !formData.message) {
    alert("All fields are required");
    return;
  }

  const newComment = {
    name: formData.name,
    message: formData.message,
    date: new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
  };

const updatedComments = [newComment, ...comments];
setComments(updatedComments);
localStorage.setItem("comments", JSON.stringify(updatedComments));


  setFormData({
    name: "",
    email: "",
    message: "",
  });
};

  return (
    <section className="artical relative px-30 py-20   ">
     <div className="about-user list-none flex gap-10 text-[#172229]    ">
        <li className='font-bold text-[18px]'><i>Work DO</i></li>
        <li ><span className='font-bold text-[18px]'>Category:</span> realestate</li>
        <li><span  className='font-bold text-[18px]'>Date:</span>May 25,2023</li>
        <li className='flex items-center text-2xl '><span className='share-icon'><TbShare2 /></span></li>
     </div>

<h1 className='py-8 text-[33px] text-base/10 font-bold text-[#172229]'>
  {props.data.title}
</h1>

    
    <div className="article-content flex flex-row h-screen w-full ">
        <div className="left-section h-full w-[60%]  gap-2">
            <img src={props.data.img} alt="" className='h-[70vh] w-full object-cover  text-[#17222A]' />
            <p className='leading-5 text-[15px]'>where we challenge conventional notions of luxury living and explore the unique joys of prioritizing points over penthouses. In a world where material possessions often take center stage, we invite you to embark on a journey that focuses on the intangible elements that truly make a house a home. At Dream House Diaries, we believe that a home is not defined solely by its grandeur or opulence but by the experiences, memories, and connections it fosters. Instead of pursuing extravagant penthouses, we encourage you to consider the following points when crafting your dream house</p><br/>

            <p className='py-2 text-[20px] tracking-tight  text-[#17222A]'>Rather than aiming for the highest floor in a luxury high-rise, we prioritize finding a home in a location that aligns with your lifestyle and values. Whether it's a peaceful neighborhood, a close-knit community, or proximity to nature, choosing the right location ensures a fulfilling and enriching living experience. While penthouses may offer spacious layouts and extravagant features, we emphasize the importance of practical and functional design. Thoughtful floor plans, efficient use of space, and intelligent storage solutions create a home that enhances your daily life and accommodates your unique needs.</p><br/>

            <span className='text-[16px]  text-[#17222A]'>Whether it's incorporating your favorite colors, displaying cherished artwork, or creating cozy nooks, these elements contribute to a sense of identity and warmth in your home.</span>

            <p className='quotes-para py-20 flex items-start text-[18px] font-medium -translate-x-5  text-[#17222A]'><span className='text-6xl px-5'><RiDoubleQuotesL /></span>Implementing energy-efficient systems, utilizing renewable materials, and integrating sustainable practices into your home reduce your environmental impact and create a healthier, more conscious living space.</p>

            <p className='tags font-bold -my-5 text-[#17222A]'>Tags:<span className='font-normal'>News</span></p>
        </div>


        <div className="right-section h-full w-[40%] px-10">
          <p className='text-3xl font-bold text-[#17222A] '>Related Articles</p>
          <div className="card-1 border-2 h-[80vh] w-full rounded-2xl mt-10 text-[#17222A]">
              <img src={blog1} alt="" className='h-70 w-full rounded-2xl' />
              <p className='p-2 font-light text-[14px]'>25 May 2023 | WorkDo</p>
              <h1 className='text-[20px] font-bold p-2 line-clamp-1'>Dream House Diaries Points Over...</h1>
              <p className='p-2 text-[16px]'>where we challenge conventional notions of luxury living and explore the unique joys of prioritizing points over penthouses. In a world where material possessions often take center stage, we invite you to...</p>
              <button className='flex items-center p-2 bg-[#17222A] py-1 ml-3 mt-5 text-[14px] font-bold rounded-full cursor-pointer text-[#FFE9DA]'>Show full details <span className='m-2 '><HiMiniArrowLongRight /></span></button>
          </div>

           <div className="card-1 border-2 h-[80vh] w-full rounded-2xl mt-10 text-[#17222A]">
              <img src={blog2} alt="" className='h-70 w-full rounded-2xl' />
              <p className='p-2 font-light text-[14px]'>25 May 2023 | WorkDo</p>
              <h1 className='text-[20px] font-bold p-2 line-clamp-1'>A one-story house with a garden and...</h1>
              <p className='p-2 text-[16px]'>Single-Story Bliss, a delightful residence offering the perfect combination of comfort, relaxation, and outdoor enjoyment. This one-story house boasts a beautiful garden retreat and a refreshing pool,...</p>
              <button className='flex items-center p-2 bg-[#17222A] py-1 ml-3 mt-5 text-[14px] font-bold rounded-full cursor-pointer text-[#FFE9DA]'>Show full details <span className='m-2 '><HiMiniArrowLongRight /></span></button>
          </div>

           <div className="max-w-xl mx-auto mt-10 p-4">
      
      {/* COMMENTS LIST */}
     <div className="mb-6">
  <h2 className="text-xl font-bold mb-4">
    {comments.length} Comments
  </h2>

  {comments.map((comment, index) => (
    <div
      key={index}
      className="border p-4 mb-4 flex gap-3"
    >
      {/* USER ICON */}
      <div className="w-10 h-10 rounded-full border flex items-center justify-center text-gray-500">
      <span><FaUserLarge /></span>
      </div>

      {/* COMMENT CONTENT */}
      <div>
        <h4 className="font-semibold text-gray-800">
          {comment.name}
        </h4>
        <p className="text-sm text-gray-500">
          {comment.date}
        </p>
        <p className="mt-2 text-gray-700">
          {comment.message}
        </p>
      </div>
    </div>
  ))}
</div>


      {/* COMMENT FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-4 space-y-4 border"
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full  rounded-md p-2 focus:outline-none border "
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border  rounded-md p-2 focus:outline-none  "
        />

        <textarea
          name="message"
          placeholder="Message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          className="w-full border rounded-md p-2 focus:outline-none  "
        ></textarea>

        <button
          type="submit"
          className="w-full bg-[#17222A] text-[14px] font-bold cursor-pointer text-[#FFE9DA] py-2 rounded-full transition"
        >
          Post Comment
        </button>
      </form>
    </div>
        </div>
    </div>
    </section>
  )
}

export default Article