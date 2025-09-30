import React from 'react'

function NewLetterBox() {

    const handleSubmit = () =>{
        e.preventDefault()
    }

  return (
    <div className='w-[100vw] h-[40vh] flex items-center justify-start
    flex-col bg-gradient-to-l t gap-[10px]'>
      <p className='md:text-[30px] text-[20px] text-[black] font-semibold px-[20px]'>
        Subscribe Now And Get 20% OFF!
      </p>
      <p className='md:text-[18px] text-[14px] text-center black font-semibold px-[20px]'>
        Subscribe Now And Enjoy Exclusive Saving, Special Deals, And Early Acces 
        To New Collections.
      </p>
      <form action="" onSubmit={handleSubmit} className='w-[100%] h-[30%] md:h-[50%] flex items-center justify-center
      mt-[20px] gap-[20px] px-[20px] '>
        <input type="text" placeholder='Enter Your Email' className='placeholder:text-[black] bg-slate-300
        w-[600px] max-w-[60%] h-[40px] px-[20px] rounded-lg shadow-sm shadow-black' required/>
        <button type='submit' className='text-[15px] md:text-[16px] px-[10px] md:px-[30px] 
        py-[12px] md:py-[10px] hover:bg-slate-500 cursor-pointer bg-[#2e3030c9] text-white
        flex items-center justify-center gap-[20px] border-[1px] border-[#80808049] 
        rounded-lg shadow-sm shadow-black'>Subscribe</button>
      </form>
    </div>
  )
}

export default NewLetterBox
