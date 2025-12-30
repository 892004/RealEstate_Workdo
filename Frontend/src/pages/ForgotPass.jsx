import React from 'react'

const ForgotPass = () => {
  return (
    <div className="forgot-pass flex flex-col items-center justify-center min-h-screen">
        <h1 className='text-4xl font-medium'>Reset Your password</h1>
        
        <div className="box h-[33vh] w-3xl  mt-5 border">
          <p className='text-[19px] p-5'>We will send you an email to reset your password</p>
          <hr />
          <input type="email" placeholder='Email' className='border mt-5 mx-5 py-3 px-5 w-[700px] rounded-xl'/>
          <hr className='mt-5'/>
          <div className="buttons flex flex-row">
                <button className=' cursor-pointer m-5 bg-[#172229] py-2 px-5 text-[#FFE7D9] rounded-full'>Submit</button>
                <button className=' cursor-pointer m-5 -mx-3 bg-[#172229] py-2 px-5 text-[#FFE7D9] rounded-full'>Cencel</button>
            </div>
        </div>
    </div>
  )
}

export default ForgotPass
