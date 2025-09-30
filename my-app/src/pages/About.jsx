import React from 'react'
import Title from '../component/Title'
import about from '../assets/about.webp'
import NewLetterBox from '../component/NewLetterBox'

function About() {
  return (
    <div className='w-full md:w-full min-h-[100vh] flex items-center justify-center flex-col
    bg-white text-black gap-[50px] pt-[80px] overflow-x-hidden'>
      
      <Title text1={"ABOUT"} text2={"US"} />

      <div className='w-full flex items-center justify-center flex-col lg:flex-row'>
        {/* Image Section */}
        <div className='lg:w-[50%] w-full flex items-center justify-center'>
          <img 
            src={about} 
            alt="" 
            className='lg:w-[65%] w-[80%] shadow-md shadow-gray-400 rounded-sm' 
          />
        </div>

        {/* Text Section */}
        <div className='lg:w-[50%] w-[80%] flex items-start justify-center gap-[20px] flex-col mt-[20px] lg:mt-0'>
          <p className='lg:w-[80%] w-full md:text-[16px] text-[13px]'>
          About Us

Welcome to NEXZEN  – where style, quality, and innovation come together to create a shopping experience you’ll love.

We started NEXZEN with a simple idea: to make online shopping easier, more reliable, and more exciting for everyone. Our brand is built on trust, creativity, and care, and every product we offer is carefully chosen with you in mind.

At NEXZEN, we believe in:
 Quality First – Only products that meet our high standards make it to your hands.
 Customer Happiness – Your satisfaction is our greatest success.
 Modern Lifestyle – Fresh, stylish, and practical solutions for everyday living.
     

          <p className='lg:w-[80%] w-full md:text-[16px] text-[15px] lg:text-[18px] mt-[10px] font-bold'>
            OUR MISSION
          </p>

          <p className='lg:w-[80%] w-full md:text-[16px] text-[13px]'>
           But NEXZEN is more than just an online store—it’s a community. A place where shoppers feel confident, valued, and inspired. Whether you’re here to find something unique, upgrade your lifestyle, or simply enjoy a smooth shopping journey, we’re here to make it happen.

Thank you for choosing NEXZEN. Together, we’re not just shopping—we’re shaping the future of online retail.      </p>
     </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className='w-full flex items-center justify-center flex-col gap-[10px]'>
        <Title text1={"WHY"} text2={"CHOOSE US"} />

        <div className='w-[80%] flex items-center justify-center lg:flex-row flex-col py-[40px] gap-[20px]'>
          <div className='lg:w-[33%] w-[90%] h-[250px] border border-gray-300 flex items-center
          justify-center gap-[20px] flex-col px-[40px] py-[10px] bg-white text-black shadow-md'>
            <b className='text-[20px] font-semibold text-green-600'>Quality Assurance</b>
            <p>At NEXZEN, quality is at the heart of everything we do.
We are committed to delivering products that meet the highest standards of durability, style, and performance..</p>
          </div>

          <div className='lg:w-[33%] w-[90%] h-[250px] border border-gray-300 flex items-center
          justify-center gap-[40px] flex-col px-[40px] py-[10px] bg-white text-black shadow-md'>
            <b className='text-[20px] font-semibold text-green-600'>Convenience</b>
            <p>Shopping with NEXZEN is designed to be simple, fast, and stress-free.
              to ensure your shopping experience is smooth, reliable, and stress-free.
            </p>
          </div>

          <div className='lg:w-[33%] w-[90%] h-[250px] border border-gray-300 flex items-center
          justify-center gap-[20px] flex-col px-[40px] py-[10px] bg-white text-black shadow-md'>
            <b className='text-[20px] font-semibold text-green-600'>Exceptional Customer Service</b>
            <p>At NEXZEN, we don’t just sell products—we build lasting relationships.
Our dedicated support team is here</p>
          </div>
        </div>
      </div>

      <NewLetterBox />
    </div>
  )
}

export default About
