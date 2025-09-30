import React from 'react'
import Title from '../component/Title'
import contact from '../assets/contact.webp'
import NewLetterBox from '../component/NewLetterBox'

function Contact() {
  return (
    <div className='w-full md:w-full min-h-[100vh] flex items-center justify-center flex-col
    bg-gradient-to-l gap-[50px] pt-[80px] overflow-x-hidden'>
      
      {/* Title */}
      <Title text1={"CONTACT"} text2={"US"} />

      <div className='w-[100%] flex items-center justify-center flex-col lg:flex-row'>
        
        {/* Image Section */}
        <div className='w-[100%] lg:w-[50%] flex items-center justify-center'>
          <img 
            src={contact} 
            alt="Contact" 
            className='lg:w-[70%] w-[80%] shadow-md shadow-[black] rounded-sm'
          />
        </div>

        {/* Info Section */}
        <div className='lg:w-[50%] w-[80%] flex flex-col items-start justify-center gap-[20px] mt-[20px] lg:mt-[0px]'>

          {/* Store Info */}
          <div>
            <p className='lg:w-[80%] w-[100%] text-[black] font-bold lg:text-[18px] text-[15px]'>
              Our Store
            </p>
            <div className='lg:w-[80%] w-[100%] text-[black] md:text-[16px] text-[13px] leading-relaxed'>
              <p>Q3QG+2QF Defence Housing Authority,</p>
              <p>Karachi, Pakistan</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className='lg:w-[80%] w-[100%] text-[black] md:text-[16px] text-[13px] leading-relaxed'>
            <p>Tel: +923265870737</p>
            <p>Email: nexzennow@gmail.com</p>
          </div>

          {/* Careers Info */}
          <div>
            <p className='lg:w-[80%] w-[100%] text-[black] lg:text-[18px] mt-[10px] font-bold'>
              Careers At Nexzen
            </p>
            <p className='lg:w-[80%] w-[100%] text-[black] md:text-[16px] text-[13px]'>
              Learn more about our teams and job openings
            </p>
            <button 
              className='px-[30px] py-[12px] mt-3 flex items-center justify-center
              text-[black] bg-transparent border hover:bg-black hover:text-white rounded-md transition'>
              Explore Jobs
            </button>
          </div>

        </div>
      </div>

      {/* Newsletter */}
      <NewLetterBox />
    </div>
  )
}

export default Contact
