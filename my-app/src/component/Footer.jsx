import React from 'react'
import logo from '../assets/footerlogo.png'
import { useNavigate } from 'react-router-dom'

function Footer() {

  const navigate = useNavigate()

  return (
    <div className='w-[100%] md:h-[36vh] h-auto mb-[77px] md:mb-[0px]'>

      {/* Main Footer */}
      <div className='w-[100%] md:h-[30vh] h-auto md:mb-[0] bg-[#dbfcfcec]
      flex flex-col md:flex-row items-start md:items-center justify-between md:px-[50px] px-[10px] py-[20px]'>

        {/* Logo Section */}
        <div className='md:w-[30%] w-[100%] flex flex-col items-start justify-center gap-[10px] mb-[20px] md:mb-0'>
          <div className='flex items-center gap-[10px]'>
            <img 
              src={logo} 
              alt="Nexzen Logo" 
              className='md:w-[80px] md:h-[80px] w-[60px] h-[60px] object-contain'
            />
          </div>

          <p className='text-[14px] text-[#1e2223] hidden md:block leading-[22px]'>
            NEXZEN is more than just an online store—it’s a community. A place where 
            shoppers feel confident, valued, and inspired. Whether you’re here to find 
            something unique,   
          </p>

          <p className='text-[14px] text-[#1e2223] flex md:hidden'>
            Fast. Easy. Reliable. Nexzen Shopping
          </p>
        </div>

        {/* Company Section */}
        <div className='md:w-[25%] w-[100%] flex items-center justify-center flex-col text-center mb-[20px] md:mb-0'>
          <p className='text-[19px] md:text-[20px] text-[#1e2223] font-semibold'>
            COMPANY
          </p>
          <ul className='mt-[10px] space-y-[5px]'>
            <li className='text-[15px] text-[#1e2223] cursor-pointer' onClick={()=>navigate("/")}>
              Home
            </li>
            <li className='text-[15px] text-[#1e2223] cursor-pointer' onClick={()=>navigate("/about")}>
              About Us
            </li>
            <li className='text-[15px] text-[#1e2223] hidden md:block cursor-pointer'>
              Delivery
            </li>
            <li className='text-[15px] text-[#1e2223] cursor-pointer'>
              Privacy Policy
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className='md:w-[25%] w-[100%] flex items-center justify-center flex-col text-center'>
          <p className='text-[19px] md:text-[20px] text-[#1e2223] font-semibold'>
            GET IN TOUCH
          </p>
          <ul className='mt-[10px] space-y-[5px]'>
            <li className='text-[15px] text-[#1e2223] hidden md:block'>
              +923265870737
            </li>
            <li className='text-[15px] text-[#1e2223] cursor-pointer'>
              nexzennow@gmail.com
            </li>
            <li className='text-[15px] text-[#1e2223] hidden md:block cursor-pointer'>
              +923272560635
            </li>
            <li className='text-[15px] text-[#1e2223] cursor-pointer'>
              hammaddeveloper02@gmail.com
            </li>
          </ul> 
        </div>
      </div>

      {/* Divider */}
      <div className='w-[100%] h-[1px] bg-slate-400'></div>

      {/* Footer Bottom */}
      <div className='w-[100%] h-[5vh] bg-[#dbfcfcfe] flex items-center justify-center text-[14px] text-[#1e2223] text-center px-[10px]'>
        Copyright 2025 @ Nexzennow.com - All Rights Reserved
      </div>
    </div>
  )
}

export default Footer
