import React from 'react'
import Title from './Title'
import { RiExchangeFundsLine } from "react-icons/ri";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";

function OurPolicy() {
  return (
    <div className='w-[100vw] h-[100vh] md:h-[70vh] flex items-center justify-start
    flex-col bg-gradient-to-l  gap-[50px]'>
      <div className='h-[8%] w-[100%] text-center mt-[70px] '>
        <Title  text1={"OUR"} text2={"POLICY"}/>
        <p className='w-[100%] m-auto text-[13px] md:text-[20px] px-[10px] text-black'>
            Customer Friendly Policies - Commeted To Your Satisfaction And Saftey. 
        </p>
      </div>
      <div className='w-[100%] md:min-h-[50%] h-[20%] flex items-center justify-center
      flex-wrap lg:gap-[50px] gap-[80px]'>
        <div className='w-[400px] max-w-[90%] h-[60%] flex items-center
        justify-center flex-col gap-[10px]'>
            <RiExchangeFundsLine className='md:w-[60px] w[30px] h-[30px] md:h-[60px] text-[black]'/>
            <p className='font-semibold md:text-[25px] text-[19px] text-[#black]'>Easy Exchange Policy</p>
            <p className='font-semibold md:text-[15px] text-[8px] text-[black] text-center'>
               We accept returns and exchanges within 4 days of delivery.


            </p>
        </div>
        <div className='w-[400px] max-w-[90%] h-[60%] flex items-center
        justify-center flex-col gap-[10px]'>
            <TbRosetteDiscountCheckFilled className='md:w-[60px] w[30px] h-[30px] md:h-[60px] text-[black]'/>
            <p className='font-semibold md:text-[25px] text-[19px] text-[black]'>7 Days Return Policy</p>
            <p className='font-semibold md:text-[15px] text-[8px] text-[black] text-center'>
               If you are not satisfied with your purchase, you may request a refund within the eligible return window.
            </p>
        </div>
        <div className='w-[400px] max-w-[90%] h-[60%] flex items-center
        justify-center flex-col gap-[10px]'>
            <BiSupport className='md:w-[60px] w[30px] h-[30px] md:h-[60px] text-[black]'/>
            <p className='font-semibold md:text-[25px] text-[19px] text-[black]'>Trusted Customer Supports.</p>
            <p className='font-semibold md:text-[15px] text-[8px] text-[black] text-center'>
              Our customer service team is available 24/7 to assist you.
You can reach us anytime via [email/phone/chat link].
 
            </p>
        </div>
      </div>
    </div>
  )
}

export default OurPolicy
